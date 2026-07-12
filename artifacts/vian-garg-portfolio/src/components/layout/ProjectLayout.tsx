import React from 'react';
import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { FolderTab } from '@/components/ui/FolderTab';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { Link } from 'wouter';

interface ProjectLayoutProps {
  plateText: string;
  title: string;
  subtitle: string;
  metadata: {
    ROLE?: string;
    CONTEXT?: string;
    TOOLS?: string;
    TIMEFRAME?: string;
    STATUS?: string;
  };
  brief: string;
  workedOn?: string[];
  approach: string[] | React.ReactNode;
  primaryFigure: {
    svg: React.ReactNode;
    label: string;
    caption?: string;
  };
  reinforced: string;
  prevLink: { href: string; label: string };
  nextLink: { href: string; label: string };
  slots?: React.ReactNode;
}

export function ProjectLayout({
  plateText,
  title,
  subtitle,
  metadata,
  brief,
  workedOn,
  approach,
  primaryFigure,
  reinforced,
  prevLink,
  nextLink,
  slots
}: ProjectLayoutProps) {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-16">
      <FolderTab />
      
      <div className="flex flex-col gap-6 items-start -mt-4">
        <MetalDataPlate>{plateText}</MetalDataPlate>
        
        <PaperSheet className="p-8 md:p-12 w-full max-w-4xl" variant="clipped">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 leading-tight">{title}</h1>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
        </PaperSheet>
      </div>

      <div className="w-full max-w-4xl">
        <TechnicalFigure 
          caption={primaryFigure.caption || title}
          label={primaryFigure.label}
          altText={`Schematic for ${title}`}
          figureNumber="01"
        >
          {primaryFigure.svg}
        </TechnicalFigure>
      </div>

      <div className="flex flex-col gap-3 max-w-4xl w-full bg-secondary/30 p-6 border border-border/50">
        {Object.entries(metadata).map(([key, value]) => {
          if (!value) return null;
          return (
            <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 border-b border-border/40 pb-2 last:border-0 last:pb-0">
              <span className="font-mono text-[10px] sm:text-xs text-muted-foreground w-24 shrink-0 uppercase tracking-wider">{key}</span>
              <span className="font-mono text-[10px] sm:text-xs text-secondary-foreground">{value}</span>
            </div>
          );
        })}
      </div>

      <div className="max-w-3xl flex flex-col gap-12 mt-6">
        <section>
          <h2 className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
            The brief
          </h2>
          <p className="font-sans text-foreground leading-relaxed">{brief}</p>
        </section>

        {workedOn && workedOn.length > 0 && (
          <section>
            <h2 className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
              What I worked on
            </h2>
            <ul className="list-disc list-inside font-sans text-foreground leading-relaxed space-y-2">
              {workedOn.map((item, idx) => (
                <li key={idx} className="pl-1 marker:text-muted-foreground">{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
            Approach
          </h2>
          {Array.isArray(approach) ? (
            <div className="flex flex-wrap gap-2">
              {approach.map((item, idx) => (
                <span key={idx} className="font-mono text-[10px] sm:text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-[2px] border border-border shadow-sm uppercase tracking-wider">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            approach
          )}
        </section>

        <section>
          <h2 className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
            Process and evidence
          </h2>
          <div className="flex flex-col gap-6">
            <p className="font-sans text-sm text-muted-foreground italic">Reference Figure 01 above for system schematic.</p>
            {slots}
          </div>
        </section>

        <section>
          <h2 className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
            What it reinforced
          </h2>
          <p className="font-sans text-foreground leading-relaxed border-l-2 border-primary/60 pl-4 py-1">{reinforced}</p>
        </section>
      </div>

      <div className="max-w-4xl w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-border">
        <Link href={prevLink.href} className="w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
          <PhysicalButton asDiv variant="graphite" className="w-full sm:w-auto flex gap-3 text-xs" data-testid="nav-prev">
            <span className="text-muted-foreground/70">{'<-'} PREV</span>
            <span>{prevLink.label}</span>
          </PhysicalButton>
        </Link>
        <Link href={nextLink.href} className="w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
          <PhysicalButton asDiv variant="graphite" className="w-full sm:w-auto flex gap-3 text-xs" data-testid="nav-next">
            <span>{nextLink.label}</span>
            <span className="text-muted-foreground/70">NEXT {'->'}</span>
          </PhysicalButton>
        </Link>
      </div>
    </div>
  );
}
