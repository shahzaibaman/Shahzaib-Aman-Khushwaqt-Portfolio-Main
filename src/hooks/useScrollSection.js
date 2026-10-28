/**
 * useScrollSection — Tracks which nav section is currently in view.
 */
import { useState, useEffect, useRef } from 'react';

export function useScrollSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
