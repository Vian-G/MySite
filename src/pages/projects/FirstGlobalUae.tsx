import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import firstGlobalUaePhoto from '@/assets/projects/first-global-uae.jpg';
import firstGlobalUaePhoto2 from '@/assets/projects/first-global-uae-2.jpg';
import firstGlobalUaePhoto3 from '@/assets/projects/first-global-uae-3.jpg';

export default function FirstGlobalUae() {
  useSEO('FIRST Global Team UAE 2025 | Vian Garg', "Led the UAE's national team to a 2nd-of-193-countries finish at FIRST Global 2025.");

  return (
    <ProjectLayout
      slug="first-global-uae"
      plateText="PROJECT 06 / COMPETITION ROBOTICS"
      title="FIRST Global Team UAE 2025"
      subtitle="Led the UAE's 22-member national team at FIRST Global 2025 in Athens, Greece."
      metadata={[
        { key: 'ROLE', value: 'National Robotics Vice President' },
        { key: 'CONTEXT', value: 'FIRST Global 2025 — Athens, Greece' },
        { key: 'TOOLS', value: 'Mechanical Design, Team Leadership, Cascade Lift Mechanisms, Omni-Wheel Drivetrains' },
        { key: 'TIMEFRAME', value: 'Jun 2025 – Jul 2025' },
        { key: 'STATUS', value: 'Completed' },
      ]}
      brief="Led the UAE's 22-member national team to a 2nd-of-193-countries finish at FIRST Global 2025 in Athens, Greece."
      objective="Build a competition robot and lead the UAE national team to a top finish at FIRST Global 2025."
      workedOn={[
        'Led a 22-member national team as Robotics Vice President',
        'Designed a robot with a 6-foot telescoping cascade lift',
        'Implemented an omni-wheel drivetrain for omnidirectional mobility',
      ]}
      approach={[
        'Mechanical Design',
        'Team Leadership',
        'Cascade Lift Mechanisms',
        'Omni-Wheel Drivetrains',
      ]}
      challenges={[
        'Designing a reliable 6-foot cascade lift within competition weight and size limits.',
        'Coordinating a 22-member team across design, build, and competition phases.',
      ]}
      primaryFigure={{
        label: 'SYSTEM SCHEMATIC / CONCEPTUAL',
        svg: <SystemsRibbonSvg activeState="06" />,
      }}
      reinforced="Achieved a 2nd-of-193-countries finish with a robot featuring a 6-foot telescoping cascade lift and omni-wheel drivetrain. Led a 22-member national team as Robotics Vice President at FIRST Global 2025 in Athens, Greece."
      photos={[
        { src: firstGlobalUaePhoto, caption: 'Team UAE at FIRST Global 2025', altText: 'Team UAE at the FIRST Global 2025 competition in Athens' },
        { src: firstGlobalUaePhoto2, caption: 'Cascade lift mechanism', altText: '6-foot telescoping cascade lift mechanism on the competition robot' },
        { src: firstGlobalUaePhoto3, caption: 'Competition robot', altText: 'Full competition robot with omni-wheel drivetrain on the field' },
      ]}
      slots={
        <>
          <TechnicalFigure caption="Robot CAD" altText="Reserved figure slot for competition robot CAD" isSlot />
          <TechnicalFigure caption="Cascade lift detail" altText="Reserved figure slot for cascade lift mechanism detail" isSlot />
          <TechnicalFigure caption="Competition field" altText="Reserved figure slot for robot on competition field" isSlot />
        </>
      }
    />
  );
}
