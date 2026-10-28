/**
 * Education section — vertical animated timeline with expandable cards.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiCheckCircle, HiClock } from 'react-icons/hi';
import { education } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';
import ExpandableCard from '../components/ExpandableCard';

export default function Education() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section id="education" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-700/30 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Education"
          subtitle="Building a strong academic foundation in Computer Science."
        />

        <div className="relative space-y-6">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: idx * 0.12 }}
              className="relative pl-8 md:pl-0 md:grid md:grid-cols-[1fr_40px_1fr] md:gap-6 items-start"
            >
              {/* Content (alternating sides on desktop) */}
              <div className={idx % 2 === 0 ? 'md:col-start-1' : 'md:col-start-3'}>
                <ExpandableCard
                  id={edu.id}
                  isOpen={openId === edu.id}
                  onToggle={() => toggle(edu.id)}
                  summary={
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl">{edu.icon}</span>
                        <div>
                          <h3 className="font-bold text-white text-base leading-tight">
                            {edu.degree}
                          </h3>
                          <p className="text-sm text-purple-300">{edu.institute}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-500 font-mono">{edu.years}</span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            edu.status === 'Currently Enrolled'
                              ? 'bg-green-900/40 text-green-300 border border-green-700/30'
                              : 'bg-purple-900/40 text-purple-300 border border-purple-700/30'
                          }`}
                        >
                          {edu.status === 'Currently Enrolled' ? (
                            <HiClock size={11} />
                          ) : (
                            <HiCheckCircle size={11} />
                          )}
                          {edu.status}
                        </span>
                      </div>
                    </div>
                  }
                  details={
                    <div className="space-y-3">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {edu.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {edu.board && (
                          <div>
                            <p className="text-xs text-gray-500">Board</p>
                            <p className="text-sm text-white font-medium">{edu.board}</p>
                          </div>
                        )}
                        {edu.marks && (
                          <div>
                            <p className="text-xs text-gray-500">Result</p>
                            <p className="text-sm text-white font-medium">{edu.marks}</p>
                          </div>
                        )}
                        {edu.cgpa && (
                          <div>
                            <p className="text-xs text-gray-500">Current CGPA</p>
                            <p className="text-lg font-bold gradient-text">{edu.cgpa}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  }
                />
              </div>

              {/* Centre timeline dot (desktop) */}
              <div className="hidden md:flex col-start-2 flex-col items-center pt-4">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 shadow-[0_0_12px_rgba(168,85,247,0.6)] flex-shrink-0" />
              </div>

              {/* Mobile: left dot */}
              <div
                className="md:hidden absolute left-0 top-5 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                aria-hidden
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
