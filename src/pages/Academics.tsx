import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { useSEO } from '@/hooks/use-seo';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const SectionHead = ({ index, children }: { index: string; children: React.ReactNode }) => (
  <h2 className="font-mono text-sm uppercase tracking-widest text-primary flex items-center gap-2 w-full mb-6">
    {index}
    <div className="w-full h-px bg-primary/30 flex-1" />
  </h2>
);

interface EducationStat {
  label: string;
  value: string;
}

const educationStats: EducationStat[] = [
  { label: 'Degree', value: 'B.S. Electrical & Computer Engineering' },
  { label: 'Minor', value: 'Robotics' },
  { label: 'Institution', value: 'Carnegie Mellon University' },
  { label: 'Location', value: 'Pittsburgh, Pennsylvania' },
  { label: 'Expected Graduation', value: 'May 2029' },
  { label: 'GPA', value: '4.0 / 4.0' },
  { label: 'Honors', value: "Dean's List, 2025–2026" },
];

interface Course {
  code: string;
  title: string;
  description?: string;
  primary: boolean;
}

const courses: Course[] = [
  {
    code: '16-861',
    title: 'Mobile Robot Design (Space Robotics)',
    description: 'Terramechanics, navigation, sensing, and actuation for mobile platforms in unstructured environments.',
    primary: true,
  },
  {
    code: '15-213',
    title: 'Computer Systems',
    description: 'Memory hierarchy, computer architecture, concurrency, and systems programming in C.',
    primary: true,
  },
  {
    code: '18-100',
    title: 'Introduction to Electrical and Computer Engineering',
    description: 'Computer architecture, communication protocols, and signal processing fundamentals.',
    primary: true,
  },
  {
    code: '15-122',
    title: 'Principles of Imperative Computation',
    description: undefined,
    primary: false,
  },
  {
    code: '21-254',
    title: 'Linear Algebra and Vector Calculus for Engineers',
    description: undefined,
    primary: false,
  },
  {
    code: '21-260',
    title: 'Differential Equations',
    description: undefined,
    primary: false,
  },
  {
    code: '24-101',
    title: 'Fundamentals of Mechanical Engineering',
    description: undefined,
    primary: false,
  },
  {
    code: '21-127',
    title: 'Concepts of Mathematics',
    description: undefined,
    primary: false,
  },
];

export default function Academics() {
  useSEO(
    'Academics | Vian Garg',
    'Academic background of Vian Garg — B.S. Electrical and Computer Engineering with a Robotics Minor at Carnegie Mellon University.',
  );

  const primaryCourses = courses.filter((c) => c.primary);
  const secondaryCourses = courses.filter((c) => !c.primary);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-16">

      <MetalDataPlate>ACADEMICS / B.S. ECE + ROBOTICS MINOR / CMU</MetalDataPlate>

      {/* Page heading */}
      <div>
        <h1 className="font-serif text-5xl md:text-6xl text-foreground leading-[1.05] tracking-tight">
          Academic Record
        </h1>
        <p className="font-mono text-xs text-muted-foreground mt-3">Carnegie Mellon University — Pittsburgh, PA</p>
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* LEFT COL */}
        <div className="flex flex-col gap-12">

          {/* 01_EDUCATION */}
          <section aria-labelledby="section-education">
            <SectionHead index="01_EDUCATION">
              <span id="section-education">Education</span>
            </SectionHead>
            <div className="grid grid-cols-1 gap-px bg-border border border-border">
              {educationStats.map(({ label, value }) => (
                <div key={label} className="bg-background px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">{label}</span>
                  <span className="font-mono text-xs text-foreground text-right">{value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 03_ACADEMIC FOCUS */}
          <section aria-labelledby="section-focus">
            <SectionHead index="03_ACADEMIC FOCUS">
              <span id="section-focus">Focus</span>
            </SectionHead>
            <PaperSheet className="p-6 md:p-8" variant="default">
              <div className="flex flex-col gap-4 font-sans text-foreground leading-relaxed">
                <p>
                  My coursework sits at the intersection of robotics, embedded systems, and engineering fundamentals — building up from signal processing and circuit theory through computer architecture and systems programming to full-stack mobile robot design.
                </p>
                <p>
                  The mechanical engineering and mathematics foundation feeds directly into controls and kinematics work, while the computer systems depth underpins the real-time software that runs on embedded platforms.
                </p>
                <p className="border-l-2 border-primary/60 pl-4 py-1 text-secondary-foreground">
                  The goal: engineer autonomous systems that physically work in the real world.
                </p>
              </div>
            </PaperSheet>
          </section>

        </div>

        {/* RIGHT COL */}
        <div className="flex flex-col gap-12">

          {/* 02_RELEVANT COURSEWORK */}
          <section aria-labelledby="section-coursework">
            <SectionHead index="02_RELEVANT COURSEWORK">
              <span id="section-coursework">Coursework</span>
            </SectionHead>

            {/* Primary courses — prominent cards */}
            <div className="flex flex-col gap-3 mb-4">
              {primaryCourses.map((course) => (
                <div
                  key={course.code}
                  className="border border-border bg-background p-5 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-wider">{course.code}</span>
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-[1px] shrink-0" aria-hidden="true" />
                  </div>
                  <span className="font-sans font-semibold text-sm text-foreground">{course.title}</span>
                  {course.description && (
                    <span className="font-sans text-xs text-secondary-foreground leading-relaxed">{course.description}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Secondary courses — compact rows */}
            <div className="grid grid-cols-1 gap-px bg-border border border-border">
              {secondaryCourses.map((course) => (
                <div key={course.code} className="bg-background px-5 py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-wider shrink-0">{course.code}</span>
                  <span className="font-mono text-xs text-secondary-foreground">{course.title}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="flex flex-col gap-6 border-t border-border pt-10">
            <div>
              <p className="font-serif text-2xl text-foreground">See it in practice</p>
              <p className="font-mono text-xs text-muted-foreground mt-1">Engineering applied to real systems</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
                <PhysicalButton asDiv variant="rust" size="lg" className="gap-2">
                  See my work <ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </PhysicalButton>
              </Link>
              <Link href="/resume" className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]">
                <PhysicalButton asDiv variant="graphite" size="lg" className="gap-2">
                  View résumé <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </PhysicalButton>
              </Link>
            </div>
          </section>

        </div>
      </div>

    </div>
  );
}
