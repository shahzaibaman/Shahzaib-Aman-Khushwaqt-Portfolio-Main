import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Vite config.
 *
 * GITHUB PAGES: Set the `base` option to your repository name.
 * e.g. if your repo is github.com/yourusername/my-portfolio
 * set: base: '/my-portfolio/'
 *
 * For a custom domain (e.g. yourusername.github.io or a CNAME):
 * set: base: '/'
 *
 * The VITE_BASE_URL env var lets you override this without editing the file:
 *   VITE_BASE_URL=/my-portfolio/ npm run build
 */
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // ── GitHub Pages base path ──────────────────────────────────────────────
  // Default '/' works for:  username.github.io  OR  a custom domain
  // Change to '/repo-name/' if deploying to: username.github.io/repo-name/
  base:'/shahzaibaman/Shahzaib-Aman-Khushwaqt-Portfolio-Main',

  build: {
    // Increase the warning threshold (Three.js is inherently large)
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) return 'three-vendor';
          if (id.includes('framer-motion'))  return 'motion';
          if (id.includes('gsap'))           return 'gsap';
        },
      },
    },
  },
}))
