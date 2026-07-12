import React from 'react';
import { cn } from '@/lib/utils';

interface MetalDataPlateProps extends React.HTMLAttributes<HTMLDivElement> {
  screwPositions?: 'none' | 'corners' | 'sides';
  title?: React.ReactNode;
}

export function MetalDataPlate({ 
  children, 
  className, 
  screwPositions = 'corners',
  title,
  ...props 
}: MetalDataPlateProps) {
  const renderScrew = (pos: string) => (
    <div 
      className={cn(
        "absolute w-1.5 h-1.5 rounded-full bg-[#B3B0A5] border-[0.5px] border-foreground/30",
        "flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.1)]",
        pos
      )}
    >
      <div className="w-full h-[0.5px] bg-foreground/20 rotate-45" />
    </div>
  );

  return (
    <div
      className={cn(
        'relative bg-secondary text-secondary-foreground font-mono text-xs',
        'border border-foreground/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]',
        'px-3 py-1.5 flex flex-col gap-1',
        className
      )}
      {...props}
    >
      {/* Screws */}
      {screwPositions === 'corners' && (
        <>
          {renderScrew('top-1 left-1')}
          {renderScrew('top-1 right-1')}
          {renderScrew('bottom-1 left-1')}
          {renderScrew('bottom-1 right-1')}
        </>
      )}
      {screwPositions === 'sides' && (
        <>
          {renderScrew('top-1/2 -translate-y-1/2 left-1.5')}
          {renderScrew('top-1/2 -translate-y-1/2 right-1.5')}
        </>
      )}

      {title && (
        <div className="text-[10px] uppercase tracking-wider text-secondary-foreground/60 leading-none pb-0.5">
          {title}
        </div>
      )}
      
      {/* Engraved text effect styling applied to children via css if text */}
      <div className="relative z-10 flex items-center justify-center font-medium opacity-90 mix-blend-multiply drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">
        {children}
      </div>
    </div>
  );
}
