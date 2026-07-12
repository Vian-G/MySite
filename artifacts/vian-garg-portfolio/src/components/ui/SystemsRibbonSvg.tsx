import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SystemsRibbonSvgProps {
  activeState?: '01' | '02' | '03' | '04';
  className?: string;
}

export function SystemsRibbonSvg({ activeState = '01', className }: SystemsRibbonSvgProps) {
  const [isDrawn, setIsDrawn] = useState(false);
  
  useEffect(() => {
    const t = setTimeout(() => setIsDrawn(true), 150);
    return () => clearTimeout(t);
  }, []);

  const sharedPath = "M 40,80 C 150,80 150,320 360,320";

  return (
    <svg 
      viewBox="0 0 400 400" 
      className={cn("w-full h-full text-[#1B1C1A]/80 font-mono", className)} 
      aria-label={`Technical system schematics interconnecting multiple engineering disciplines. Active focus: System ${activeState}.`}
      role="img"
    >
      <title>Systems Ribbon Schematic</title>
      <desc>Continuous engineering blueprint showing {activeState} active state.</desc>
      
      {/* Background Grid */}
      <path d="M 100,0 L 100,400 M 200,0 L 200,400 M 300,0 L 300,400" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />
      <path d="M 0,100 L 400,100 M 0,200 L 400,200 M 0,300 L 400,300" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />

      {/* Shared Trajectory */}
      <path
        d={sharedPath}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={isDrawn ? 0 : 1}
        className="transition-all duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none motion-reduce:stroke-dashoffset-0"
      />
      {/* Waypoints on trajectory */}
      <circle cx="106" cy="144" r="3.5" fill="hsl(var(--primary))" className={cn("transition-opacity duration-1000 delay-500", isDrawn ? "opacity-100" : "opacity-0")} />
      <circle cx="294" cy="256" r="3.5" fill="hsl(var(--primary))" className={cn("transition-opacity duration-1000 delay-700", isDrawn ? "opacity-100" : "opacity-0")} />

      {/* STATE 01: Moon Miners */}
      <g className={cn("transition-opacity duration-1000", activeState === '01' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">01 / MOBILITY</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">PATH / PLANNING</text>
        
        <path d="M 0,280 Q 100,290 200,260 T 400,290" fill="none" stroke="#8D8A82" strokeOpacity="0.5" strokeDasharray="4 4" strokeWidth="1.5" />
        
        <g transform="translate(60, 200)">
          <path d="M 0,0 L 80,0 L 100,40 L -20,40 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="0" cy="40" r="12" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="12" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="80" cy="40" r="12" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="0" cy="40" r="3" fill="currentColor" />
          <circle cx="40" cy="40" r="3" fill="currentColor" />
          <circle cx="80" cy="40" r="3" fill="currentColor" />
        </g>
        
        <circle cx="340" cy="305" r="5" fill="none" stroke="#B87D2A" strokeWidth="1.5" />
        <circle cx="340" cy="305" r="2" fill="#B87D2A" className="animate-pulse motion-reduce:animate-none" />
      </g>

      {/* STATE 02: UR10e */}
      <g className={cn("transition-opacity duration-1000", activeState === '02' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">02 / TOOLPATH</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">ROBOT / INTEGRATION</text>
        
        <path d="M 100,340 L 100,260 L 180,180 L 260,160 L 320,220" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="80" y="340" width="40" height="20" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
        
        <circle cx="100" cy="260" r="8" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="180" cy="180" r="8" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="260" cy="160" r="8" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="320" cy="220" r="5" fill="currentColor" />
        
        <path d="M 280,260 Q 320,290 360,260" fill="none" stroke="#8D8A82" strokeOpacity="0.6" strokeDasharray="3 5" strokeWidth="1.5" />
      </g>

      {/* STATE 03: Vision */}
      <g className={cn("transition-opacity duration-1000", activeState === '03' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">03 / PERCEPTION</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">SENSE / PROCESS</text>
        
        <rect x="150" y="120" width="140" height="100" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 150,150 L 130,150 M 290,150 L 310,150 M 220,120 L 220,100 M 220,220 L 220,240" fill="none" stroke="#8D8A82" strokeOpacity="0.6" strokeWidth="1.5" />
        
        <rect x="190" y="150" width="50" height="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="190" y="145" fontSize="10" fill="hsl(var(--primary))">OBJ_01</text>
        
        <path d="M 50,340 L 150,220 L 220,220" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.8" />
        <path d="M 120,360 L 220,220" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.8" />
      </g>

      {/* STATE 04: Skyryder */}
      <g className={cn("transition-opacity duration-1000", activeState === '04' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">04 / FLIGHT</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">INTERACTIVE / WORK</text>
        
        <path d="M 20,340 L 380,340" fill="none" stroke="#8D8A82" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="12 12" />
        
        <path d="M 60,260 Q 200,100 340,200" fill="none" stroke="#8D8A82" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="5 8" />
        
        <g transform="translate(260, 150) rotate(25)">
          <path d="M -25,-8 Q 0,-15 25,0 Q 0,8 -25,-8 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M -15,0 L -35,-15" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        </g>
        
        <circle cx="130" cy="180" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="340" cy="200" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
