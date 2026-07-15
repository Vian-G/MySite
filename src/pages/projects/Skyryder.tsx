import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { ArrowUpRight } from 'lucide-react';
import { useSEO } from '@/hooks/use-seo';
import skyryderPhoto from '@/assets/projects/skyryder.jpg';
import skyryderPhoto2 from '@/assets/projects/skyryder-2.jpg';
import skyryderPhoto3 from '@/assets/projects/skyryder-3.jpg';

export default function Skyryder() {
  useSEO('Skyryder | Vian Garg', 'Skyryder is an original playable game project, published independently on itch.io.');

  return (
    <ProjectLayout
      slug="skyryder"
      plateText="PROJECT 04 / INTERACTIVE WORK"
      title="Skyryder"
      subtitle="An original playable game, independently designed and published on itch.io."
      metadata={{
        ROLE: "Solo Developer",
        CONTEXT: "Independent",
        TOOLS: "Game Design, Level Design, Physics Systems",
        TIMEFRAME: "2024",
        STATUS: "Published"
      }}
      brief="Skyryder is an original flight game designed, built, and published independently on itch.io. The player pilots a plane through a scrolling environment, navigating obstacles and chasing a high score."
      objective="Design and ship a complete, playable game — from flight mechanics and obstacle layout to level pacing and scoring — as a solo independent project."
      workedOn={[
        "Designed and built the flight physics and plane control system from scratch",
        "Authored all level design, obstacle placement, and difficulty progression",
        "Implemented the scoring system and game loop",
        "Published independently on itch.io"
      ]}
      approach={[
        "Game Design",
        "Level Design",
        "Physics Systems",
        "Obstacle Layout",
        "Scoring Systems"
      ]}
      challenges={[
        "Tuning flight physics to feel responsive and fair across a range of player skill levels.",
        "Designing obstacle density and pacing so difficulty escalates smoothly without feeling arbitrary."
      ]}
      primaryFigure={{
        label: "FLIGHT TRAJECTORY / CONCEPTUAL",
        svg: <SystemsRibbonSvg activeState="04" />,
        caption: "Skyryder flight mechanics / conceptual trajectory"
      }}
      reinforced="Designed and shipped a complete playable flight game independently — handling physics, level design, obstacle layout, and scoring from scratch through to a published itch.io release."
      photos={[
        { src: skyryderPhoto, caption: 'Skyryder gameplay', altText: 'Skyryder in-game screenshot showing flight gameplay' },
        { src: skyryderPhoto2, caption: 'Level design', altText: 'Skyryder level design and environment' },
        { src: skyryderPhoto3, caption: 'Obstacles and scoring', altText: 'Skyryder obstacle layout and scoring system' },
      ]}
      links={[
        { label: 'Play on itch.io', href: 'https://vian-g.itch.io/skyryder' },
      ]}
      slots={
        <>
          <div className="flex justify-center">
            <a
              href="https://vian-g.itch.io/skyryder"
              target="_blank"
              rel="noopener noreferrer"
              className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px]"
            >
              <PhysicalButton asDiv variant="rust" size="lg" className="gap-2">
                Play Skyryder on itch.io <ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              </PhysicalButton>
            </a>
          </div>
          <TechnicalFigure caption="Gameplay screenshot" altText="Reserved figure slot for gameplay screenshot" isSlot />
          <TechnicalFigure caption="Level overview" altText="Reserved figure slot for level overview" isSlot />
        </>
      }
    />
  );
}
