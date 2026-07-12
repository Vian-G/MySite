import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';

export default function MoonRanger() {
  useSEO('MoonRanger — NASA Lunar Rover Mission | Vian Garg', 'Mechanical contributions to a CMU / Astrobotic / NASA Ames autonomous lunar rover launching in 2029.');

  return (
    <ProjectLayout
      plateText="PROJECT 03 / LUNAR SURFACE MOBILITY"
      title="MoonRanger — NASA Lunar Rover Mission"
      subtitle="Mechanical contributions to a CMU / Astrobotic / NASA Ames autonomous lunar rover."
      metadata={{
        ROLE: "Mechanical Engineer",
        CONTEXT: "MoonRanger — Carnegie Mellon University / Astrobotic / NASA Ames Research Center",
        TOOLS: "SolidWorks, CAD, Mechanical Design, Stereo Vision Hardware Integration",
        TIMEFRAME: "Mission launch: 2029",
        STATUS: "Pre-launch / in development"
      }}
      brief="MoonRanger is a suitcase-sized autonomous rover developed by Carnegie Mellon University with Astrobotic and NASA's Ames Research Center. It carries a neutron spectrometer to investigate hydrogen-bearing volatiles in lunar regolith while demonstrating autonomous capabilities for polar exploration — designed to operate for a full lunar day (about fourteen Earth days) using stereo vision and onboard compute to navigate between waypoints without teleoperation from Earth. The rover is slated to fly on a 2029 mission aboard Firefly Aerospace's Blue Ghost lander, landing near the lunar south pole to search for evidence of water ice — one of the most consequential open questions for sustained human presence on the Moon."
      objective="Contribute to the mechanical design of MoonRanger's camera shroud — the housing that protects and positions the rover's stereo-vision navigation system, the same sensor suite the rover depends on for fully autonomous navigation across unmapped lunar terrain."
      workedOn={[
        "Redesigned the camera shroud housing MoonRanger's stereo-vision navigation system",
        "Contributed to mechanical hardware as part of the rover's mechanical engineering team"
      ]}
      approach={[
        "SolidWorks",
        "CAD",
        "Mechanical Design",
        "Stereo Vision Hardware Integration"
      ]}
      challenges={[
        "Ensuring the shroud protects the stereo-vision sensors without compromising the camera geometry the rover depends on for autonomous navigation.",
        "Working within the size, weight, and durability constraints of a suitcase-sized rover built to survive lunar surface conditions."
      ]}
      primaryFigure={{
        label: "SURFACE MOBILITY SCHEMATIC / CONCEPTUAL",
        svg: <SystemsRibbonSvg activeState="03" />
      }}
      reinforced="Mechanical engineer on MoonRanger, a CMU/Astrobotic/NASA autonomous lunar rover launching in 2029 to search for water ice at the Moon's south pole. Redesigned the camera shroud housing the rover's stereo-vision navigation system."
      prevLink={{ href: "/projects/ur10e-welding", label: "02 / UR10E" }}
      nextLink={{ href: "/skyryder", label: "04 / SKYRYDER" }}
      slots={
        <>
          <TechnicalFigure caption="Camera shroud CAD render" altText="" isSlot />
          <TechnicalFigure caption="Rover integration photo" altText="" isSlot />
        </>
      }
    />
  );
}
