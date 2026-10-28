/**
 * Navbar — Sticky glass header.
 * Logo grows large when on the Home section, shrinks on all other sections.
 * Uses Plus Jakarta Sans + Outfit fonts (set in index.css).
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useScrollSection } from '../hooks/useScrollSection';

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Education',  href: '#education' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSection(SECTION_IDS);

  const isHome = activeSection === 'home';

  // Detect scroll for glass background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-[#07050f]/85 backdrop-blur-2xl border-b border-purple-900/25 shadow-[0_1px_40px_rgba(124,58,237,0.08)]'
          : 'bg-transparent'
      }`}
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between"
           style={{ height: isHome && !scrolled ? '72px' : '60px', transition: 'height 0.4s cubic-bezier(0.22,1,0.36,1)' }}>

        {/* ── Logo — large on Hero, compact elsewhere ── */}
        <motion.a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="flex items-center flex-shrink-0 group focus-visible:outline-none"
          whileHover={{ scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          aria-label="Go to home — KHUSHWAQT.com"
        >
          <motion.img
            src="/assets/logo.png"
            alt="KHUSHWAQT.com"
            animate={{
              height: isHome && !scrolled ? 44 : 28,
              filter: isHome && !scrolled
                ? 'drop-shadow(0 0 16px rgba(168,85,247,0.55))'
                : 'drop-shadow(0 0 0px rgba(168,85,247,0))',
            }}
            whileHover={{
              filter: 'drop-shadow(0 0 18px rgba(168,85,247,0.85))',
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-auto object-contain"
            style={{ height: 44 }}
          />
        </motion.a>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`relative px-4 py-2 text-[13px] font-semibold tracking-wide rounded-lg transition-all duration-200 font-display ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-purple-200'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(168,85,247,0.12) 100%)',
                      border: '1px solid rgba(168,85,247,0.28)',
                      boxShadow: '0 0 12px rgba(124,58,237,0.12)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-purple-300 hover:bg-purple-500/10 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <AnimatePresence mode="wait">
            {menuOpen
              ? <motion.span key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><HiX size={22} /></motion.span>
              : <motion.span key="ham" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><HiMenuAlt3 size={22} /></motion.span>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* ── Mobile full-screen drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden bg-[#0a0614]/97 backdrop-blur-2xl border-b border-purple-900/30"
            aria-label="Mobile navigation"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`px-4 py-3 rounded-xl text-[13px] font-semibold tracking-wide font-display transition-all ${
                      isActive
                        ? 'text-white bg-purple-500/12 border border-purple-500/25'
                        : 'text-gray-400 hover:text-purple-200 hover:bg-purple-500/6'
                    }`}
                  >
                    {link.label}
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
