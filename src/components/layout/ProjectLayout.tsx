import React from 'react';
import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { FolderTab } from '@/components/ui/FolderTab';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { getAdjacentProjects, projectNavLabel } from '@/config/projects';
import { useSidebarParallax } from '@/hooks/use-sidebar-parallax';

export interface ProjectPhoto {
  /** Imported asset URL or any image path. Accepts jpg, png, webp, gif, avif, svg. */
  src: string;
  /** Short mono caption shown below the figure. Defaults to empty string. */
  caption?: string;
  /** Alt text for the <img>. Defaults to caption or the project title. */
  altText?: string;
}

interface ProjectLayoutProps {
  slug: string;
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
  objective?: string;
  workedOn?: string[];
  approach: string[] | React.ReactNode;
  challenges?: string[] | React.ReactNode;
  primaryFigure: {
    svg: React.ReactNode;
    label: string;
    caption?: string;
  };
  reinforced: string;
  slots?: React.ReactNode;
  /**
   * Optional array of photos shown in a right-column figure stack.
   * The stack scrolls proportionally so its bottom aligns with the page
   * bottom at the same moment you reach the end of the page.
   * Accepts jpg, png, webp, gif, avif, svg.
   */
  photos?: ProjectPhoto[];
}

export function ProjectLayout({
  slug,
  plateText,
  title,
  subtitle,
  metadata,
  brief,
  objective,
  workedOn,
  approach,
  challenges,
  primaryFigure,
  reinforced,
  slots,
  photos,
}: ProjectLayoutProps) {
  const { prev, next } = getAdjacentProjects(slug);
  const hasPhotos = photos && photos.length > 0;
  const sidebarRef = useSidebarParallax<HTMLElement>();

  const SectionHead = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2 flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
      {children}
    </h2>
  );

  const photoFigures = hasPhotos ? photos!.map((photo, idx) => (
    <TechnicalFigure
      key={idx}
      src={photo.src}
      caption={photo.caption ?? ''}
      altText={photo.altText ?? photo.caption ?? title}
      figureNumber={String(idx + 2).padStart(2, '0')}
      label={`PHOTO / FIG. ${String(idx + 2).padStart(2, '0')}`}
    />
  )) : null;

  return (
    <div className="animate-in fade-in duration-700 pb-16 flex flex-col gap-8">

      {/* Full-width chrome above the grid */}
      <FolderTab />
      <div className="-mt-4">
        <MetalDataPlate>{plateText}</MetalDataPlate>
      </div>

      {/* Two-column grid starts at the title card */}
      <div className={hasPhotos
        ? 'w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start'
        : 'w-full max-w-4xl flex flex-col gap-8'
      }>

        {/* LEFT — body */}
        <div className="flex flex-col gap-8 min-w-0">
          <PaperSheet className="p-8 md:p-12 w-full" variant="clipped">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 leading-tight">{title}</h1>
            <p className="font-sans text-lg text-muted-foreground">{subtitle}</p>
          </PaperSheet>

          <TechnicalFigure
            caption={primaryFigure.caption || title}
            label={primaryFigure.label}
            altText={`Conceptual system schematic for ${title}`}
            figureNumber="01"
          >
            {primaryFigure.svg}
          </TechnicalFigure>

          <div className="flex flex-col gap-3 w-full bg-secondary/30 p-6 border border-border/50">
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

          <div className="flex flex-col gap-12">
            <section>
              <SectionHead>Overview</SectionHead>
              <p className="font-sans text-foreground leading-relaxed">{brief}</p>
            </section>

            {objective && (
              <section>
                <SectionHead>Objective</SectionHead>
                <p className="font-sans text-foreground leading-relaxed">{objective}</p>
              </section>
            )}

            {workedOn && workedOn.length > 0 && (
              <section>
                <SectionHead>What I built</SectionHead>
                <ul className="list-disc list-inside font-sans text-foreground leading-relaxed space-y-2">
                  {workedOn.map((item, idx) => (
                    <li key={idx} className="pl-1 marker:text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <SectionHead>Tools &amp; Stack</SectionHead>
              {Array.isArray(approach) ? (
                <div className="flex flex-wrap gap-2">
                  {approach.map((item, idx) => (
                    <span key={idx} className="font-mono text-[10px] sm:text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-[2px] border border-border shadow-sm uppercase tracking-wider">
                      {item}
                    </span>
                  ))}
                </div>
              ) : approach}
            </section>

            {challenges && (
              <section>
                <SectionHead>Key Challenges</SectionHead>
                {Array.isArray(challenges) ? (
                  <ul className="list-disc list-inside font-sans text-foreground leading-relaxed space-y-2">
                    {challenges.map((item, idx) => (
                      <li key={idx} className="pl-1 marker:text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="font-sans text-foreground leading-relaxed">{challenges}</div>
                )}
              </section>
            )}

            <section>
              <SectionHead>Process and evidence</SectionHead>
              <div className="flex flex-col gap-6">
                <p className="font-sans text-sm text-muted-foreground italic">Reference Figure 01 above for system schematic.</p>
                {slots}
              </div>
            </section>

            <section>
              <SectionHead>Results &amp; lessons learned</SectionHead>
              <p className="font-sans text-foreground leading-relaxed border-l-2 border-primary/60 pl-4 py-1">{reinforced}</p>
            </section>
          </div>

          {/* Mobile: photos flow below body */}
          {hasPhotos && (
            <div className="lg:hidden flex flex-col gap-5 mt-4">
              {photoFigures}
            </div>
          )}
        </div>

        {/* RIGHT — proportional-scroll photo column, desktop only.
            The wrapper fills the grid cell height; the aside sits inside
            it and is translated by useSidebarParallax. */}
        {hasPhotos && (
          <div className="hidden lg:block relative" style={{ minHeight: '100%' }}>
            <aside
              ref={sidebarRef}
              className="flex flex-col gap-5 will-change-transform"
            >
              {photoFigures}
            </aside>
          </div>
        )}

      </div>

      {/* Prev / Next nav */}
      <div className="w-full max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
        <Link href={prev.href} className="w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
          <PhysicalButton asDiv variant="graphite" className="w-full sm:w-auto flex gap-3 text-xs" data-testid="nav-prev">
            <span className="text-muted-foreground/70 inline-flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" /> Previous</span>
            <span>{projectNavLabel(prev)}</span>
          </PhysicalButton>
        </Link>
        <Link href={next.href} className="w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
          <PhysicalButton asDiv variant="graphite" className="w-full sm:w-auto flex gap-3 text-xs" data-testid="nav-next">
            <span>{projectNavLabel(next)}</span>
            <span className="text-muted-foreground/70 inline-flex items-center gap-1">Next <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" /></span>
          </PhysicalButton>
        </Link>
      </div>
    </div>
  );
}
