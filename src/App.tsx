import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import { Shell } from '@/components/layout/Shell';
import { PageTransitionProvider } from '@/components/layout/PageTransitionOverlay';
import type { ComponentType } from 'react';

import Home from '@/pages/Home';
import ProjectsIndex from '@/pages/ProjectsIndex';
import About from '@/pages/About';
import Resume from '@/pages/Resume';
import { projects } from '@/config/projects';

const queryClient = new QueryClient();

// Auto-discover all project page components — adding a new file under
// src/pages/projects/ automatically registers its route. No manual updates needed.
const projectModules = import.meta.glob('./pages/projects/*.tsx', { eager: true });

const projectComponents: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(projectModules).map(([path, mod]) => {
    // Derive slug from filename: MoonMiners.tsx -> moon-miners
    const filename = path.split('/').pop()!.replace('.tsx', '');
    const slug = filename
      .replace(/([A-Z])/g, (m, letter, offset) => (offset > 0 ? '-' : '') + letter.toLowerCase())
      .replace(/^-/, '');
    return [slug, (mod as { default: ComponentType }).default];
  }),
);

function Router() {
  if (import.meta.env.DEV) {
    projects.forEach((p) => {
      if (!projectComponents[p.slug]) {
        console.warn(`[App] No component registered for project slug: "${p.slug}". Add a matching file to src/pages/projects/.`);
      }
    });
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={ProjectsIndex} />
      {projects.map((project) => (
        <Route
          key={project.slug}
          path={project.href}
          component={projectComponents[project.slug]}
        />
      ))}
      <Route path="/about" component={About} />
      <Route path="/resume" component={Resume} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter hook={useHashLocation}>
          <PageTransitionProvider>
            <Shell>
              <Router />
            </Shell>
          </PageTransitionProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
