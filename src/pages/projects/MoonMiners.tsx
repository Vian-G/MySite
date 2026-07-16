import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import moonMinersPhoto from '@/assets/projects/moon-miners.jpg';
import moonMinersPhoto2 from '@/assets/projects/moon-miners-2.jpg';
import moonMinersPhoto3 from '@/assets/projects/moon-miners-3.jpg';
import moonMinersPhoto4 from '@/assets/projects/moon-miners-4.jpg';

export default function MoonMiners() {
  useSEO('Moon Miners — NASA Lunabotics | Vian Garg', 'Mechanical and robotics contributions to a lunar excavation rover.');

  return (
    <ProjectLayout
      slug="moon-miners"
      plateText="PROJECT 01 / ROVER SYSTEMS"
      title="CMU Moon Miners — NASA Lunabotics"
      subtitle="Mechanical and robotics contributions to a lunar excavation rover."
      metadata={[
        { key: 'ROLE', value: 'Mechanical / Robotics Engineer' },
        { key: 'CONTEXT', value: 'CMU Moon Miners — NASA Lunabotics' },
        { key: 'TOOLS', value: 'SolidWorks, CAD, Mechanical Design, Simulation, Robotics, Autonomous Systems' },
        { key: 'TIMEFRAME', value: 'Jan 2026 – Present' },
        { key: 'STATUS', value: 'Active' },
      ]}
      brief="Mechanical and robotics contributions to a lunar excavation rover for the NASA Lunabotics competition."
      objective="Design and fabricate a high-payload autonomous lunar excavation rover capable of scoring autonomous-navigation points at the NASA Lunabotics competition."
      workedOn={[
        'Built a high-payload autonomous lunar excavation rover',
        'Designed and fabricated a metal track system',
        'Tuned Nav2 voxel-costmap parameters to match the rover\'s physical mobility constraints and track geometry',
      ]}
      approach={[
        'SolidWorks',
        'Mechanical Design',
        'Simulation',
        'Nav2',
        'Autonomous Systems',
      ]}
      challenges={[
        'Achieving required drawbar-pull ratio on lunar regolith simulant.',
        'Matching autonomous navigation parameters to physical track geometry constraints.',
      ]}
      primaryFigure={{
        label: 'SYSTEM SCHEMATIC / CONCEPTUAL',
        svg: <SystemsRibbonSvg activeState="01" />,
      }}
      reinforced="Designed and fabricated a metal track system achieving a drawbar-pull ratio of 1.55 on BP-1 lunar regolith simulant. Won the Caterpillar 'First Steps' Award for best first-year team, and was the first first-year team to score autonomous-navigation points at the NASA Lunabotics competition."
      photos={[
        { src: moonMinersPhoto, caption: 'Team photo at University of Central Florida', altText: 'Team photo at University of Central Florida' },
        { src: moonMinersPhoto2, caption: 'Exploded CAD view', altText: 'Exploded CAD view' },
        { src: moonMinersPhoto3, caption: 'ATLAS Robot in Exolith Lab Arena', altText: 'ATLAS Robot in Exolith Lab Arena' },
        { src: moonMinersPhoto4, caption: 'Mobility test bed', altText: 'Mobility test bed for evaluating rover performance' },
      ]}
      links={[
        { label: 'Moon Miners', href: 'https://cmu-moon-miners.com' },
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
