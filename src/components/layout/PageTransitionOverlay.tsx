import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';

interface PageTransitionContextValue {
  /** Navigate to `href`, flashing a brief white-out overlay across the transition. */
  navigateWithFlash: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

const FLASH_IN_MS = 260;
const FLASH_OUT_MS = 320;

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isFlashing, setIsFlashing] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const navigateWithFlash = useCallback(
    (href: string) => {
      if (prefersReducedMotion) {
        navigate(href);
        return;
      }

      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];

      setIsFlashing(true);
      timeouts.current.push(
        setTimeout(() => {
          navigate(href);
          timeouts.current.push(
            setTimeout(() => setIsFlashing(false), FLASH_OUT_MS)
          );
        }, FLASH_IN_MS)
      );
    },
    [navigate, prefersReducedMotion]
  );

  return (
    <PageTransitionContext.Provider value={{ navigateWithFlash }}>
      {children}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[100] bg-background pointer-events-none transition-opacity duration-300 ease-in-out"
        style={{ opacity: isFlashing ? 1 : 0 }}
      />
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider');
  }
  return ctx;
}
