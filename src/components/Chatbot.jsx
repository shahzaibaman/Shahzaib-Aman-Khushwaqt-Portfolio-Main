/**
 * Chatbot — Floating purple chat widget.
 * Answers from portfolio data using keyword/fuzzy matching (Layer A).
 * Optional LLM proxy (Layer B) if VITE_CHATBOT_API_URL is set.
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChat, HiPaperAirplane } from 'react-icons/hi';
import { chatbotData, contact } from '../data/portfolio';

/* ══════════════════════════════════════════
   Layer A — Local keyword/fuzzy matching
══════════════════════════════════════════ */
function localAnswer(question) {
  const q = question.toLowerCase();

  // Skills
  if (q.includes('skill') || q.includes('technology') || q.includes('tech stack')) {
    return `Shahzaib's key skills include:
• 🎯 Digital Marketing & AI-Powered Marketing (90%)
• 💻 Frontend Development — HTML, CSS, JS, Tailwind (80%)
• 🚀 MERN Stack — currently learning (20%)
• 🤖 AI Prompt Engineering
• ⚙️ C++ & OOP (85%)`;
  }

  // Contact
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('whatsapp') || q.includes('linkedin')) {
    return `You can reach Shahzaib via:
📧 Email: ${contact.email}
💬 WhatsApp: ${contact.whatsappDisplay}
🔗 LinkedIn: ${contact.linkedin}
📘 Facebook: ${contact.facebook}`;
  }

  // BaseX
  if (q.includes('basex') || q.includes('number system') || q.includes('base x')) {
    const p = chatbotData.projects.find((pr) => pr.id === 'basex');
    return `**BaseX — Number System Toolkit**
${p.description}
Key features: ${p.features.map((f) => f.name).join(', ')}.
Objective: ${p.objective}
🔗 Live Demo: ${p.liveDemo}`;
  }

  // QashQar
  if (q.includes('qashqar') || q.includes('food') || q.includes('delivery') || q.includes('chitral food')) {
    const p = chatbotData.projects.find((pr) => pr.id === 'qashqar');
    return `**QashQar Food Hub**
${p.description}
Features: ${p.features.map((f) => f.name).join(', ')}.
Vision: ${p.vision}
📊 Presentation: ${p.presentation}`;
  }

  // Projects generic
  if (q.includes('project')) {
    return `Shahzaib has built two main projects:
1. **BaseX** — An educational number system toolkit with AI integration. Live at basex.site.je
2. **QashQar Food Hub** — A local food delivery platform concept for Chitral, Pakistan.
Click any project card to explore details!`;
  }

  // Education
  if (q.includes('education') || q.includes('university') || q.includes('degree') || q.includes('cgpa') || q.includes('study')) {
    return `Shahzaib's education:
🎓 BSCS — University of Chitral (2025–2029, CGPA 3.80) — Currently Enrolled
📘 ICS — GDC Chitral (2023–2025, 70%, BISE Peshawar)
📗 Matric — GHS Chuinj, Mastuj (2021–2023, 71%, BISE Peshawar)`;
  }

  // Experience
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('coordinator') || q.includes('volunteer') || q.includes('ijt')) {
    return `Shahzaib's experience includes:
🏫 Campus Coordinator — BanoQabil KP North, Chitral (current)
🤝 Volunteer — Banoqabil & Alkhidmat Foundation, 2 years
🏛️ Social Media Manager & President — IJT, University of Chitral`;
  }

  // About / profile
  if (q.includes('about') || q.includes('who') || q.includes('shahzaib') || q.includes('profile') || q.includes('bio')) {
    return `**Shahzaib Ur Rehman (KHUSHWAQT)**
Computer Science student at University of Chitral, Pakistan (BSCS, CGPA 3.80).
Originally from Khuzh, Upper Chitral.
Passionate about web development, modern web architecture, and AI-powered solutions.
Goal: to become a skilled web developer and architect, creating modern, efficient, and user-friendly digital solutions.`;
  }

  // Marketing
  if (q.includes('market') || q.includes('seo') || q.includes('ads') || q.includes('social media')) {
    return `Shahzaib has 90% proficiency in Digital Marketing & AI-Powered Marketing, covering:
• Meta Ads (campaign creation, targeting, optimization)
• Google Ads fundamentals
• SEO (keyword research, on-page optimization)
• Content Writing & Social Media Management
• AI-powered marketing tools and workflows`;
  }

  // Frontend
  if (q.includes('frontend') || q.includes('html') || q.includes('css') || q.includes('javascript') || q.includes('react') || q.includes('tailwind')) {
    return `Shahzaib's Frontend Development skills (80% proficiency):
HTML5, CSS3, JavaScript, Tailwind CSS, Responsive Web Design, and UI implementation.
He also uses React.js and is expanding into the full MERN stack.`;
  }

  // Location
  if (q.includes('location') || q.includes('where') || q.includes('pakistan') || q.includes('chitral')) {
    return `Shahzaib is based in Chitral, Pakistan, originally from Khuzh, Upper Chitral. He studies at the University of Chitral.`;
  }

  // Default
  return null;
}

