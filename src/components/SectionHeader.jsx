/**
 * SectionHeader — Premium gradient heading + subtitle for all sections.
 * Uses Outfit (display) font.
 */
import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`text-center mb-20 ${className}`}
    >
      {/* Eyebrow chip */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/8 border border-purple-500/18 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
        <span className="text-xs font-semibold tracking-widest uppercase text-purple-300"
              style={{ fontFamily: 'var(--font-ui)' }}>
          {title}
        </span>
      </div>

      {/* Main heading */}
      <h2
        className="text-4xl md:text-5xl font-black gradient-text mb-5 tracking-tight"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
           style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          {subtitle}
        </p>
      )}

      {/* Decorative accent */}
      <div className="mt-7 flex items-center justify-center gap-2.5">
        <div className="h-px w-14 bg-gradient-to-r from-transparent to-purple-500/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" style={{ boxShadow: '0 0 8px rgba(168,85,247,0.7)' }} />
        <div className="h-px w-4 bg-purple-500/60" />
        <div className="w-1 h-1 rounded-full bg-violet-400/60" />
        <div className="h-px w-14 bg-gradient-to-l from-transparent to-purple-500/60" />
      </div>
    </motion.div>
  );
}
