import { ProjectLayout } from '@/components/layout/ProjectLayout';
import AirfoilFlowDemo from '@/components/AirfoilFlowDemo';
import { useSEO } from '@/hooks/use-seo';

export default function Halcon() {
  useSEO('HALCON — Aerodynamics Internship | Vian Garg', 'Aerodynamics Engineering Internship at HALCON, EDGE Group in Abu Dhabi: CFD, stability analysis, engineering utilities, and simulation programming.');

  return (
    <ProjectLayout
      slug="halcon"
      plateText="PROJECT 07 / HALCON INTERNSHIP"
      title="HALCON — Aerodynamics Internship"
      subtitle="A summer working across aerodynamic analysis, mathematical modeling, and simulation."
      metadata={[
        { key: 'ROLE', value: 'Aerodynamics Engineering Intern' },
        { key: 'ORGANIZATION', value: 'HALCON, EDGE Group' },
        { key: 'LOCATION', value: 'Abu Dhabi, UAE' },
        { key: 'TIMEFRAME', value: 'June–August 2024' },
        { key: 'TOOLS', value: 'ANSYS Fluent, XFLR5, Python, Pygame' },
        { key: 'STATUS', value: 'Completed internship' },
      ]}
      brief="During my summer internship at HALCON, EDGE Group in Abu Dhabi, I worked across aerodynamic analysis and simulation programming. I used ANSYS Fluent and XFLR5 for CFD and stability studies, and built programming tools to work with mathematical models and simulation behavior."
      objective="Connect engineering analysis with practical software tools for exploring aerodynamic behavior and stability."
      workedOn={[
        'Performed computational fluid dynamics and stability analysis using ANSYS Fluent and XFLR5.',
        'Built state-space tools and a matrix calculator to support mathematical modeling.',
        'Created a Pygame simulation environment using object-oriented programming.',
      ]}
      approach={['ANSYS Fluent', 'XFLR5', 'Python', 'Pygame', 'Object-oriented programming', 'State-space modeling', 'CFD', 'Stability analysis']}
      challenges={[
        'Moving between mathematical models, simulation code, and engineering analysis tools.',
        'Keeping numerical utilities organized and reusable while exploring simulation behavior.',
      ]}
      primaryFigure={{
        label: 'AERODYNAMICS / LIVE FLUID SIMULATION',
        svg: <AirfoilFlowDemo />,
        contentClassName: 'max-w-none p-3 drop-shadow-none',
        caption: 'Live, coarse-grid 2D flow solver created for this portfolio. Adjust the airfoil angle to restart the flow around a new orientation. This is not HALCON simulation data.',
      }}
      reinforced="The internship gave me experience connecting aerodynamic analysis, state-space modeling, and simulation software. I built engineering utilities alongside CFD and stability studies, bringing analysis and programming into the same workflow."
    />
  );
}