/* ══════════════════════════════════════════
   Layer B — Optional LLM proxy
══════════════════════════════════════════ */
async function llmAnswer(question) {
  const apiUrl = import.meta.env.VITE_CHATBOT_API_URL;
  if (!apiUrl) return null;

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.answer || null;
  } catch {
    return null;
  }
}

const SUGGESTED_QUESTIONS = [
  "What are your skills?",
  "Tell me about BaseX",
  "How can I contact you?",
  "What's your education?",
  "Tell me about QashQar",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'bot',
      text: "Hi! 👋 I'm Shahzaib's portfolio assistant. Ask me anything about his skills, projects, education, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, messages]);

  const sendMessage = async (text) => {
    const question = (text || input).trim();
    if (!question) return;

    setInput('');
    const userMsg = { id: Date.now(), role: 'user', text: question };
    setMessages((m) => [...m, userMsg]);
    setTyping(true);

    // Simulate a short delay for naturalness
    await new Promise((r) => setTimeout(r, 600));

    // Layer A
    let answer = localAnswer(question);

    // Layer B (if configured and Layer A had no answer)
    if (!answer) {
      answer = await llmAnswer(question);
    }

    // Fallback
    if (!answer) {
      answer = `I don't have specific information about that. For direct answers, please reach out to Shahzaib:
📧 ${contact.email}
💬 WhatsApp: ${contact.whatsappDisplay}
🔗 LinkedIn: ${contact.linkedin}`;
    }

    setTyping(false);
    setMessages((m) => [...m, { id: Date.now() + 1, role: 'bot', text: answer }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 shadow-lg shadow-purple-900/50 flex items-center justify-center text-white"
        whileHover={{ scale: 1.1, boxShadow: '0 0 24px rgba(168,85,247,0.6)' }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? 'Close chatbot' : 'Open chatbot'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <HiX size={22} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <HiChat size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] max-h-[520px] flex flex-col rounded-2xl overflow-hidden border border-purple-700/40"
            style={{
              background: 'rgba(13,8,24,0.96)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 24px 64px rgba(124,58,237,0.25)',
            }}
            role="dialog"
            aria-label="Portfolio chatbot"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-purple-800/30 bg-purple-900/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-sm">
                🤖
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Portfolio Assistant</p>
                <p className="text-[11px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-purple-800/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-purple-600 to-violet-600 text-white rounded-br-sm'
                        : 'bg-purple-900/40 border border-purple-800/30 text-gray-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-purple-900/40 border border-purple-800/30 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-purple-400"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions (only at start) */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-purple-900/40 border border-purple-700/30 text-purple-200 hover:border-purple-500/60 hover:bg-purple-800/40 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-purple-800/30 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything…"
                className="flex-1 bg-purple-900/30 border border-purple-800/30 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-all"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || typing}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center text-white disabled:opacity-40 transition-opacity"
                aria-label="Send message"
              >
                <HiPaperAirplane size={15} className="-rotate-45" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
