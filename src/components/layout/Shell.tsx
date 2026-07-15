import React from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EMAIL, LINKEDIN_URL, GITHUB_URL, LOCATION_STATUS } from '@/config/contact';
import { ResumeAction } from '@/components/ui/ResumeAction';

export function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Resume', path: '/resume' }
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col relative w-full overflow-x-clip selection:bg-primary/20 selection:text-foreground">
      {/* Top drafting rule / technical header */}
      <header className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 h-12 flex items-center justify-between font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-foreground font-medium flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-2 h-2 rounded-[1px] bg-primary shadow-[0_0_4px_rgba(184,66,45,0.5)]" />
              VG_SYS.01
            </Link>
            <span className="hidden sm:inline border-l border-border pl-4">ROBOTICS / ECE</span>
          </div>
          <nav className="flex items-center h-full">
            {navItems.map((item) => {
              const active = location === item.path || (item.path !== '/' && location.startsWith(item.path) && item.path !== '/about' && item.path !== '/resume');
              const isProjects = item.path === '/projects' && location.startsWith('/projects');
              const finalActive = active || isProjects;
              
              return (
                <Link key={item.path} href={item.path} className={cn(
                  "relative h-full flex items-center px-2 sm:px-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:bg-foreground/5 capitalize",
                  finalActive ? "text-primary font-medium" : ""
                )}>
                  {finalActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />
                  )}
                  {item.label}
                </Link>
              );
            })}
            <a href={`mailto:${EMAIL}`} className="ml-2 flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-3 py-1 rounded-[2px] capitalize">
              Contact
            </a>
          </nav>
        </div>
      </header>
      
      {/* Page content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-12 py-8 md:py-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border mt-auto">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-secondary-foreground font-sans">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-foreground">Vian Garg</span>
            <span className="text-muted-foreground text-xs">{LOCATION_STATUS}</span>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6 font-mono text-xs uppercase tracking-wider">
            <a href={`mailto:${EMAIL}`} className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary">Email</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary">LinkedIn <ArrowUpRight className="w-3 h-3" strokeWidth={2} aria-hidden="true" /></a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary">GitHub <ArrowUpRight className="w-3 h-3" strokeWidth={2} aria-hidden="true" /></a>
            <ResumeAction mode="view">
              {(onClick) => (
                <button type="button" onClick={onClick} className="inline-flex items-center gap-1 hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary">
                  Résumé <ArrowUpRight className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                </button>
              )}
            </ResumeAction>
          </div>
        </div>
      </footer>
    </div>
  );
}
