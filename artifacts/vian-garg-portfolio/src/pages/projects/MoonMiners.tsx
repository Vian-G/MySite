import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';

export default function MoonMiners() {
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
        svg: (
          <svg viewBox="0 0 400 250" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-foreground/80">
            <path d="M 80 160 L 320 160 L 320 120 L 80 120 Z" />
            <circle cx="120" cy="180" r="30" />
            <circle cx="200" cy="180" r="30" />
            <circle cx="280" cy="180" r="30" />
            <path d="M 280 120 L 280 60 L 340 60" className="stroke-primary" strokeWidth="3" />
            <path d="M 340 50 L 360 60 L 340 70 Z" className="stroke-primary" />
            <path d="M 120 160 L 120 150" />
            <path d="M 200 160 L 200 150" />
            <path d="M 280 160 L 280 150" />
            <rect x="140" y="130" width="80" height="20" strokeDasharray="4 4" />
          </svg>
        )
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
