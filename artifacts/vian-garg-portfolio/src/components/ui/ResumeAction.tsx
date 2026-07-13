import React, { useCallback, useState } from 'react';
import { RESUME_PDF_URL, RESUME_FILENAME } from '@/config/resume';
import { useResumeVerification } from '@/hooks/use-resume-verification';
import { ResumeVerifyDialog } from '@/components/ui/ResumeVerifyDialog';

type ResumeActionMode = 'view' | 'download';

interface ResumeActionProps {
  mode: ResumeActionMode;
  /** Render prop so callers can style their own trigger (button, link, etc.) while this
   *  component owns the verification gate and the actual view/download side effect. */
  children: (onClick: (event: React.MouseEvent) => void) => React.ReactNode;
}

function performResumeAction(mode: ResumeActionMode) {
  if (mode === 'view') {
    window.open(RESUME_PDF_URL, '_blank', 'noopener,noreferrer');
    return;
  }

  const link = document.createElement('a');
  link.href = RESUME_PDF_URL;
  link.download = RESUME_FILENAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Wraps any résumé view/download trigger with a one-time-per-session human-verification gate.
 * Verified visitors get the action immediately; unverified visitors see a quick hold-to-verify
 * challenge first, then the original action runs automatically.
 */
export function ResumeAction({ mode, children }: ResumeActionProps) {
  const { isVerified, verify } = useResumeVerification();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      if (isVerified) {
        performResumeAction(mode);
      } else {
        setDialogOpen(true);
      }
    },
    [isVerified, mode],
  );

  const handleVerified = useCallback(() => {
    verify();
    setDialogOpen(false);
    performResumeAction(mode);
  }, [mode, verify]);

  return (
    <>
      {children(handleClick)}
      <ResumeVerifyDialog open={dialogOpen} onOpenChange={setDialogOpen} onVerified={handleVerified} />
    </>
  );
}
