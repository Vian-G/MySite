import { useEffect, useRef } from 'react';

/**
 * Drives a sidebar element so that it finishes scrolling at exactly the same
 * moment the user reaches the bottom of the page.
 *
 * The sidebar starts at translateY(0) (top of its grid cell) and translates
 * downward at a rate proportional to page scroll progress, so that when
 * `window.scrollY` reaches its maximum the sidebar's bottom edge is flush
 * with the bottom of its containing column.
 *
 * Returns a ref to attach to the sidebar <aside> element.
 * Skips all transforms when `prefers-reduced-motion: reduce` is set.
 */
export function useSidebarParallax<T extends HTMLElement>() {
  const sidebarRef = useRef<T>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    // Respect reduced-motion preference.
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      // How far the sidebar can travel before its bottom exits its column.
      const column = sidebar.parentElement;
      const columnH = column ? column.getBoundingClientRect().height : 0;
      const sidebarH = sidebar.scrollHeight;
      const maxTravel = Math.max(0, sidebarH - columnH);

      if (maxTravel === 0) return; // sidebar is shorter than its column; nothing to do.

      const progress = scrollY / maxScroll;           // 0 → 1
      const translateY = Math.round(progress * maxTravel);

      sidebar.style.transform = `translateY(${translateY}px)`;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // sync on mount

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return sidebarRef;
}
