/**
 * ExpandableCard — Reusable summary-first, click-to-expand card.
 * Uses Outfit for headings, Plus Jakarta Sans for labels.
 * Keyboard accessible (Enter/Space). aria-expanded support.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';

export default function ExpandableCard({
  id,
  isOpen,
  onToggle,
  summary,
  details,
  className = '',
}) {
  return (
    <motion.div
      layout
      className={`glass-card cursor-pointer select-none transition-all duration-300 ${
        isOpen ? 'border-purple-500/35' : ''
      } ${className}`}
      style={isOpen ? { boxShadow: '0 0 28px rgba(124,58,237,0.18), 0 0 0 1px rgba(168,85,247,0.12)' } : undefined}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
    >
      {/* Summary row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">{summary}</div>

        {/* Chevron pill */}
        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-purple-500/20 border border-purple-500/50 text-purple-300'
            : 'bg-purple-900/20 border border-purple-800/25 text-purple-500'
        }`}>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
            className="flex items-center justify-center"
          >
            <HiChevronDown size={15} />
          </motion.span>
        </div>
      </div>

      {/* Expand hint */}
      {!isOpen && (
        <p className="mt-1.5 text-[11px] font-medium"
           style={{ color: 'rgba(168,85,247,0.45)', fontFamily: 'var(--font-ui)', letterSpacing: '0.03em' }}>
          Click to expand ↓
        </p>
      )}

      {/* Details */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(124,58,237,0.15)' }}>
              {details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
