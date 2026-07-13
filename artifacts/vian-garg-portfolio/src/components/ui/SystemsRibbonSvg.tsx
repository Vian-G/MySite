import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SystemsRibbonSvgProps {
  activeState?: '01' | '02' | '03' | '04';
  className?: string;
}

const STATE_DESCRIPTIONS: Record<string, string> = {
  '01': 'Animated schematic of a tracked lunar rover with continuously rotating tank treads.',
  '02': 'Animated schematic of a six-axis robotic arm with each joint in continuous idle motion.',
  '03': 'Animated schematic of a four-wheeled lunar rover with a solar panel and spinning wheels.',
  '04': 'Schematic of a flight trajectory for an interactive flight project.',
};

/** Tracks the user's reduced-motion preference so decorative SVG animations can be skipped. */
function usePrefersMotion() {
  const [motionAllowed, setMotionAllowed] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMotionAllowed(!mq.matches);
    const handler = () => setMotionAllowed(!mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return motionAllowed;
}

/** A single robotic-arm joint: a segment ending in a hinge, rotating in place, with the next joint nested inside. */
function ArmJoint({
  className,
  motionAllowed,
  swayFrom,
  swayTo,
  dur,
  segment,
  jointRadius,
  children,
}: {
  className?: string;
  motionAllowed: boolean;
  swayFrom: number;
  swayTo: number;
  dur: string;
  segment: { x: number; y: number; width: string };
  jointRadius: number;
  children?: React.ReactNode;
}) {
  return (
    <g className={className}>
      <line x1="0" y1="0" x2={segment.x} y2={segment.y} stroke="currentColor" strokeWidth={segment.width} strokeLinecap="round" />
      <circle cx="0" cy="0" r={jointRadius} fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      {motionAllowed && (
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={`${swayFrom} 0 0;${swayTo} 0 0;${swayFrom} 0 0`}
          keyTimes="0;0.5;1"
          dur={dur}
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
        />
      )}
      <g transform={`translate(${segment.x},${segment.y})`}>{children}</g>
    </g>
  );
}

/** A six-spoke moon-rover wheel with rim-mounted grousers, matching MoonRanger's real running gear. */
function Wheel({ cx, motionAllowed, dur }: { cx: number; motionAllowed: boolean; dur: string }) {
  const rimR = 11;
  const grouserOuterR = rimR + 2;
  const grouserCount = 10;
  const grousers = Array.from({ length: grouserCount }, (_, i) => {
    const angle = (i / grouserCount) * 2 * Math.PI;
    const x1 = Math.cos(angle) * rimR;
    const y1 = Math.sin(angle) * rimR;
    const x2 = Math.cos(angle) * grouserOuterR;
    const y2 = Math.sin(angle) * grouserOuterR;
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.75" />;
  });

  return (
    <g transform={`translate(${cx}, 36)`}>
      <g>
        {/* Rim (outline only, no fill, so the wheel reads as a wire wheel rather than a solid disc) */}
        <circle r={rimR} fill="none" stroke="currentColor" strokeWidth="2" />
        {/* Grousers: short traction lugs studding the rim */}
        {grousers}
        {/* Hub */}
        <circle r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* 6 spokes, evenly spaced */}
        <path
          d="M -11,0 L 11,0 M -5.5,-9.53 L 5.5,9.53 M 5.5,-9.53 L -5.5,9.53"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {motionAllowed && (
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur={dur} repeatCount="indefinite" />
        )}
      </g>
    </g>
  );
}

