/**
 * useScrollSection — Tracks which section is currently in view.
 * Accounts for the sticky navbar height in the rootMargin.
 */
import { useState, useEffect, useRef } from 'react';

export function useScrollSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const observerRef = useRef(null);

  useEffect(() => {
    // Measure navbar height once (it sits at top of viewport)
    const navbar = document.querySelector('header');
    const navH = navbar ? navbar.getBoundingClientRect().height : 64;

    // rootMargin: push the top trigger point down by navH+8px so a section
    // is only "active" once its heading is actually visible below the navbar.
    const options = {
      root: null,
      rootMargin: `-${navH + 8}px 0px -45% 0px`,
      threshold: 0,
    };

    const callback = (entries) => {
      // Pick the first intersecting entry
      const visible = entries.find((e) => e.isIntersecting);
      if (visible) setActiveSection(visible.target.id);
    };

    observerRef.current = new IntersectionObserver(callback, options);

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
