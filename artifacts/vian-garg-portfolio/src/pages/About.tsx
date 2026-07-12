import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { PhysicalButton } from '@/components/ui/PhysicalButton';

export default function About() {
  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700 max-w-3xl pb-16">
      
      <div className="flex flex-col gap-6 items-start">
        <MetalDataPlate>PROFILE / ECE + ROBOTICS</MetalDataPlate>
        
        <PaperSheet className="p-8 md:p-12 w-full" variant="clipped">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">About</h1>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed">
            Vian Garg is an ECE student with a Robotics minor, focused on building and integrating systems across robotics, automation, controls, perception, and mechanical-electrical design.
          </p>
        </PaperSheet>
      </div>

      <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-4">
          <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
            CURRENT FOCUS
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
            HOW I WORK
          </h2>
          <p className="font-sans text-foreground leading-relaxed pl-2">
            I am most interested in projects where interfaces matter: between mechanical systems and electronics, sensors and software, or robotic hardware and industrial equipment.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-[1px]" />
            INTERACTIVE WORK
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pl-2 p-4 bg-secondary/20 border border-border/50">
            <p className="font-sans text-foreground">
              I also build interactive projects, including Skyryder.
            </p>
            <a 
              href="https://vian-g.itch.io/skyryder" 
              target="_blank" 
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              <PhysicalButton variant="rust" size="sm" className="whitespace-nowrap">
                PLAY SKYRYDER ↗
              </PhysicalButton>
            </a>
          </div>
        </section>
      </div>
      
    </div>
  );
}
