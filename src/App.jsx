/**
 * App.jsx — Root component.
 * Lenis removed — native CSS smooth-scroll is used instead.
 * This restores normal mouse-wheel / touchpad scrolling behaviour.
 */
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Chatbot from './components/Chatbot';

/* Noise overlay — subtle film-grain texture */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`;

function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.025]"
      style={{ backgroundImage: NOISE_SVG, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 1.4 s so the intro animation completes
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CursorGlow />
      <NoiseOverlay />

      {/* Animated loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* Main portfolio */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />

            <main>
              <Hero />
              <div className="section-divider" />
              <About />
              <div className="section-divider" />
              <Education />
              <div className="section-divider" />
              <Skills />
              <div className="section-divider" />
              <Projects />
              <div className="section-divider" />
              <Experience />
              <div className="section-divider" />
              <Contact />
            </main>

            <Chatbot />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
