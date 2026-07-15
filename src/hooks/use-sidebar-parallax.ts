import { useEffect, useRef } from 'react';

/**
 * Proportional-scroll sidebar: both the page content and the photo stack
 * finish scrolling at the same moment, regardless of which is taller.
 *
 * When photos are shorter than the body column  → sidebar scrolls SLOWER.
 * When photos are taller than the body column   → sidebar scrolls FASTER.
 *
 * Math:
 *   bodyTravel    = bodyColH - viewportH   (how far body content "travels")
 *   sidebarTravel = sidebarH - viewportH   (how far sidebar needs to travel)
 *   rate          = sidebarTravel / bodyTravel
 *   translateY    = scrollProgress * bodyTravel * rate
 *                 = scrollProgress * sidebarTravel
 *
 * Clamped to [0, sidebarTravel] so it never over- or under-shoots.
 * No-ops when prefers-reduced-motion is set.
 */
export function useSidebarParallax<T extends HTMLElement>() {
  const sidebarRef = useRef<T>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const el = sidebarRef.current;
      if (!el) return;

      const maxPageScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxPageScroll <= 0) return;

      const vh = window.innerHeight;
      const sidebarH = el.scrollHeight;

      // Body column is the grid's first child (two levels up from the aside).
      const gridEl = el.parentElement?.parentElement;
      const bodyCol = gridEl?.firstElementChild as HTMLElement | null;
      const bodyColH = bodyCol ? bodyCol.scrollHeight : 0;

      // How far each column needs to travel to be fully seen.
      const sidebarTravel = Math.max(0, sidebarH - vh);
      const bodyTravel    = Math.max(1, bodyColH - vh); // avoid div/0

      if (sidebarTravel === 0) {
        // Sidebar fits in the viewport entirely — no translation needed.
        el.style.transform = '';
        return;
      }

      const progress   = window.scrollY / maxPageScroll;          // 0 → 1
      const translateY = Math.round(
        Math.min(sidebarTravel, progress * sidebarTravel)
      );

      el.style.transform = `translateY(${translateY}px)`;
    };

    const queue = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return sidebarRef;
}
