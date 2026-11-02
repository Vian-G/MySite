import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import yaskawaDiagram from '@/assets/projects/yaskawa-welding.svg';
import ur10ePhoto from '@/assets/projects/ur10e.jpg?format=webp&w=1280&quality=82';
import ur10ePhoto2 from '@/assets/projects/ur10e-2.jpg?format=webp&w=1280&quality=82';
import ur10ePhoto3 from '@/assets/projects/ur10e-3.jpg?format=webp&w=1280&quality=82';

export default function EmitLab() {
  useSEO('EMIT Lab — Robotic Welding | Vian Garg', 'Robotic welding research at CMU EMIT Lab: UR10e motion recreation and Yaskawa experiment software, simulation, and logging.');

  return (
    <ProjectLayout
      slug="emit-lab"
      plateText="PROJECT 02 / EMIT LAB"
      title="EMIT Lab — Robotic Welding"
      subtitle="Human-motion recreation and industrial welding experiment software at CMU."
      metadata={[
        { key: 'ROLE', value: 'Robotics Researcher' },
        { key: 'CONTEXT', value: 'CMU Engineering Materials for Transformative Technologies Lab' },
        { key: 'TOOLS', value: 'UR10e, URScript, Python, MATLAB, C++, YMConnect, ESAB' },
        { key: 'TIMEFRAME', value: 'Jan 2026 – Present' },
        { key: 'STATUS', value: 'Active' },
      ]}
      brief="My work at CMU's EMIT Lab spans two robotic welding workstreams: recreating human motion on a UR10e cobot, and developing MATLAB/C++ software for Yaskawa welding experiments. Both connect operator intent to inspectable robot workflows, with simulation and recorded evidence supporting validation."
      objective="Build tools that connect human motion and experiment preparation to reviewed robot programs, while keeping offline validation distinct from physical operation."
      workedOn={[
        'Bridged human motion input to UR10e execution via URScript',
        'Engineered remote validation infrastructure for uploading and testing scripts over VPN via SSH',
        'Mapped the full motion-capture pipeline end-to-end before writing a line of URScript',
        'Developed a MATLAB experiment interface and C++ gateway for Yaskawa robot jobs, ESAB welding integration, simulation, and session logging',
      ]}
      approach={[
        'UR10e',
        'URScript',
        'Python',
        'EtherNet/IP',
        'SSH',
        'Industrial Robotics',
        'MATLAB / C++',
        'YMConnect / INFORM',
        'ESAB integration',
        'Offline simulation',
      ]}
      challenges={[
        'Mapping the complete motion-capture-to-execution pipeline before implementation.',
        'Remote script validation without physical lab access.',
        'Keeping job review and experiment preparation separate from explicit live actions.',
      ]}
      primaryFigure={{
        label: 'ROBOTIC WELDING / ANIMATED ILLUSTRATION',
        svg: <SystemsRibbonSvg activeState="02" />,
        caption: 'Animated robot-arm illustration. The software architecture diagram is shown separately below.',
      }}
      reinforced="Built remote URScript validation infrastructure and a shared interface for Yaskawa welding experiments. The October 28, 2026 report records 215 passing Yaskawa offline tests after rebuilding the gateway, plus 12 additional affected layout tests. Simulation, mocks, and native fake transport support software validation; they do not establish physical robot or welding operation. Live Yaskawa workflow acceptance remains pending."
      photos={[
        { src: ur10ePhoto, caption: 'UR10e robot arm', altText: 'UR10e six-axis cobot arm in the CMU lab' },
        { src: ur10ePhoto2, caption: 'ESAB U82 Welder', altText: 'ESAB U82 Welder used in the welding process' },
        { src: ur10ePhoto3, caption: 'Motion capture setup', altText: 'Motion capture system used for human input recording' },
      ]}
      links={[
        { label: 'CMU EMIT Lab', href: 'https://www.meche.engineering.cmu.edu/faculty/emit-lab.html' },
        { label: 'GitHub - Weld-Recreation', href: 'https://github.com/CMU-EMIT-Lab/Weld-Recreation' }
      ]}
      slots={
        <>
          <section aria-labelledby="ur10e-workstream" className="flex flex-col gap-4">
            <h3 id="ur10e-workstream" className="font-serif text-2xl">UR10e / Human-motion recreation</h3>
            <p className="leading-relaxed">I mapped the motion-capture pipeline end to end and developed the URScript layer connecting human motion to UR10e execution. Remote upload and script testing over VPN and SSH made it possible to inspect programs without being in the lab.</p>
          </section>
          <section aria-labelledby="yaskawa-workstream" className="flex flex-col gap-4">
            <h3 id="yaskawa-workstream" className="font-serif text-2xl">Yaskawa / Welding experiment software</h3>
            <p className="leading-relaxed">I developed MATLAB workspaces backed by a C++ gateway to YMConnect for motion preparation, ESAB status and parameter workflows, diagnostics, and experiment logging.</p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>INFORM job editing, preview, and upload/readback workflows, with job review separated from execution.</li>
              <li>Connection state, reviewed jobs, HOLD, and global STOP remain visible while navigating long experiment forms.</li>
              <li>Navigation and resizing preserve experiment drafts and queued targets without issuing commands.</li>
              <li>Simulation, mocks, and native fake transport validate behavior without a real controller connection.</li>
            </ul>
            <TechnicalFigure src={yaskawaDiagram} label="YASKAWA SOFTWARE ARCHITECTURE / CONCEPTUAL" caption="MATLAB experiment interface, C++ gateway, and Yaskawa/ESAB workflows, supported by simulation and session logging. Live workflow acceptance remains pending." altText="Software architecture diagram connecting MATLAB through a C++ gateway to Yaskawa and ESAB workflows, with simulation and logging." />
          </section>
        </>
      }
    />
  );
}
