import { useEffect, useMemo, useRef, useState } from 'react';
import { AirfoilFlow, FLOW_CHORD, FLOW_HEIGHT, FLOW_REYNOLDS, FLOW_SPEED, FLOW_WIDTH } from '@/lib/airfoil-flow';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';

function paint(canvas: HTMLCanvasElement, flow: AirfoilFlow, phase: number) {
  const context = canvas.getContext('2d');
  if (!context) return;
  const pixels = context.createImageData(flow.width, flow.height);
  for (let cell = 0; cell < flow.solid.length; cell++) {
    const speed = Math.hypot(flow.u[cell], flow.v[cell]) / FLOW_SPEED;
    const tint = Math.max(0, Math.min(1, (speed - 0.85) / 0.8));
    const rgb = flow.solid[cell] ? [43, 45, 42] : [241 - 57 * tint, 237 - 171 * tint, 228 - 183 * tint];
    for (let channel = 0; channel < 3; channel++) pixels.data[cell * 4 + channel] = rgb[channel];
    pixels.data[cell * 4 + 3] = 255;
  }
  context.putImageData(pixels, 0, 0);
  // Integrate streamlines through the current numerical velocity field.
  context.strokeStyle = '#2b2d2a'; context.lineWidth = 0.45;
  context.setLineDash([2.5, 2.5]); context.lineDashOffset = -phase;
  for (let seed = 8; seed < flow.height - 4; seed += 8) {
    let x = 2, y = seed;
    context.beginPath(); context.moveTo(x, y);
    for (let segment = 0; segment < 220; segment++) {
      const ix = Math.round(x), iy = Math.round(y);
      if (ix < 1 || ix >= flow.width - 1 || iy < 1 || iy >= flow.height - 1) break;
      const cell = iy * flow.width + ix;
      if (flow.solid[cell]) break;
      const speed = Math.hypot(flow.u[cell], flow.v[cell]);
      if (speed < 0.002) break;
      x += 1.1 * flow.u[cell] / speed; y += 1.1 * flow.v[cell] / speed;
      context.lineTo(x, y);
    }
    context.stroke();
  }
  context.setLineDash([]);
  canvas.dataset.steps = String(flow.steps);
}

export default function AirfoilFlowDemo() {
  const [pitch, setPitch] = useState(8);
  const [resetKey, setResetKey] = useState(0);
  const [runOverride, setRunOverride] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const [steps, setSteps] = useState(0);
  const [error, setError] = useState('');
  const canvas = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const running = runOverride ?? !reducedMotion;
  const flow = useMemo(() => new AirfoilFlow(pitch), [pitch, resetKey]);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setError(''); setSteps(0);
    if (canvas.current) paint(canvas.current, flow, 0);
  }, [flow]);

  useEffect(() => {
    const element = canvas.current;
    if (!element || !running || !visible) return;
    let frame = 0, lastStats = 0, lastPaint = 0;
    const tick = (now: number) => {
      if (!document.hidden && now - lastPaint >= 32) {
        try {
          const start = performance.now();
          let iterations = 0;
          do { flow.step(2); iterations += 2; } while (iterations < 12 && performance.now() - start < 8);
          paint(element, flow, now / 120);
          lastPaint = now;
          if (now - lastStats > 250) { setSteps(flow.steps); lastStats = now; }
        } catch (failure) {
          setError(failure instanceof Error ? failure.message : 'Unable to advance the flow.');
          setRunOverride(false);
          return;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [flow, running, visible]);

  const button = 'border border-border bg-card px-3 py-2 text-xs font-mono hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';
  return (
    <div className="flex w-full min-w-0 flex-col gap-4" data-testid="airfoil-flow">
      <canvas ref={canvas} width={FLOW_WIDTH} height={FLOW_HEIGHT} role="img" aria-label="Live two-dimensional fluid simulation around a symmetric airfoil; color shows local flow speed and dashed lines follow the computed velocity field." className="aspect-[12/7] w-full border border-border/50" />
      <div className="flex justify-between gap-3 font-mono text-[10px] text-muted-foreground"><span>Low speed / parchment</span><span>High speed / rust</span></div>
      <label className="flex flex-col gap-2 text-sm" htmlFor="airfoil-pitch">
        <span className="flex justify-between gap-2">Airfoil angle <output>{pitch}°</output></span>
        <input id="airfoil-pitch" type="range" min="-15" max="15" step="1" value={pitch} onChange={(event) => setPitch(Number(event.target.value))} className="w-full accent-primary" />
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={button} onClick={() => setRunOverride(!running)}>{running ? 'Pause flow' : 'Run flow'}</button>
        <button type="button" className={button} onClick={() => setResetKey((value) => value + 1)}>Reset flow</button>
      </div>
      <p className="font-mono text-[10px] leading-relaxed text-muted-foreground">{FLOW_WIDTH} × {FLOW_HEIGHT} cells · Re ≈ {Math.round(FLOW_REYNOLDS)} · <output data-testid="flow-steps">{steps}</output> steps{!running ? ' · paused' : !visible ? ' · outside view' : ''}</p>
      {error && <p role="alert" className="text-sm text-primary">{error}</p>}
      <details className="text-xs leading-relaxed text-muted-foreground">
        <summary className="cursor-pointer text-foreground">Model &amp; limits</summary>
        <p className="mt-2">D2Q9 lattice Boltzmann solver with viscous collision, streaming, and no-slip bounce-back at a symmetric 12%-thick airfoil. Uniform inlet and far-field boundaries; zero-gradient outlet. Chord: {FLOW_CHORD} cells. Changing angle resets the flow so each body stays fixed during its solve.</p>
        <p className="mt-2">This is a coarse, low-Reynolds-number 2D demonstration in lattice units. It does not model turbulence or provide validated lift, drag, or real-world design predictions. The dashed lines are instantaneous streamlines, not particle trajectories. It is a portfolio demo, not HALCON simulation data.</p>
      </details>
    </div>
  );
}
