/**
 * CursorGlow — Custom purple glow that follows the cursor.
 * Hidden on touch devices.
 */
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only on pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = cursorRef.current;
    if (!el) return;

    let raf;
    let mx = -200, my = -200;
    let cx = -200, cy = -200;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const animate = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      el.style.transform = `translate(${cx - 160}px, ${cy - 160}px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-80 h-80 rounded-full"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}
