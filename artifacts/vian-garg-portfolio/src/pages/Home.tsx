import { PaperSheet } from '@/components/ui/PaperSheet';
import { MetalDataPlate } from '@/components/ui/MetalDataPlate';
import { PhysicalButton } from '@/components/ui/PhysicalButton';
import { Link } from 'wouter';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Hero Section */}
      <section className="flex flex-col gap-6 md:gap-8 relative">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8D8A821A_1px,transparent_1px),linear-gradient(to_bottom,#8D8A821A_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_left_top,black_20%,transparent_70%)]" />
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between">
          <MetalDataPlate title="ID" className="w-fit" screwPositions="sides">
            VIAN_GARG
          </MetalDataPlate>
          <div className="font-mono text-xs text-muted-foreground flex gap-4">
            <span>STATUS: NOMINAL</span>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#B87D2A]/80 shadow-[0_0_4px_rgba(184,125,42,0.4)]" /> ACTIVE</span>
          </div>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.05] tracking-tight max-w-4xl pt-4">
          Precision robotics & <br />
          <span className="text-muted-foreground italic">autonomous controls.</span>
        </h1>
        
        <div className="max-w-2xl font-sans text-lg text-secondary-foreground leading-relaxed mt-4">
          ECE student specializing in the mechanical-electrical synthesis of autonomous systems. Focused on embedded hardware, computer vision, and industrial robotics integration.
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <Link href="/work" tabIndex={-1}>
            <PhysicalButton variant="rust" size="lg">VIEW_PROJECT_LOGS</PhysicalButton>
          </Link>
          <a href="#" tabIndex={-1}>
             <PhysicalButton variant="graphite" size="lg">DOWNLOAD_SPEC (CV)</PhysicalButton>
          </a>
        </div>
      </section>

      {/* Technical Spec Sheet (Skills / Focus) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-primary flex items-center gap-2">
            <div className="w-full h-px bg-primary/30 flex-1 hidden md:block" />
            01_SYS_CAPABILITIES
          </h2>
          <p className="font-sans text-sm text-muted-foreground">
            Core competencies across the hardware-software boundary. Tested in lab and competitive robotics environments.
          </p>
        </div>
        
        <div className="col-span-1 md:col-span-8">
          <PaperSheet className="p-6 md:p-8 flex flex-col gap-8" variant="clipped">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3 border-l-2 border-border pl-4 relative">
                <div className="absolute -left-1.5 top-0 w-2.5 h-px bg-border" />
                <div className="absolute -left-1.5 bottom-0 w-2.5 h-px bg-border" />
                <div className="font-mono text-xs text-muted-foreground">HARDWARE / EMBEDDED</div>
                <div className="font-sans font-medium text-foreground">Microcontrollers, PCB Design, Sensors</div>
                <div className="font-sans text-sm text-secondary-foreground">STM32, ESP32, Altium Designer, I2C/SPI/UART, Motor Drivers, Power Electronics.</div>
              </div>
              
              <div className="flex flex-col gap-3 border-l-2 border-border pl-4 relative">
                <div className="absolute -left-1.5 top-0 w-2.5 h-px bg-border" />
                <div className="absolute -left-1.5 bottom-0 w-2.5 h-px bg-border" />
                <div className="font-mono text-xs text-muted-foreground">SOFTWARE / CONTROLS</div>
                <div className="font-sans font-medium text-foreground">RTOS, Kinematics, Control Theory</div>
                <div className="font-sans text-sm text-secondary-foreground">C/C++, Python, ROS2, PID, State Estimation, Trajectory Generation.</div>
              </div>

              <div className="flex flex-col gap-3 border-l-2 border-border pl-4 relative">
                <div className="absolute -left-1.5 top-0 w-2.5 h-px bg-border" />
                <div className="absolute -left-1.5 bottom-0 w-2.5 h-px bg-border" />
                <div className="font-mono text-xs text-muted-foreground">PERCEPTION</div>
                <div className="font-sans font-medium text-foreground">Computer Vision, Sensor Fusion</div>
                <div className="font-sans text-sm text-secondary-foreground">OpenCV, LiDAR integration, Kalman Filters, SLAM fundamentals.</div>
              </div>

              <div className="flex flex-col gap-3 border-l-2 border-border pl-4 relative">
                <div className="absolute -left-1.5 top-0 w-2.5 h-px bg-border" />
                <div className="absolute -left-1.5 bottom-0 w-2.5 h-px bg-border" />
                <div className="font-mono text-xs text-muted-foreground">MECHANICAL</div>
                <div className="font-sans font-medium text-foreground">CAD, Rapid Prototyping</div>
                <div className="font-sans text-sm text-secondary-foreground">SolidWorks, 3D Printing, Machining fundamentals, Actuator sizing.</div>
              </div>
            </div>
            
          </PaperSheet>
        </div>
      </section>

      {/* Featured Project Teaser */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="col-span-1 md:col-span-4 md:order-last flex flex-col gap-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-primary flex items-center gap-2">
            02_LATEST_DEPLOYMENT
            <div className="w-full h-px bg-primary/30 flex-1 hidden md:block" />
          </h2>
          <p className="font-sans text-sm text-muted-foreground">
            Autonomous navigation system for unstructured industrial inspection environments.
          </p>
          <Link href="/work/autonomous-rover-v2" className="mt-auto pt-4 outline-none" tabIndex={-1}>
            <PhysicalButton variant="metal" className="w-full">ACCESS_FILE</PhysicalButton>
          </Link>
        </div>
        
        <div className="col-span-1 md:col-span-8 md:order-first">
          <PaperSheet className="relative overflow-hidden group aspect-[4/3] md:aspect-[16/9] bg-[#315E73]/5 flex items-center justify-center p-8 border-[#315E73]/20">
            {/* Blueprint graphic visualization mock */}
            <div className="absolute inset-0 border border-[#315E73]/10 m-4" />
            <div className="absolute inset-0 border border-[#315E73]/10 m-8 opacity-50" />
            
            <div className="w-32 h-32 md:w-48 md:h-48 border border-[#315E73]/30 rounded-full relative flex items-center justify-center bg-[#315E73]/5">
               <div className="w-[1px] h-full bg-[#315E73]/20 absolute" />
               <div className="h-[1px] w-full bg-[#315E73]/20 absolute" />
               
               {/* Center Target */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-primary/60 rounded-sm flex items-center justify-center">
                 <div className="w-1 h-1 bg-primary/80" />
               </div>
               
               {/* Radar sweep line */}
               <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-[#315E73]/60 origin-left animate-[spin_4s_linear_infinite]" />
               
               {/* Mock detected point */}
               <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-[#B87D2A] rounded-full shadow-[0_0_4px_#B87D2A]" />
            </div>
            
            <div className="absolute bottom-6 left-6 font-mono text-[10px] text-[#315E73]">
              FIG_01: SENSOR_FIELD_OF_VIEW<br/>
              SCAN_RATE: 10Hz // LIDAR_ARRAY
            </div>
          </PaperSheet>
        </div>
      </section>

    </div>
  );
}
