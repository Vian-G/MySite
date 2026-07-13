import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { useSEO } from '@/hooks/use-seo';
import { LOCATION_STATUS } from '@/config/contact';
import { ArrowUpRight } from 'lucide-react';
import { PortraitSchematic } from '@/components/ui/PortraitSchematic';

export default function About() {
  useSEO('About | Vian Garg', 'Vian Garg is an ECE student with a Robotics minor, focused on building and integrating systems across robotics, automation, controls, perception, and mechanical-electrical design.');

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700 max-w-3xl pb-16">
      
      <div className="flex flex-col gap-6 items-start">
        <MetalDataPlate>PROFILE / ECE + ROBOTICS</MetalDataPlate>
        
        <PaperSheet className="p-8 md:p-12 w-full flex flex-col sm:flex-row gap-8" variant="clipped">
          <div className="w-32 h-40 shrink-0 border border-border/50 bg-[#E8E6D9] shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] relative flex items-center justify-center overflow-hidden">
            <div className="absolute top-2 left-2 font-mono text-[8px] text-muted-foreground uppercase tracking-wider z-10">FIG_00: PORTRAIT</div>
            <PortraitSchematic className="w-full h-full scale-125" />
          </div>
          
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2">About</h1>
            <div className="font-mono text-xs text-muted-foreground mb-6">{LOCATION_STATUS}</div>
            <p className="font-sans text-lg text-secondary-foreground leading-relaxed">
              I am a sophomore at Carnegie Mellon University studying Electrical and Computer Engineering with a minor in Robotics. I build and integrate systems across robotics, automation, controls, perception, and mechanical-electrical design.
            </p>
          </div>
        </PaperSheet>
      </div>

      <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-4">
          <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
            How I work
          </h2>
          <p className="font-sans text-foreground leading-relaxed pl-2">
            I am most interested in projects where interfaces matter: between mechanical systems and electronics, sensors and software, or robotic hardware and industrial equipment. Whether it's tuning navigation costmaps to match a rover's physical track geometry, or writing the software layer that translates human motion into industrial cobot instructions, I enjoy working at the boundary where theory turns into physical action.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
            Current Focus
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-secondary-foreground pl-2">
            <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-border before:block">Robotics integration</li>
            <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-border before:block">Automation and controls</li>
            <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-border before:block">Autonomous systems</li>
            <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-border before:block">Embedded systems</li>
            <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-border before:block">Computer vision</li>
            <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-border before:block">Industrial robotics</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
            Currently Exploring
          </h2>
          <p className="font-sans text-foreground leading-relaxed pl-2">
            I am currently exploring deeper integration patterns between edge perception nodes and real-time control systems, as well as optimizing physical mechanical systems for complex autonomous navigation tasks.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
            Interactive Work
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pl-2 p-4 bg-secondary/20 border border-border/50">
            <p className="font-sans text-foreground">
              I also build interactive projects, including Skyryder, an original playable game published independently on itch.io.
            </p>
            <a 
              href="https://vian-g.itch.io/skyryder" 
              target="_blank" 
              rel="noopener noreferrer"
              className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]"
            >
              <PhysicalButton asDiv variant="rust" size="sm" className="whitespace-nowrap gap-1.5">
                Play Skyryder <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
              </PhysicalButton>
            </a>
          </div>
        </section>
      </div>
      
    </div>
  );
}