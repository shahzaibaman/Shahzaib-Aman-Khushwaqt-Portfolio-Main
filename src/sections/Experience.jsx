/**
 * Experience section — clickable cards with nested expandable responsibilities.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { experience } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import ExpandableCard from '../components/ExpandableCard';

/* ── Nested responsibility item ── */
function ResponsibilityItem({ resp }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout>
      <button
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-purple-900/20 border border-purple-800/20 hover:border-purple-600/40 transition-all text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-200">{resp.name}</span>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <HiChevronDown size={14} className="text-purple-400 flex-shrink-0" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden px-4 pt-1.5 pb-2 text-xs text-gray-400 leading-relaxed"
          >
            {resp.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Experience() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section id="experience" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Experience & Activities"
          subtitle="Real-world leadership, coordination, and digital media experience."
        />

        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: idx * 0.12 }}
            >
              <ExpandableCard
                id={exp.id}
                isOpen={openId === exp.id}
                onToggle={() => toggle(exp.id)}
                summary={
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{exp.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-white text-base">{exp.title}</h3>
                          <p className="text-purple-300 text-sm font-medium">{exp.org}</p>
                          <p className="text-gray-500 text-xs">{exp.location}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-900/40 border border-purple-700/30 text-purple-300 flex-shrink-0">
                          {exp.period}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-400 text-sm">{exp.summary}</p>
                    </div>
                  </div>
                }
                details={
                  <div className="space-y-5">
                    {/* Responsibilities */}
                    <div>
                      <p className="text-xs font-semibold text-purple-300 uppercase tracking-widest mb-3">
                        Responsibilities
                      </p>
                      <div className="space-y-2">
                        {exp.responsibilities.map((r) => (
                          <ResponsibilityItem key={r.id} resp={r} />
                        ))}
                      </div>
                    </div>

                    {/* Skills developed chips */}
                    <div>
                      <p className="text-xs font-semibold text-purple-300 uppercase tracking-widest mb-3">
                        Key Skills Developed
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((s) => (
                          <span
                            key={s}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-purple-900/30 border border-purple-700/20 text-purple-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>

        {/* Professional growth note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 p-5 glass-card border-purple-600/30"
        >
          <p className="text-sm text-gray-400 text-center leading-relaxed">
            These experiences strengthened digital marketing and professional skills, and improved project management, 
            communication, collaboration, and use of digital platforms for organizational growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
