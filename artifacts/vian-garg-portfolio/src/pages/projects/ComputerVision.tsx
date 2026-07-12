import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';

export default function ComputerVision() {
  useSEO('Computer Vision / Weld-Waypoint Detection | Vian Garg', 'Software workflows for sensing, vision, and robotic automation.');

  return (
    <ProjectLayout
      plateText="PROJECT 03 / PERCEPTION SYSTEMS"
      title="Computer Vision / Weld-Waypoint Detection"
      subtitle="Software workflows for sensing, vision, and robotic automation."
      metadata={{
        ROLE: "Robotics Researcher",
        CONTEXT: "Engineering Materials for Transformative Technologies Lab, CMU",
        TOOLS: "Python, Computer Vision, Sensors, URScript",
        TIMEFRAME: "May 2026 – Present",
        STATUS: "Active"
      }}
      brief="The perception layer of the cobot welding research project, focusing on identifying weld waypoints from sensor data."
      objective="Convert computer-vision-detected weld waypoints into structured, executable instructions for a UR10e collaborative robot."
      workedOn={[
        "Built a Python pipeline that detects weld waypoints using computer vision",
        "Converted visual waypoint data into cobot-executable URScript instructions"
      ]}
      approach={[
        "Python",
        "Computer Vision",
        "Sensors",
        "Data Transformation",
        "URScript"
      ]}
      challenges={[
        "Accurately detecting waypoints in visually noisy industrial environments.",
        "Translating 2D/3D visual coordinates into the robot's physical execution space."
      ]}
      primaryFigure={{
        label: "PERCEPTION WORKFLOW / CONCEPTUAL",
        svg: <SystemsRibbonSvg activeState="03" />
      }}
      reinforced="Successfully built a Python pipeline that converts computer-vision-detected weld waypoints into cobot-executable URScript instructions, enabling the perception half of the cobot welding system."
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