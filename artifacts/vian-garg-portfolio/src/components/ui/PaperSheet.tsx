import React from 'react';
import { cn } from '@/lib/utils';

interface PaperSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'clipped' | 'folded';
  isInteractive?: boolean;
  /** When combined with isInteractive, the sheet also scales up slightly on hover instead of just lifting. */
  growOnHover?: boolean;
}

export function PaperSheet({ children, className, variant = 'default', isInteractive = false, growOnHover = false, ...props }: PaperSheetProps) {
  return (
    <div
      className={cn(
        'relative bg-card text-card-foreground',
        'border border-border border-b-muted-foreground/40 border-r-muted-foreground/30',
        'shadow-sm',
        variant === 'clipped' && 'rounded-br-2xl',
        isInteractive && !growOnHover && 'hover:-translate-y-[2px] hover:shadow-md transition-all duration-300 cursor-pointer motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        // Combined into a single arbitrary transform (rather than separate translate/scale utilities) so both
        // effects reliably compose without one utility clobbering the other.
        isInteractive && growOnHover && 'transform-gpu hover:[transform:translateY(-2px)_scale(1.025)] hover:shadow-md transition-all duration-300 cursor-pointer motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
      {...props}
    >
      {/* Optional Noise Overlay for texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }} />
      
      {variant === 'folded' && (
        <div className="absolute top-0 right-0 w-8 h-8 border-b border-l border-border bg-card shadow-[-2px_2px_4px_-2px_rgba(0,0,0,0.1)] transition-transform origin-top-right transform-gpu" />
      )}
      
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
