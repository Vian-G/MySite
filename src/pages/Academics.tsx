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
  { label: 'Honors', value: "2x Dean's List: Fall 2025, Spring 2026" },
];

const deptConfig: Record<
  Course['dept'],
  { label: string; dotClass: string; textClass: string }
> = {
  ROBOTICS: {
    label: 'ROBOTICS',
    dotClass: 'bg-orange-500/60 dark:bg-orange-400/70',
    textClass: 'text-orange-700/80 dark:text-orange-300/80',
  },
  CS: {
    label: 'CS',
    dotClass: 'bg-sky-500/60 dark:bg-sky-400/70',
    textClass: 'text-sky-700/80 dark:text-sky-300/80',
  },
  ECE: {
    label: 'ECE',
    dotClass: 'bg-amber-500/60 dark:bg-amber-400/70',
    textClass: 'text-amber-700/80 dark:text-amber-300/80',
  },
  MATH: {
    label: 'MATH',
    dotClass: 'bg-emerald-500/60 dark:bg-emerald-400/70',
    textClass: 'text-emerald-700/80 dark:text-emerald-300/80',
  },
  ME: {
    label: 'ME',
    dotClass: 'bg-rose-500/60 dark:bg-rose-400/70',
    textClass: 'text-rose-700/80 dark:text-rose-300/80',
  },
};

interface Course {
  code: string;
  title: string;
  description?: string;
  primary: boolean;
  dept: 'ROBOTICS' | 'CS' | 'ECE' | 'MATH' | 'ME';
}

const courses: Course[] = [
  {
    code: '16-861',
    title: 'Mobile Robot Design (Space Robotics)',
    description: 'Terramechanics, navigation, sensing, and actuation for mobile platforms in unstructured environments.',
    primary: true,
    dept: 'ROBOTICS',
  },
  {
    code: '18-213',
    title: 'Computer Systems',
    description: 'Memory hierarchy, computer architecture, concurrency, and systems programming in C.',
    primary: true,
    dept: 'ECE',
  },
  {
    
    code: '18-290',
    title: 'Signals and Systems',
    description: 'Analysis of signals and systems, including frequency domain techniques and signal processing.',
    primary: true,
    dept: 'ECE',
  },
  {
    code: '15-122',
    title: 'Principles of Imperative Computation',
    description: 'Introduction to C, Data Structures and Algorithms.',
    primary: true,
    dept: 'CS',
  },
  {
    code: '18-100',
    title: 'Introduction to Electrical and Computer Engineering',
    description: 'Computer architecture, communication protocols, and signal processing fundamentals.',
    primary: false,
    dept: 'ECE',
  },
  {
    code: '21-254',
    title: 'Linear Algebra and Vector Calculus for Engineers',
    description: undefined,
    primary: false,
    dept: 'MATH',
  },
  {
    code: '21-260',
    title: 'Differential Equations',
    description: undefined,
    primary: false,
    dept: 'MATH',
  },
  {
    code: '24-101',
    title: 'Fundamentals of Mechanical Engineering',
    description: undefined,
    primary: false,
    dept: 'ME',
  },
  {
    code: '21-127',
    title: 'Concepts of Mathematics',
    description: undefined,
    primary: false,
    dept: 'MATH',
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
              {primaryCourses.map((course) => {
                const dept = deptConfig[course.dept];

                return (
                  <div
                    key={course.code}
                    className="border border-border bg-background p-5 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
                          {course.code}
                        </span>
                        <div
                          className="w-1.5 h-1.5 bg-primary/40 rounded-[1px] shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-1.5 h-1.5 rounded-[1px] shrink-0 ${dept.dotClass}`}
                          aria-hidden="true"
                        />
                        <span
                          className={`font-mono text-[9px] uppercase tracking-[0.22em] ${dept.textClass}`}
                        >
                          {dept.label}
                        </span>
                      </div>
                    </div>
                    <span className="font-sans font-semibold text-sm text-foreground">
                      {course.title}
                    </span>
                    {course.description && (
                      <span className="font-sans text-xs text-secondary-foreground leading-relaxed">
                        {course.description}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Secondary courses — compact rows with department labels */}
            <div className="grid grid-cols-1 gap-px bg-border border border-border">
              {secondaryCourses.map((course) => {
                const dept = deptConfig[course.dept];

                return (
                  <div
                    key={course.code}
                    className="bg-background px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-primary uppercase tracking-wider shrink-0">
                        {course.code}
                      </span>
                      <span className="font-mono text-xs text-secondary-foreground">
                        {course.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:justify-end">
                      <div
                        className={`w-1.5 h-1.5 rounded-[1px] shrink-0 ${dept.dotClass}`}
                        aria-hidden="true"
                      />
                      <span
                        className={`font-mono text-[9px] uppercase tracking-[0.22em] ${dept.textClass}`}
                      >
                        {dept.label}
                      </span>
                    </div>
                  </div>
                );
              })}
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
