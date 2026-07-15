import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import moonRangerPhoto from '@/assets/projects/moon-ranger.jpg';
import moonRangerPhoto2 from '@/assets/projects/moon-ranger-2.jpg';
import moonRangerPhoto3 from '@/assets/projects/moon-ranger-3.jpg';

export default function MoonRanger() {
  useSEO('MoonRanger — NASA Lunar Rover | Vian Garg', 'Mechanical contributions to a CMU / Astrobotic / NASA autonomous lunar rover launching in 2029.');

  return (
    <ProjectLayout
      slug="moon-ranger"
      plateText="PROJECT 03 / LUNAR MISSION"
      title="MoonRanger — NASA Lunar Rover Mission"
      subtitle="Mechanical contributions to a CMU / Astrobotic / NASA autonomous lunar rover."
      metadata={[
        { key: 'ROLE', value: 'Mechanical Engineer' },
        { key: 'CONTEXT', value: 'CMU / Astrobotic / NASA Ames' },
        { key: 'TOOLS', value: 'SolidWorks, CAD, Mechanical Design, Stereo Vision Hardware Integration' },
        { key: 'TIMEFRAME', value: 'Jan 2026 – Present' },
        { key: 'STATUS', value: 'Active — launches 2029' },
      ]}
      brief="A CMU / Astrobotic / NASA Ames autonomous lunar rover launching in 2029 to search for water ice at the Moon's south pole."
      objective="Redesign the camera shroud housing MoonRanger's stereo-vision navigation system to survive the lunar environment."
      workedOn={[
        "Redesigned the camera shroud housing MoonRanger's stereo-vision navigation sensors",
        'Ensured structural and thermal integrity for the lunar south pole environment',
        'Collaborated with CMU Robotics Institute and Astrobotic hardware teams',
      ]}
      approach={[
        'SolidWorks',
        'CAD',
        'Mechanical Design',
        'Stereo Vision Hardware',
        'Thermal Analysis',
      ]}
      challenges={[
        'Designing a shroud that protects stereo sensors across extreme lunar temperature swings.',
        'Meeting mass and volume constraints on a suitcase-sized rover.',
      ]}
      primaryFigure={{
        label: 'SYSTEM SCHEMATIC / CONCEPTUAL',
        svg: <SystemsRibbonSvg activeState="03" />,
      }}
      reinforced="Redesigned the camera shroud protecting MoonRanger's stereo-vision navigation system. The rover launches in 2029 aboard Firefly Aerospace's Blue Ghost lander to the lunar south pole — the first first-year-student mechanical contribution to a NASA flight mission at CMU."
      photos={[
        { src: moonRangerPhoto, caption: 'MoonRanger rover assembly', altText: 'MoonRanger suitcase-sized lunar rover in assembly' },
        { src: moonRangerPhoto2, caption: 'Camera shroud detail', altText: 'Redesigned camera shroud housing stereo-vision sensors' },
        { src: moonRangerPhoto3, caption: 'Stereo vision system', altText: 'Stereo vision navigation system on MoonRanger' },
      ]}
      slots={
        <>
          <TechnicalFigure caption="Camera shroud CAD" altText="Reserved figure slot for camera shroud CAD model" isSlot />
          <TechnicalFigure caption="Thermal analysis" altText="Reserved figure slot for thermal analysis results" isSlot />
          <TechnicalFigure caption="Assembly view" altText="Reserved figure slot for full rover assembly view" isSlot />
        </>
      }
    />
  );
}
