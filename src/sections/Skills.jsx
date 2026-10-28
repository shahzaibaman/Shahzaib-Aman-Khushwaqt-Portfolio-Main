/**
 * Skills section — clickable skill cards with proficiency rings and nested sub-items.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { skills } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import ExpandableCard from '../components/ExpandableCard';

/* ── Animated circular proficiency ring ── */
function ProficiencyRing({ percentage, size = 72, stroke = 5 }) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dash = (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth={stroke} />
        {/* Foreground arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - dash }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-sm font-bold text-purple-300">
        {percentage}%
      </span>
    </div>
  );
}

/* ── Nested sub-skill item ── */
function SubSkillItem({ skill }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="group cursor-pointer"
      onClick={() => setOpen(!open)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } }}
      tabIndex={0}
      role="button"
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-purple-900/20 border border-purple-800/20 hover:border-purple-600/40 transition-all">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-200">{skill.name}</span>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <HiChevronDown size={14} className="text-purple-400" />
        </motion.span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden px-3 pt-2 pb-1 text-xs text-gray-400 leading-relaxed"
          >
            {skill.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Skills() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Skills"
          subtitle="A diverse tech toolkit built through hands-on learning and real-world practice."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ExpandableCard
                id={skill.id}
                isOpen={openId === skill.id}
                onToggle={() => toggle(skill.id)}
                summary={
                  <div className="flex items-start gap-4">
                    {/* Icon + ring */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-700/30 flex items-center justify-center text-2xl">
                        {skill.icon}
                      </div>
                      {skill.percentage != null && (!openId || openId !== skill.id) ? (
                        <ProficiencyRing percentage={skill.percentage ?? 0} size={56} stroke={4} />
                      ) : null}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-base leading-snug">
                        {skill.title}
                      </h3>
                      {skill.learning && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-900/30 border border-amber-700/30 text-amber-300">
                          Currently Learning
                        </span>
                      )}
                      <p className="mt-1.5 text-sm text-gray-400 leading-snug">
                        {skill.summary}
                      </p>
                    </div>
                  </div>
                }
                details={
                  <div className="space-y-4">
                    {skill.percentage != null && (
                      <div className="flex items-center gap-4">
                        <ProficiencyRing percentage={skill.percentage} size={72} stroke={5} />
                        <p className="text-sm text-gray-400">{skill.description}</p>
                      </div>
                    )}
                    {skill.percentage == null && (
                      <p className="text-sm text-gray-400">{skill.description}</p>
                    )}

                    <div>
                      <p className="text-xs font-semibold text-purple-300 uppercase tracking-widest mb-3">
                        Key Skills
                      </p>
                      <div className="space-y-2">
                        {skill.keySkills.map((ks) => (
                          <SubSkillItem key={ks.id} skill={ks} />
                        ))}
                      </div>
                    </div>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
