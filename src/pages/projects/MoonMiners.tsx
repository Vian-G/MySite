import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import moonMinersPhoto from '@/assets/projects/moon-miners.jpg';
import moonMinersPhoto2 from '@/assets/projects/moon-miners-2.jpg';
import moonMinersPhoto3 from '@/assets/projects/moon-miners-3.jpg';

export default function MoonMiners() {
  useSEO('Moon Miners — NASA Lunabotics | Vian Garg', 'Mechanical and robotics contributions to a lunar excavation rover.');

  return (
    <ProjectLayout
      slug="moon-miners"
      plateText="PROJECT 01 / ROVER SYSTEMS"
      title="CMU Moon Miners — NASA Lunabotics"
      subtitle="Mechanical and robotics contributions to a lunar excavation rover."
      metadata={{
        ROLE: "Mechanical / Robotics Engineer",
        CONTEXT: "CMU Moon Miners — NASA Lunabotics",
        TOOLS: "SolidWorks, CAD, Mechanical Design, Simulation, Robotics, Autonomous Systems",
        TIMEFRAME: "Jan 2026 – Present",
        STATUS: "Active"
      }}
      brief="Mechanical and robotics contributions to a lunar excavation rover for the NASA Lunabotics competition."
      objective="Design and fabricate a high-payload autonomous lunar excavation rover capable of scoring autonomous-navigation points at the NASA Lunabotics competition."
      workedOn={[
        "Built a high-payload autonomous lunar excavation rover",
        "Designed and fabricated a metal track system",
        "Tuned Nav2 voxel-costmap parameters to match the rover's physical mobility constraints and track geometry"
      ]}
      approach={[
        "SolidWorks",
        "Mechanical Design",
        "Simulation",
        "Nav2",
        "Autonomous Systems"
      ]}
      challenges={[
        "Achieving required drawbar-pull ratio on lunar regolith simulant.",
        "Matching autonomous navigation parameters to physical track geometry constraints."
      ]}
      primaryFigure={{
        label: "SYSTEM SCHEMATIC / CONCEPTUAL",
        svg: <SystemsRibbonSvg activeState="01" />
      }}
      reinforced="Designed and fabricated a metal track system achieving a drawbar-pull ratio of 1.55 on BP-1 lunar regolith simulant. Won the Caterpillar 'First Steps' Award for best first-year team, and was the first first-year team to score autonomous-navigation points at the NASA Lunabotics competition."
      photos={[
        { src: moonMinersPhoto, caption: 'Rover on the competition field', altText: 'CMU Moon Miners rover on the competition field' },
        { src: moonMinersPhoto2, caption: 'Metal track fabrication', altText: 'Metal track system fabrication detail' },
        { src: moonMinersPhoto3, caption: 'Autonomous navigation test', altText: 'Rover during autonomous navigation testing' },
      ]}
      slots={
        <>
          <TechnicalFigure caption="Rover CAD render" altText="Reserved figure slot for Rover CAD render" isSlot />
          <TechnicalFigure caption="Build photo" altText="Reserved figure slot for Build photo" isSlot />
          <TechnicalFigure caption="Integration test" altText="Reserved figure slot for Integration test" isSlot />
        </>
      }
    />
  );
}
