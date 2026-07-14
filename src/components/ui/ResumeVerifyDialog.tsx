import React, { useCallback, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MetalDataPlate } from '@/components/ui/MetalDataPlate';

const HOLD_DURATION_MS = 1100;

interface ResumeVerifyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: () => void;
}

/**
 * A lightweight, self-contained human-check gate for the résumé download/view actions.
 * Real visitors press and hold a physical-style switch for just over a second; the hidden
 * honeypot field catches naive bots that auto-fill every form field on a page.
 */
export function ResumeVerifyDialog({ open, onOpenChange, onVerified }: ResumeVerifyDialogProps) {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [flagged, setFlagged] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const stop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    startRef.current = 0;
    setHolding(false);
    setProgress(0);
  }, []);

  const tick = useCallback(
    (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const pct = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);
      setProgress(pct);

      if (pct >= 100) {
        rafRef.current = null;
        startRef.current = 0;
        setHolding(false);

        if (honeypotRef.current?.value) {
          // A hidden field got filled in -- almost certainly an automated form-filler, not a person.
          setFlagged(true);
          setProgress(0);
          return;
        }

        onVerified();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [onVerified],
  );

  const start = useCallback(() => {
    setFlagged(false);
    startRef.current = 0;
    setHolding(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) stop();
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <MetalDataPlate title="Check" screwPositions="sides" className="w-fit mb-2">
            Human verification
          </MetalDataPlate>
          <DialogTitle className="font-serif text-2xl">Quick human check</DialogTitle>
          <DialogDescription>
            Press and hold the switch below for a second to confirm you&apos;re not a bot. The résumé unlocks
            automatically once verified.
          </DialogDescription>
        </DialogHeader>

        {/* Honeypot field: invisible to sighted users and skipped by keyboard tabbing, but a
            juicy target for bots that blindly fill every input on a form. */}
        <input
          ref={honeypotRef}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-0 top-0 h-px w-px overflow-hidden opacity-0"
        />

        <button
          type="button"
          onPointerDown={start}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          className={cn(
            'relative h-14 w-full select-none touch-none overflow-hidden rounded-[2px] border border-[#1B1C1A] bg-[#2B2D2A]',
            'shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.2)]',
            'outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          )}
        >
          <span
            className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
          <span className="relative z-10 flex h-full items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider text-[#F1EDE4]">
            <ShieldCheck className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {holding ? 'Hold…' : 'Press & hold to verify'}
          </span>
        </button>

        {flagged && (
          <p className="font-mono text-[10px] uppercase tracking-wider text-primary" role="alert">
            Verification failed — please try again.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
