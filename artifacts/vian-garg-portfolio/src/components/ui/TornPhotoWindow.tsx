import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface TornPhotoWindowProps {
  src: string;
  alt: string;
  className?: string;
  /** Extra classes applied to the underlying <img>, e.g. to adjust object-position. */
  imgClassName?: string;
  /** Which torn-edge silhouette variant to use, for visual variety across cards. */
  variant?: 0 | 1 | 2;
  /** Slight rotation in degrees to make the cutout feel hand-torn and physical. */
  rotate?: number;
}

/**
 * A handful of irregular, jagged blob outlines (in objectBoundingBox units) that read as a
 * torn hole ripped through paper, revealing a photo underneath.
 */
const TORN_HOLE_PATHS = [
  'M 0.08,0.18 L 0.2,0.06 L 0.34,0.13 L 0.48,0.02 L 0.62,0.11 L 0.76,0.04 L 0.9,0.16 L 0.97,0.3 L 0.89,0.42 L 0.96,0.55 L 0.86,0.66 L 0.94,0.8 L 0.79,0.89 L 0.89,0.98 L 0.68,0.93 L 0.53,0.99 L 0.38,0.9 L 0.24,0.97 L 0.11,0.86 L 0.17,0.71 L 0.02,0.6 L 0.09,0.46 L 0.01,0.33 L 0.13,0.23 Z',
  'M 0.1,0.12 L 0.26,0.03 L 0.4,0.1 L 0.55,0.01 L 0.7,0.09 L 0.85,0.02 L 0.95,0.19 L 0.88,0.32 L 0.98,0.44 L 0.9,0.58 L 0.99,0.7 L 0.87,0.82 L 0.93,0.95 L 0.75,0.9 L 0.6,0.98 L 0.44,0.91 L 0.29,0.99 L 0.15,0.9 L 0.2,0.75 L 0.04,0.68 L 0.12,0.52 L 0.02,0.4 L 0.11,0.27 L 0.03,0.2 Z',
  'M 0.14,0.05 L 0.3,0.14 L 0.44,0.04 L 0.58,0.13 L 0.73,0.03 L 0.88,0.14 L 0.97,0.27 L 0.86,0.38 L 0.98,0.5 L 0.85,0.61 L 0.95,0.75 L 0.81,0.85 L 0.9,0.96 L 0.71,0.9 L 0.57,0.98 L 0.41,0.89 L 0.26,0.97 L 0.13,0.85 L 0.19,0.7 L 0.03,0.62 L 0.1,0.47 L 0.02,0.34 L 0.09,0.21 L 0.02,0.14 Z',
] as const;

/** A photo peeking through an irregular torn-paper hole, matching the site's physical-archive aesthetic. */
export function TornPhotoWindow({ src, alt, className, imgClassName, variant = 0, rotate = -3 }: TornPhotoWindowProps) {
  const clipId = useId();

  return (
    <div
      className={cn('relative select-none', className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden={alt === '' ? true : undefined}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={TORN_HOLE_PATHS[variant % TORN_HOLE_PATHS.length]} />
          </clipPath>
        </defs>
      </svg>
      <div
        className="relative w-full h-full drop-shadow-[0_4px_8px_rgba(27,28,26,0.35)]"
        style={{ clipPath: `url(#${clipId})` }}
      >
        <img src={src} alt={alt} loading="lazy" className={cn('w-full h-full object-cover', imgClassName)} />
        {/* Fake depth into the torn hole with an inset shadow around the edge */}
        <div className="absolute inset-0 shadow-[inset_0_0_16px_8px_rgba(20,18,14,0.5)] pointer-events-none" />
      </div>
    </div>
  );
}
