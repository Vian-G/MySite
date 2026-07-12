import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], threshold = 0.5) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0]?.replace('project-', '') || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('project-', '');
            setActiveId(id);
          }
        });
      },
      { threshold, rootMargin: '-10% 0px -10% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, threshold]);

  return activeId;
}
