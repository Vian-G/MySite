import { useEffect, useRef } from 'react';

/**
 * Scrolls the sidebar so its bottom edge lands exactly on the body column's
 * bottom edge at the moment the user reaches the end of the page.
 *
 * Geometric model (all values in document-space px):
 *
 *   bodyBottom   = absolute Y of body column's bottom edge
 *   sidebarTop   = absolute Y of sidebar's top edge (at translateY = 0)
 *   restBottom   = sidebarTop + sidebar.scrollHeight   (sidebar bottom at rest)
 *   maxTravel    = bodyBottom - restBottom
 *
 * When sidebar is shorter than body → maxTravel > 0 → push down gradually.
 * When sidebar is taller  than body → maxTravel ≤ 0 → no transform needed.
 *
 *   translateY = clamp(scrollProgress × maxTravel, 0, maxTravel)
 *
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

      // Body column: grid's first child (sidebar wrapper is second child,
      // aside is one level inside that).
      const gridEl = el.parentElement?.parentElement;
      const bodyCol = gridEl?.firstElementChild as HTMLElement | null;
      if (!bodyCol) return;

      // Convert to document-space by adding current scroll.
      const scrollY = window.scrollY;
      const bodyBottom  = bodyCol.getBoundingClientRect().bottom  + scrollY;
      const sidebarTop  = el.getBoundingClientRect().top          + scrollY
                          - parseFloat(el.style.transform.replace(/[^0-9.-]/g, '') || '0');
      // ↑ Remove any existing translateY so we measure the natural resting position.

      const sidebarH  = el.scrollHeight;
      const restBottom = sidebarTop + sidebarH;
      const maxTravel  = bodyBottom - restBottom;

      if (maxTravel <= 0) {
        // Sidebar already reaches or exceeds body bottom — no push needed.
        el.style.transform = '';
        return;
      }

      const progress   = scrollY / maxPageScroll;
      const translateY = Math.round(Math.min(maxTravel, progress * maxTravel));
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
