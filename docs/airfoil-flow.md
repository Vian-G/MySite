# Live airfoil flow demonstration

The HALCON case study contains a browser-local 192 × 112-cell D2Q9 BGK lattice Boltzmann solver. It advances nine distribution populations per cell using collision and streaming, with link bounce-back at a rasterized, closed-trailing-edge symmetric 12%-thickness airfoil. The chord is 64 cells, inlet speed 0.045 lattice units, and relaxation time 0.68. Kinematic viscosity is `(tau − 0.5) / 3 = 0.06`, giving chord Reynolds number 48. These are demonstration parameters, not a reconstruction of internship work.

The inlet and top/bottom far field are equilibrium reservoirs at unit density and uniform horizontal velocity. The right boundary uses zero-gradient distribution extrapolation. Geometry is stationary during each solve; changing pitch (−15° to +15°) creates a new grid and resets the fluid. This is not a moving-boundary simulation. Coarse resolution, finite boundaries, low Reynolds number, and weak compressibility limit physical fidelity. No turbulence model, validated forces, or engineering design claims are provided.

The speed color field comes from the distribution moments. Dashed instantaneous streamlines are integrated through the current numerical velocity field; their moving dash pattern is a visual aid, not particle advection. The archive retains its lightweight decorative SVG; the case-study canvas is the live solver.

Rendering is capped at roughly 30 frames/s; each frame runs at most 12 time steps and yields after an approximately 8 ms compute budget. The simulation pauses outside the viewport, while the page is hidden, or when paused by the user. Reduced-motion preference disables automatic running; explicit Run remains available. Unmount cancels the animation frame and disconnects observation. Numerical instability stops the solve with a reset prompt rather than silently clamping the solution.

Numerical tests cover 5,000 steps each at −15°, 0°, and +15°, finite fields and bounded density, stationary solid cells, nonuniform flow around the obstacle, mirror symmetry at opposite angles, inlet preservation, and invalid pitch rejection. Browser coverage checks live stepping, changed geometry, reset, pause, reduced-motion default, and explicit opt-in.

Method reference: [Benchpress D2Q9 example](https://benchpress.readthedocs.io/autodoc_benchmarks/lattice_boltzmann_D2Q9.html). The implementation is original TypeScript; no benchmark source was copied. Run numerical checks with `node --experimental-strip-types --test tests/unit/airfoil-flow.test.ts` on Node 24.
