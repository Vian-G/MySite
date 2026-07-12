import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { FolderTab } from '@/components/ui/FolderTab';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { TornPhotoWindow } from '@/components/ui/TornPhotoWindow';
import { Link } from 'wouter';
import { useSEO } from '@/hooks/use-seo';
import { useActiveSection } from '@/hooks/use-active-section';
import { usePageTransition } from '@/components/layout/PageTransitionOverlay';
import moonMinersPhoto from '@/assets/projects/moon-miners.jpg';
import ur10ePhoto from '@/assets/projects/ur10e.jpg';
import moonRangerPhoto from '@/assets/projects/moon-ranger.jpg';
import skyryderPhoto from '@/assets/projects/skyryder.jpg';

export default function ProjectsIndex() {
  useSEO('Engineering Work | Vian Garg', 'Projects spanning rover systems, industrial automation, perception workflows, and interactive development.');

  const projects = [
    {
      id: "01",
      title: "CMU Moon Miners — NASA Lunabotics",
      role: "Mechanical / Robotics Engineer",
      summary: "Developing a high-payload autonomous lunar excavation rover. Designed and fabricated a metal track system achieving a drawbar-pull ratio of 1.55 on BP-1 lunar regolith simulant.",
      tools: "SolidWorks, CAD, Mechanical Design, Simulation, Robotics, Autonomous Systems",
      href: "/projects/moon-miners",
      photo: moonMinersPhoto,
    },
    {
      id: "02",
      title: "UR10e Cobot Welding",
      role: "Robotics Researcher",
      summary: "Developing a virtual cobot welding system that bridges human motion input to UR10e execution via URScript. Engineered remote validation infrastructure for script testing.",
      tools: "UR10e, URScript, Python, Industrial Robotics, SSH, Automation",
      href: "/projects/ur10e-welding",
      photo: ur10ePhoto,
    },
    {
      id: "03",
      title: "MoonRanger — NASA Lunar Rover Mission",
      role: "Mechanical Engineer",
      summary: "A CMU / Astrobotic / NASA Ames autonomous lunar rover launching in 2029 to search for water ice at the Moon's south pole. Redesigned the camera shroud housing its stereo-vision navigation system.",
      tools: "SolidWorks, CAD, Mechanical Design, Stereo Vision Hardware Integration",
      href: "/projects/moon-ranger",
      photo: moonRangerPhoto,
    },
    {
      id: "04",
      title: "Skyryder",
      type: "Interactive Work / Playable Project",
      summary: "Skyryder is an original playable game project, published independently on itch.io.",
      href: "/skyryder",
      photo: skyryderPhoto,
    }
  ];

  const projectIds = projects.map(p => `project-${p.id}`);
  const activeProjectId = useActiveSection(projectIds, 0.4);
  const { navigateWithFlash } = usePageTransition();

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-16">
      <FolderTab />
      
      <div className="flex flex-col gap-6 items-start -mt-4">
        <MetalDataPlate>PROJECT ARCHIVE / 04 ENTRIES</MetalDataPlate>
        <div className="flex flex-col gap-4 max-w-2xl">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">Engineering work</h1>
          <p className="font-sans text-lg text-muted-foreground">
            Projects spanning rover systems, industrial automation, perception workflows, and interactive development.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4 relative">
        <div className="lg:col-span-8 flex flex-col gap-12">
          {projects.map((prj, i) => (
            <div id={`project-${prj.id}`} key={prj.id} className="scroll-mt-32">
              <Link
                href={prj.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithFlash(prj.href);
                }}
                className="outline-none block group focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]"
              >
                <PaperSheet isInteractive growOnHover className="p-6 md:p-8 flex flex-col gap-6 group-hover:border-primary/40 transition-colors h-full" variant={i % 2 === 0 ? "clipped" : "default"}>
                  <div className="flex justify-between items-start">
                    <MetalDataPlate title="ENTRY">{prj.id}</MetalDataPlate>
                    {prj.type && (
                      <div className="font-mono text-[10px] text-muted-foreground bg-secondary/50 px-2 py-1 border border-border/50 uppercase tracking-wider">
                        {prj.type}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                    <div className="flex-1">
                      <h2 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors mb-2">{prj.title}</h2>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                        {prj.summary}
                      </p>
                    </div>
                    <TornPhotoWindow
                      src={prj.photo}
                      alt={`Photo reference for ${prj.title}`}
                      variant={(i % 3) as 0 | 1 | 2}
                      rotate={i % 2 === 0 ? -4 : 3}
                      className="hidden sm:block shrink-0 w-28 h-28 md:w-32 md:h-32"
                    />
                  </div>

                  <div className="w-full h-48 border border-border/50 bg-[#E8E6D9] overflow-hidden flex items-center justify-center p-4 lg:hidden shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)]">
                    <SystemsRibbonSvg activeState={prj.id as any} />
                  </div>

                  {(prj.role || prj.tools) && (
                    <div className="flex flex-col gap-2 mt-auto border-t border-border/50 pt-4">
                      {prj.role && (
                        <div className="font-mono text-[10px] flex gap-2">
                          <span className="text-muted-foreground w-12 shrink-0">ROLE:</span>
                          <span className="text-secondary-foreground">{prj.role}</span>
                        </div>
                      )}
                      {prj.tools && (
                        <div className="font-mono text-[10px] flex gap-2">
                          <span className="text-muted-foreground w-12 shrink-0">TOOLS:</span>
                          <span className="text-secondary-foreground truncate" title={prj.tools}>{prj.tools}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    <PhysicalButton asDiv variant="graphite" size="sm" className="w-full">
                      View case study {'->'}
                    </PhysicalButton>
                  </div>
                </PaperSheet>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="hidden lg:block lg:col-span-4 relative">
          <div className="sticky top-24 w-full aspect-square border border-border/50 bg-[#E8E6D9] p-6 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)]">
             <SystemsRibbonSvg activeState={(activeProjectId || '01') as any} />
          </div>
        </div>
      </div>
    </div>
  );
}