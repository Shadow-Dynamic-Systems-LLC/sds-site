import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Returns true when the URL carries `?theme=minimal`.
 *
 * Intended for double-blind academic preview: when active, the site
 * suppresses brand chrome (background shaders, navbar, footer, custom
 * fonts) and author-identifying badges so cited artifact pages can be
 * snapshotted without revealing organizational attribution.
 */
export function useMinimalMode(): boolean {
  const location = useLocation();
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('theme') === 'minimal';
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const value = params.get('theme') === 'minimal';
    setEnabled(value);
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('minimal-mode', value);
    }
  }, [location.search]);

  return enabled;
}
