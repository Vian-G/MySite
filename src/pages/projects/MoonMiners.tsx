import { ProjectLayout } from '@/components/layout/ProjectLayout';
import { TechnicalFigure } from '@/components/ui/TechnicalFigure';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import { useSEO } from '@/hooks/use-seo';
import moonMinersPhoto from '@/assets/projects/moon-miners.jpg?format=webp&w=1280&quality=82';
import moonMinersPhoto2 from '@/assets/projects/moon-miners-2.jpg?format=webp&w=1280&quality=82';
import moonMinersPhoto3 from '@/assets/projects/moon-miners-3.jpg?format=webp&w=1280&quality=82';
import moonMinersPhoto4 from '@/assets/projects/moon-miners-4.jpg?format=webp&w=1280&quality=82';
import fieldTest from '@/assets/projects/moon-miners-field-test.jpg?format=webp&w=1280&quality=82';
import digging from '@/assets/projects/moon-miners-digging.jpg?format=webp&w=1280&quality=82';
import pitWork from '@/assets/projects/moon-miners-pit.jpg?format=webp&w=1280&quality=82';
import award from '@/assets/projects/moon-miners-award.jpg?format=webp&w=960&quality=78';
import trackingSetup from '@/assets/projects/moon-miners-tracking-setup.jpg?format=webp&w=960&quality=78';
import trackingResults from '@/assets/projects/moon-miners-tracking-results.jpg?format=webp&w=1280&quality=82';

export default function MoonMiners() {
  useSEO('Moon Miners — NASA Lunabotics | Vian Garg', 'Rover mobility, Nav2 tuning, and Python-to-ESP32 wireless teleoperation for CMU Moon Miners.');

  return (
    <ProjectLayout
      slug="moon-miners"
      plateText="PROJECT 01 / ROVER SYSTEMS"
      title="CMU Moon Miners — NASA Lunabotics"
      subtitle="Rover mobility, autonomous navigation tuning, and wireless test-bot teleoperation."
      metadata={[
        { key: 'ROLE', value: 'Mechanical / Robotics Engineer' },
        { key: 'CONTEXT', value: 'CMU Moon Miners — NASA Lunabotics' },
        { key: 'TOOLS', value: 'SolidWorks, Nav2, Python, Pygame, ESP32, UDP' },
        { key: 'TIMEFRAME', value: 'Jan 2026 – Present' },
        { key: 'STATUS', value: 'Active' },
      ]}
      brief="My work with CMU Moon Miners spans mechanical mobility, Nav2 tuning, and embedded teleoperation. Alongside the competition rover, I developed a Python/Pygame-to-ESP32 wireless control system for the Lunabotics test bot, TacoBell, with explicit operator arming and disconnect handling."
      objective="Design and fabricate a high-payload autonomous lunar excavation rover capable of scoring autonomous-navigation points at the NASA Lunabotics competition."
      workedOn={[
        'Built a high-payload autonomous lunar excavation rover',
        'Designed and fabricated a metal track system',
        'Tuned Nav2 voxel-costmap parameters to match the rover\'s physical mobility constraints and track geometry',
        'Built a Python/Pygame client and ESP32 firmware linked by authenticated UDP over the robot\'s Wi-Fi access point',
        'Added explicit arming, held deadman controls, stop/reset behavior, and disconnect handling without automatic rearming',
        'Packaged the Windows teleoperation client for sharing and validated software behavior separately from powered motor commissioning',
      ]}
      approach={[
        'SolidWorks',
        'Mechanical Design',
        'Simulation',
        'Nav2',
        'Autonomous Systems',
        'Python / Pygame',
        'ESP32 firmware',
        'Authenticated UDP',
      ]}
      challenges={[
        'Achieving required drawbar-pull ratio on lunar regolith simulant.',
        'Matching autonomous navigation parameters to physical track geometry constraints.',
        'Handling stale commands and lost connections while keeping arming and operator intent explicit.',
      ]}
      primaryFigure={{
        label: 'SYSTEM SCHEMATIC / CONCEPTUAL',
        svg: <SystemsRibbonSvg activeState="01" />,
      }}
      reinforced="Designed and fabricated a metal track system achieving a drawbar-pull ratio of 1.55 on BP-1 lunar regolith simulant. The team won the Caterpillar 'First Steps' Award for best first-year team and became the first first-year team to score autonomous-navigation points at NASA Lunabotics. For the separate TacoBell teleoperation system, the October 19, 2026 progress report records 71 passing software tests. That software milestone did not establish powered driving performance. The later October 31 tracking summary below documents separately supplied mobility-test evidence, with coordinate-unit and turning-radius qualifications retained in the chart."
      photos={[
        { src: moonMinersPhoto, caption: 'Team photo at University of Central Florida', altText: 'Team photo at University of Central Florida' },
        { src: moonMinersPhoto2, caption: 'Exploded CAD view', altText: 'Exploded CAD view' },
        { src: moonMinersPhoto3, caption: 'ATLAS Robot in Exolith Lab Arena', altText: 'ATLAS Robot in Exolith Lab Arena' },
        { src: moonMinersPhoto4, caption: 'Mobility test bed', altText: 'Mobility test bed for evaluating rover performance' },
      ]}
      links={[
        { label: 'Moon Miners', href: 'https://cmu-moon-miners.com' },
      ]}
      slots={
        <section aria-labelledby="lunabotics-gallery" className="flex flex-col gap-5">
          <h3 id="lunabotics-gallery" className="font-serif text-2xl">Field testing, pit work &amp; competition</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TechnicalFigure src={fieldTest} label="FIELD TESTING" caption="The tracked excavation rover in an outdoor sand test area." altText="Side view of the Moon Miners rover showing its tracks, excavation conveyor, and sensor mast during outdoor testing." />
            <TechnicalFigure src={digging} label="EXCAVATION" caption="The excavation conveyor working in the test arena." altText="Moon Miners rover digging into simulant with its excavation conveyor inside an enclosed arena." />
            <TechnicalFigure src={pitWork} label="PIT WORK" caption="Electronics and integration work at the pit table." altText="Team members working with rover electronics, wiring, batteries, and laptops on a pit table." />
            <TechnicalFigure src={award} label="TEAM / COMPETITION" caption="Moon Miners team members with a NASA Lunabotics award." altText="Four Moon Miners team members holding an award in front of the NASA globe sign." />
            <TechnicalFigure src={trackingSetup} label="MOBILITY / TRACKING SETUP" caption="Weighted tracked test platform with a tracking prism mounted above the chassis." altText="Tracked rover test platform carrying weight plates and a raised survey prism, with a tether held beside the test area." />
          </div>
          <a href={trackingResults} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <TechnicalFigure src={trackingResults} label="OCTOBER 31 / TRACKING ANALYSIS" caption="Supplied Leica tracking summary for 11 runs. Distances use exported coordinate units; radii describe the prism path, not necessarily the rover centerline. Open image for a larger view." altText="October 31 Leica tracking chart showing 11 rover trajectories, per-run speeds, fitted turning radii, and notes qualifying coordinate units and short-arc fits." />
          </a>
        </section>
      }
    />
  );
}
