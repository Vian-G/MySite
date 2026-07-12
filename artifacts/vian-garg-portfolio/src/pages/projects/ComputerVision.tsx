import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';

export default function ComputerVision() {
  useSEO('Computer Vision Robotics | Vian Garg', 'Software workflows for sensing, vision, and robotic automation.');

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
        svg: <SystemsRibbonSvg activeState="03" />
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
