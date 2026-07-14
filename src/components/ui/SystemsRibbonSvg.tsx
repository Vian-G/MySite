import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

import type { Project } from '@/config/projects';

export type ProjectId = Project['id'];

interface SystemsRibbonSvgProps {
  activeState?: ProjectId;
  className?: string;
}

const STATE_DESCRIPTIONS: Record<ProjectId, string> = {
  '01': 'Animated schematic of a tracked lunar rover with continuously rotating tank treads.',
  '02': 'Animated schematic of a six-axis robotic arm with each joint in continuous idle motion.',
  '03': 'Animated schematic of a four-wheeled lunar rover with a solar panel and spinning wheels.',
  '04': 'Animated schematic of a plane shown from a third-person chase view, swaying gently as the background scrolls past to convey forward flight.',
  '05': 'Animated schematic of a low aerodynamic composite racing buggy with spinning wheels, driving along a flat track.',
  '06': 'Animated schematic of a competition robot with a telescoping cascade lift extending and retracting above an omni-wheel drivetrain.',
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

/** Height (y) of a rolling dune/crater terrain at a given x, as the sum of two sine waves for a natural, irregular look. */
function terrainYAt(x: number, base: number, amp1: number, per1: number, amp2: number, per2: number) {
  return base + amp1 * Math.sin((2 * Math.PI * x) / per1) + amp2 * Math.sin((2 * Math.PI * x) / per2 + 1.3);
}

/** Builds an SVG line-path tracing the dune/crater terrain from xStart to xEnd at the given baseline. */
function buildTerrainPath(base: number, xStart: number, xEnd: number, amp1: number, per1: number, amp2: number, per2: number, step = 8) {
  let d = `M ${xStart},${terrainYAt(xStart, base, amp1, per1, amp2, per2).toFixed(2)}`;
  for (let x = xStart + step; x < xEnd; x += step) {
    d += ` L ${x},${terrainYAt(x, base, amp1, per1, amp2, per2).toFixed(2)}`;
  }
  d += ` L ${xEnd},${terrainYAt(xEnd, base, amp1, per1, amp2, per2).toFixed(2)}`;
  return d;
}

/**
 * Builds keyframes for a rotation `animateTransform` that makes a rover visually respond to terrain
 * slope as it drives along a matching `animateMotion` path, without ever exceeding `maxDeg` in either
 * direction. Sampled at uniform x-steps (a close approximation of the near-constant-speed motion along
 * a shallow terrain path) and rotated about a fixed local pivot near the vehicle's ground-contact point,
 * so the tilt reads as gentle pitching rather than exaggerated or unnatural rotation.
 */
function buildTiltKeyframes(
  xStart: number,
  xEnd: number,
  amp1: number,
  per1: number,
  amp2: number,
  per2: number,
  pivotX: number,
  pivotY: number,
  maxDeg = 9,
  steps = 60,
) {
  const values: string[] = [];
  const keyTimes: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = xStart + t * (xEnd - xStart);
    const slope =
      amp1 * ((2 * Math.PI) / per1) * Math.cos((2 * Math.PI * x) / per1) +
      amp2 * ((2 * Math.PI) / per2) * Math.cos((2 * Math.PI * x) / per2 + 1.3);
    const angle = Math.max(-maxDeg, Math.min(maxDeg, Math.atan(slope) * (180 / Math.PI)));
    values.push(`${angle.toFixed(2)} ${pivotX} ${pivotY}`);
    keyTimes.push(t.toFixed(4));
  }
  return { values: values.join(';'), keyTimes: keyTimes.join(';') };
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

  // Moon Miners: dune/crater terrain the tracked rover drives over, looping off the right edge and back in from the left.
  // Amplitudes give clearly visible dunes; rover tilt is separately clamped so it never reads as exaggerated.
  const minersTerrainBase = 300;
  const minersAmp1 = 12, minersPer1 = 190, minersAmp2 = 4, minersPer2 = 85;
  const minersGroundPath = buildTerrainPath(minersTerrainBase, 0, 400, minersAmp1, minersPer1, minersAmp2, minersPer2, 4);
  const minersRideHeight = 52; // local y of the track's bottom edge within the chassis group
  const minersMotionBase = minersTerrainBase - minersRideHeight;
  const minersMotionXStart = -70, minersMotionXEnd = 470;
  const minersMotionPath = buildTerrainPath(minersMotionBase, minersMotionXStart, minersMotionXEnd, minersAmp1, minersPer1, minersAmp2, minersPer2, 4);
  const minersStaticX = 170;
  const minersStaticY = terrainYAt(minersStaticX, minersMotionBase, minersAmp1, minersPer1, minersAmp2, minersPer2);
  const minersDur = '24s';
  const minersTilt = buildTiltKeyframes(minersMotionXStart, minersMotionXEnd, minersAmp1, minersPer1, minersAmp2, minersPer2, 45, minersRideHeight, 9);

  // MoonRanger: dune/crater terrain the 4-wheel rover drives over, looping off the right edge and back in from the left.
  const rangerTerrainBase = 344;
  const rangerAmp1 = 10, rangerPer1 = 210, rangerAmp2 = 3.5, rangerPer2 = 92;
  const rangerGroundPath = buildTerrainPath(rangerTerrainBase, 0, 400, rangerAmp1, rangerPer1, rangerAmp2, rangerPer2, 4);
  const rangerRideHeight = 47; // local y of the wheel-bottom contact point within the chassis group
  const rangerMotionBase = rangerTerrainBase - rangerRideHeight;
  const rangerMotionXStart = -80, rangerMotionXEnd = 480;
  const rangerMotionPath = buildTerrainPath(rangerMotionBase, rangerMotionXStart, rangerMotionXEnd, rangerAmp1, rangerPer1, rangerAmp2, rangerPer2, 4);
  const rangerStaticX = 190;
  const rangerStaticY = terrainYAt(rangerStaticX, rangerMotionBase, rangerAmp1, rangerPer1, rangerAmp2, rangerPer2);
  const rangerDur = '30s';
  const rangerTilt = buildTiltKeyframes(rangerMotionXStart, rangerMotionXEnd, rangerAmp1, rangerPer1, rangerAmp2, rangerPer2, 65, rangerRideHeight, 9);

  // SPIRIT Buggy: low, flat composite racing buggy driving along a flat track (no terrain undulation).
  const buggyTrackY = 330;
  const buggyMotionXStart = -60, buggyMotionXEnd = 460;
  const buggyStaticX = 180;
  const buggyDur = '10s';

  // FIRST Global: telescoping cascade lift, extending and retracting above an omni-wheel chassis.
  const liftBaseY = 330;
  const liftExtendedTopY = 210;
  const liftRetractedTopY = 285;

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

        {/* Dune / crater terrain the rover drives over */}
        <path d={minersGroundPath} fill="none" stroke="#5B5850" strokeOpacity="0.75" strokeDasharray="6 3" strokeWidth="2" />

        <g transform={motionAllowed ? undefined : `translate(${minersStaticX}, ${minersStaticY})`}>
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
          {/* Drives left-to-right over the dune/crater terrain, looping off the right edge and re-entering from the left */}
          {motionAllowed && (
            <>
              <animateMotion path={minersMotionPath} dur={minersDur} repeatCount="indefinite" />
              {/* Tilts to follow terrain slope, clamped to +/-9deg so it never reads as exaggerated */}
              <animateTransform
                attributeName="transform"
                type="rotate"
                values={minersTilt.values}
                keyTimes={minersTilt.keyTimes}
                dur={minersDur}
                repeatCount="indefinite"
                calcMode="linear"
              />
            </>
          )}
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

        {/* Dune / crater terrain the rover drives over */}
        <path d={rangerGroundPath} fill="none" stroke="#5B5850" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="8 6" />

        <g transform={motionAllowed ? undefined : `translate(${rangerStaticX}, ${rangerStaticY})`}>
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

          {/* Drives left-to-right over the dune/crater terrain, looping off the right edge and re-entering from the left */}
          {motionAllowed && (
            <>
              <animateMotion path={rangerMotionPath} dur={rangerDur} repeatCount="indefinite" />
              {/* Tilts to follow terrain slope, clamped to +/-9deg so it never reads as exaggerated */}
              <animateTransform
                attributeName="transform"
                type="rotate"
                values={rangerTilt.values}
                keyTimes={rangerTilt.keyTimes}
                dur={rangerDur}
                repeatCount="indefinite"
                calcMode="linear"
              />
            </>
          )}
        </g>

        <circle cx="340" cy="200" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      </g>

      {/* STATE 04: Skyryder — 3rd-person chase view, plane swaying over a scrolling ground grid */}
      <g className={cn("transition-opacity duration-1000", activeState === '04' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">04 / FLIGHT</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">INTERACTIVE / WORK</text>

        {/* Horizon */}
        <path d="M 40,150 L 360,150" fill="none" stroke="#8D8A82" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="8 6" />
        {/* Perspective guide rails converging on the vanishing point, framing the chase view */}
        <path d="M 200,150 L 40,360" fill="none" stroke="#8D8A82" strokeOpacity="0.25" strokeWidth="1" />
        <path d="M 200,150 L 360,360" fill="none" stroke="#8D8A82" strokeOpacity="0.25" strokeWidth="1" />

        {/* Scrolling ground grid: rungs travel from the horizon toward the viewer, widening as they approach, to read as forward motion */}
        {motionAllowed
          ? [0, 1, 2, 3].map((i) => {
              const dur = 3.2;
              const begin = `${-(i * dur) / 4}s`;
              return (
                <line key={i} x1="190" y1="150" x2="210" y2="150" stroke="currentColor" strokeWidth="1.5" opacity="0">
                  <animate attributeName="y1" values="150;360" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
                  <animate attributeName="y2" values="150;360" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
                  <animate attributeName="x1" values="190;40" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
                  <animate attributeName="x2" values="210;360" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.55;0.55;0" keyTimes="0;0.15;0.85;1" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
                </line>
              );
            })
          : (
            // Static frame: two fixed ground rungs at rest positions along the perspective rails
            <>
              <line x1="150" y1="215" x2="250" y2="215" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
              <line x1="110" y1="285" x2="290" y2="285" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
            </>
          )}

        {/* Plane, viewed from behind/above (3rd-person chase cam) */}
        <g transform="translate(200, 222)">
          <g>
            {motionAllowed && (
              <animateTransform
                attributeName="transform"
                type="translate"
                values="-7 0;7 0;-7 0"
                keyTimes="0;0.5;1"
                dur="5.2s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
              />
            )}
            <g>
              {motionAllowed && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="-5 0 30;5 0 30;-5 0 30"
                  keyTimes="0;0.5;1"
                  dur="4.1s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                />
              )}
              {/* Tail fin, closest to the viewer */}
              <path d="M 0,42 L 10,58 L 0,52 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              {/* Horizontal stabilizers */}
              <path d="M 0,48 L -22,58 L -8,52 L 0,48 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 0,48 L 22,58 L 8,52 L 0,48 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              {/* Fuselage, tapering away toward the nose near the horizon */}
              <path d="M 0,-52 L 6,10 L 4,52 L -4,52 L -6,10 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              {/* Main wings, swept back */}
              <path d="M 0,-13 L -78,22 L -50,30 L 0,2 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 0,-13 L 78,22 L 50,30 L 0,2 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              {/* Canopy, near the nose */}
              <ellipse cx="0" cy="-30" rx="4.5" ry="9" fill="var(--background)" stroke="hsl(var(--primary))" strokeWidth="1.25" />
            </g>
          </g>
        </g>

        <circle cx="70" cy="110" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="330" cy="110" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      </g>

      {/* STATE 05: SPIRIT Buggy — low aerodynamic composite racing buggy, spinning wheels, flat track */}
      <g className={cn("transition-opacity duration-1000", activeState === '05' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">05 / VEHICLE FAB</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">COMPOSITE STRUCTURE</text>

        {/* Flat track */}
        <path d={`M 0,${buggyTrackY} L 400,${buggyTrackY}`} fill="none" stroke="#5B5850" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="10 6" />

        <g transform={motionAllowed ? undefined : `translate(${buggyStaticX}, ${buggyTrackY - 34})`}>
          {/* Aerodynamic composite monocoque shell */}
          <path d="M -32,0 C -20,-26 30,-30 74,-16 C 92,-10 96,2 88,10 L -20,10 C -32,10 -38,4 -32,0 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Roll hoop */}
          <path d="M 6,-14 C 6,-32 30,-32 30,-14" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Driver canopy cutout */}
          <ellipse cx="18" cy="-14" rx="11" ry="6" fill="var(--background)" stroke="hsl(var(--primary))" strokeWidth="1.2" />

          {/* Rear wheel (larger) */}
          <g transform="translate(-14, 26)">
            <circle r="16" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle r="4" fill="none" stroke="currentColor" strokeWidth="1.25" />
            <path d="M -16,0 L 16,0 M -8,-13.9 L 8,13.9 M 8,-13.9 L -8,13.9" stroke="currentColor" strokeWidth="1.25" />
            {motionAllowed && (
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="1.4s" repeatCount="indefinite" additive="sum" />
            )}
          </g>
          {/* Front wheel (smaller, steering tie-rod visible) */}
          <g transform="translate(64, 30)">
            <circle r="11" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle r="3" fill="none" stroke="currentColor" strokeWidth="1.25" />
            <path d="M -11,0 L 11,0 M -5.5,-9.5 L 5.5,9.5 M 5.5,-9.5 L -5.5,9.5" stroke="currentColor" strokeWidth="1.25" />
            {motionAllowed && (
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="1s" repeatCount="indefinite" additive="sum" />
            )}
          </g>
          {/* Steering tie-rod linking front wheel to chassis */}
          <path d="M 40,16 L 62,24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />

          {motionAllowed && (
            <animateMotion
              path={`M ${buggyMotionXStart - buggyStaticX},0 L ${buggyMotionXEnd - buggyStaticX},0`}
              dur={buggyDur}
              repeatCount="indefinite"
            />
          )}
        </g>

        <circle cx="340" cy="200" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      </g>

      {/* STATE 06: FIRST Global Team UAE — telescoping cascade lift over an omni-wheel drivetrain */}
      <g className={cn("transition-opacity duration-1000", activeState === '06' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">06 / LIFT MECHANISM</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">COMPETITION ROBOT</text>

        <g transform="translate(180, 0)">
          {/* Chassis base */}
          <rect x="-40" y={liftBaseY} width="80" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" />

          {/* Omni wheels at the four chassis corners (diamond rollers denote omni-directional wheels) */}
          {[-34, 34].map((dx) => (
            <g key={dx} transform={`translate(${dx}, ${liftBaseY + 8})`}>
              <circle r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 0,-9 L 6,0 L 0,9 L -6,0 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              {motionAllowed && (
                <animateTransform attributeName="transform" type="rotate" values={`0 0 0;360 0 0`} dur="2.4s" repeatCount="indefinite" additive="sum" />
              )}
            </g>
          ))}

          {/* Telescoping cascade lift: outer rail fixed, inner carriage + platform extend and retract */}
          <line x1="-4" y1={liftBaseY} x2="-4" y2={liftRetractedTopY} stroke="currentColor" strokeWidth="1.5" />
          <line x1="4" y1={liftBaseY} x2="4" y2={liftRetractedTopY} stroke="currentColor" strokeWidth="1.5" />

          <g>
            {/* Inner moving stage */}
            <line x1="-4" y1={liftBaseY - 6} x2="-4" y2={liftExtendedTopY} stroke="hsl(var(--primary))" strokeWidth="2" />
            <line x1="4" y1={liftBaseY - 6} x2="4" y2={liftExtendedTopY} stroke="hsl(var(--primary))" strokeWidth="2" />
            {/* End-effector / carriage platform */}
            <rect x="-16" y={liftExtendedTopY - 6} width="32" height="8" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />

            {motionAllowed && (
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0 0;0 ${liftRetractedTopY - liftExtendedTopY};0 0`}
                keyTimes="0;0.5;1"
                dur="6s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
              />
            )}
          </g>
        </g>

        <circle cx="340" cy="220" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
