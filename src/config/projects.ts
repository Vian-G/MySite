import type { ResponsiveImage } from '@/types/images';
import moonMinersPhoto from '@/assets/projects/moon-miners-field-test.jpg?format=webp&w=1280&quality=82';
import moonMinersSrcSet from '@/assets/projects/moon-miners-field-test.jpg?format=webp&w=640;960;1280&quality=82&as=srcset';
import ur10ePhoto from '@/assets/projects/ur10e.jpg?format=webp&w=1280&quality=82';
import ur10eSrcSet from '@/assets/projects/ur10e.jpg?format=webp&w=640;960;1280&quality=82&as=srcset';
import moonRangerPhoto from '@/assets/projects/moon-ranger.jpg?format=webp&w=1280&quality=82';
import moonRangerSrcSet from '@/assets/projects/moon-ranger.jpg?format=webp&w=640;960;1280&quality=82&as=srcset';
import skyryderPhoto from '@/assets/projects/skyryder.jpg?format=webp&w=1280&quality=82';
import skyryderSrcSet from '@/assets/projects/skyryder.jpg?format=webp&w=640;960;1280&quality=82&as=srcset';
import spiritBuggyPhoto from '@/assets/projects/spirit-buggy.jpg?format=webp&w=1280&quality=82';
import spiritBuggySrcSet from '@/assets/projects/spirit-buggy.jpg?format=webp&w=640;960;1280&quality=82&as=srcset';
import firstGlobalUaePhoto from '@/assets/projects/first-global-uae.jpg?format=webp&w=1280&quality=82';
import firstGlobalUaeSrcSet from '@/assets/projects/first-global-uae.jpg?format=webp&w=640;960;1280&quality=82&as=srcset';

const cardImage = (src: string, srcSet: string): ResponsiveImage => ({
  src,
  srcSet,
  sizes: '(min-width: 1024px) 50vw, 100vw',
});

