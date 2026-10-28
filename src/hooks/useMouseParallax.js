/**
 * useMouseParallax — Returns normalised mouse position {x, y} ∈ [-1, 1].
 * Used by 3D scenes and tilt cards.
 */
import { useState, useEffect } from 'react';

export function useMouseParallax() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return mouse;
}
