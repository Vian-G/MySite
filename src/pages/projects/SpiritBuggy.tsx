import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import heatingDiagram from '@/assets/projects/srs-heating-control.svg';
import heatingSimulation from '@/assets/projects/srs-simulation.png?format=webp&w=1280&quality=82';
import spiritBuggyPhoto from '@/assets/projects/spirit-buggy.jpg?format=webp&w=1280&quality=82';
import spiritBuggyPhoto2 from '@/assets/projects/spirit-buggy-2.jpg?format=webp&w=1280&quality=82';
import spiritBuggyPhoto3 from '@/assets/projects/spirit-buggy-3.jpg?format=webp&w=1280&quality=82';
import carbonShell from '@/assets/projects/spirit-carbon-shell.jpg?format=webp&w=960&quality=78';
import heatingRun from '@/assets/projects/spirit-heating-run.jpg?format=webp&w=1280&quality=82';

export default function SpiritBuggy() {
  useSEO('SPIRIT Buggy — CMU Buggy | Vian Garg', 'Composite vehicle fabrication, steering analysis, and SRS heating-box monitoring and control simulation for SPIRIT Buggy.');

  return (
    <ProjectLayout
      slug="spirit-buggy"
      plateText="PROJECT 05 / VEHICLE FABRICATION"
      title="SPIRIT Buggy — CMU Buggy"
      subtitle="Composite vehicle fabrication, steering analysis, and heating-box instrumentation."
      metadata={[
        { key: 'ROLE', value: 'Assistant Build Lead' },
        { key: 'CONTEXT', value: 'CMU Sweepstakes / Buggy' },
        { key: 'TOOLS', value: 'SolidWorks, ANSYS, Composites, Python, Streamlit, Phidget22' },
        { key: 'TIMEFRAME', value: 'Sep 2025 – Present' },
        { key: 'STATUS', value: 'Active' },
      ]}
      brief="My work with SPIRIT Buggy combines composite vehicle fabrication and steering analysis with instrumentation for the team's heating box. Alongside introducing a male-mold construction method, I migrated SRS temperature monitoring to Python and developed a separate four-zone control simulator."
      objective="Design and fabricate a new carbon-fiber buggy using a male-mold construction method, and validate the steering assembly in ANSYS before it races."
      workedOn={[
        'Introduced a male-mold construction method new to the CMU Buggy team',
        'Designed a steering assembly validated in ANSYS before racing',
        'Led carbon-fiber layup using Nomex honeycomb core sandwiched between carbon-fiber weave',
        'Built SRS heating-box temperature monitoring, CSV logging, and Phidget device discovery in Python',
        'Developed four-zone hysteresis control simulation with sensor-fault handling and overtemperature latching, separate from physical outputs',
      ]}
      approach={[
        'SolidWorks',
        'ANSYS',
        'Carbon Fiber Layup',
        'Composite Fabrication',
        'FEA',
        'Python / Streamlit',
        'Phidget22',
        'Temperature monitoring',
        'Control simulation',
      ]}
      challenges={[
        'Introducing a novel male-mold method with no prior team precedent.',
        'Validating steering geometry under race loads before first physical test.',
        'Keeping measured temperatures, device presence, and simulated heating requests distinct while physical wiring remains unverified.',
      ]}
      primaryFigure={{
        label: 'SPIRIT BUGGY / ANIMATED ILLUSTRATION',
        svg: <SystemsRibbonSvg activeState="05" />,
        caption: 'Animated buggy illustration. Heating-box monitoring and simulation are documented separately below.',
      }}
      reinforced="First new carbon-fiber buggy design fielded by CMU Buggy in over fifteen years, using a male-mold method new to the team and a steering assembly validated in ANSYS before racing. For SRS heating software, the October 16, 2026 Phase 2 verification documents 43 passing tests. That verification covered simulation rather than physical heater control. The later workshop and heating-run photos below are separate documentation."
      photos={[
        { src: spiritBuggyPhoto, caption: 'SPIRIT buggies at RaceDay 2026', altText: 'SPIRIT buggies at RaceDay 2026' },
        { src: spiritBuggyPhoto2, caption: 'Carbon fiber layup', altText: 'Carbon fiber layup process with Nomex honeycomb core' },
        { src: spiritBuggyPhoto3, caption: 'SPIRIT buggy on track, 1985', altText: 'SPIRIT buggy on track, 1985' },
      ]}
      links={[
        { label: 'SPIRIT Racing Systems', href: 'https://www.spiritracingsystems.com/' },
      ]}
      slots={
        <>
          <section aria-labelledby="srs-heating" className="flex flex-col gap-4">
            <h3 id="srs-heating" className="font-serif text-2xl">SRS / Heating-box monitoring &amp; control simulation</h3>
            <p className="leading-relaxed">As part of SPIRIT Buggy, I migrated heating-box temperature monitoring into a Python dashboard and standalone logger, with measured history, explicit logging controls, and CSV downloads.</p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Phidget discovery and attach/detach reporting distinguish device descriptors from measured I/O values.</li>
              <li>Four independent simulated zones handle hysteresis, stale or missing sensors, and latched overtemperature faults.</li>
              <li>Separate CSV event logs record simulation configuration, state transitions, resets, and stops.</li>
              <li>Simulated heating requests remain disconnected from physical outputs; the actuator backend rejects output requests.</li>
            </ul>
            <TechnicalFigure src={heatingDiagram} label="HEATING-BOX ARCHITECTURE / CONCEPTUAL" caption="Measured-temperature monitoring and four-zone simulation are separate. Physical heater actuation is not implemented." altText="Heating-box architecture diagram showing thermocouple acquisition, a Python dashboard, CSV history, and a separate four-zone simulator without hardware actuation." />
            <div className="max-w-sm">
              <TechnicalFigure src={heatingSimulation} label="SRS DASHBOARD / SOFTWARE SIMULATION" caption="Saved October 16, 2026 verification screenshot: a synthetic 23°C input produces a simulated heating request. No hardware actuation." altText="SRS heating dashboard showing Zone 0 at a synthetic 23 degrees Celsius, a simulated heating request, and the label No hardware actuation." />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">The October 16 verification records 43 passing tests covering device inventory, mappings, simulation states, hysteresis boundaries, faults, reset, and logging failures. Temperature acquisition had been verified earlier; disconnected thermocouples were not revalidated in Phase 2. Relay wiring, polarity, heater assignments, and physical output states were unverified in that report.</p>
          </section>
          <section aria-labelledby="spirit-workshop" className="flex flex-col gap-5">
            <h3 id="spirit-workshop" className="font-serif text-2xl">Workshop &amp; heating-run documentation</h3>
            <TechnicalFigure src={carbonShell} label="COMPOSITES / WORKSHOP" caption="Carbon-fiber shell during workshop fabrication." altText="Close view of a carbon-fiber buggy shell on a workshop fixture with team members working behind it." />
            <TechnicalFigure src={heatingRun} label="OCTOBER 31 / TEMPERATURE LOGGING" caption="Photographed heating-run display showing four temperature channels, a rising temperature history, and a heater-ON software indicator. The display alone does not verify physical output behavior." altText="Laptop displaying a four-channel temperature log and rising temperature curves during an October 31 heating run." />
          </section>
        </>
      }
    />
  );
}