export function SystemsRibbonSvg({ activeState = '01', className }: SystemsRibbonSvgProps) {
  const [isDrawn, setIsDrawn] = useState(false);
  const motionAllowed = usePrefersMotion();

  useEffect(() => {
    const t = setTimeout(() => setIsDrawn(true), 150);
    return () => clearTimeout(t);
  }, []);

  const sharedPath = "M 40,80 C 150,80 150,320 360,320";
  const wheelPositions = [14, 116];

  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("w-full h-full text-[#1B1C1A]/80 font-mono", className)}
      aria-label={STATE_DESCRIPTIONS[activeState] ?? `Technical system schematic. Active focus: System ${activeState}.`}
      role="img"
    >
      <title>Systems Ribbon Schematic</title>
      <desc>{STATE_DESCRIPTIONS[activeState] ?? `Continuous engineering blueprint showing ${activeState} active state.`}</desc>

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

      {/* STATE 01: Moon Miners — tracked rover, animated treads */}
      <g className={cn("transition-opacity duration-1000", activeState === '01' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">01 / MOBILITY</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">PATH / PLANNING</text>

        <path d="M 0,280 Q 100,290 200,260 T 400,290" fill="none" stroke="#8D8A82" strokeOpacity="0.5" strokeDasharray="4 4" strokeWidth="1.5" />

        <g transform="translate(50, 195)">
          {/* Chassis */}
          <path d="M 0,0 L 90,0 L 110,32 L -20,32 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Continuous track loop */}
          <rect x="-24" y="26" width="130" height="26" rx="13" ry="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Idler / drive sprockets inside the track */}
          <circle cx="-11" cy="39" r="7" fill="var(--background)" stroke="currentColor" strokeWidth="1" />
          <circle cx="41" cy="39" r="7" fill="var(--background)" stroke="currentColor" strokeWidth="1" />
          <circle cx="93" cy="39" r="7" fill="var(--background)" stroke="currentColor" strokeWidth="1" />
          {/* Animated tread marks scrolling along the track loop */}
          <rect
            x="-24" y="26" width="130" height="26" rx="13" ry="13"
            fill="none" stroke="currentColor" strokeWidth="3"
            strokeDasharray="3 5" pathLength="48"
            opacity="0.7"
          >
            {motionAllowed && (
              <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.6s" repeatCount="indefinite" />
            )}
          </rect>
        </g>

        <circle cx="340" cy="305" r="5" fill="none" stroke="#B87D2A" strokeWidth="1.5" />
        <circle cx="340" cy="305" r="2" fill="#B87D2A" className="animate-pulse motion-reduce:animate-none" />
      </g>

      {/* STATE 02: UR10e — 6-DOF arm, each joint animating */}
      <g className={cn("transition-opacity duration-1000", activeState === '02' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">02 / TOOLPATH</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">ROBOT / INTEGRATION</text>

        <rect x="80" y="340" width="40" height="20" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />

        <g transform="translate(100,340)">
          <ArmJoint motionAllowed={motionAllowed} swayFrom={-4} swayTo={4} dur="7s" segment={{ x: 0, y: -90, width: '2' }} jointRadius={7}>
            <ArmJoint motionAllowed={motionAllowed} swayFrom={6} swayTo={-8} dur="5.5s" segment={{ x: 70, y: -40, width: '2' }} jointRadius={7}>
              <ArmJoint motionAllowed={motionAllowed} swayFrom={-9} swayTo={6} dur="4.8s" segment={{ x: 40, y: -15, width: '1.5' }} jointRadius={6}>
                <ArmJoint motionAllowed={motionAllowed} swayFrom={5} swayTo={-9} dur="4.2s" segment={{ x: 25, y: 15, width: '1.5' }} jointRadius={5}>
                  <ArmJoint motionAllowed={motionAllowed} swayFrom={-7} swayTo={7} dur="3.6s" segment={{ x: 18, y: 18, width: '1.5' }} jointRadius={4.5}>
                    <g>
                      <circle cx="0" cy="0" r="5" fill="hsl(var(--primary))" />
                      <line x1="0" y1="0" x2="10" y2="6" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
                      {motionAllowed && (
                        <animateTransform attributeName="transform" type="rotate" values="0 0 0;14 0 0;0 0 0" keyTimes="0;0.5;1" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
                      )}
                    </g>
                  </ArmJoint>
                </ArmJoint>
              </ArmJoint>
            </ArmJoint>
          </ArmJoint>
        </g>

        <path d="M 280,260 Q 320,290 360,260" fill="none" stroke="#8D8A82" strokeOpacity="0.6" strokeDasharray="3 5" strokeWidth="1.5" />
      </g>

      {/* STATE 03: MoonRanger — 4-wheel rover with solar panel, spinning wheels */}
      <g className={cn("transition-opacity duration-1000", activeState === '03' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">03 / SURFACE MOBILITY</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">SOLAR / AUTONOMY</text>

        <path d="M 20,340 L 380,340" fill="none" stroke="#8D8A82" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="10 10" />

        <g transform="translate(120, 230)">
          {/* Low, flat foil-wrapped chassis */}
          <rect x="0" y="-4" width="130" height="22" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />

          {/* Front stereo-vision camera module, mounted forward on the chassis deck */}
          <rect x="2" y="-17" width="28" height="14" fill="var(--background)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <circle cx="10" cy="-10" r="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
          <circle cx="22" cy="-10" r="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />

          {/* Large tilted solar panel, hinged at the rear of the chassis */}
          <g transform="translate(98, -4) rotate(-16)">
            <rect x="-10" y="-116" width="70" height="116" fill="none" stroke="currentColor" strokeWidth="1.5" />
            {/* Solar cell grid */}
            <path
              d="M -10,-96 L 60,-96 M -10,-76 L 60,-76 M -10,-56 L 60,-56 M -10,-36 L 60,-36 M -10,-16 L 60,-16 M 13,-116 L 13,0 M 37,-116 L 37,0"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="0.75"
            />
            {/* Aperture / nadir camera cutout mid-panel, as on the real hardware */}
            <circle cx="25" cy="-62" r="6" fill="var(--background)" stroke="hsl(var(--primary))" strokeWidth="1.2" />
          </g>

          {/* 2 visible wheels (near-side profile view), each independently spinning */}
          {wheelPositions.map((cx, i) => (
            <Wheel key={cx} cx={cx} motionAllowed={motionAllowed} dur={`${2.4 + i * 0.2}s`} />
          ))}
        </g>

        <circle cx="340" cy="200" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
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
