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
        TOOLS: "SolidWorks, CAD, Mechanical Design, Simulation, Robotics, Autonomous Systems"
      }}
      brief="Contributed to the design and analysis of rover components for a lunar excavation system, with work spanning CAD, mechanical design, simulation, and system integration."
      workedOn={[
        "Designed and analyzed rover components",
        "Supported CAD and mechanical design workflows",
        "Contributed to simulation and broader system integration",
        "Participated in autonomous rover development discussions, including navigation and path planning"
      ]}
      approach={[
        "CAD",
        "Mechanical design",
        "Simulation",
        "System integration",
        "Rover systems",
        "Navigation and path-planning discussion"
      ]}
      primaryFigure={{
        label: "SYSTEM SCHEMATIC / CONCEPTUAL",
        svg: <SystemsRibbonSvg activeState="01" />
      }}
      reinforced="Work on the rover connected mechanical component design with the broader demands of robotics integration and autonomous-system development."
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
