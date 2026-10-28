/**
 * Hero section — polished with new Outfit/DM Sans fonts.
 * Profile picture gets a premium hexagonal clip-path glow frame.
 */
import { Suspense, lazy, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { HiArrowDown, HiExternalLink, HiMail } from 'react-icons/hi';
import { profile } from '../data/portfolio';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { scrollToSection } from '../utils/scrollTo';

const HeroScene = lazy(() => import('../three/HeroScene'));

/* ── Typewriter effect ── */
function TypeWriter({ words, speed = 75, pause = 2000 }) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx(c => c + 1); }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx(c => c - 1); }, speed / 2.2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
      setCharIdx(0);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return (
    <span style={{ color: '#c084fc', fontFamily: 'var(--font-display)' }}>
      {displayed}
      <span className="inline-block w-0.5 h-[0.9em] bg-purple-400 ml-0.5 align-middle"
            style={{ animation: 'pulse 1s step-end infinite' }} />
    </span>
  );
}

/* ── Profile picture ── */
function ProfilePicture() {
  return (
    <motion.div
      initial={{ scale: 0.75, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center select-none"
      style={{ perspective: 900 }}
    >
      {/* Background aura */}
      <div className="absolute w-72 h-72 rounded-full opacity-60 pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)', filter: 'blur(32px)' }} />

      {/* Slow outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute w-60 h-60 md:w-72 md:h-72 rounded-full"
        style={{ border: '1px dashed rgba(168,85,247,0.3)' }}
      />

      {/* Faster inner ring with dots */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute w-52 h-52 md:w-64 md:h-64 rounded-full flex items-center justify-center"
        style={{ border: '1px solid rgba(192,132,252,0.15)' }}
      >
        {/* Orbit dots */}
        {[0, 90, 180, 270].map((deg) => (
          <span key={deg}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: 'rgba(168,85,247,0.7)',
              boxShadow: '0 0 6px rgba(168,85,247,0.8)',
              top: '50%', left: '50%',
              transform: `rotate(${deg}deg) translateX(${window.innerWidth < 768 ? 104 : 128}px) translateY(-50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Profile image */}
      <motion.div
        whileHover={{ scale: 1.04, rotateY: 6 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="relative overflow-hidden rounded-full"
        style={{
          width: 200, height: 200,
          border: '2px solid rgba(168,85,247,0.45)',
          boxShadow: '0 0 0 6px rgba(124,58,237,0.08), 0 0 40px rgba(124,58,237,0.28)',
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src="/assets/profile.jpg"
          alt="Shahzaib Ur Rehman"
          className="w-full h-full object-cover"
          loading="eager"
          draggable={false}
        />
        {/* Overlay sheen */}
        <div className="absolute inset-0 rounded-full pointer-events-none"
             style={{ background: 'linear-gradient(135deg, rgba(192,132,252,0.08) 0%, transparent 60%)' }} />
      </motion.div>
    </motion.div>
  );
}

/* ── Stagger container ── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } },
};

export default function Hero() {
  const mouse = useMouseParallax();
  const prefersReduced = useReducedMotion();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 3D Canvas background */}
      {!prefersReduced && (
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
              <HeroScene mouse={mouse} />
            </Canvas>
          </Suspense>
        </div>
      )}

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 75% 80% at 50% 50%, transparent 30%, rgba(6,4,14,0.75) 100%)' }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] pointer-events-none"
           style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-base))' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left: text ── */}
          <motion.div variants={stagger} initial="hidden" animate="show">

            {/* Status badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      background: 'rgba(124,58,237,0.1)',
                      border: '1px solid rgba(124,58,237,0.22)',
                      color: '#c084fc',
                      letterSpacing: '0.04em',
                    }}>
                <span className="w-2 h-2 rounded-full bg-emerald-400"
                      style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)', animation: 'pulse 2s infinite' }} />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp}>
              <h1 style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black mb-2">
                <span className="gradient-text">Shahzaib</span>
                <br />
                <span style={{ color: 'var(--text-primary)' }}>Ur Rehman</span>
              </h1>
            </motion.div>

            {/* Sub-title */}
            <motion.p variants={fadeUp}
                      className="text-sm sm:text-base mb-3 mt-4"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontWeight: 500, letterSpacing: '0.01em' }}>
              {profile.title}
            </motion.p>

            {/* Typewriter */}
            <motion.div variants={fadeUp}
                        className="text-xl sm:text-2xl font-bold mb-8 h-10"
                        style={{ fontFamily: 'var(--font-display)' }}>
              <TypeWriter words={profile.taglines} />
            </motion.div>

            {/* Skill chips */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
              {profile.skillChips.map((chip) => (
                <span key={chip} className="skill-chip">{chip}</span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('projects')}
                className="btn-primary"
              >
                <HiExternalLink size={17} /> View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('contact')}
                className="btn-outline"
              >
                <HiMail size={17} /> Contact Me
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── Right: profile picture ── */}
          <div className="flex justify-center lg:justify-end">
            <ProfilePicture />
          </div>
        </div>

        {/* Scroll-down indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-default select-none"
          aria-hidden="true"
          onClick={() => scrollToSection('about')}
          style={{ cursor: 'pointer' }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>Scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
            <HiArrowDown size={16} style={{ color: '#a855f7' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
