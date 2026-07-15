import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import ur10ePhoto from '@/assets/projects/ur10e.jpg';
import ur10ePhoto2 from '@/assets/projects/ur10e-2.jpg';
import ur10ePhoto3 from '@/assets/projects/ur10e-3.jpg';

export default function Ur10eWelding() {
  useSEO('UR10e Welding Automation | Vian Garg', 'Integrating collaborative robotics with industrial welding equipment.');

  const approachComposition = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      <PaperSheet variant="default" className="p-4 border-dashed border-border/60 bg-transparent flex flex-col gap-2 shadow-none">
        <span className="font-mono text-[10px] text-muted-foreground uppercase">System 01</span>
        <span className="font-mono text-sm text-foreground">UR10e Cobot</span>
        <span className="font-mono text-sm text-foreground">URScript control</span>
      </PaperSheet>
      <PaperSheet variant="default" className="p-4 border-dashed border-border/60 bg-transparent flex flex-col gap-2 shadow-none">
        <span className="font-mono text-[10px] text-muted-foreground uppercase">System 02</span>
        <span className="font-mono text-sm text-foreground">Welding equipment</span>
      </PaperSheet>
      <div className="md:col-span-2 mt-2">
        <PaperSheet variant="default" className="p-4 border border-primary/30 bg-primary/5 flex flex-col gap-2">
          <span className="font-mono text-[10px] text-primary uppercase">Interface</span>
          <span className="font-mono text-sm text-foreground">Remote SSH / VPN</span>
          <span className="font-mono text-sm text-foreground">Human motion input</span>
        </PaperSheet>
      </div>
    </div>
  );

  return (
    <ProjectLayout
      slug="ur10e-welding"
      plateText="PROJECT 02 / INDUSTRIAL AUTOMATION"
      title="UR10e Cobot Welding"
      subtitle="Integrating collaborative robotics with industrial welding equipment."
      metadata={{
        ROLE: "Robotics Researcher",
        CONTEXT: "Engineering Materials for Transformative Technologies Lab, CMU",
        TOOLS: "UR10e, URScript, Python, SSH, Automation",
        TIMEFRAME: "May 2026 – Present",
        STATUS: "Active"
      }}
      brief="The robot-execution layer of a research project bridging human motion input to collaborative robot welding."
      objective="Develop a virtual cobot welding system that safely and accurately bridges human motion input to UR10e execution via URScript."
      workedOn={[
        "Developed a virtual cobot welding system bridging human motion to UR10e execution via URScript",
        "Engineered remote validation infrastructure for uploading and testing scripts over the CMU VPN via SSH"
      ]}
      approach={approachComposition}
      challenges={[
        "Ensuring safe and reliable execution of human-guided motion inputs on industrial cobot hardware.",
        "Testing and validating URScript execution remotely without requiring in-person lab access."
      ]}
      primaryFigure={{
        label: "INTEGRATION SCHEMATIC / CONCEPTUAL",
        svg: <SystemsRibbonSvg activeState="02" />
      }}
      reinforced="Engineered remote validation infrastructure for uploading and testing scripts over the CMU VPN via SSH, allowing the system to be tested and iterated upon rapidly without in-person lab access."
      photos={[
        { src: ur10ePhoto, caption: 'UR10e cobot arm setup', altText: 'UR10e collaborative robot arm in the lab' },
        { src: ur10ePhoto2, caption: 'Welding integration', altText: 'Cobot and welding equipment integration' },
        { src: ur10ePhoto3, caption: 'Remote validation setup', altText: 'Remote SSH validation infrastructure' },
      ]}
      links={[
        { label: 'EMIT Lab', href: 'https://www.meche.engineering.cmu.edu/faculty/emit-lab.html' },
      ]}
      slots={
        <>
          <TechnicalFigure caption="Integration photo" altText="Reserved figure slot for Integration photo" isSlot />
          <TechnicalFigure caption="Wiring diagram" altText="Reserved figure slot for Wiring diagram" isSlot />
          <TechnicalFigure caption="Commissioning evidence" altText="Reserved figure slot for Commissioning evidence" isSlot />
        </>
      }
    />
  );
}
