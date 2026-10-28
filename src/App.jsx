/**
 * App.jsx — Root component. Wires loading screen, Lenis, noise overlay, cursor, sections.
 */
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
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

/* Noise overlay SVG data-uri */
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
  const [showApp, setShowApp] = useState(false);

  // Initialise Lenis smooth scroll
  useLenis();

  useEffect(() => {
    // Minimum loading time of 1.4s for the intro animation to play
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Cursor glow */}
      <CursorGlow />

      {/* Noise overlay */}
      <NoiseOverlay />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setShowApp(true)} />
        )}
      </AnimatePresence>

      {/* Main app */}
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

              {/* Purple section divider */}
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
