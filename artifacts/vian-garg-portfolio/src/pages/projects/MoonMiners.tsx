import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';

export default function MoonMiners() {
  useSEO('Moon Miners — NASA Lunabotics | Vian Garg', 'Mechanical and robotics contributions to a lunar excavation rover.');

  return (
    <ProjectLayout
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
      prevLink={{ href: "/skyryder", label: "04 / SKYRYDER" }}
      nextLink={{ href: "/projects/ur10e-welding", label: "02 / UR10E" }}
      slots={
        <>
          <TechnicalFigure caption="Rover CAD render" altText="" isSlot />
          <TechnicalFigure caption="Build photo" altText="" isSlot />
          <TechnicalFigure caption="Integration test" altText="" isSlot />
        </>
      }
    />
  );
}