# MySite

Personal portfolio for [Vian Garg](https://www.andrew.cmu.edu/user/viang/), an ECE student pursuing a Robotics minor at Carnegie Mellon University.

Built with React 19, TypeScript, Vite, Wouter, Tailwind CSS, and Framer Motion. The static site is hosted on CMU AFS at `/user/viang/`.

## Local development

Requirements: Node.js 24.16.0 and pnpm 11.12.0. The package manager version is pinned in `package.json`.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Useful checks:

```bash
pnpm typecheck
pnpm build
pnpm verify:build-budgets
pnpm test:smoke
pnpm optimize:images
```

The production bundle is written to `dist/public/`. Preview it with `pnpm serve` and open `http://localhost:4173/user/viang/`.

## Project structure

```text
src/
├── assets/              Original image sources
├── components/          Layout and active design-system components
├── config/              Projects, skills, contact, and resume data
├── hooks/               Shared browser and interaction hooks
├── pages/               Top-level pages
└── pages/projects/      Lazy-loaded project case studies
```

## Adding a project

1. Add the card metadata and thumbnail import to `src/config/projects.ts`.
2. Create `src/pages/projects/YourProject.tsx` using `ProjectLayout`.
3. Use a filename whose PascalCase form maps to the configured kebab-case slug.
4. Add source photos under `src/assets/projects/` and import them with the Image Tools WebP query used by existing projects.

Project routes are discovered automatically with `import.meta.glob` and loaded on demand. No central component registry edit is required.

## Images

Original JPEGs remain tracked as source material. Vite Image Tools emits WebP derivatives during development and production builds; card images provide 640, 960, and 1280-pixel `srcset` variants, while gallery images are emitted from their lazy project chunks. Run `pnpm optimize:images` after changing `portrait.svg` to apply the repository's deterministic SVGO configuration.

Do not commit `dist/`. Verify optimized output with `pnpm verify:images`.

## Deployment

Pushes to `main` that affect application or build files trigger **Build AFS Portfolio**. The workflow installs exact tools, uses `--frozen-lockfile`, type-checks, builds, verifies the `/user/viang/` asset base, uploads an artifact, and force-publishes `dist/public/` to the orphan `afs-deploy` branch.

The CMU AFS checkout pulls `afs-deploy`. Hash routing keeps application routes compatible with static hosting.

If deployment fails, inspect the GitHub Actions run first. A stale lockfile fails at installation by design; run `pnpm install`, commit `pnpm-lock.yaml`, and rerun the checks locally.

The deployment workflow also enforces raw bundle budgets and runs Playwright smoke tests against the production preview. The smoke suite covers every public route, project navigation, the not-found fallback, and the resume verification dialog.
