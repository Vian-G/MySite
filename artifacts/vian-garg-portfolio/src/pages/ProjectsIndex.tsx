import { useState } from 'react';
import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { FolderTab } from '@/components/ui/FolderTab';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import { useActiveSection } from '@/hooks/use-active-section';
import { usePageTransition } from '@/components/layout/PageTransitionOverlay';
import { AnimatePresence, motion } from 'framer-motion';
import { ExpandableProjectCard, ICON_MERGE_LAYOUT_ID, type ProjectCardData } from '@/components/projects/ExpandableProjectCard';
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

export default function ProjectsIndex() {
  useSEO('Engineering Work | Vian Garg', 'Projects spanning rover systems, industrial automation, perception workflows, and interactive development.');

  const projects: ProjectCardData[] = [
    {
      id: "01",
      title: "CMU Moon Miners — NASA Lunabotics",
      role: "Mechanical / Robotics Engineer",
      summary: "Developing a high-payload autonomous lunar excavation rover. Designed and fabricated a metal track system achieving a drawbar-pull ratio of 1.55 on BP-1 lunar regolith simulant.",
      tools: "SolidWorks, CAD, Mechanical Design, Simulation, Robotics, Autonomous Systems",
      href: "/projects/moon-miners",
      photo: moonMinersPhoto,
      galleryPhotos: [moonMinersPhoto2, moonMinersPhoto3],
      facts: [
        "Drawbar-pull ratio of 1.55 on BP-1 lunar regolith simulant",
        "Won the Caterpillar "First Steps" Award for best first-year team",
        "First first-year team to score autonomous-navigation points at NASA Lunabotics",
      ],
    },
    {
      id: "02",
      title: "UR10e Cobot Welding",
      role: "Robotics Researcher",
      summary: "Developing a virtual cobot welding system that bridges human motion input to UR10e execution via URScript. Engineered remote validation infrastructure for script testing.",
      tools: "UR10e, URScript, Python, Industrial Robotics, SSH, Automation",
      href: "/projects/ur10e-welding",
      photo: ur10ePhoto,
      galleryPhotos: [ur10ePhoto2, ur10ePhoto3],
      facts: [
        "Bridges human motion input to UR10e execution via URScript",
        "Remote script validation over the CMU VPN via SSH — no in-person lab access required",
        "Active research at CMU's Engineering Materials for Transformative Technologies Lab",
      ],
    },
    {
      id: "03",
      title: "MoonRanger — NASA Lunar Rover Mission",
      role: "Mechanical Engineer",
      summary: "A CMU / Astrobotic / NASA Ames autonomous lunar rover launching in 2029 to search for water ice at the Moon's south pole. Redesigned the camera shroud housing its stereo-vision nav[...]
      tools: "SolidWorks, CAD, Mechanical Design, Stereo Vision Hardware Integration",
      href: "/projects/moon-ranger",
      photo: moonRangerPhoto,
      galleryPhotos: [moonRangerPhoto2, moonRangerPhoto3],
      facts: [
        "Suitcase-sized rover built to operate a full lunar day (~14 Earth days)",
        "Redesigned the camera shroud protecting its stereo-vision navigation sensors",
        "Launches 2029 aboard Firefly Aerospace's Blue Ghost lander to the lunar south pole",
      ],
    },
    {
      id: "04",
      title: "Skyryder",
      type: "Interactive Work / Playable Project",
      summary: "Skyryder is an original playable game project, published independently on itch.io.",
      href: "/projects/skyryder",
      photo: skyryderPhoto,
      galleryPhotos: [skyryderPhoto2, skyryderPhoto3],
      facts: [
        "Original playable game project, designed and built independently",
        "Published and playable free on itch.io",
      ],
    },
    {
      id: "05",
      title: "SPIRIT Buggy — CMU Buggy",
      role: "Assistant Build Lead",
      summary: "CMU Buggy's first new carbon-fiber vehicle design in over fifteen years. Introduced a male-mold construction method new to the team and designed a steering assembly validated in AN[...]
      tools: "SolidWorks, ANSYS, Carbon Fiber Layup, Composite Fabrication",
      href: "/projects/spirit-buggy",
      photo: spiritBuggyPhoto,
      galleryPhotos: [spiritBuggyPhoto2, spiritBuggyPhoto3],
      facts: [
        "First new carbon-fiber buggy design fielded by CMU Buggy in over fifteen years",
        "First male-mold construction method used in CMU Buggy's fabrication history",
        "Nomex honeycomb core sandwiched between carbon-fiber weave layups",
      ],
    },
    {
      id: "06",
      title: "FIRST Global Team UAE 2025",
      role: "National Robotics Vice President",
      summary: "Led the UAE's 22-member national team to a 2nd-of-193-countries finish at FIRST Global 2025 in Athens, Greece, building a robot with a 6-foot telescoping cascade lift and an omni-[...]
      tools: "Mechanical Design, Team Leadership, Cascade Lift Mechanisms, Omni-Wheel Drivetrains",
      href: "/projects/first-global-uae",
      photo: firstGlobalUaePhoto,
      galleryPhotos: [firstGlobalUaePhoto2, firstGlobalUaePhoto3],
      facts: [
        "Led a 22-member national team as Robotics Vice President",
        "Robot featured a 6-foot telescoping cascade lift and omni-wheel drivetrain",
        "2nd-of-193-countries finish at FIRST Global 2025 in Athens, Greece",
      ],
    }
  ];

  const projectIds = projects.map(p => `project-${p.id}`);
  const activeProjectId = useActiveSection(projectIds, 0.4);
  const { navigateWithFlash } = usePageTransition();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-16">
      <FolderTab />
      
      <div className="flex flex-col gap-6 items-start -mt-4">
        <MetalDataPlate>PROJECT ARCHIVE / 06 ENTRIES</MetalDataPlate>
        <div className="flex flex-col gap-4 max-w-2xl">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">Engineering work</h1>
          <p className="font-sans text-lg text-muted-foreground">
            Projects spanning rover systems, industrial automation, perception workflows, and interactive development.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4 relative">
        <div className="lg:col-span-8 flex flex-col gap-12">
          {projects.map((prj, i) => (
            <ExpandableProjectCard
              key={prj.id}
              project={prj}
              index={i}
              isExpanded={expandedId === prj.id}
              onHoverStart={() => setExpandedId(prj.id)}
              onHoverEnd={() => setExpandedId((id) => (id === prj.id ? null : id))}
              onRequestExpand={() => setExpandedId(prj.id)}
              onNavigate={() => navigateWithFlash(prj.href)}
            />
          ))}
        </div>
        
        <div className="hidden lg:block lg:col-span-4 relative">
          <div className="sticky top-24 w-full aspect-square border border-border/50 bg-[#E8E6D9] p-6 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
            <AnimatePresence initial={false}>
              {!expandedId && (
                <motion.div
                  key="sticky-icon"
                  layoutId={ICON_MERGE_LAYOUT_ID}
                  className="w-full h-full"
                  exit={{ opacity: 0 }}
                >
                  <SystemsRibbonSvg activeState={(activeProjectId || '01') as any} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
