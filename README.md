# MySite

Personal portfolio site for [Vian Garg](https://www.andrew.cmu.edu/user/viang/) — ECE + Robotics at Carnegie Mellon University.

Built with React, TypeScript, Vite, Wouter, and Tailwind CSS. Hosted on CMU AFS.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Routing | Wouter (hash routing for AFS static hosting) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Package manager | pnpm |

---

## Project Structure

```
src/
├── config/          # Site-wide data (projects, skills, contact, resume)
├── components/
│   ├── layout/      # Shell, ProjectLayout, PageTransitionOverlay
│   └── ui/          # Custom design-system components (PaperSheet, MetalDataPlate, etc.)
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── ProjectsIndex.tsx
│   ├── Resume.tsx
│   └── projects/    # One file per project page
├── hooks/
└── assets/
    └── projects/    # Project photos
```

---

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

> **Windows note:** `pnpm install` will work. Native binary dependencies (esbuild) are handled automatically.

---

## Build

```bash
pnpm build
```

Output goes to `dist/public/`. The build is a fully static SPA using hash routing (`/#/projects/...`) so all routes work on AFS without server rewrites.

To preview the build locally:

```bash
python3 -m http.server 5000 --directory dist/public
```

---

## Deployment (CMU AFS)

Pushing to `main` triggers the **Build AFS Portfolio** GitHub Action, which:

1. Builds the site into `dist/public/`
2. Publishes the built files to the `afs-deploy` branch

The AFS web directory (`~/www`) tracks `origin/afs-deploy` and pulls automatically via a cron job on CMU's Linux hosts.

Manual deploy after any push:

```bash
ssh YOUR_ANDREW_ID@linux.andrew.cmu.edu
cd ~/www && git pull
```

Live at: **[https://www.andrew.cmu.edu/user/viang/](https://www.andrew.cmu.edu/user/viang/)**

---

## Adding a Project

1. Add an entry to `src/config/projects.ts`
2. Create `src/pages/projects/YourProject.tsx` using `<ProjectLayout />`
3. Register the component in the `projectComponents` map in `src/App.tsx`
4. Add photos to `src/assets/projects/`

> See [issue #3](https://github.com/Vian-G/MySite/issues/3) — the `projectComponents` registry will eventually be auto-derived via `import.meta.glob`, removing step 3.

---

## Open Issues

See the [issue tracker](https://github.com/Vian-G/MySite/issues) for tracked improvements.
