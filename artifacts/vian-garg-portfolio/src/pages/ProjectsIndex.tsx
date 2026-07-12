import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { FolderTab } from '@/components/ui/FolderTab';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { Link } from 'wouter';
import { useSEO } from '@/hooks/use-seo';
import { useActiveSection } from '@/hooks/use-active-section';

export default function ProjectsIndex() {
  useSEO('Engineering Work | Vian Garg', 'Projects spanning rover systems, industrial automation, perception workflows, and interactive development.');

  const projects = [
    {
      id: "01",
      title: "CMU Moon Miners — NASA Lunabotics",
      role: "Mechanical / Robotics Engineer",
      summary: "Mechanical and robotics contributions to a lunar excavation rover.",
      tools: "SolidWorks, CAD, Mechanical Design, Simulation, Robotics, Autonomous Systems",
      href: "/projects/moon-miners",
    },
    {
      id: "02",
      title: "UR10e Welding Automation",
      role: "Robotics Integration Engineer",
      summary: "Integrating collaborative robotics with industrial welding equipment.",
      tools: "UR10e, ESAB, URScript, Python, EtherNet/IP, Fieldbus, Industrial Robotics, Automation",
      href: "/projects/ur10e-welding",
    },
    {
      id: "03",
      title: "Computer Vision Robotics Work",
      summary: "Software workflows for sensing, vision, and robotic automation.",
      tools: "Python, Computer Vision, Sensors, Embedded Systems, Robotic Automation",
      href: "/projects/computer-vision",
    },
    {
      id: "04",
      title: "Skyryder",
      type: "Interactive Work / Playable Project",
      summary: "Skyryder is an original playable game project, published independently on itch.io.",
      href: "/skyryder",
    }
  ];

  const projectIds = projects.map(p => `project-${p.id}`);
  const activeProjectId = useActiveSection(projectIds, 0.4);

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
              <Link href={prj.href} className="outline-none block group focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
                <PaperSheet isInteractive className="p-6 md:p-8 flex flex-col gap-6 group-hover:border-primary/40 transition-colors h-full" variant={i % 2 === 0 ? "clipped" : "default"}>
                  <div className="flex justify-between items-start">
                    <MetalDataPlate title="ENTRY">{prj.id}</MetalDataPlate>
                    {prj.type && (
                      <div className="font-mono text-[10px] text-muted-foreground bg-secondary/50 px-2 py-1 border border-border/50 uppercase tracking-wider">
                        {prj.type}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors mb-2">{prj.title}</h2>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {prj.summary}
                    </p>
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
                      OPEN DOSSIER {'->'}
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
