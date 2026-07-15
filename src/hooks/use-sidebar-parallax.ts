import { useEffect, useRef } from 'react';

/**
 * Drives a sidebar element so that it finishes scrolling at exactly the same
 * moment the user reaches the bottom of the page.
 *
 * Strategy: the sidebar starts at translateY(0) and is pushed down
 * proportionally to page scroll progress. The maximum translation is
 * `sidebarStackHeight - bodyColumnHeight`, i.e. how much the stack overflows
 * its peer column. When scrollY / maxPageScroll === 1 the sidebar bottom
 * is flush with the body column bottom.
 *
 * Returns a ref to attach to the sidebar <aside> element.
 * No-ops when prefers-reduced-motion is set.
 */
export function useSidebarParallax<T extends HTMLElement>() {
  const sidebarRef = useRef<T>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

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

      // The grid container is the sidebar wrapper's parent.
      // Its first child is the left body column — that is the reference height
      // we want the sidebar to travel alongside.
      const gridEl = el.parentElement?.parentElement;
      const bodyCol = gridEl?.firstElementChild as HTMLElement | null;
      const bodyColH = bodyCol ? bodyCol.scrollHeight : 0;

      const sidebarH = el.scrollHeight;
      const maxTravel = Math.max(0, sidebarH - bodyColH);

      // If the photo stack is shorter than the body column there is nothing
      // to scroll — just leave it pinned at the top.
      if (maxTravel === 0) {
        el.style.transform = '';
        return;
      }

      const progress = window.scrollY / maxPageScroll; // 0 → 1
      const translateY = Math.round(progress * maxTravel);
      el.style.transform = `translateY(${translateY}px)`;
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    // Also re-measure on resize (viewport changes alter bodyColH).
    const onResize = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    update(); // sync on mount

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return sidebarRef;
}
