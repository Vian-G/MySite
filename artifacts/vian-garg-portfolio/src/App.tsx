import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Shell } from '@/components/layout/Shell';
import { PageTransitionProvider } from '@/components/layout/PageTransitionOverlay';

import Home from '@/pages/Home';
import ProjectsIndex from '@/pages/ProjectsIndex';
import MoonMiners from '@/pages/projects/MoonMiners';
import Ur10eWelding from '@/pages/projects/Ur10eWelding';
import MoonRanger from '@/pages/projects/MoonRanger';
import Skyryder from '@/pages/Skyryder';
import SpiritBuggy from '@/pages/projects/SpiritBuggy';
import FirstGlobalUae from '@/pages/projects/FirstGlobalUae';
import About from '@/pages/About';
import Resume from '@/pages/Resume';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={ProjectsIndex} />
      <Route path="/projects/moon-miners" component={MoonMiners} />
      <Route path="/projects/ur10e-welding" component={Ur10eWelding} />
      <Route path="/projects/moon-ranger" component={MoonRanger} />
      <Route path="/skyryder" component={Skyryder} />
      <Route path="/projects/spirit-buggy" component={SpiritBuggy} />
      <Route path="/projects/first-global-uae" component={FirstGlobalUae} />
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
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
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
