import moonMinersPhoto from '@/assets/projects/moon-miners.jpg';
import moonMinersPhoto2 from '@/assets/projects/moon-miners-2.jpg';
import moonMinersPhoto3 from '@/assets/projects/moon-miners-3.jpg';
import ur10ePhoto from '@/assets/projects/ur10e.jpg';
import ur10ePhoto2 from '@/assets/projects/ur10e-2.jpg';
import ur10ePhoto3 from '@/assets/projects/ur10e-3.jpg';
import moonRangerPhoto from '@/assets/projects/moon-ranger.jpg';
import moonRangerPhoto2 from '@/assets/projects/moon-ranger-2.jpg';
import moonRangerPhoto3 from '@/assets/projects/moon-ranger-3.jpg';
import skyryderPhoto from '@/assets/projects/skyryder.jpg';
import skyryderPhoto2 from '@/assets/projects/skyryder-2.jpg';
import skyryderPhoto3 from '@/assets/projects/skyryder-3.jpg';
import spiritBuggyPhoto from '@/assets/projects/spirit-buggy.jpg';
import spiritBuggyPhoto2 from '@/assets/projects/spirit-buggy-2.jpg';
import spiritBuggyPhoto3 from '@/assets/projects/spirit-buggy-3.jpg';
import firstGlobalUaePhoto from '@/assets/projects/first-global-uae.jpg';
import firstGlobalUaePhoto2 from '@/assets/projects/first-global-uae-2.jpg';
import firstGlobalUaePhoto3 from '@/assets/projects/first-global-uae-3.jpg';

export type Project = {
  id: string;
  slug: string;
  title: string;
  role: string;
  problem: string;
  stack: string[];
  result: string;
  href: string;
  photo: string;
  type?: string;
  summary: string;
  tools: string;
  galleryPhotos: string[];
  facts: string[];
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
    photo: moonMinersPhoto,
    summary:
      'Developing a high-payload autonomous lunar excavation rover. Designed and fabricated a metal track system achieving a drawbar-pull ratio of 1.55 on BP-1 lunar regolith simulant.',
    tools: 'SolidWorks, CAD, Mechanical Design, Simulation, Robotics, Autonomous Systems',
    galleryPhotos: [moonMinersPhoto2, moonMinersPhoto3],
    facts: [
      'Drawbar-pull ratio of 1.55 on BP-1 lunar regolith simulant',
      'Won the Caterpillar “First Steps” Award for best first-year team',
      'First first-year team to score autonomous-navigation points at NASA Lunabotics',
    ],
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
    photo: ur10ePhoto,
    summary:
      'Developing a virtual cobot welding system that bridges human motion input to UR10e execution via URScript. Engineered remote validation infrastructure for script testing.',
    tools: 'UR10e, URScript, Python, Industrial Robotics, SSH, Automation',
    galleryPhotos: [ur10ePhoto2, ur10ePhoto3],
    facts: [
      'Bridges human motion input to UR10e execution via URScript',
      'Remote script validation over the CMU VPN via SSH — no in-person lab access required',
      "Active research at CMU's Engineering Materials for Transformative Technologies Lab",
    ],
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
    photo: moonRangerPhoto,
    summary:
      "A CMU / Astrobotic / NASA Ames autonomous lunar rover launching in 2029 to search for water ice at the Moon's south pole. Redesigned the camera shroud housing its stereo-vision navigation system.",
    tools: 'SolidWorks, CAD, Mechanical Design, Stereo Vision Hardware Integration',
    galleryPhotos: [moonRangerPhoto2, moonRangerPhoto3],
    facts: [
      'Suitcase-sized rover built to operate a full lunar day (~14 Earth days)',
      'Redesigned the camera shroud protecting its stereo-vision navigation sensors',
      "Launches 2029 aboard Firefly Aerospace's Blue Ghost lander to the lunar south pole",
    ],
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
    photo: skyryderPhoto,
    type: 'Interactive Work / Playable Project',
    summary: 'Skyryder is an original playable game project, published independently on itch.io.',
    tools: 'Game Design, Level Design, Itch.io',
    galleryPhotos: [skyryderPhoto2, skyryderPhoto3],
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
    photo: spiritBuggyPhoto,
    summary:
      "CMU Buggy's first new carbon-fiber vehicle design in over fifteen years. Introduced a male-mold construction method new to the team and designed a steering assembly validated in ANSYS before it raced.",
    tools: 'SolidWorks, ANSYS, Carbon Fiber Layup, Composite Fabrication',
    galleryPhotos: [spiritBuggyPhoto2, spiritBuggyPhoto3],
    facts: [
      'First new carbon-fiber buggy design fielded by CMU Buggy in over fifteen years',
      "First male-mold construction method used in CMU Buggy's fabrication history",
      'Nomex honeycomb core sandwiched between carbon-fiber weave layups',
    ],
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
    photo: firstGlobalUaePhoto,
    summary:
      "Led the UAE's 22-member national team to a 2nd-of-193-countries finish at FIRST Global 2025 in Athens, Greece, building a robot with a 6-foot telescoping cascade lift and an omni-wheel drivetrain.",
    tools: 'Mechanical Design, Team Leadership, Cascade Lift Mechanisms, Omni-Wheel Drivetrains',
    galleryPhotos: [firstGlobalUaePhoto2, firstGlobalUaePhoto3],
    facts: [
      'Led a 22-member national team as Robotics Vice President',
      'Robot featured a 6-foot telescoping cascade lift and omni-wheel drivetrain',
      '2nd-of-193-countries finish at FIRST Global 2025 in Athens, Greece',
    ],
  },
];
