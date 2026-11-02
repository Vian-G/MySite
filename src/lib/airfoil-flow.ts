// D2Q9 BGK lattice Boltzmann fluid: collision, streaming, and link bounce-back.
// Lattice units; coarse educational model, not a calibrated aerodynamic tool.
export const FLOW_WIDTH = 192;
export const FLOW_HEIGHT = 112;
export const FLOW_CHORD = 64;
export const FLOW_SPEED = 0.045;
export const FLOW_TAU = 0.68;
export const FLOW_REYNOLDS = FLOW_SPEED * FLOW_CHORD / ((FLOW_TAU - 0.5) / 3);
const CX = [0, 1, 0, -1, 0, 1, -1, -1, 1];
const CY = [0, 0, 1, 0, -1, 1, 1, -1, -1];
const OPPOSITE = [0, 3, 4, 1, 2, 7, 8, 5, 6];
const WEIGHTS = [4 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 36, 1 / 36, 1 / 36, 1 / 36];

function equilibrium(direction: number, density: number, u: number, v: number) {
  const cu = 3 * (CX[direction] * u + CY[direction] * v);
  return WEIGHTS[direction] * density * (1 + cu + cu * cu / 2 - 1.5 * (u * u + v * v));
}

export class AirfoilFlow {
  readonly width = FLOW_WIDTH;
  readonly height = FLOW_HEIGHT;
  readonly solid = new Uint8Array(FLOW_WIDTH * FLOW_HEIGHT);
  readonly u = new Float64Array(FLOW_WIDTH * FLOW_HEIGHT);
  readonly v = new Float64Array(FLOW_WIDTH * FLOW_HEIGHT);
  readonly density = new Float64Array(FLOW_WIDTH * FLOW_HEIGHT);
  private populations = new Float64Array(FLOW_WIDTH * FLOW_HEIGHT * 9);
  private streamed = new Float64Array(FLOW_WIDTH * FLOW_HEIGHT * 9);
  steps = 0;
  readonly pitch: number;

  constructor(pitch: number) {
    this.pitch = pitch;
    if (!Number.isFinite(pitch) || Math.abs(pitch) > 15) throw new Error('Pitch must be between −15° and 15°.');
    const angle = pitch * Math.PI / 180;
    const cos = Math.cos(angle), sin = Math.sin(angle);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = y * this.width + x;
        const dx = x - 64, dy = y - (this.height - 1) / 2;
        const chordPosition = (cos * dx + sin * dy + FLOW_CHORD / 4) / FLOW_CHORD;
        const normalPosition = -sin * dx + cos * dy;
        if (chordPosition >= 0 && chordPosition <= 1) {
          // Closed trailing-edge, symmetric 12%-thickness airfoil.
          const s = chordPosition;
          const thickness = 5 * 0.12 * FLOW_CHORD * (0.2969 * Math.sqrt(s) - 0.126 * s - 0.3516 * s ** 2 + 0.2843 * s ** 3 - 0.1036 * s ** 4);
          this.solid[cell] = Number(Math.abs(normalPosition) <= Math.max(0.5, thickness));
        }
        for (let q = 0; q < 9; q++) this.populations[cell * 9 + q] = equilibrium(q, 1, this.solid[cell] ? 0 : FLOW_SPEED, 0);
      }
    }
    this.measure();
  }

  step(count = 1) {
    for (let iteration = 0; iteration < count; iteration++) {
      const f = this.populations, next = this.streamed;
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const cell = y * this.width + x;
          if (this.solid[cell]) continue;
          const offset = cell * 9;
          let rho = 0, u = 0, v = 0;
          for (let q = 0; q < 9; q++) {
            const population = f[offset + q];
            rho += population;
            u += population * CX[q];
            v += population * CY[q];
          }
          u /= rho; v /= rho;
          if (!Number.isFinite(rho + u + v) || rho < 0.7 || rho > 1.3 || u * u + v * v > 0.09) throw new Error('Flow became unstable. Reset the simulation to restart.');
          for (let q = 0; q < 9; q++) {
            const postCollision = f[offset + q] + (equilibrium(q, rho, u, v) - f[offset + q]) / FLOW_TAU;
            const nx = x + CX[q], ny = y + CY[q];
            if (nx < 0 || nx >= this.width || ny < 0 || ny >= this.height) continue;
            const destination = ny * this.width + nx;
            if (this.solid[destination]) next[offset + OPPOSITE[q]] = postCollision;
            else next[destination * 9 + q] = postCollision;
          }
        }
      }
      // Uniform inlet and far-field reservoirs; zero-gradient outlet.
      for (let y = 0; y < this.height; y++) {
        for (let q = 0; q < 9; q++) {
          next[y * this.width * 9 + q] = equilibrium(q, 1, FLOW_SPEED, 0);
          next[(y * this.width + this.width - 1) * 9 + q] = next[(y * this.width + this.width - 2) * 9 + q];
        }
      }
      for (let x = 0; x < this.width; x++) {
        for (let q = 0; q < 9; q++) {
          next[x * 9 + q] = equilibrium(q, 1, FLOW_SPEED, 0);
          next[((this.height - 1) * this.width + x) * 9 + q] = equilibrium(q, 1, FLOW_SPEED, 0);
        }
      }
      this.populations = next;
      this.streamed = f;
      this.steps++;
    }
    this.measure();
  }

  private measure() {
    for (let cell = 0; cell < this.solid.length; cell++) {
      if (this.solid[cell]) {
        this.density[cell] = 1; this.u[cell] = 0; this.v[cell] = 0;
        continue;
      }
      let rho = 0, u = 0, v = 0;
      for (let q = 0; q < 9; q++) {
        const population = this.populations[cell * 9 + q];
        rho += population; u += population * CX[q]; v += population * CY[q];
      }
      this.density[cell] = rho; this.u[cell] = u / rho; this.v[cell] = v / rho;
    }
  }
}
