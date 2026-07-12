import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';

export default function ComputerVision() {
  return (
    <ProjectLayout
      plateText="PROJECT 03 / PERCEPTION SYSTEMS"
      title="Computer Vision Robotics Work"
      subtitle="Software workflows for sensing, vision, and robotic automation."
      metadata={{
        CONTEXT: "Computer Vision Robotics Work",
        TOOLS: "Python, Computer Vision, Sensors, Embedded Systems, Robotic Automation"
      }}
      brief="Developed software workflows combining computer vision, sensors, and robotic automation."
      approach={[
        "Python",
        "Computer vision",
        "Sensors",
        "Embedded systems",
        "Robotic automation"
      ]}
      primaryFigure={{
        label: "PERCEPTION WORKFLOW / CONCEPTUAL",
        svg: (
          <svg viewBox="0 0 400 250" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-foreground/80">
            <rect x="40" y="100" width="60" height="50" />
            <rect x="100" y="110" width="20" height="30" />
            <path d="M 120 110 L 350 40 L 350 210 L 120 140" strokeDasharray="4 4" className="stroke-primary" fill="currentColor" fillOpacity="0.05" />
            <circle cx="200" cy="90" r="8" className="stroke-[hsl(var(--accent))]" />
            <circle cx="280" cy="160" r="8" className="stroke-[hsl(var(--accent))]" />
            <circle cx="320" cy="100" r="8" className="stroke-[hsl(var(--accent))]" />
            <rect x="250" y="120" width="40" height="40" />
            <path d="M 200 98 L 250 120" strokeDasharray="2 2" className="stroke-[hsl(var(--accent))]/50" />
            <path d="M 280 152 L 270 160" strokeDasharray="2 2" className="stroke-[hsl(var(--accent))]/50" />
            <path d="M 320 108 L 290 120" strokeDasharray="2 2" className="stroke-[hsl(var(--accent))]/50" />
          </svg>
        )
      }}
      reinforced="Building perception-oriented workflows requires thinking across sensing, software, and the robotic system that uses the resulting information."
      prevLink={{ href: "/projects/ur10e-welding", label: "02 / UR10E" }}
      nextLink={{ href: "/skyryder", label: "04 / SKYRYDER" }}
      slots={
        <>
          <TechnicalFigure caption="Perception architecture diagram" altText="" isSlot />
          <TechnicalFigure caption="Sensing node demo" altText="" isSlot />
        </>
      }
    />
  );
}
