/**
 * About section — Two-column layout, polished fonts.
 */
import { Suspense, lazy, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiAcademicCap, HiStar, HiChevronDown } from 'react-icons/hi';
import { profile } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionHeader from '../components/SectionHeader';

const TechCoreScene = lazy(() => import('../three/TechCoreScene'));

const QUICK_FACTS = [
  { icon: HiLocationMarker, label: 'Location', value: 'Chitral, Pakistan' },
  { icon: HiAcademicCap,   label: 'Degree',   value: 'BSCS 2025–2029' },
  { icon: HiStar,          label: 'CGPA',     value: '3.80 / 4.00' },
];

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeader
          title="About Me"
          subtitle="Passionate technologist building the future, one line of code at a time."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-card">
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-body)', fontFamily: 'var(--font-body)' }}>
                {profile.aboutShort}
              </p>

              <motion.div
                initial={false}
                animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <p className="text-base leading-relaxed pt-4" style={{ color: 'var(--text-body)', fontFamily: 'var(--font-body)' }}>
                  {profile.about}
                </p>
              </motion.div>

              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-5 flex items-center gap-1.5 text-sm font-semibold transition-colors"
                style={{ color: '#a855f7', fontFamily: 'var(--font-ui)' }}
                aria-expanded={expanded}
              >
                {expanded ? 'Read less' : 'Read more'}
                <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <HiChevronDown size={16} />
                </motion.span>
              </button>

              <p className="mt-5 text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                Originally from{' '}
                <span style={{ color: '#c084fc', fontWeight: 500 }}>Khuzh, Upper Chitral</span>
                {' '}— Matriculation at{' '}
                <span style={{ color: '#c084fc', fontWeight: 500 }}>GHS Chuinj</span>; FSc at{' '}
                <span style={{ color: '#c084fc', fontWeight: 500 }}>GDC Chitral</span>.
              </p>
            </div>

            {/* Quick facts */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {QUICK_FACTS.map((fact) => (
                <motion.div
                  key={fact.label}
                  whileHover={{ y: -5, boxShadow: '0 8px 28px rgba(124,58,237,0.2)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="glass-card text-center !p-4"
                >
                  <fact.icon className="mx-auto mb-2" size={20} style={{ color: '#a855f7' }} />
                  <p className="text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    {fact.label}
                  </p>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    {fact.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D tech core */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-80 lg:h-[440px] rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(124,58,237,0.15)',
              background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.07) 0%, transparent 70%)',
            }}
          >
            {!prefersReduced ? (
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center text-sm"
                     style={{ color: 'rgba(168,85,247,0.35)', fontFamily: 'var(--font-ui)' }}>
                  Loading 3D scene…
                </div>
              }>
                <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 1.5]}>
                  <TechCoreScene />
                </Canvas>
              </Suspense>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8">
                <div className="text-5xl">⚡</div>
                <p className="font-bold" style={{ color: '#c084fc', fontFamily: 'var(--font-display)' }}>Tech Stack</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['HTML','CSS','JS','React','Node','MongoDB','C++'].map(t => (
                    <span key={t} className="skill-chip">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
