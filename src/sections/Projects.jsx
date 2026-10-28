/**
 * Projects section — 3D tilt cards, expandable features, and action buttons.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiPresentationChartBar, HiChevronDown } from 'react-icons/hi';
import { projects } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import TiltCard from '../components/TiltCard';

/* ── Expandable feature item ── */
function FeatureItem({ feature }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout>
      <button
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-purple-900/20 border border-purple-800/20 hover:border-purple-600/40 transition-all text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          </span>
          <span className="text-sm font-medium text-gray-200">{feature.name}</span>
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
            className="overflow-hidden px-3 pt-1.5 pb-2 text-xs text-gray-400 leading-relaxed"
          >
            {feature.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Single project card ── */
function ProjectCard({ project, isOpen, onToggle }) {
  return (
    <TiltCard maxTilt={6} className="h-full">
      <motion.div
        layout
        className={`glass-card h-full cursor-pointer transition-all duration-300 ${
          isOpen ? 'border-purple-500/50' : ''
        }`}
        style={isOpen ? { boxShadow: `0 0 28px ${project.color}33` } : undefined}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
      >
        {/* Header accent bar */}
        <div
          className="h-1 rounded-full mb-4"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
        />

        {/* Summary */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-xl leading-tight">
              {project.title}
            </h3>
            <p className="text-sm text-purple-300 font-medium mt-0.5">
              {project.subtitle}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-400"
          >
            <HiChevronDown size={16} />
          </motion.div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-purple-900/40 border border-purple-700/20 text-purple-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-400 text-sm">{project.summary}</p>

        {!isOpen && (
          <p className="mt-2 text-xs text-purple-400/50 font-medium">Click to expand</p>
        )}

        {/* Expanded details */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="project-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-4 mt-4 border-t border-purple-800/30 space-y-5">
                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Objective / Vision */}
                {(project.objective || project.vision) && (
                  <div className="p-3 rounded-xl bg-purple-900/20 border border-purple-800/20">
                    <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider mb-1">
                      {project.objective ? 'Objective' : 'Vision'}
                    </p>
                    <p className="text-sm text-gray-300">
                      {project.objective || project.vision}
                    </p>
                  </div>
                )}

                {/* Features */}
                <div>
                  <p className="text-xs font-semibold text-purple-300 uppercase tracking-widest mb-3">
                    Key Features
                  </p>
                  <div className="space-y-2">
                    {project.features.map((f) => (
                      <FeatureItem key={f.id} feature={f} />
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-violet-500 transition-all shadow-lg shadow-purple-900/40"
                    >
                      <HiExternalLink size={15} />
                      Live Demo
                    </a>
                  )}
                  {project.presentation && (
                    <a
                      href={project.presentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/40 text-purple-300 text-sm font-semibold hover:bg-purple-500/10 transition-all"
                    >
                      <HiPresentationChartBar size={15} />
                      Presentation
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </TiltCard>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Projects"
          subtitle="Real-world solutions built with passion and purpose."
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <ProjectCard
                project={project}
                isOpen={openId === project.id}
                onToggle={() => toggle(project.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
