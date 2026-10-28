/**
 * scrollTo.js — Reliable smooth-scroll helper used by Navbar and all CTA buttons.
 *
 * Why not scrollIntoView?
 *   scrollIntoView has no offset support, so sections land under the sticky navbar.
 *   This helper reads the navbar height and subtracts it so the section title is
 *   always fully visible.
 *
 * Why not Lenis?
 *   Lenis smooth-scroll overrides wheel/touch events globally, which breaks
 *   native scrollIntoView calls and makes the page feel unresponsive.
 *   We use CSS scroll-behavior: smooth instead (set in index.css on html {}).
 */

/**
 * Smoothly scrolls to a section by its ID string (without the #).
 * Accounts for the fixed navbar height automatically.
 *
 * @param {string} id  — The element's id, e.g. "projects"
 */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  // Measure current navbar height (it changes between 60 px and 72 px)
  const navbar = document.querySelector('header');
  const offset = navbar ? navbar.getBoundingClientRect().height + 8 : 68;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: 'smooth' });
}
