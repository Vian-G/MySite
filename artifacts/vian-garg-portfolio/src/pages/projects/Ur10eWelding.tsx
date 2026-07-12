import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { PaperSheet } from '@/components/ui/PaperSheet';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';

export default function Ur10eWelding() {
  useSEO('UR10e Welding Automation | Vian Garg', 'Integrating collaborative robotics with industrial welding equipment.');

  const approachComposition = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      <PaperSheet variant="default" className="p-4 border-dashed border-border/60 bg-transparent flex flex-col gap-2 shadow-none">
        <span className="font-mono text-[10px] text-muted-foreground uppercase">System 01</span>
        <span className="font-mono text-sm text-foreground">Robot</span>
        <span className="font-mono text-sm text-foreground">URScript control</span>
      </PaperSheet>
      
      <PaperSheet variant="default" className="p-4 border-dashed border-border/60 bg-transparent flex flex-col gap-2 shadow-none">
        <span className="font-mono text-[10px] text-muted-foreground uppercase">System 02</span>
        <span className="font-mono text-sm text-foreground">Welding equipment</span>
      </PaperSheet>
      
      <div className="md:col-span-2 mt-2">
        <PaperSheet variant="default" className="p-4 border border-primary/30 bg-primary/5 flex flex-col gap-2">
          <span className="font-mono text-[10px] text-primary uppercase">Interface</span>
          <span className="font-mono text-sm text-foreground">Industrial communication</span>
          <span className="font-mono text-sm text-foreground">EtherNet/IP / fieldbus investigation</span>
        </PaperSheet>
      </div>
    </div>
  );

  return (
    <ProjectLayout
      plateText="PROJECT 02 / INDUSTRIAL AUTOMATION"
      title="UR10e Welding Automation"
      subtitle="Integrating collaborative robotics with industrial welding equipment."
      metadata={{
        ROLE: "Robotics Integration Engineer",
        CONTEXT: "UR10e Welding Automation",
        TOOLS: "UR10e, ESAB, URScript, Python, EtherNet/IP, Fieldbus, Industrial Robotics, Automation"
      }}
      brief="Worked on integrating a UR10e collaborative robot with an ESAB welding system, with a focus on robot programming and industrial communication."
      workedOn={[
        "Integrated a UR10e collaborative robot with an ESAB welding system",
        "Worked with URScript programming",
        "Investigated EtherNet/IP and fieldbus integration",
        "Contributed to industrial robotics and automation workflows"
      ]}
      approach={approachComposition}
      primaryFigure={{
        label: "INTEGRATION SCHEMATIC / CONCEPTUAL",
        svg: <SystemsRibbonSvg activeState="02" />
      }}
      reinforced="This project focused attention on the interfaces that make industrial automation work: robot programming, equipment integration, and reliable communication."
      prevLink={{ href: "/projects/moon-miners", label: "01 / MOON MINERS" }}
      nextLink={{ href: "/projects/computer-vision", label: "03 / VISION" }}
      slots={
        <>
          <TechnicalFigure caption="Integration photo" altText="" isSlot />
          <TechnicalFigure caption="Wiring diagram" altText="" isSlot />
          <TechnicalFigure caption="Commissioning evidence" altText="" isSlot />
        </>
      }
    />
  );
}
