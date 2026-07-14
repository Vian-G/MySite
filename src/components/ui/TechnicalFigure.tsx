import React from 'react';
import { cn } from '@/lib/utils';

interface TechnicalFigureProps {
  caption: string;
  figureNumber?: string;
  altText: string;
  label?: string;
  src?: string;
  isSlot?: boolean; // dev-only
  children?: React.ReactNode;
}

export function TechnicalFigure({
  caption,
  figureNumber,
  altText,
  label,
  src,
  isSlot = false,
  children
}: TechnicalFigureProps) {
  if (isSlot) {
    return null;
  }

  return (
    <figure className={cn(
      "flex flex-col gap-2 border border-border bg-[#F5F2EA] p-4 relative shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)]"
    )}>
      {/* Drafting window corner accent */}
      <div className="absolute top-0 right-0 w-4 h-4 border-b border-l border-border bg-card shadow-[-1px_1px_2px_rgba(0,0,0,0.05)]" />
      
      {label && (
        <div className="absolute top-3 left-4 font-mono text-[10px] text-muted-foreground uppercase tracking-wider bg-[#F5F2EA] px-1 z-20">
          {label}
        </div>
      )}
      
      <div className="w-full flex items-center justify-center min-h-[250px] mt-4 border border-border/40 bg-[#E8E6D9] relative overflow-hidden shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)]">
        {/* Drafting grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
        
        {src ? (
          <img src={src} alt={altText} className="relative z-10 max-w-full h-auto object-contain max-h-[400px] p-4 drop-shadow-sm mix-blend-multiply" />
        ) : (
          <div className="relative z-10 w-full max-w-lg p-8 drop-shadow-sm">
            {children}
          </div>
        )}
      </div>
      
      <figcaption className="font-mono text-[10px] sm:text-xs text-muted-foreground flex justify-between items-start pt-2 px-1">
        <span className="max-w-[80%]">{caption}</span>
        {figureNumber && <span className="font-medium whitespace-nowrap">FIG. {figureNumber}</span>}
      </figcaption>
    </figure>
  );
}
