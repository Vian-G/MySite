import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { FolderTab } from '@/components/ui/FolderTab';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import { usePageTransition } from '@/components/layout/PageTransitionOverlay';
import { projects } from '@/config/projects';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';

const SectionHead = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2 flex items-center gap-2">
    <div className="w-1.5 h-1.5 bg-primary rounded-[1px] shrink-0" />
    {children}
  </h2>
);

export default function ProjectsIndex() {
  useSEO('Engineering Work | Vian Garg', 'Projects spanning rover systems, industrial automation, perception workflows, and interactive development.');
  const { navigateWithFlash } = usePageTransition();

  return (
    <div className="animate-in fade-in duration-700 pb-16 flex flex-col gap-8">

      <FolderTab />
      <div className="-mt-4">
        <MetalDataPlate>PROJECT ARCHIVE / {String(projects.length).padStart(2, '0')} ENTRIES</MetalDataPlate>
      </div>

      {/* Title block — same as ProjectLayout */}
      <PaperSheet className="p-8 md:p-12 w-full max-w-3xl" variant="clipped">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 leading-tight">Engineering work</h1>
        <p className="font-sans text-lg text-muted-foreground">
          Projects spanning rover systems, industrial automation, perception workflows, and interactive development.
        </p>
      </PaperSheet>

      {/* Systems overview figure */}
      <TechnicalFigure
        caption="Systems overview — all active projects"
        label="SYSTEM SCHEMATIC / ALL PROJECTS"
        altText="Systems ribbon diagram showing all active projects"
        figureNumber="00"
      >
        <SystemsRibbonSvg activeState={null} />
      </TechnicalFigure>

      {/* Project entries */}
      <div className="flex flex-col gap-16 mt-4">
        {projects.map((prj, i) => (
          <div key={prj.id} id={`project-${prj.id}`} className="flex flex-col gap-6">

            {/* Section head */}
            <SectionHead>
              {prj.id} / {prj.title.split('—')[0].split('/')[0].trim().toUpperCase()}
            </SectionHead>

            {/* Two-column: body left, photo right (mirrors ProjectLayout) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

              {/* Left — metadata + details */}
              <div className="flex flex-col gap-6">
                {/* Metadata table */}
                <div className="flex flex-col gap-3 w-full bg-secondary/30 p-6 border border-border/50">
                  {([
                    ['ROLE', prj.type ?? prj.role],
                    ['STACK', prj.stack.join(', ')],
                    ['TOOLS', prj.tools],
                  ] as [string, string][]).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 border-b border-border/40 pb-2 last:border-0 last:pb-0">
                      <span className="font-mono text-[10px] sm:text-xs text-muted-foreground w-20 shrink-0 uppercase tracking-wider">{key}</span>
                      <span className="font-mono text-[10px] sm:text-xs text-secondary-foreground">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <p className="font-sans text-foreground leading-relaxed">{prj.summary}</p>

                {/* Key facts */}
                {prj.facts && prj.facts.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary/60 rounded-[1px]" />
                      Key outcomes
                    </span>
                    <ul className="list-disc list-inside font-sans text-sm text-foreground leading-relaxed space-y-1.5">
                      {prj.facts.map((fact, fi) => (
                        <li key={fi} className="pl-1 marker:text-muted-foreground">{fact}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stack tags */}
                <div className="flex flex-wrap gap-2">
                  {prj.stack.map((tech) => (
                    <span key={tech} className="font-mono text-[10px] sm:text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-[2px] border border-border shadow-sm uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => navigateWithFlash(prj.href)}
                    className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]"
                  >
                    <PhysicalButton asDiv variant="rust" size="md" className="gap-2">
                      View project <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                    </PhysicalButton>
                  </button>
                </div>
              </div>

              {/* Right — photo figure */}
              <TechnicalFigure
                src={prj.photo}
                caption={prj.title}
                altText={`Photo for ${prj.title}`}
                figureNumber={prj.id}
                label={`PHOTO / FIG. ${prj.id}`}
              />
            </div>

            {/* Divider between entries */}
            {i < projects.length - 1 && (
              <div className="border-t border-border/40 mt-4" />
            )}
          </div>
        ))}
      </div>

      {/* Footer nav — same style as ProjectLayout prev/next */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border mt-8">
        <Link href="/" className="w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
          <PhysicalButton asDiv variant="graphite" className="w-full sm:w-auto flex gap-3 text-xs">
            ← Home
          </PhysicalButton>
        </Link>
        <Link href="/about" className="w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
          <PhysicalButton asDiv variant="graphite" className="w-full sm:w-auto flex gap-3 text-xs">
            About me →
          </PhysicalButton>
        </Link>
      </div>

    </div>
  );
}
