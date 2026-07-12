import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { PaperSheet } from '@/components/ui/PaperSheet';

export default function Ur10eWelding() {
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
        svg: (
          <svg viewBox="0 0 400 250" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-foreground/80">
            <rect x="60" y="200" width="80" height="20" />
            <path d="M 80 200 L 120 200 L 100 160 Z" />
            <circle cx="100" cy="160" r="15" />
            <path d="M 100 145 L 180 80" />
            <circle cx="180" cy="80" r="15" />
            <path d="M 195 80 L 260 120" />
            <circle cx="260" cy="120" r="15" />
            <path d="M 270 130 L 300 160" />
            <path d="M 300 160 L 310 180" className="stroke-primary" strokeWidth="3" />
            <path d="M 310 180 L 305 190" className="stroke-primary" />
            <path d="M 310 200 Q 340 180 370 200" strokeDasharray="6 6" className="stroke-[hsl(var(--accent))]" strokeWidth="2" />
            <path d="M 290 220 L 390 220" strokeWidth="4" />
          </svg>
        )
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
