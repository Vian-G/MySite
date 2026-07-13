import { useCallback, useState } from 'react';

const STORAGE_KEY = 'resume-verified';

function readVerified(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    // sessionStorage unavailable (e.g. private browsing) -- fall back to re-verifying each time
    return false;
  }
}

/**
 * Tracks whether the visitor has passed the résumé's human-verification check for this
 * browser session. Persisted in sessionStorage so a verified visitor isn't re-prompted
 * every time they click a résumé link during the same visit.
 */
export function useResumeVerification() {
  const [isVerified, setIsVerified] = useState(readVerified);

  const verify = useCallback(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore storage failures; verification still applies for the rest of this page life
    }
    setIsVerified(true);
  }, []);

  return { isVerified, verify };
}
