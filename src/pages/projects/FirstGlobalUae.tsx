import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';

export default function FirstGlobalUae() {
  useSEO('FIRST Global Team UAE | Vian Garg', 'National Robotics Vice President leading a 22-member team to a 2nd-of-193-countries finish in Athens, Greece.');

  return (
    <ProjectLayout
      slug="first-global-uae"
      plateText="PROJECT 06 / COMPETITION LEADERSHIP"
      title="FIRST Global Team UAE 2025"
      subtitle="National Robotics Vice President leading a 22-member national team to a record-breaking international finish."
      metadata={{
        ROLE: "National Robotics Vice President",
        CONTEXT: "FIRST Global Team UAE",
        TOOLS: "Mechanical Design, Team Leadership, Cascade Lift Mechanisms, Omni-Wheel Drivetrains",
        TIMEFRAME: "2025",
        STATUS: "Complete"
      }}
      brief="FIRST Global is an international robotics competition bringing together teams from nearly every country in the world. As National Robotics Vice President, I helped lead the UAE's 22-member national team through robot design, build, and competition at the 2025 event in Athens, Greece."
      objective="Lead the mechanical design and construction of a competition robot built around a 6-foot telescoping cascade lift and an omni-wheel drivetrain, while coordinating a 22-member national team through the build season."
      workedOn={[
        "Led the UAE's 22-member national team as Robotics Vice President",
        "Directed mechanical design and build of a robot featuring a 6-foot telescoping cascade lift",
        "Built an omni-wheel drivetrain for full omni-directional maneuverability on the competition field",
        "Coordinated team logistics, build schedule, and technical strategy through international competition"
      ]}
      approach={[
        "Mechanical Design",
        "Cascade Lift Mechanisms",
        "Omni-Wheel Drivetrains",
        "Team Leadership"
      ]}
      challenges={[
        "Engineering a 6-foot telescoping lift stable and rigid enough for competition use within tight weight and space budgets.",
        "Coordinating a 22-member national team through a compressed international build and travel schedule.",
        "Tuning an omni-wheel drivetrain for reliable control under competition conditions."
      ]}
      primaryFigure={{
        label: "LIFT MECHANISM SCHEMATIC / CONCEPTUAL",
        svg: <SystemsRibbonSvg activeState="06" />
      }}
      reinforced="Led the UAE's 22-member national team to a 2nd-of-193-countries finish at FIRST Global 2025 in Athens, Greece — a record-breaking result built on a robot with a 6-foot telescoping cascade lift and an omni-wheel drivetrain."
      slots={
        <>
          <TechnicalFigure caption="Omni-wheel drivetrain" altText="Reserved figure slot for Omni-wheel drivetrain" isSlot />
          <TechnicalFigure caption="Team with completed robot" altText="Reserved figure slot for Team with completed robot" isSlot />
        </>
      }
    />
  );
}
