import type { ResponsiveImage } from '@/types/images';
import moonMinersPhoto from '@/assets/projects/moon-miners.jpg?format=webp&w=1280&quality=82';
import moonMinersSrcSet from '@/assets/projects/moon-miners.jpg?format=webp&w=640;960;1280&quality=82&as=srcset';
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
  photo: ResponsiveImage;
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
    stack: ['SolidWorks', 'CAD', 'Simulation', 'Robotics'],
    result: 'Designed and fabricated a metal track system achieving a drawbar-pull ratio of 1.55 on BP-1 simulant.',
    href: '/projects/moon-miners',
    photo: cardImage(moonMinersPhoto, moonMinersSrcSet),
    summary:
      'Developing a high-payload autonomous lunar excavation rover. Designed and fabricated a metal track system achieving a drawbar-pull ratio of 1.55 on BP-1 lunar regolith simulant.',
    tools: 'SolidWorks, CAD, Mechanical Design, Simulation, Robotics, Autonomous Systems',
    facts: [
      'Drawbar-pull ratio of 1.55 on BP-1 lunar regolith simulant',
      'Won the Caterpillar "First Steps" Award for best first-year team',
      'First first-year team to score autonomous-navigation points at NASA Lunabotics',
    ],
    featured: true,
  },
  {
    id: '02',
    slug: 'ur10e-welding',
    title: 'UR10e Cobot Welding',
    role: 'Robotics Researcher',
    problem: 'Developing a virtual cobot welding system bridging human motion to execution.',
    stack: ['UR10e', 'URScript', 'EtherNet/IP'],
    result: 'Engineered remote validation infrastructure for uploading/testing scripts over VPN via SSH.',
    href: '/projects/ur10e-welding',
    photo: cardImage(ur10ePhoto, ur10eSrcSet),
    summary:
      'Developing a virtual cobot welding system that bridges human motion input to UR10e execution via URScript. Engineered remote validation infrastructure for script testing.',
    tools: 'UR10e, URScript, Python, Industrial Robotics, SSH, Automation',
    facts: [
      'Bridges human motion input to UR10e execution via URScript',
      'Remote script validation over the CMU VPN via SSH — no in-person lab access required',
      "Active research at CMU's Engineering Materials for Transformative Technologies Lab",
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
    featured: true,
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
    stack: ['SolidWorks', 'ANSYS', 'Carbon Fiber Layup', 'Composite Fabrication'],
    result: 'Introduced a male-mold construction method new to the team and designed a steering assembly validated in ANSYS before it raced.',
    href: '/projects/spirit-buggy',
    photo: cardImage(spiritBuggyPhoto, spiritBuggySrcSet),
    summary:
      "CMU Buggy's first new carbon-fiber vehicle design in over fifteen years. Introduced a male-mold construction method new to the team and designed a steering assembly validated in ANSYS before it raced.",
    tools: 'SolidWorks, ANSYS, Carbon Fiber Layup, Composite Fabrication',
    facts: [
      'First new carbon-fiber buggy design fielded by CMU Buggy in over fifteen years',
      "First male-mold construction method used in CMU Buggy's fabrication history",
      'Nomex honeycomb core sandwiched between carbon-fiber weave layups',
    ],
    featured: true,
  },
  {
    id: '06',
    slug: 'first-global-uae',
    title: 'FIRST Global Team UAE 2025',
    role: 'National Robotics Vice President',
    problem: "Led the UAE's 22-member national team at FIRST Global 2025 in Athens, Greece.",
    stack: ['Mechanical Design', 'Team Leadership', 'Cascade Lift Mechanisms', 'Omni-Wheel Drivetrains'],
    result: 'Achieved a 2nd-of-193-countries finish with a robot featuring a 6-foot telescoping cascade lift and omni-wheel drivetrain.',
    href: '/projects/first-global-uae',
    photo: cardImage(firstGlobalUaePhoto, firstGlobalUaeSrcSet),
    summary:
      "Led the UAE's 22-member national team to a 2nd-of-193-countries finish at FIRST Global 2025 in Athens, Greece, building a robot with a 6-foot telescoping cascade lift and an omni-wheel drivetrain.",
    tools: 'Mechanical Design, Team Leadership, Cascade Lift Mechanisms, Omni-Wheel Drivetrains',
    facts: [
      'Led a 22-member national team as Robotics Vice President',
      'Robot featured a 6-foot telescoping cascade lift and omni-wheel drivetrain',
      '2nd-of-193-countries finish at FIRST Global 2025 in Athens, Greece',
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
