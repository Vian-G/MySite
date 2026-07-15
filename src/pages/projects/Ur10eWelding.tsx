import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import ur10ePhoto from '@/assets/projects/ur10e.jpg';
import ur10ePhoto2 from '@/assets/projects/ur10e-2.jpg';
import ur10ePhoto3 from '@/assets/projects/ur10e-3.jpg';

export default function Ur10eWelding() {
  useSEO('UR10e Cobot Welding | Vian Garg', 'Developing a virtual cobot welding system bridging human motion to UR10e execution.');

  return (
    <ProjectLayout
      slug="ur10e-welding"
      plateText="PROJECT 02 / COBOT SYSTEMS"
      title="UR10e Cobot Welding"
      subtitle="Developing a virtual cobot welding system bridging human motion to execution."
      metadata={[
        { key: 'ROLE', value: 'Robotics Researcher' },
        { key: 'CONTEXT', value: 'CMU Engineering Materials for Transformative Technologies Lab' },
        { key: 'TOOLS', value: 'UR10e, URScript, Python, Industrial Robotics, SSH, Automation' },
        { key: 'TIMEFRAME', value: 'Jan 2026 – Present' },
        { key: 'STATUS', value: 'Active' },
      ]}
      brief="Developing a virtual cobot welding system that bridges human motion input to UR10e execution via URScript."
      objective="Engineer a system that translates human operator motion into validated UR10e robot programs, with remote testing infrastructure over VPN."
      workedOn={[
        'Bridged human motion input to UR10e execution via URScript',
        'Engineered remote validation infrastructure for uploading and testing scripts over VPN via SSH',
        'Mapped the full motion-capture pipeline end-to-end before writing a line of URScript',
      ]}
      approach={[
        'UR10e',
        'URScript',
        'Python',
        'EtherNet/IP',
        'SSH',
        'Industrial Robotics',
      ]}
      challenges={[
        'Mapping the complete motion-capture-to-execution pipeline before implementation.',
        'Remote script validation without physical lab access.',
      ]}
      primaryFigure={{
        label: 'SYSTEM SCHEMATIC / CONCEPTUAL',
        svg: <SystemsRibbonSvg activeState="02" />,
      }}
      reinforced="Engineered remote validation infrastructure for uploading and testing URScript programs over the CMU VPN via SSH — no in-person lab access required. Active research at CMU's Engineering Materials for Transformative Technologies Lab."
      photos={[
        { src: ur10ePhoto, caption: 'UR10e robot arm', altText: 'UR10e six-axis cobot arm in the CMU lab' },
        { src: ur10ePhoto2, caption: 'URScript interface', altText: 'URScript programming interface and terminal output' },
        { src: ur10ePhoto3, caption: 'Motion capture setup', altText: 'Motion capture system used for human input recording' },
      ]}
      slots={
        <>
          <TechnicalFigure caption="Robot arm configuration" altText="Reserved figure slot for robot arm configuration diagram" isSlot />
          <TechnicalFigure caption="Pipeline diagram" altText="Reserved figure slot for motion-to-execution pipeline diagram" isSlot />
          <TechnicalFigure caption="Test run output" altText="Reserved figure slot for script test run output" isSlot />
        </>
      }
    />
  );
}
