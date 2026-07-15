import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import spiritBuggyPhoto from '@/assets/projects/spirit-buggy.jpg';
import spiritBuggyPhoto2 from '@/assets/projects/spirit-buggy-2.jpg';
import spiritBuggyPhoto3 from '@/assets/projects/spirit-buggy-3.jpg';

export default function SpiritBuggy() {
  useSEO('SPIRIT Buggy — CMU Buggy | Vian Garg', "CMU Buggy's first new carbon-fiber vehicle design in over fifteen years.");

  return (
    <ProjectLayout
      slug="spirit-buggy"
      plateText="PROJECT 05 / VEHICLE FABRICATION"
      title="SPIRIT Buggy — CMU Buggy"
      subtitle="CMU Buggy's first new carbon-fiber vehicle design in over fifteen years."
      metadata={[
        { key: 'ROLE', value: 'Assistant Build Lead' },
        { key: 'CONTEXT', value: 'CMU Sweepstakes / Buggy' },
        { key: 'TOOLS', value: 'SolidWorks, ANSYS, Carbon Fiber Layup, Composite Fabrication' },
        { key: 'TIMEFRAME', value: 'Sep 2025 – Present' },
        { key: 'STATUS', value: 'Active' },
      ]}
      brief="CMU Buggy's first new carbon-fiber vehicle design in over fifteen years — introducing a male-mold construction method new to the team."
      objective="Design and fabricate a new carbon-fiber buggy using a male-mold construction method, and validate the steering assembly in ANSYS before it races."
      workedOn={[
        'Introduced a male-mold construction method new to the CMU Buggy team',
        'Designed a steering assembly validated in ANSYS before racing',
        'Led carbon-fiber layup using Nomex honeycomb core sandwiched between carbon-fiber weave',
      ]}
      approach={[
        'SolidWorks',
        'ANSYS',
        'Carbon Fiber Layup',
        'Composite Fabrication',
        'FEA',
      ]}
      challenges={[
        'Introducing a novel male-mold method with no prior team precedent.',
        'Validating steering geometry under race loads before first physical test.',
      ]}
      primaryFigure={{
        label: 'SYSTEM SCHEMATIC / CONCEPTUAL',
        svg: <SystemsRibbonSvg activeState="05" />,
      }}
      reinforced="First new carbon-fiber buggy design fielded by CMU Buggy in over fifteen years. First male-mold construction method in CMU Buggy's fabrication history. Steering assembly validated in ANSYS before the vehicle raced."
      photos={[
        { src: spiritBuggyPhoto, caption: 'SPIRIT buggy on track', altText: 'SPIRIT carbon-fiber buggy on the CMU Sweepstakes track' },
        { src: spiritBuggyPhoto2, caption: 'Carbon fiber layup', altText: 'Carbon fiber layup process with Nomex honeycomb core' },
        { src: spiritBuggyPhoto3, caption: 'ANSYS steering validation', altText: 'ANSYS FEA results for steering assembly validation' },
      ]}
      slots={
        <>
          <TechnicalFigure caption="Male mold construction" altText="Reserved figure slot for male mold construction process" isSlot />
          <TechnicalFigure caption="Steering FEA" altText="Reserved figure slot for steering assembly FEA results" isSlot />
          <TechnicalFigure caption="Final vehicle" altText="Reserved figure slot for final vehicle photo" isSlot />
        </>
      }
    />
  );
}
