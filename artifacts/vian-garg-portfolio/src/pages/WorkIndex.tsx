import { PaperSheet } from '@/components/ui/PaperSheet';
import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { Link } from 'wouter';

export default function WorkIndex() {
  const projects = [
    { id: 'PRJ_01', title: 'Autonomous Rover V2', type: 'Robotics', status: 'DOCUMENTING', slug: 'autonomous-rover-v2' },
    { id: 'PRJ_02', title: '6-DOF Manipulator', type: 'Mech/Elec', status: 'ARCHIVED', slug: '6-dof-manipulator' },
    { id: 'PRJ_03', title: 'Vision Pipeline', type: 'Perception', status: 'DOCUMENTING', slug: 'vision-pipeline' },
    { id: 'PRJ_04', title: 'BLDC Controller', type: 'Embedded', status: 'IN_PROGRESS', slug: 'bldc-controller' },
  ];

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700">
      <div className="flex flex-col gap-4 border-b border-border pb-8">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground">Project Archive</h1>
        <p className="font-sans text-secondary-foreground max-w-2xl">
          A catalogue of engineering projects across mechanical design, embedded systems, and autonomous control architectures. Documentation in progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((prj) => (
          <Link key={prj.id} href={`/work/${prj.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background">
            <PaperSheet className="p-6 h-full flex flex-col gap-6 transition-colors group-hover:bg-card/80 group-active:translate-y-[1px] border-border group-hover:border-primary/40 relative">
              
              <div className="absolute top-0 right-8 w-px h-4 bg-border" />
              <div className="absolute top-0 right-10 w-px h-3 bg-border" />
              
              <div className="flex justify-between items-start">
                <MetalDataPlate title="SYS_ID">{prj.id}</MetalDataPlate>
                <div className="font-mono text-[10px] bg-[#1B1C1A]/5 px-2 py-1 border border-border/50 text-muted-foreground flex items-center gap-1.5 shadow-sm">
                  <div className={`w-1.5 h-1.5 rounded-full ${prj.status === 'IN_PROGRESS' ? 'bg-[#B87D2A]' : prj.status === 'ARCHIVED' ? 'bg-muted-foreground' : 'bg-primary'}`} />
                  {prj.status}
                </div>
              </div>
              
              <div>
                <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">{prj.title}</h3>
                <div className="font-mono text-xs text-muted-foreground mt-2 uppercase tracking-wider">{prj.type}</div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-border border-dashed font-mono text-[10px] text-muted-foreground flex justify-between items-center group-hover:text-foreground transition-colors">
                <span>[AWAITING_FULL_UPLOAD]</span>
                <span className="group-hover:translate-x-1 transition-transform">ACCESS_FILE -{'>'}</span>
              </div>
            </PaperSheet>
          </Link>
        ))}
      </div>
    </div>
  );
}
