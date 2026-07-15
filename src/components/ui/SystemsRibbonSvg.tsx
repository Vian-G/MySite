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
  '05': 'Animated schematic of a CMU Sweepstakes buggy — low torpedo-shaped carbon-fiber shell, prone driver, reverse-trike wheels, driving along a flat track.',
  '06': 'Animated schematic of a competition robot with a telescoping cascade lift extending and retracting above an omni-wheel drivetrain.',
};

/** Tracks the user’s reduced-motion preference so decorative SVG animations can be skipped. */
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
 * slope as it drives along a matching `animateMotion` path.
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

/** A six-spoke moon-rover wheel with rim-mounted grousers. */
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
        <circle r={rimR} fill="none" stroke="currentColor" strokeWidth="2" />
        {grousers}
        <circle r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
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

/**
 * CMU Sweepstakes buggy wheel: tiny Xootr-based wheel (~7.5" dia real-world).
 * At SVG scale the wheel radius is ~8px.
 */
function BuggyWheel({ motionAllowed, dur, r = 8 }: { motionAllowed: boolean; dur: string; r?: number }) {
  return (
    <g>
      <circle r={r} fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle r={r * 0.32} fill="none" stroke="currentColor" strokeWidth="1" />
      {/* 4 spokes */}
      <line x1={-r} y1="0" x2={r} y2="0" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1={-r} x2="0" y2={r} stroke="currentColor" strokeWidth="1" />
      {motionAllowed && (
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur={dur} repeatCount="indefinite" />
      )}
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

  // Moon Miners terrain
  const minersTerrainBase = 300;
  const minersAmp1 = 12, minersPer1 = 190, minersAmp2 = 4, minersPer2 = 85;
  const minersGroundPath = buildTerrainPath(minersTerrainBase, 0, 400, minersAmp1, minersPer1, minersAmp2, minersPer2, 4);
  const minersRideHeight = 52;
  const minersMotionBase = minersTerrainBase - minersRideHeight;
  const minersMotionXStart = -70, minersMotionXEnd = 470;
  const minersMotionPath = buildTerrainPath(minersMotionBase, minersMotionXStart, minersMotionXEnd, minersAmp1, minersPer1, minersAmp2, minersPer2, 4);
  const minersStaticX = 170;
  const minersStaticY = terrainYAt(minersStaticX, minersMotionBase, minersAmp1, minersPer1, minersAmp2, minersPer2);
  const minersDur = '24s';
  const minersTilt = buildTiltKeyframes(minersMotionXStart, minersMotionXEnd, minersAmp1, minersPer1, minersAmp2, minersPer2, 45, minersRideHeight, 9);

  // MoonRanger terrain
  const rangerTerrainBase = 344;
  const rangerAmp1 = 10, rangerPer1 = 210, rangerAmp2 = 3.5, rangerPer2 = 92;
  const rangerGroundPath = buildTerrainPath(rangerTerrainBase, 0, 400, rangerAmp1, rangerPer1, rangerAmp2, rangerPer2, 4);
  const rangerRideHeight = 47;
  const rangerMotionBase = rangerTerrainBase - rangerRideHeight;
  const rangerMotionXStart = -80, rangerMotionXEnd = 480;
  const rangerMotionPath = buildTerrainPath(rangerMotionBase, rangerMotionXStart, rangerMotionXEnd, rangerAmp1, rangerPer1, rangerAmp2, rangerPer2, 4);
  const rangerStaticX = 190;
  const rangerStaticY = terrainYAt(rangerStaticX, rangerMotionBase, rangerAmp1, rangerPer1, rangerAmp2, rangerPer2);
  const rangerDur = '30s';
  const rangerTilt = buildTiltKeyframes(rangerMotionXStart, rangerMotionXEnd, rangerAmp1, rangerPer1, rangerAmp2, rangerPer2, 65, rangerRideHeight, 9);

  // ─── Spirit Buggy ────────────────────────────────────────────────────────────
  //
  // Real CMU Buggy proportions (from the Buggy Build Book):
  //   Total shell length:  ~83" (77.5" driver + 6" nose crumple zone)
  //   Wheelbase:           ~67"
  //   Ride height:          2.5" (extremely low to ground)
  //   Wheel diameter:       7.5" (Xootr-based wheels, tiny relative to shell)
  //   Configuration:        reverse trike — 2 front wheels, 1 rear wheel
  //   Driver posture:       prone (face-down, head toward nose)
  //   Shell silhouette:     long cigar / torpedo with Kammback tail
  //
  // SVG scale: 1px ≈ 1.4" real-world.
  // Shell width in SVG: 240px  → ~240 / 400 of viewport.
  // Shell height:        38px peak crown  (very flat relative to length).
  // Wheel radius:         8px  (~11" dia) — intentionally small.
  // Wheelbase in SVG:    160px (matches ~67" real @ 2.4px/inch scale).
  //
  // Coordinate system: all geometry local to the buggy group (origin = ground under rear wheel).
  //   Ground line Y = 0, upward is negative Y.
  //   Rear wheel center:   (  0, -8)  (wheel sits on ground, r=8)
  //   Front wheel centres: (160, -8)  (two front wheels, side-by-side — in profile they overlap,
  //                                    so we draw just one circle for the front axle)
  //   Shell spans from x ≈ -16 (tail) to x ≈ +220 (nose tip).
  //
  // Shell path (left-side profile, bottom edge first, then top edge):
  //   Bottom edge: nearly flat, just clears the ground, from tail to nose.
  //   Top edge:    rises sharply above the front wheels (windshield zone), peaks above
  //                the driver’s mid-body (~x=90), then flows into a Kammback tail.
  //
  const buggyTrackY = 340;
  const buggyWheelR = 8;
  // Shell path in local coords (Y down, ground = 0)
  // Bottom edge: tail (-16,0) → belly → nose tip (220,0) curved slightly above ground
  // Top edge: nose (210,-14) → windshield peak (-3,-42) → crown (80,-42) → Kammback drop to tail (-16,-10)
  const buggyShellPath = [
    // Start at tail bottom
    'M -16,-2',
    // Bottom belly — very slight arc hugging the ground
    'C 20,-1 140,-1 210,-2',
    // Round the nose tip
    'C 222,-2 224,-10 222,-16',
    // Windshield line — steep rise from nose up to peak
    'C 218,-22 200,-36 178,-40',
    // Crown plateau over mid-body
    'C 140,-44 110,-44 80,-43',
    // Long smooth descent down the spine toward the tail
    'C 50,-42 10,-28 -8,-18',
    // Kammback: near-vertical chop at the tail
    'L -16,-18',
    // Close back to start
    'Z',
  ].join(' ');

  // Windshield aperture — sits in the nose/windshield zone, slightly inset
  // A narrow ellipse representing the Lexan windscreen (primary highlight)
  const buggyWindshieldPath = 'M 210,-10 C 204,-22 188,-34 176,-38 C 186,-36 204,-24 212,-12 Z';

  // Hatch opening — the oval cutout above the driver’s head/shoulders region
  // In profile this reads as a thin teardrop slot.
  // Center around x=110, y=-40 (just below the crown)
  const buggyHatchCx = 108, buggyHatchCy = -40, buggyHatchRx = 30, buggyHatchRy = 5;

  // Front axle dimension line annotation
  const buggyFrontAxleX = 160;

  const buggyDur = '10s';
  const buggyMotionXStart = -80;
  const buggyMotionXEnd = 500;
  // Static render: place the buggy so the rear wheel sits at roughly the mid-left of the frame.
  // Ground contact Y = buggyTrackY, local Y=0 is ground, so translate Y = buggyTrackY.
  const buggyStaticGroupX = 90;

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

        <path d={minersGroundPath} fill="none" stroke="#5B5850" strokeOpacity="0.75" strokeDasharray="6 3" strokeWidth="2" />

        <g transform={motionAllowed ? undefined : `translate(${minersStaticX}, ${minersStaticY})`}>
          <path d="M 0,0 L 90,0 L 110,32 L -20,32 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="-24" y="26" width="130" height="26" rx="13" ry="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="-11" cy="39" r="7" fill="var(--background)" stroke="currentColor" strokeWidth="1" />
          <circle cx="41" cy="39" r="7" fill="var(--background)" stroke="currentColor" strokeWidth="1" />
          <circle cx="93" cy="39" r="7" fill="var(--background)" stroke="currentColor" strokeWidth="1" />
          <rect x="-24" y="26" width="130" height="26" rx="13" ry="13" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="3 5" pathLength="48" opacity="0.7">
            {motionAllowed && (
              <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.6s" repeatCount="indefinite" />
            )}
          </rect>
          {motionAllowed && (
            <>
              <animateMotion path={minersMotionPath} dur={minersDur} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="rotate" values={minersTilt.values} keyTimes={minersTilt.keyTimes} dur={minersDur} repeatCount="indefinite" calcMode="linear" />
            </>
          )}
        </g>

        <circle cx="340" cy="305" r="5" fill="none" stroke="#B87D2A" strokeWidth="1.5" />
        <circle cx="340" cy="305" r="2" fill="#B87D2A" className="animate-pulse motion-reduce:animate-none" />
      </g>

      {/* STATE 02: UR10e — 6-DOF arm */}
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

      {/* STATE 03: MoonRanger — 4-wheel rover with solar panel */}
      <g className={cn("transition-opacity duration-1000", activeState === '03' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">03 / SURFACE MOBILITY</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">SOLAR / AUTONOMY</text>

        <path d={rangerGroundPath} fill="none" stroke="#5B5850" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="8 6" />

        <g transform={motionAllowed ? undefined : `translate(${rangerStaticX}, ${rangerStaticY})`}>
          <rect x="0" y="-4" width="130" height="22" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="2" y="-17" width="28" height="14" fill="var(--background)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <circle cx="10" cy="-10" r="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
          <circle cx="22" cy="-10" r="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
          <g transform="translate(98, -4) rotate(-16)">
            <rect x="-10" y="-116" width="70" height="116" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M -10,-96 L 60,-96 M -10,-76 L 60,-76 M -10,-56 L 60,-56 M -10,-36 L 60,-36 M -10,-16 L 60,-16 M 13,-116 L 13,0 M 37,-116 L 37,0" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.75" />
            <circle cx="25" cy="-62" r="6" fill="var(--background)" stroke="hsl(var(--primary))" strokeWidth="1.2" />
          </g>
          {wheelPositions.map((cx, i) => (
            <Wheel key={cx} cx={cx} motionAllowed={motionAllowed} dur={`${2.4 + i * 0.2}s`} />
          ))}
          {motionAllowed && (
            <>
              <animateMotion path={rangerMotionPath} dur={rangerDur} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="rotate" values={rangerTilt.values} keyTimes={rangerTilt.keyTimes} dur={rangerDur} repeatCount="indefinite" calcMode="linear" />
            </>
          )}
        </g>

        <circle cx="340" cy="200" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      </g>

      {/* STATE 04: Skyryder — 3rd-person chase view */}
      <g className={cn("transition-opacity duration-1000", activeState === '04' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">04 / FLIGHT</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">INTERACTIVE / WORK</text>

        <path d="M 40,150 L 360,150" fill="none" stroke="#8D8A82" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="8 6" />
        <path d="M 200,150 L 40,360" fill="none" stroke="#8D8A82" strokeOpacity="0.25" strokeWidth="1" />
        <path d="M 200,150 L 360,360" fill="none" stroke="#8D8A82" strokeOpacity="0.25" strokeWidth="1" />

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
            <>
              <line x1="150" y1="215" x2="250" y2="215" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
              <line x1="110" y1="285" x2="290" y2="285" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
            </>
          )}

        <g transform="translate(200, 222)">
          <g>
            {motionAllowed && (
              <animateTransform attributeName="transform" type="translate" values="-7 0;7 0;-7 0" keyTimes="0;0.5;1" dur="5.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
            )}
            <g>
              {motionAllowed && (
                <animateTransform attributeName="transform" type="rotate" values="-5 0 30;5 0 30;-5 0 30" keyTimes="0;0.5;1" dur="4.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
              )}
              <path d="M 0,42 L 10,58 L 0,52 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 0,48 L -22,58 L -8,52 L 0,48 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 0,48 L 22,58 L 8,52 L 0,48 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 0,-52 L 6,10 L 4,52 L -4,52 L -6,10 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 0,-13 L -78,22 L -50,30 L 0,2 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 0,-13 L 78,22 L 50,30 L 0,2 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <ellipse cx="0" cy="-30" rx="4.5" ry="9" fill="var(--background)" stroke="hsl(var(--primary))" strokeWidth="1.25" />
            </g>
          </g>
        </g>

        <circle cx="70" cy="110" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="330" cy="110" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      </g>

      {/* ═══════════════════════════════════════════════════════════════════════
           STATE 05: SPIRIT Buggy
           CMU Sweepstakes racing buggy — prone driver, torpedo/cigar shell,
           reverse-trike configuration (2 front wheels, 1 rear), Kammback tail.
           Driving left → right along a flat asphalt track.
           All buggy geometry is in a local coordinate system where:
             Y = 0  →  ground (track surface)
             up   →  negative Y
             nose →  positive X  (buggy travels to the right)
        ═══════════════════════════════════════════════════════════════════════ */}
      <g className={cn("transition-opacity duration-1000", activeState === '05' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">05 / VEHICLE FAB</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">COMPOSITE STRUCTURE</text>

        {/* Flat asphalt track — solid line + subtle dashed centreline */}
        <line x1="0" y1={buggyTrackY} x2="400" y2={buggyTrackY} stroke="#5B5850" strokeOpacity="0.7" strokeWidth="2" />
        <line x1="0" y1={buggyTrackY - 60} x2="400" y2={buggyTrackY - 60} stroke="#5B5850" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="14 8" />

        {/*
          Buggy group: origin = (0, 0) in local space = rear wheel ground contact.
          Translate to (buggyStaticGroupX, buggyTrackY) for static display,
          or use animateMotion for the animated version.
        */}
        <g transform={motionAllowed ? undefined : `translate(${buggyStaticGroupX}, ${buggyTrackY})`}>

          {/* ── Shell ─────────────────────────────────────────────────────── */}
          {/*
            Long torpedo silhouette from the Buggy Build Book profile:
            - Nose at x≈+222, which reads visually as the front of the buggy.
            - Tail at x≈-16 (Kammback vertical chop).
            - Crown at ~x=90, y=-43 (very flat — only ~43px tall at peak).
            - Belly nearly touches the ground (ride height ~2px = 2.5" real).
            - Windshield is a narrow faceted pane in the nose zone.
            - Hatch opening is a thin ellipse just aft of the crown.
          */}
          <path
            d={buggyShellPath}
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />

          {/* Carbon-fibre surface detail — two subtle panel-break lines */}
          {/* Spine crease from crown to tail */}
          <path d="M 80,-42 C 40,-32 0,-18 -8,-14" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.75" strokeDasharray="4 3" />
          {/* Forward shoulder crease */}
          <path d="M 178,-40 C 168,-34 155,-28 140,-24" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.75" />

          {/* Lexan windshield — faceted pane, highlighted */}
          <path
            d={buggyWindshieldPath}
            fill="var(--background)"
            stroke="hsl(var(--primary))"
            strokeWidth="1.25"
            fillOpacity="0.6"
          />

          {/* Hatch opening (driver load aperture above mid-body) */}
          <ellipse
            cx={buggyHatchCx} cy={buggyHatchCy}
            rx={buggyHatchRx} ry={buggyHatchRy}
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* ── Wheels ────────────────────────────────────────────────────── */}
          {/*
            Reverse trike: two front wheels (x=160) and one rear wheel (x=0).
            Wheel radius = 8px (~7.5" real-world scale).
            In profile the two front wheels overlap; draw as one circle.
            Wheel centres sit at y = -buggyWheelR (so bottom of wheel = ground = 0).
          */}

          {/* Rear wheel (single, centred under the tail zone) */}
          <g transform={`translate(0, ${-buggyWheelR})`}>
            <BuggyWheel motionAllowed={motionAllowed} dur="1.1s" r={buggyWheelR} />
          </g>

          {/* Front axle — two wheels, drawn as one circle in side profile */}
          <g transform={`translate(${buggyFrontAxleX}, ${-buggyWheelR})`}>
            <BuggyWheel motionAllowed={motionAllowed} dur="0.85s" r={buggyWheelR} />
          </g>

          {/* Steering tie-rod: thin line from front wheel hub to the shell interior */}
          <line
            x1={buggyFrontAxleX} y1={-buggyWheelR * 2 - 4}
            x2={buggyFrontAxleX - 12} y2={-18}
            stroke="hsl(var(--primary))"
            strokeWidth="1.25"
            strokeLinecap="round"
          />

          {/* ── Dimension annotation ──────────────────────────────────────── */}
          {/* Wheelbase callout — tiny dimension lines between axle centres */}
          <line x1="0" y1="10" x2={buggyFrontAxleX} y2="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.75" strokeDasharray="2 2" />
          <line x1="0" y1="8" x2="0" y2="12" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.75" />
          <line x1={buggyFrontAxleX} y1="8" x2={buggyFrontAxleX} y2="12" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.75" />
          <text x={buggyFrontAxleX / 2} y="22" fontSize="7" fill="currentColor" fillOpacity="0.4" textAnchor="middle" fontFamily="monospace">WB ≈ 67"</text>

          {/* ── Animation ─────────────────────────────────────────────────── */}
          {motionAllowed && (
            <animateMotion
              path={`M ${buggyMotionXStart - buggyStaticGroupX},0 L ${buggyMotionXEnd - buggyStaticGroupX},0`}
              dur={buggyDur}
              repeatCount="indefinite"
            />
          )}
        </g>

        {/* Decorative telemetry dot */}
        <circle cx="340" cy="200" r="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
      </g>

      {/* STATE 06: FIRST Global Team UAE — telescoping cascade lift */}
      <g className={cn("transition-opacity duration-1000", activeState === '06' ? "opacity-100" : "opacity-0")}>
        <text x="20" y="30" fontSize="10" fill="currentColor" opacity="0.6">06 / LIFT MECHANISM</text>
        <text x="20" y="45" fontSize="10" fill="currentColor" opacity="0.6">COMPETITION ROBOT</text>

        <g transform="translate(180, 0)">
          <rect x="-40" y={330} width="80" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" />

          {[-34, 34].map((dx) => (
            <g key={dx} transform={`translate(${dx}, ${330 + 8})`}>
              <circle r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 0,-9 L 6,0 L 0,9 L -6,0 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              {motionAllowed && (
                <animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" dur="2.4s" repeatCount="indefinite" additive="sum" />
              )}
            </g>
          ))}

          <line x1="-4" y1={330} x2="-4" y2={285} stroke="currentColor" strokeWidth="1.5" />
          <line x1="4" y1={330} x2="4" y2={285} stroke="currentColor" strokeWidth="1.5" />

          <g>
            <line x1="-4" y1={330 - 6} x2="-4" y2={210} stroke="hsl(var(--primary))" strokeWidth="2" />
            <line x1="4" y1={330 - 6} x2="4" y2={210} stroke="hsl(var(--primary))" strokeWidth="2" />
            <rect x="-16" y={210 - 6} width="32" height="8" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />

            {motionAllowed && (
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0 0;0 ${285 - 210};0 0`}
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
