/**
 * Navbar — Sticky glass header.
 * Nav links use window.scrollTo with navbar-offset compensation.
 * Logo animates between large (Home) and compact (all other sections).
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useScrollSection } from '../hooks/useScrollSection';
import { scrollToSection } from '../utils/scrollTo';

const NAV_LINKS = [
  { label: 'Home',       id: 'home' },
  { label: 'About',      id: 'about' },
  { label: 'Education',  id: 'education' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact' },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const activeSection = useScrollSection(SECTION_IDS);
  const isHome = activeSection === 'home';

  /* Glass background appears after 40 px of scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Click handler ── */
  const handleClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-[#06040e]/88 backdrop-blur-2xl border-b border-purple-900/25 shadow-[0_1px_32px_rgba(124,58,237,0.07)]'
          : 'bg-transparent'
      }`}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
           style={{ background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.35), transparent)' }} />

      {/* Inner row */}
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between transition-all duration-500"
        style={{ height: isHome && !scrolled ? '72px' : '60px' }}
      >
        {/* ── Logo ── */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, 'home')}
          aria-label="Back to top — KHUSHWAQT.com"
          className="flex items-center flex-shrink-0 focus-visible:outline-none"
        >
          <motion.img
            src="/assets/logo.png"
            alt="KHUSHWAQT.com"
            animate={{
              height: isHome && !scrolled ? 44 : 28,
              filter:
                isHome && !scrolled
                  ? 'drop-shadow(0 0 14px rgba(168,85,247,0.55))'
                  : 'drop-shadow(0 0 0px rgba(168,85,247,0))',
            }}
            whileHover={{ filter: 'drop-shadow(0 0 18px rgba(168,85,247,0.85))' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-auto object-contain cursor-pointer"
          />
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, id }) => {
            const active = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                aria-current={active ? 'page' : undefined}
                className="relative px-4 py-2 rounded-lg transition-colors duration-200 focus-visible:outline-none"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  color: active ? '#fff' : 'rgba(196,189,216,0.7)',
                }}
              >
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(168,85,247,0.1) 100%)',
                      border: '1px solid rgba(168,85,247,0.28)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden p-2 rounded-lg transition-all"
          style={{ color: 'rgba(196,189,216,0.8)' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <AnimatePresence mode="wait">
            {menuOpen
              ? <motion.span key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><HiX size={22} /></motion.span>
              : <motion.span key="ham" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><HiMenuAlt3 size={22} /></motion.span>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden border-b border-purple-900/30"
            style={{ background: 'rgba(6,4,14,0.97)', backdropFilter: 'blur(24px)' }}
            aria-label="Mobile navigation"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, id }, idx) => {
                const active = activeSection === id;
                return (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={(e) => handleClick(e, id)}
                    className="px-4 py-3 rounded-xl transition-all"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: active ? '#fff' : 'rgba(196,189,216,0.65)',
                      background: active ? 'rgba(124,58,237,0.12)' : 'transparent',
                      border: active ? '1px solid rgba(168,85,247,0.25)' : '1px solid transparent',
                    }}
                  >
                    {label}
                  </motion.a>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
