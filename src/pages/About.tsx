import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { TornPhotoWindow } from '@/components/ui/TornPhotoWindow';
import { useSEO } from '@/hooks/use-seo';
import { EMAIL, LOCATION_STATUS } from '@/config/contact';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import portraitImg from '@/assets/portrait.svg';

export default function About() {
  useSEO('About | Vian Garg', 'Vian Garg is an ECE student with a Robotics minor, focused on building and integrating systems across robotics, automation, controls, perception, and mechanical-electrical design.');

  return (
    <div className="flex flex-col gap-16 md:gap-24 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-16">

      {/* Hero — mirrors Home hero structure exactly */}
      <section className="flex flex-col lg:flex-row gap-6 md:gap-8 relative justify-between">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8D8A821A_1px,transparent_1px),linear-gradient(to_bottom,#8D8A821A_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_left_top,black_20%,transparent_70%)]" />

        <div className="flex flex-col gap-6 md:gap-8 lg:w-2/3">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between lg:justify-start lg:gap-8">
            <MetalDataPlate title="ID" className="w-fit" screwPositions="sides">
              PROFILE / ECE + ROBOTICS
            </MetalDataPlate>
            <div className="font-mono text-xs text-muted-foreground flex gap-4">
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B87D2A]/80 shadow-[0_0_4px_rgba(184,125,42,0.4)]" />
                ONLINE
              </span>
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.05] tracking-tight max-w-4xl pt-4">
            Vian Garg
            <span className="text-muted-foreground italic text-4xl md:text-6xl lg:text-7xl block mt-2">About me</span>
          </h1>

          <div className="font-mono text-xs text-muted-foreground">{LOCATION_STATUS}</div>

          <div className="max-w-2xl font-sans text-lg text-secondary-foreground leading-relaxed">
            Sophomore at Carnegie Mellon University studying Electrical and Computer Engineering with a minor in Robotics. I build and integrate systems across robotics, automation, controls, perception, and mechanical-electrical design.
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/projects" className="outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2px]">
              <PhysicalButton asDiv variant="rust" size="lg">View Projects</PhysicalButton>
            </Link>
            <a href={`mailto:${EMAIL}`} className="outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2px]">
              <PhysicalButton asDiv variant="metal" size="lg">Contact Me</PhysicalButton>
            </a>
          </div>
        </div>

        {/* Portrait — TornPhotoWindow matching Home's layout */}
        <div className="hidden lg:block lg:w-1/3 relative flex justify-end items-center">
          <div className="w-full max-w-[380px] aspect-[4/5] pointer-events-none mt-8">
            <TornPhotoWindow
              src={portraitImg}
              alt="Technical portrait illustration of Vian Garg"
              className="w-full h-full"
              imgClassName="object-[50%_38%]"
              variant={1}
              rotate={2}
            />
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="flex flex-col gap-6 items-start">
        <h2 className="font-mono text-sm uppercase tracking-widest text-primary flex items-center gap-2 w-full">
          01_HOW_I_WORK
          <div className="w-full h-px bg-primary/30 flex-1" />
        </h2>
        <PaperSheet className="p-6 md:p-8 max-w-3xl" variant="default">
          <p className="font-sans text-lg text-foreground leading-relaxed">
            I am most interested in projects where interfaces matter: between mechanical systems and electronics, sensors and software, or robotic hardware and industrial equipment. Whether it’s tuning navigation costmaps to match a rover’s physical track geometry, or writing the software layer that translates human motion into industrial cobot instructions, I enjoy working at the boundary where theory turns into physical action.
          </p>
        </PaperSheet>
      </section>

      {/* Current Focus */}
      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-sm uppercase tracking-widest text-primary flex items-center gap-2 w-full">
          02_CURRENT_FOCUS
          <div className="w-full h-px bg-primary/30 flex-1" />
        </h2>
        <PaperSheet className="p-6 md:p-8 max-w-3xl" variant="clipped">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-secondary-foreground">
            {[
              'Robotics integration',
              'Automation and controls',
              'Autonomous systems',
              'Embedded systems',
              'Computer vision',
              'Industrial robotics',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-[1px] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </PaperSheet>
      </section>

      {/* Currently Exploring */}
      <section className="flex flex-col gap-6 items-start">
        <h2 className="font-mono text-sm uppercase tracking-widest text-primary flex items-center gap-2 w-full">
          03_CURRENTLY_EXPLORING
          <div className="w-full h-px bg-primary/30 flex-1" />
        </h2>
        <PaperSheet className="p-6 md:p-8 max-w-3xl" variant="default">
          <p className="font-sans text-lg text-foreground leading-relaxed">
            Deeper integration patterns between edge perception nodes and real-time control systems, and optimising physical mechanical systems for complex autonomous navigation tasks.
          </p>
        </PaperSheet>
      </section>

      {/* Interactive Work */}
      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-sm uppercase tracking-widest text-primary flex items-center gap-2 w-full">
          04_INTERACTIVE_WORK
          <div className="w-full h-px bg-primary/30 flex-1" />
        </h2>
        <PaperSheet className="p-6 md:p-8 max-w-3xl" variant="default">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="font-sans text-foreground">
              I also build interactive projects — including Skyryder, an original playable game published independently on itch.io.
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
        </PaperSheet>
      </section>

    </div>
  );
}
