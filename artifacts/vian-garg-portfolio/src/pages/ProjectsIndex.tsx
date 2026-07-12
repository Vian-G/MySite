import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { FolderTab } from '@/components/ui/FolderTab';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { Link } from 'wouter';

export default function ProjectsIndex() {
  const projects = [
    {
      id: "01",
      title: "CMU Moon Miners — NASA Lunabotics",
      role: "Mechanical / Robotics Engineer",
      summary: "Mechanical and robotics contributions to a lunar excavation rover.",
      tools: "SolidWorks, CAD, Mechanical Design, Simulation, Robotics, Autonomous Systems",
      href: "/projects/moon-miners",
      svg: (
        <svg viewBox="0 0 400 250" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-foreground opacity-80">
          <path d="M 80 160 L 320 160 L 320 120 L 80 120 Z" />
          <circle cx="120" cy="180" r="24" />
          <circle cx="200" cy="180" r="24" />
          <circle cx="280" cy="180" r="24" />
          <path d="M 280 120 L 280 60 L 340 60" className="stroke-primary" strokeWidth="3" />
          <path d="M 340 50 L 360 60 L 340 70 Z" className="stroke-primary" />
          <path d="M 120 160 L 120 150" />
          <path d="M 200 160 L 200 150" />
          <path d="M 280 160 L 280 150" />
          <rect x="140" y="130" width="80" height="20" strokeDasharray="4 4" />
        </svg>
      )
    },
    {
      id: "02",
      title: "UR10e Welding Automation",
      role: "Robotics Integration Engineer",
      summary: "Integrating collaborative robotics with industrial welding equipment.",
      tools: "UR10e, ESAB, URScript, Python, EtherNet/IP, Fieldbus, Industrial Robotics, Automation",
      href: "/projects/ur10e-welding",
      svg: (
        <svg viewBox="0 0 400 250" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-foreground opacity-80">
          <rect x="60" y="200" width="80" height="20" />
          <path d="M 80 200 L 120 200 L 100 160 Z" />
          <circle cx="100" cy="160" r="12" />
          <path d="M 100 148 L 180 80" />
          <circle cx="180" cy="80" r="12" />
          <path d="M 190 85 L 260 120" />
          <circle cx="260" cy="120" r="12" />
          <path d="M 270 125 L 300 160" />
          <path d="M 300 160 L 310 180" className="stroke-primary" strokeWidth="3" />
          <path d="M 310 180 L 305 190" className="stroke-primary" />
          <path d="M 310 200 Q 340 180 370 200" strokeDasharray="6 6" className="stroke-[hsl(var(--accent))]" strokeWidth="2" />
          <path d="M 290 220 L 390 220" strokeWidth="4" />
        </svg>
      )
    },
    {
      id: "03",
      title: "Computer Vision Robotics Work",
      summary: "Software workflows for sensing, vision, and robotic automation.",
      tools: "Python, Computer Vision, Sensors, Embedded Systems, Robotic Automation",
      href: "/projects/computer-vision",
      svg: (
        <svg viewBox="0 0 400 250" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-foreground opacity-80">
          <rect x="60" y="100" width="60" height="50" />
          <rect x="120" y="110" width="20" height="30" />
          <path d="M 140 110 L 350 40 L 350 210 L 140 140" strokeDasharray="4 4" className="stroke-primary" fill="currentColor" fillOpacity="0.03" />
          <circle cx="220" cy="90" r="8" className="stroke-[hsl(var(--accent))]" />
          <circle cx="280" cy="160" r="8" className="stroke-[hsl(var(--accent))]" />
          <circle cx="320" cy="100" r="8" className="stroke-[hsl(var(--accent))]" />
          <rect x="250" y="120" width="40" height="40" />
          <path d="M 220 98 L 260 120" strokeDasharray="2 2" className="stroke-[hsl(var(--accent))]/50" />
          <path d="M 280 152 L 270 160" strokeDasharray="2 2" className="stroke-[hsl(var(--accent))]/50" />
          <path d="M 320 108 L 290 120" strokeDasharray="2 2" className="stroke-[hsl(var(--accent))]/50" />
        </svg>
      )
    },
    {
      id: "04",
      title: "Skyryder",
      type: "Interactive Work / Playable Project",
      summary: "Skyryder is an original playable game project, published independently on itch.io.",
      href: "/skyryder",
      svg: (
        <svg viewBox="0 0 400 250" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-foreground opacity-80">
          <path d="M 50 200 L 350 200" strokeDasharray="2 4" />
          <path d="M 80 200 Q 150 50 350 100" strokeDasharray="8 6" className="stroke-primary" />
          <g transform="translate(260, 80) rotate(15)">
            <path d="M -20 0 L 20 0 L 10 -15 Z" fill="currentColor" className="text-foreground" />
            <path d="M -15 0 L 0 20 L 5 0 Z" fill="currentColor" className="text-foreground" />
          </g>
        </svg>
      )
    }
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {projects.map((prj, i) => (
          <PaperSheet key={prj.id} className="p-6 md:p-8 flex flex-col gap-6 group hover:border-primary/40 transition-colors" variant={i % 2 === 0 ? "clipped" : "default"}>
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

            <div className="w-full h-32 border border-border/50 bg-[#E8E6D9] overflow-hidden flex items-center justify-center p-4 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)]">
              {prj.svg}
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
              <Link href={prj.href} tabIndex={-1}>
                <PhysicalButton variant="graphite" size="sm" className="w-full">
                  OPEN DOSSIER {'->'}
                </PhysicalButton>
              </Link>
            </div>
          </PaperSheet>
        ))}
      </div>
    </div>
  );
}
