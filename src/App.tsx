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
import MoonMiners from '@/pages/projects/MoonMiners';
import Ur10eWelding from '@/pages/projects/Ur10eWelding';
import MoonRanger from '@/pages/projects/MoonRanger';
import Skyryder from '@/pages/projects/Skyryder';
import SpiritBuggy from '@/pages/projects/SpiritBuggy';
import FirstGlobalUae from '@/pages/projects/FirstGlobalUae';
import About from '@/pages/About';
import Resume from '@/pages/Resume';
import { projects } from '@/config/projects';

const queryClient = new QueryClient();

const projectComponents: Record<string, ComponentType> = {
  'moon-miners': MoonMiners,
  'ur10e-welding': Ur10eWelding,
  'moon-ranger': MoonRanger,
  skyryder: Skyryder,
  'spirit-buggy': SpiritBuggy,
  'first-global-uae': FirstGlobalUae,
};

function Router() {
  if (import.meta.env.DEV) {
    projects.forEach((p) => {
      if (!projectComponents[p.slug]) {
        console.warn(`[App] No component registered for project slug: "${p.slug}". Add it to projectComponents.`);
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
