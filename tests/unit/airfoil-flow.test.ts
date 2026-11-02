import test from 'node:test';
import assert from 'node:assert/strict';
import { AirfoilFlow, FLOW_SPEED } from '../../src/lib/airfoil-flow.ts';

test('long-running flow stays finite, weakly compressible, and stationary inside the body', () => {
  for (const pitch of [-15, 0, 15]) {
    const flow = new AirfoilFlow(pitch);
    flow.step(5000);
    let minDensity = Infinity, maxDensity = 0, maxSpeed = 0;
    for (let cell = 0; cell < flow.solid.length; cell++) {
      assert.ok(Number.isFinite(flow.u[cell] + flow.v[cell] + flow.density[cell]));
      minDensity = Math.min(minDensity, flow.density[cell]);
      maxDensity = Math.max(maxDensity, flow.density[cell]);
      maxSpeed = Math.max(maxSpeed, Math.hypot(flow.u[cell], flow.v[cell]));
      if (flow.solid[cell]) assert.equal(Math.hypot(flow.u[cell], flow.v[cell]), 0);
    }
    assert.ok(minDensity > 0.95 && maxDensity < 1.05, `Density excursion at ${pitch}°: ${minDensity}–${maxDensity}`);
    assert.ok(maxSpeed > FLOW_SPEED * 1.05, 'Obstacle must alter the uniform inlet flow');
    assert.ok(maxSpeed < 0.15, 'Keep the demonstration in a low-Mach regime');
  }
});

test('opposite angles produce mirrored geometry and mirrored flow', () => {
  const up = new AirfoilFlow(10), down = new AirfoilFlow(-10);
  up.step(600); down.step(600);
  let largestVerticalVelocity = 0;
  for (let y = 0; y < up.height; y++) {
    for (let x = 0; x < up.width; x++) {
      const a = y * up.width + x;
      const b = (up.height - 1 - y) * up.width + x;
      assert.equal(up.solid[a], down.solid[b]);
      assert.ok(Math.abs(up.u[a] - down.u[b]) < 1e-9);
      assert.ok(Math.abs(up.v[a] + down.v[b]) < 1e-9);
      largestVerticalVelocity = Math.max(largestVerticalVelocity, Math.abs(up.v[a]));
    }
  }
  assert.ok(largestVerticalVelocity > 0.005, 'Computed flow must turn around the tilted obstacle');
});

test('far-field inlet remains fixed and invalid geometry is rejected', () => {
  const flow = new AirfoilFlow(0);
  flow.step(200);
  for (let y = 0; y < flow.height; y++) {
    const cell = y * flow.width;
    assert.ok(Math.abs(flow.u[cell] - FLOW_SPEED) < 1e-12);
    assert.ok(Math.abs(flow.v[cell]) < 1e-12);
    assert.ok(Math.abs(flow.density[cell] - 1) < 1e-12);
  }
  for (const value of [NaN, Infinity, -16, 16]) assert.throws(() => new AirfoilFlow(value));
});
