import { PaperSheet } from '@/components/ui/PaperSheet';
import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { SystemsRibbonSvg } from '@/components/ui/SystemsRibbonSvg';
import portraitImg from '@/assets/portrait.svg';
import { TornPhotoWindow } from '@/components/ui/TornPhotoWindow';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useSEO } from '@/hooks/use-seo';
import { RESUME_PDF_URL } from '@/config/resume';
import { EMAIL, LOCATION_STATUS } from '@/config/contact';
import moonMinersPhoto from '@/assets/projects/moon-miners.jpg';
import ur10ePhoto from '@/assets/projects/ur10e.jpg';
import moonRangerPhoto from '@/assets/projects/moon-ranger.jpg';

export default function Home() {
  useSEO('Vian Garg | ECE + Robotics', 'Portfolio of Vian Garg, an ECE student with a Robotics minor working across robotics, automation, controls, autonomous systems, and embedded perception.');

  const featuredProjects = [
    {
      id: '01',
      title: 'CMU Moon Miners — NASA Lunabotics',
      role: 'Mechanical / Robotics Engineer',
      problem: 'Developing a high-payload autonomous lunar excavation rover for competition.',
      stack: ['SolidWorks', 'CAD', 'Simulation', 'Robotics'],
      result: 'Designed and fabricated a metal track system achieving a drawbar-pull ratio of 1.55 on BP-1 simulant.',
      href: '/projects/moon-miners',
      photo: moonMinersPhoto,
    },
    {
      id: '02',
      title: 'UR10e Cobot Welding',
      role: 'Robotics Researcher',
      problem: 'Developing a virtual cobot welding system bridging human motion to execution.',
      stack: ['UR10e', 'URScript', 'EtherNet/IP'],
      result: 'Engineered remote validation infrastructure for uploading/testing scripts over VPN via SSH.',
      href: '/projects/ur10e-welding',
      photo: ur10ePhoto,
    },
    {
      id: '03',
      title: 'MoonRanger — NASA Lunar Rover Mission',
      role: 'Mechanical Engineer',
      problem: 'Contributing mechanical hardware to a CMU / Astrobotic / NASA autonomous lunar rover launching in 2029.',
      stack: ['SolidWorks', 'CAD', 'Stereo Vision Hardware'],
      result: "Redesigned the camera shroud housing MoonRanger's stereo-vision navigation system.",
      href: '/projects/moon-ranger',
      photo: moonRangerPhoto,
    }
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row gap-6 md:gap-8 relative justify-between">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8D8A821A_1px,transparent_1px),linear-gradient(to_bottom,#8D8A821A_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_left_top,black_20%,transparent_70%)]" />
        
        <div className="flex flex-col gap-6 md:gap-8 lg:w-2/3">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between lg:justify-start lg:gap-8">
            <MetalDataPlate title="ID" className="w-fit" screwPositions="sides">
              VIAN_GARG
            </MetalDataPlate>
            <div className="font-mono text-xs text-muted-foreground flex gap-4">
              <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#B87D2A]/80 shadow-[0_0_4px_rgba(184,125,42,0.4)]" /> ONLINE</span>
            </div>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.05] tracking-tight max-w-4xl pt-4">
            Vian Garg <br className="hidden sm:block" />
            <span className="text-muted-foreground italic text-4xl md:text-6xl lg:text-7xl block mt-2">ECE + Robotics</span>
          </h1>
          
          <div className="max-w-2xl font-sans text-lg text-secondary-foreground leading-relaxed mt-4">
            Sophomore at Carnegie Mellon University specializing in the mechanical-electrical synthesis of autonomous systems. Focused on embedded hardware, computer vision, and industrial robotics integration.
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/projects" className="outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2px]">
              <PhysicalButton asDiv variant="rust" size="lg">View Projects</PhysicalButton>
            </Link>
            {RESUME_PDF_URL ? (
              <a href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer" className="outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2px]">
                 <PhysicalButton asDiv variant="graphite" size="lg" className="gap-2">Download Resume <ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" /></PhysicalButton>
              </a>
            ) : (
              <div className="cursor-not-allowed">
                <PhysicalButton asDiv variant="graphite" size="lg" disabled className="opacity-50 cursor-not-allowed gap-2">Download Resume <ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" /></PhysicalButton>
              </div>
            )}
            <a href={`mailto:${EMAIL}`} className="outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2px]">
               <PhysicalButton asDiv variant="metal" size="lg">Contact Me</PhysicalButton>
            </a>
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/3 relative flex justify-end items-center">
           <div className="w-full max-w-[380px] aspect-[4/5] pointer-events-none mt-8">
              <TornPhotoWindow
                src={portraitImg}
                alt="Technical portrait illustration of Vian Garg"
                className="w-full h-full"
                imgClassName="object-[50%_38%]"
                variant={1}
                rotate={-3}
              />
           </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="flex flex-col gap-6 items-start">
        <h2 className="font-mono text-sm uppercase tracking-widest text-primary flex items-center gap-2 w-full">
          01_PROFILE_SNAPSHOT
          <div className="w-full h-px bg-primary/30 flex-1" />
        </h2>
        <PaperSheet className="p-6 md:p-8 max-w-3xl" variant="default">
          <div className="font-mono text-xs text-muted-foreground mb-4">{LOCATION_STATUS}</div>
          <p className="font-sans text-lg text-foreground leading-relaxed">
            I am a sophomore at Carnegie Mellon University studying Electrical and Computer Engineering with a minor in Robotics. I am most interested in the intersection of disciplines: where mechanical systems meet electronics, where sensors inform software, and where theory turns into physical action. I am currently looking for internship opportunities in robotics, embedded systems, and controls.
          </p>
          <div className="mt-6">
            <Link href="/about" className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2px] inline-block">
              <PhysicalButton asDiv variant="graphite" size="sm" className="gap-2">Read more <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" /></PhysicalButton>
            </Link>
          </div>
        </PaperSheet>
      </section>

      {/* Featured Projects */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-baseline border-b border-border pb-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-primary flex items-center gap-2">
            02_FEATURED_PROJECTS
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((prj, i) => (
            <Link key={prj.id} href={prj.href} className="outline-none group focus-visible:ring-2 focus-visible:ring-primary rounded-[2px] block">
              <PaperSheet isInteractive className="p-6 md:p-8 flex flex-col gap-6 md:gap-8 group-hover:border-primary/40 transition-colors h-full" variant={i % 2 === 0 ? "clipped" : "default"}>

                <div className="relative w-full aspect-[16/10] md:aspect-[2/1] border border-border/50 bg-[#E8E6D9] items-center justify-center p-3 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                  <div className="w-full h-full transition-opacity duration-500 motion-reduce:transition-none group-hover:opacity-0">
                    <SystemsRibbonSvg activeState={prj.id as any} />
                  </div>
                  <img
                    src={prj.photo}
                    alt={`Photo reference for ${prj.title}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 motion-reduce:transition-none group-hover:opacity-100"
                  />
                </div>

                <div className="flex flex-col gap-4 justify-center">
                  <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">{prj.title}</h3>

                  <div className="flex flex-wrap gap-2">
                    {prj.stack.map(tech => (
                      <span key={tech} className="font-mono text-[10px] bg-secondary/50 text-secondary-foreground px-2 py-1 border border-border/50 uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </PaperSheet>
            </Link>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-primary flex items-center gap-2">
            03_CAPABILITIES
            <div className="w-full h-px bg-primary/30 flex-1 hidden md:block" />
          </h2>
          <p className="font-sans text-sm text-muted-foreground">
            Core competencies across the hardware-software boundary. Tested in lab and competitive robotics environments.
          </p>
        </div>
        
        <div className="col-span-1 md:col-span-8">
          <PaperSheet className="p-6 md:p-8 flex flex-col gap-8" variant="clipped">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2 border-l-2 border-border pl-4">
                <div className="font-mono text-xs text-muted-foreground uppercase">Hardware / Embedded</div>
                <div className="font-sans font-medium text-foreground">Microcontrollers, PCB Design, Sensors</div>
                <div className="font-sans text-sm text-secondary-foreground leading-relaxed mt-1">STM32, ESP32, Altium Designer, I2C/SPI/UART, Motor Drivers, Power Electronics.</div>
              </div>
              
              <div className="flex flex-col gap-2 border-l-2 border-border pl-4">
                <div className="font-mono text-xs text-muted-foreground uppercase">Software / Controls</div>
                <div className="font-sans font-medium text-foreground">RTOS, Kinematics, Control Theory</div>
                <div className="font-sans text-sm text-secondary-foreground leading-relaxed mt-1">C/C++, Python, ROS2, PID, State Estimation, Trajectory Generation.</div>
              </div>

              <div className="flex flex-col gap-2 border-l-2 border-border pl-4">
                <div className="font-mono text-xs text-muted-foreground uppercase">Perception</div>
                <div className="font-sans font-medium text-foreground">Computer Vision, Sensor Fusion</div>
                <div className="font-sans text-sm text-secondary-foreground leading-relaxed mt-1">OpenCV, LiDAR integration, Kalman Filters, SLAM fundamentals.</div>
              </div>

              <div className="flex flex-col gap-2 border-l-2 border-border pl-4">
                <div className="font-mono text-xs text-muted-foreground uppercase">Mechanical</div>
                <div className="font-sans font-medium text-foreground">CAD, Rapid Prototyping</div>
                <div className="font-sans text-sm text-secondary-foreground leading-relaxed mt-1">SolidWorks, 3D Printing, Machining fundamentals, Actuator sizing.</div>
              </div>
            </div>
          </PaperSheet>
        </div>
      </section>

    </div>
  );
}