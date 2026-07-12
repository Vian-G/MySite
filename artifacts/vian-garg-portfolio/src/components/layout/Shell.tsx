import React from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';

export function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { label: 'IDX_OVERVIEW', path: '/' },
    { label: 'LOG_PROJECTS', path: '/projects' },
    { label: 'PROFILE', path: '/about' },
    { label: 'DOCS', path: '/resume' }
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col relative w-full overflow-x-hidden selection:bg-primary/20 selection:text-foreground">
      {/* Top drafting rule / technical header */}
      <header className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-12 flex items-center justify-between font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
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
              // Special case for skyryder to fall under projects visually if we wanted, but the prompt says:
              // Update Shell.tsx's nav: keep "IDX_OVERVIEW" -> "/", change "LOG_PROJECTS" -> "/projects", add nav items for "/about" and "/resume".
              // Note: skyryder isn't in nav, but if we are on /skyryder maybe LOG_PROJECTS could be active. We will let it be simple.
              const isProjects = item.path === '/projects' && (location.startsWith('/projects') || location === '/skyryder');
              const finalActive = active || isProjects;
              
              return (
                <Link key={item.path} href={item.path} className={cn(
                  "relative h-full flex items-center px-2 sm:px-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:bg-foreground/5",
                  finalActive ? "text-primary font-medium" : ""
                )}>
                  {finalActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      
      {/* Page content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] sm:text-xs text-muted-foreground gap-4">
          <div>REV_01 // END_OF_FILE</div>
          <div className="flex gap-4">
            <span>SYS_LOC: GLOBAL</span>
            <span>DATA: {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
