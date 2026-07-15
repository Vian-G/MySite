import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import skyryderPhoto from '@/assets/projects/skyryder.jpg';
import skyryderPhoto2 from '@/assets/projects/skyryder-2.jpg';
import skyryderPhoto3 from '@/assets/projects/skyryder-3.jpg';

export default function Skyryder() {
  useSEO('Skyryder | Vian Garg', 'An original playable game project published independently on itch.io.');

  return (
    <ProjectLayout
      slug="skyryder"
      plateText="PROJECT 04 / INTERACTIVE WORK"
      title="Skyryder"
      subtitle="An original playable game project, designed and built independently."
      metadata={[
        { key: 'ROLE', value: 'Independent Developer' },
        { key: 'CONTEXT', value: 'Personal Project' },
        { key: 'TOOLS', value: 'Game Design, Level Design, Itch.io' },
        { key: 'STATUS', value: 'Published' },
      ]}
      brief="Skyryder is an original playable game project designed and built independently outside of coursework."
      objective="Design, build, and publish a complete playable game independently."
      workedOn={[
        'Designed and built the game from scratch independently',
        'Published and made freely available on itch.io',
      ]}
      approach={[
        'Game Design',
        'Level Design',
        'Itch.io',
      ]}
      primaryFigure={{
        label: 'SYSTEM SCHEMATIC / CONCEPTUAL',
        svg: <SystemsRibbonSvg activeState="04" />,
      }}
      reinforced="Published independently on itch.io. Demonstrates the ability to scope, execute, and ship a self-directed creative project from concept to completion."
      photos={[
        { src: skyryderPhoto, caption: 'Skyryder gameplay', altText: 'Skyryder game screenshot showing gameplay' },
        { src: skyryderPhoto2, caption: 'Level design', altText: 'Skyryder level design overview' },
        { src: skyryderPhoto3, caption: 'Game interface', altText: 'Skyryder game UI and interface elements' },
      ]}
      links={[
        { label: 'Play on itch.io', href: 'https://itch.io' },
      ]}
      slots={
        <>
          <TechnicalFigure caption="Gameplay screenshot" altText="Reserved figure slot for gameplay screenshot" isSlot />
          <TechnicalFigure caption="Level map" altText="Reserved figure slot for level map overview" isSlot />
        </>
      }
    />
  );
}
