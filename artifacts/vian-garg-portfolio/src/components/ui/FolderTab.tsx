import React from 'react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'wouter';

export const TABS = [
  { label: '01 / MOON MINERS', href: '/projects/moon-miners' },
  { label: '02 / UR10E', href: '/projects/ur10e-welding' },
  { label: '03 / VISION', href: '/projects/computer-vision' },
  { label: '04 / SKYRYDER', href: '/skyryder' }
];

export function FolderTab() {
  const [location] = useLocation();

  return (
    <div className="flex overflow-x-auto no-scrollbar w-full border-b border-border mb-8" role="tablist">
      <div className="flex items-end gap-1 px-4 sm:px-0">
        {TABS.map((tab) => {
          const isActive = location === tab.href;
          return (
            <Link 
              key={tab.href}
              href={tab.href} 
              className={cn(
                "px-3 sm:px-6 py-2.5 font-mono text-xs border border-b-0 rounded-t-[4px] transition-all duration-300 whitespace-nowrap min-w-[120px] text-center shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive 
                  ? "bg-primary text-primary-foreground border-primary/80 shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] z-10 -mb-[1px] pt-3 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-foreground" 
                  : "bg-secondary text-secondary-foreground border-border/60 hover:bg-[#C0BDA3] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] opacity-80 hover:opacity-100 hover:-translate-y-[1px] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              )}
              role="tab"
              aria-selected={isActive}
              data-testid={`tab-${tab.label.replace(/\s|\//g, '-').toLowerCase()}`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
