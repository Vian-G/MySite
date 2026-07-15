import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { TornPhotoWindow } from '@/components/ui/TornPhotoWindow';
import { useSEO } from '@/hooks/use-seo';
import { EMAIL, LOCATION_STATUS } from '@/config/contact';
import { skills } from '@/config/skills';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import portraitImg from '@/assets/portrait.svg';
import { ResumeAction } from '@/components/ui/ResumeAction';

const SectionHead = ({ index, children }: { index: string; children: React.ReactNode }) => (
  <h2 className="font-mono text-sm uppercase tracking-widest text-primary flex items-center gap-2 w-full mb-6">
    {index}
    <div className="w-full h-px bg-primary/30 flex-1" />
  </h2>
);

const stats: { label: string; value: string }[] = [
  { label: 'Degree', value: 'B.S. ECE + Robotics Minor' },
  { label: 'Year', value: "Sophomore '26" },
  { label: 'School', value: 'Carnegie Mellon' },
  { label: 'Based', value: 'Dubai → Pittsburgh' },
];

export default function About() {
  useSEO(
    'About | Vian Garg',
    'Vian Garg — ECE + Robotics at Carnegie Mellon. Systems engineer working across mechanical-electrical interfaces, autonomous navigation, and industrial robotics.',
  );

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-16">

      <MetalDataPlate>PROFILE / ECE + ROBOTICS MINOR / CMU</MetalDataPlate>

      {/* Identity header */}
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

          {/* Left — name + stats + lead */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="font-serif text-5xl md:text-6xl text-foreground leading-[1.05] tracking-tight">
                Vian Garg
              </h1>
              <p className="font-mono text-xs text-muted-foreground mt-3">{LOCATION_STATUS}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border">
              {stats.map(({ label, value }) => (
                <div key={label} className="bg-background p-4 flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
                  <span className="font-mono text-xs text-foreground">{value}</span>
                </div>
              ))}
            </div>

            <p className="font-sans text-lg text-secondary-foreground leading-relaxed max-w-2xl">
              I work at the boundary where things have to physically work. Tuning Nav2 costmaps so a tracked rover actually navigates lunar regolith. Writing the URScript layer that bridges human motion to a UR10e end-effector. Redesigning a camera shroud so stereo sensors survive a moon mission. The discipline boundary is where I'm most useful.
            </p>

            <div className="flex flex-wrap gap-3">
              <ResumeAction mode="view">
                {(onClick) => (
                  <PhysicalButton onClick={onClick} variant="rust" size="md" className="gap-2">
                    View Resume <ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                  </PhysicalButton>
                )}
              </ResumeAction>
              <a href={`mailto:${EMAIL}`} className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
                <PhysicalButton asDiv variant="graphite" size="md">Email me</PhysicalButton>
              </a>
            </div>
          </div>

          {/* Right — portrait */}
          <div className="hidden lg:block">
            <TornPhotoWindow
              src={portraitImg}
              alt="Technical portrait illustration of Vian Garg"
              className="w-full aspect-[3/4]"
              imgClassName="object-[50%_38%]"
              variant={1}
              rotate={2}
            />
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* LEFT COL */}
        <div className="flex flex-col gap-12">

          <section>
            <SectionHead index="01_APPROACH">How I work</SectionHead>
            <PaperSheet className="p-6 md:p-8" variant="clipped">
              <div className="flex flex-col gap-5 font-sans text-foreground leading-relaxed">
                <p>
                  Most interesting problems live at an interface — mechanical meets electrical, sensor data meets a control loop, a human operator meets an industrial robot. I gravitate toward those seams because that's where the spec sheet ends and the real engineering starts.
                </p>
                <p>
                  I try to understand the full stack before touching any layer of it. On Moon Miners I read the Nav2 docs, benchmarked costmap parameters against our physical track geometry, and only then tuned. On the UR10e project I mapped the motion-capture pipeline end-to-end before writing a line of URScript.
                </p>
                <p className="border-l-2 border-primary/60 pl-4 py-1 text-secondary-foreground">
                  "Design it so it can't fail, then test until it does."
                </p>
              </div>
            </PaperSheet>
          </section>

          <section>
            <SectionHead index="02_CAPABILITIES">Skills</SectionHead>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
              {skills.map((skill) => (
                <div key={skill.label} className="bg-background p-5 flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{skill.label}</span>
                  <span className="font-sans font-semibold text-foreground">{skill.title}</span>
                  <span className="font-sans text-sm text-secondary-foreground leading-relaxed">{skill.description}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT COL */}
        <div className="flex flex-col gap-12">

          <section>
            <SectionHead index="03_AVAILABILITY">What I'm looking for</SectionHead>
            <PaperSheet className="p-6 md:p-8" variant="default">
              <div className="flex flex-col gap-4 font-sans text-foreground leading-relaxed">
                <p>
                  Actively seeking summer and co-op internships in <strong>robotics</strong>, <strong>embedded systems</strong>, and <strong>controls</strong> — particularly at companies building physical AI, field robotics, or industrial automation.
                </p>
                <ul className="grid grid-cols-1 gap-2 mt-2">
                  {[
                    'Field robotics & autonomous vehicles',
                    'Physical AI & manipulation',
                    'Industrial automation & cobots',
                    'Embedded perception systems',
                    'Aerospace & space robotics',
                    'Hardware-software co-design',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-mono text-xs text-secondary-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-[1px] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </PaperSheet>
          </section>

          <section className="flex flex-col gap-6 border-t border-border pt-10">
            <div>
              <p className="font-serif text-2xl text-foreground">Want to work together?</p>
              <p className="font-mono text-xs text-muted-foreground mt-1">{EMAIL}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${EMAIL}`} className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
                <PhysicalButton asDiv variant="rust" size="lg" className="gap-2">
                  Get in touch <ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </PhysicalButton>
              </a>
              <Link href="/projects" className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
                <PhysicalButton asDiv variant="graphite" size="lg">See my work</PhysicalButton>
              </Link>
            </div>
          </section>

        </div>
      </div>

    </div>
  );
}
