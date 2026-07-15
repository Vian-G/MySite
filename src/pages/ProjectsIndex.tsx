import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { FolderTab } from '@/components/ui/FolderTab';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { SystemsRibbonSvg, type ProjectId } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import { useSidebarParallax } from '@/hooks/use-sidebar-parallax';
import { usePageTransition } from '@/components/layout/PageTransitionOverlay';
import { projects } from '@/config/projects';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';

const SIDEBAR_ANIMATIONS: { id: ProjectId; label: string }[] = [
  { id: '01', label: 'MOBILITY / TRACK SYSTEM' },
  { id: '02', label: 'TOOLPATH / ROBOT ARM' },
  { id: '03', label: 'SURFACE MOBILITY / SOLAR' },
  { id: '05', label: 'VEHICLE FAB / COMPOSITE' },
];

const SectionHead = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2 flex items-center gap-2">
    <div className="w-1.5 h-1.5 bg-primary rounded-[1px] shrink-0" />
    {children}
  </h2>
);

export default function ProjectsIndex() {
  useSEO('Engineering Work | Vian Garg', 'Projects spanning rover systems, industrial automation, perception workflows, and interactive development.');
  const { navigateWithFlash } = usePageTransition();
  const sidebarRef = useSidebarParallax<HTMLElement>();

  return (
    <div className="animate-in fade-in duration-700 pb-16 flex flex-col gap-8">

      <FolderTab />
      <div className="-mt-4">
        <MetalDataPlate>PROJECT ARCHIVE / {String(projects.length).padStart(2, '0')} ENTRIES</MetalDataPlate>
      </div>

      <PaperSheet className="p-8 md:p-12 w-full" variant="clipped">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 leading-tight">Engineering work</h1>
        <p className="font-sans text-lg text-muted-foreground">
          Projects spanning rover systems, industrial automation, perception workflows, and interactive development.
        </p>
      </PaperSheet>

      {/* 2-column grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start mt-4">

        {/* LEFT — project entries */}
        <div className="flex flex-col gap-16 min-w-0">
          {projects.map((prj, i) => (
            <div key={prj.id} id={`project-${prj.id}`} className="flex flex-col gap-6">
              <SectionHead>
                {prj.id} / {prj.title.split('—')[0].split('/')[0].trim().toUpperCase()}
              </SectionHead>

              <div className="flex flex-col gap-3 w-full bg-secondary/30 p-6 border border-border/50">
                {([
                  ['ROLE',  prj.type ?? prj.role],
                  ['TOOLS', prj.tools],
                ] as [string, string][]).filter(([, v]) => !!v).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 border-b border-border/40 pb-2 last:border-0 last:pb-0">
                    <span className="font-mono text-[10px] sm:text-xs text-muted-foreground w-20 shrink-0 uppercase tracking-wider">{key}</span>
                    <span className="font-mono text-[10px] sm:text-xs text-secondary-foreground">{value}</span>
                  </div>
                ))}
              </div>

              <p className="font-sans text-foreground leading-relaxed">{prj.summary}</p>

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

              <div className="flex flex-wrap gap-2">
                {prj.stack.map((tech) => (
                  <span key={tech} className="font-mono text-[10px] sm:text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-[2px] border border-border shadow-sm uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Photo — mobile only */}
              <div className="lg:hidden">
                <TechnicalFigure
                  src={prj.photo}
                  caption={prj.title}
                  altText={`Photo for ${prj.title}`}
                  figureNumber={prj.id}
                  label={`PHOTO / FIG. ${prj.id}`}
                />
              </div>

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

              {i < projects.length - 1 && <div className="border-t border-border/40 mt-4" />}
            </div>
          ))}
        </div>

        {/* RIGHT — 4 animations, proportional scroll */}
        <div className="hidden lg:block relative">
          <aside ref={sidebarRef} className="flex flex-col gap-5 will-change-transform">
            {SIDEBAR_ANIMATIONS.map(({ id, label }) => (
              <div key={id} className="flex flex-col gap-2">
                <div className="w-full aspect-square border border-border/50 bg-[#E8E6D9] p-6 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                  <SystemsRibbonSvg activeState={id} className="w-full h-full" />
                </div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider px-1 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-[1px] shrink-0" />
                  {label} / FIG. {id}
                </div>
              </div>
            ))}
          </aside>
        </div>

      </div>

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
