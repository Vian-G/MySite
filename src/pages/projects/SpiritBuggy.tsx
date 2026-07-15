import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import spiritBuggyPhoto from '@/assets/projects/spirit-buggy.jpg';
import spiritBuggyPhoto2 from '@/assets/projects/spirit-buggy-2.jpg';
import spiritBuggyPhoto3 from '@/assets/projects/spirit-buggy-3.jpg';

export default function SpiritBuggy() {
  useSEO('SPIRIT Buggy | Vian Garg', 'Assistant Build Lead on CMU Buggy\u2019s first new carbon-fiber buggy design in over fifteen years.');

  return (
    <ProjectLayout
      slug="spirit-buggy"
      plateText="PROJECT 05 / VEHICLE FABRICATION"
      title="SPIRIT Buggy — CMU Buggy"
      subtitle="Assistant Build Lead on CMU Buggy's first new carbon-fiber vehicle design in over fifteen years."
      metadata={{
        ROLE: "Assistant Build Lead",
        CONTEXT: "CMU Buggy",
        TOOLS: "SolidWorks, ANSYS, Carbon Fiber Layup, Composite Fabrication",
        TIMEFRAME: "2025 – 2026",
        STATUS: "Complete"
      }}
      brief="SPIRIT is CMU Buggy's first entirely new carbon-fiber buggy design in more than fifteen years — a lightweight, aerodynamic vehicle built to compete in Carnegie Mellon's Sweepstakes race. As Assistant Build Lead, I helped take the vehicle from CAD to a raced, structurally validated composite shell."
      objective="Design and fabricate a new carbon-fiber buggy monocoque and steering system from the ground up, introducing a male-mold construction method never before used by CMU Buggy, while validating the steering assembly under real racing loads."
      workedOn={[
        "Assistant Build Lead on SPIRIT, the first new carbon-fiber buggy design fielded by CMU Buggy in over fifteen years",
        "Introduced the first male-mold construction method used in CMU Buggy's fabrication history",
        "Built the composite shell as a Nomex honeycomb core sandwiched between carbon-fiber weave layups",
        "Designed the steering assembly in SolidWorks and validated it under load with ANSYS finite element analysis"
      ]}
      approach={[
        "SolidWorks",
        "ANSYS",
        "Carbon Fiber Layup",
        "Nomex Core Sandwich",
        "Male-Mold Fabrication"
      ]}
      challenges={[
        "Developing a male-mold construction process from scratch with no internal precedent within the team.",
        "Balancing shell stiffness and weight in the Nomex core / carbon-fiber layup to meet the structural demands of the Sweepstakes race course.",
        "Validating the steering assembly's strength and geometry in ANSYS before committing to fabrication."
      ]}
      primaryFigure={{
        label: "VEHICLE SCHEMATIC / CONCEPTUAL",
        svg: <SystemsRibbonSvg activeState="05" />
      }}
      reinforced="Helped design and build CMU Buggy's first new carbon-fiber vehicle in over fifteen years, introducing a male-mold construction method new to the team and validating the steering assembly's design through SolidWorks modeling and ANSYS simulation before it raced."
      photos={[
        { src: spiritBuggyPhoto, caption: 'SPIRIT buggy on the race course', altText: 'SPIRIT carbon-fiber buggy on the CMU Sweepstakes race course' },
        { src: spiritBuggyPhoto2, caption: 'Composite layup process', altText: 'Carbon-fiber composite layup over Nomex honeycomb core' },
        { src: spiritBuggyPhoto3, caption: 'Steering assembly', altText: 'Steering assembly validated in ANSYS' },
      ]}
      slots={
        <>
          <TechnicalFigure caption="Composite layup" altText="Reserved figure slot for Composite layup" isSlot />
          <TechnicalFigure caption="Steering assembly" altText="Reserved figure slot for Steering assembly" isSlot />
        </>
      }
    />
  );
}
