/**
 * Contact + Footer — animated contact icons and footer.
 */
import { motion } from 'framer-motion';
import {
  FiLinkedin, FiMail, FiFacebook, FiTwitter,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { contact, profile } from '../data/portfolio';
import SectionHeader from '../components/SectionHeader';

const CONTACT_ITEMS = [
  {
    label: 'LinkedIn',
    href: contact.linkedin,
    icon: FiLinkedin,
    color: '#0077b5',
    glow: 'rgba(0,119,181,0.3)',
    desc: 'Connect on LinkedIn',
  },
  {
    label: 'Email',
    href: `mailto:${contact.email}`,
    icon: FiMail,
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.35)',
    desc: contact.email,
  },
  {
    label: 'Facebook',
    href: contact.facebook,
    icon: FiFacebook,
    color: '#1877f2',
    glow: 'rgba(24,119,242,0.3)',
    desc: 'Follow on Facebook',
  },
  {
    label: 'X / Twitter',
    href: contact.x,
    icon: FiTwitter,
    color: '#e7e7e7',
    glow: 'rgba(231,231,231,0.15)',
    desc: '@ishahzaibk01',
  },
  {
    label: 'WhatsApp',
    href: contact.whatsapp,
    icon: FaWhatsapp,
    color: '#25d366',
    glow: 'rgba(37,211,102,0.3)',
    desc: contact.whatsappDisplay,
  },
];

const NAV_LINKS_FOOTER = ['Home', 'About', 'Education', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Contact() {
  const handleNavClick = (section) => {
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Contact section */}
      <section id="contact" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Get In Touch"
            subtitle="Open for collaborations, opportunities, and conversations."
          />

          {/* Contact cards */}
          <div className="flex flex-wrap justify-center gap-5">
            {CONTACT_ITEMS.map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{
                  y: -8,
                  scale: 1.06,
                  boxShadow: `0 12px 36px ${item.glow}`,
                }}
                whileTap={{ scale: 0.96 }}
                className="glass-card flex flex-col items-center gap-3 p-6 min-w-[120px] cursor-pointer group"
                aria-label={item.label}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300"
                  style={{ background: `${item.color}22`, border: `1px solid ${item.color}44` }}
                >
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-gray-500 text-center">{item.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/30 bg-[#07050f]/80 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Brand */}
            <div>
              <img
                src="/assets/logo.png"
                alt="KHUSHWAQT.com"
                className="h-8 w-auto object-contain mb-4 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
              />
              <p className="text-gray-500 text-sm leading-relaxed">
                Building modern digital solutions with passion and precision.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-sm font-semibold text-purple-300 uppercase tracking-widest mb-4">
                Quick Links
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {NAV_LINKS_FOOTER.map((link) => (
                  <button
                    key={link}
                    onClick={() => handleNavClick(link)}
                    className="text-left text-sm text-gray-500 hover:text-purple-300 transition-colors py-0.5"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact snippet */}
            <div>
              <p className="text-sm font-semibold text-purple-300 uppercase tracking-widest mb-4">
                Contact
              </p>
              <div className="space-y-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-300 transition-colors"
                >
                  <FiMail size={14} />
                  {contact.email}
                </a>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-300 transition-colors"
                >
                  <FaWhatsapp size={14} />
                  {contact.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-purple-900/20 text-center">
            <p className="text-sm text-gray-600">
              © 2026{' '}
              <span className="text-purple-400 font-medium">{profile.name}</span>{' '}
              |{' '}
              <span className="text-purple-400 font-medium">{profile.brandDomain}</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