export type Project = {
  id: string;
  slug: string;
  title: string;
  role: string;
  problem: string;
  stack: string[];
  result: string;
  href: string;
  photo?: ResponsiveImage;
  imageAlt?: string;
  type?: string;
  summary: string;
  tools: string;
  facts: string[];
  /** When true, this project is surfaced in featured contexts (e.g. homepage highlights). */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: '01',
    slug: 'moon-miners',
    title: 'CMU Moon Miners — NASA Lunabotics',
    role: 'Mechanical / Robotics Engineer',
    problem: 'Developing a high-payload autonomous lunar excavation rover for competition.',
    stack: ['SolidWorks', 'Nav2', 'ESP32', 'Python / Pygame'],
    result: 'Designed and fabricated a metal track system achieving a drawbar-pull ratio of 1.55 on BP-1 simulant.',
    href: '/projects/moon-miners',
    photo: cardImage(moonMinersPhoto, moonMinersSrcSet),
    imageAlt: 'CMU Moon Miners tracked excavation rover in an outdoor sand test area.',
    summary:
      'From rover mobility to wireless control: a metal track system achieving a 1.55 drawbar-pull ratio, Nav2 tuning, and Python-to-ESP32 teleoperation for a Lunabotics test bot.',
    tools: 'SolidWorks, Nav2, ESP32, Python, Pygame, UDP, Embedded Firmware',
    facts: [
      'Drawbar-pull ratio of 1.55 on BP-1 lunar regolith simulant',
      'Won the Caterpillar "First Steps" Award for best first-year team',
      'First first-year team to score autonomous-navigation points at NASA Lunabotics',
      'Wireless teleoperation with explicit arming, deadman controls, and disconnect handling; 71 software tests reported October 19, 2026',
    ],
    featured: true,
  },
  {
    id: '02',
    slug: 'emit-lab',
    title: 'EMIT Lab — Robotic Welding',
    role: 'Robotics Researcher',
    problem: 'Connecting human motion and experiment preparation to inspectable industrial robot workflows.',
    stack: ['UR10e', 'MATLAB / C++', 'YMConnect', 'ESAB'],
    result: 'Remote URScript validation and Yaskawa experiment software; 215 offline tests reported October 28, 2026.',
    href: '/projects/emit-lab',
    photo: cardImage(ur10ePhoto, ur10eSrcSet),
    imageAlt: 'UR10e cobot used in the EMIT Lab human-motion recreation workstream.',
    summary: 'Robotic welding research across UR10e human-motion recreation and Yaskawa experiment software, with ESAB integration, simulation, and session logging.',
    tools: 'UR10e, URScript, Python, MATLAB, C++, YMConnect, INFORM, ESAB, SSH',
    facts: [
      'Connected human motion to UR10e execution through URScript and remote script validation',
      'Developed a MATLAB/C++ interface for Yaskawa robot jobs, welding workflows, and recorded experiments',
      '215 passing Yaskawa offline tests reported October 28, 2026; live workflow acceptance remains pending',
    ],
    featured: true,
  },
  {
    id: '03',
    slug: 'moon-ranger',
    title: 'MoonRanger — NASA Lunar Rover Mission',
    role: 'Mechanical Engineer',
    problem: 'Contributing mechanical hardware to a CMU / Astrobotic / NASA autonomous lunar rover launching in 2029.',
    stack: ['SolidWorks', 'CAD', 'Stereo Vision Hardware'],
    result: "Redesigned the camera shroud housing MoonRanger's stereo-vision navigation system.",
    href: '/projects/moon-ranger',
    photo: cardImage(moonRangerPhoto, moonRangerSrcSet),
    summary:
      "A CMU / Astrobotic / NASA Ames autonomous lunar rover launching in 2029 to search for water ice at the Moon's south pole. Redesigned the camera shroud housing its stereo-vision navigation system.",
    tools: 'SolidWorks, CAD, Mechanical Design, Stereo Vision Hardware Integration',
    facts: [
      'Suitcase-sized rover built to operate a full lunar day (~14 Earth days)',
      'Redesigned the camera shroud protecting its stereo-vision navigation sensors',
      "Launches 2029 aboard Firefly Aerospace's Blue Ghost lander to the lunar south pole",
    ],
    featured: false,
  },
  {
    id: '04',
    slug: 'skyryder',
    title: 'Skyryder',
    role: 'Independent Developer',
    problem: 'Designing and building an original playable game project independently, outside of coursework.',
    stack: ['Game Design', 'Level Design', 'Itch.io'],
    result: 'Published and playable free on itch.io.',
    href: '/projects/skyryder',
    photo: cardImage(skyryderPhoto, skyryderSrcSet),
    type: 'Interactive Work / Playable Project',
    summary: 'Skyryder is an original playable game project, published independently on itch.io.',
    tools: 'Game Design, Level Design, Itch.io',
    facts: [
      'Original playable game project, designed and built independently',
      'Published and playable free on itch.io',
    ],
  },
  {
    id: '05',
    slug: 'spirit-buggy',
    title: 'SPIRIT Buggy — CMU Buggy',
    role: 'Assistant Build Lead',
    problem: "CMU Buggy's first new carbon-fiber vehicle design in over fifteen years.",
    stack: ['SolidWorks', 'Composites', 'Python', 'Instrumentation'],
    result: 'Introduced a male-mold construction method new to the team and designed a steering assembly validated in ANSYS before it raced.',
    href: '/projects/spirit-buggy',
    photo: cardImage(spiritBuggyPhoto, spiritBuggySrcSet),
    summary:
      "Composite buggy fabrication and steering analysis, alongside Python temperature monitoring and four-zone control simulation for the SPIRIT Racing Systems heating box.",
    tools: 'SolidWorks, ANSYS, Carbon Fiber Layup, Python, Streamlit, Phidget22, Control Simulation',
    facts: [
      'First new carbon-fiber buggy design fielded by CMU Buggy in over fifteen years',
      "First male-mold construction method used in CMU Buggy's fabrication history",
      'Nomex honeycomb core sandwiched between carbon-fiber weave layups',
      'Heating-box monitoring, CSV logging, and four-zone control simulation; 43 tests documented October 16, 2026',
      'Physical heater actuation remains unimplemented and wiring validation is pending',
    ],
    featured: true,
  },
  {
    id: '06',
    slug: 'first-global-uae',
    title: 'FIRST Global Team UAE 2024',
    role: 'National Robotics Vice President',
    problem: "Led the UAE's 22-member national team at FIRST Global 2024 in Athens, Greece.",
    stack: ['Mechanical Design', 'Team Leadership', 'Cascade Lift Mechanisms', 'Omni-Wheel Drivetrains'],
    result: 'Achieved a 2nd-of-193-countries finish with a robot featuring a 6-foot telescoping cascade lift and omni-wheel drivetrain.',
    href: '/projects/first-global-uae',
    photo: cardImage(firstGlobalUaePhoto, firstGlobalUaeSrcSet),
    summary:
      "Led the UAE's 22-member national team to a 2nd-of-193-countries finish at FIRST Global 2024 in Athens, Greece, building a robot with a 6-foot telescoping cascade lift and an omni-wheel drivetrain.",
    tools: 'Mechanical Design, Team Leadership, Cascade Lift Mechanisms, Omni-Wheel Drivetrains',
    facts: [
      'Led a 22-member national team as Robotics Vice President',
      'Robot featured a 6-foot telescoping cascade lift and omni-wheel drivetrain',
      '2nd-of-193-countries finish at FIRST Global 2024 in Athens, Greece',
    ],
  },

  {
    id: '07',
    slug: 'halcon',
    title: 'HALCON — Aerodynamics Internship',
    role: 'Aerodynamics Engineering Intern',
    problem: 'Exploring aerodynamic behavior and stability through engineering analysis and simulation.',
    stack: ['ANSYS Fluent', 'XFLR5', 'Python', 'Simulation'],
    result: 'Developed simulation and analysis tools alongside CFD and stability studies during a summer engineering internship.',
    href: '/projects/halcon',
    type: 'Internship / HALCON, EDGE Group',
    summary: 'A summer aerodynamics engineering internship at HALCON, EDGE Group in Abu Dhabi, spanning CFD, stability analysis, state-space tools, and simulation programming.',
    tools: 'ANSYS Fluent, XFLR5, Python, Pygame, Object-Oriented Programming, State-Space Modeling',
    facts: [
      'Aerodynamics Engineering Intern, June–August 2024, Abu Dhabi, UAE',
      'Performed CFD and stability analysis using ANSYS Fluent and XFLR5',
      'Built state-space utilities, a matrix calculator, and a Pygame simulation environment',
    ],
  },
];

/**
 * Returns the previous and next projects relative to the given slug,
 * wrapping around at the ends (last → first, first → last).
 * Throws a clear error if the slug is not found in the canonical list.
 */
export function getAdjacentProjects(slug: string): { prev: Project; next: Project } {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    throw new Error(
      `getAdjacentProjects: unknown slug "${slug}". Valid slugs are: ${projects.map((p) => p.slug).join(', ')}.`,
    );
  }
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  return { prev, next };
}

/** Formats a project into a short navigation label, e.g. "01 / MOON MINERS". */
export function projectNavLabel(project: Project): string {
  return `${project.id} / ${project.title.split('—')[0].split('/')[0].trim().toUpperCase()}`;
}
