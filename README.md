# Shahzaib Ur Rehman — Portfolio

A production-ready, fully responsive personal portfolio website built with React 18, Three.js, Framer Motion, GSAP, and Tailwind CSS.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| 3D | Three.js, @react-three/fiber, @react-three/drei |
| Animation | Framer Motion, GSAP + ScrollTrigger |
| Smooth Scroll | Lenis (`@studio-freight/lenis`) |
| Styling | Tailwind CSS v4 |
| Icons | react-icons |

---

## Folder Structure

```
src/
├── components/     # Reusable UI pieces
│   ├── Chatbot.jsx
│   ├── CursorGlow.jsx
│   ├── ExpandableCard.jsx
│   ├── LoadingScreen.jsx
│   ├── Navbar.jsx
│   ├── SectionHeader.jsx
│   └── TiltCard.jsx
├── data/
│   └── portfolio.js   # Single source of truth (used by ALL sections + chatbot)
├── hooks/
│   ├── useLenis.js
│   ├── useMouseParallax.js
│   ├── useReducedMotion.js
│   └── useScrollSection.js
├── sections/
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Education.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Experience.jsx
│   └── Contact.jsx
├── three/
│   ├── HeroScene.jsx      # Hero 3D background
│   └── TechCoreScene.jsx  # About section 3D core
├── App.jsx
├── main.jsx
└── index.css
public/
└── assets/
    ├── logo.png     # KHUSHWAQT.com logo
    └── profile.jpg  # Profile picture
```

---

## Quick Start

### Prerequisites
- **Node.js** >= 18
- **npm** >= 9

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables (optional — for AI chatbot LLM mode)
```bash
cp .env.example .env
# Then edit .env and set VITE_CHATBOT_API_URL if you want LLM answers
```

### 3. Run development server
```bash
npm run dev
```
Open http://localhost:5173

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Preview with:
```bash
npm run preview
```

---

## Deploy

### Vercel (recommended)
1. Push the project to a GitHub repository.
2. Import it at vercel.com/new.
3. Vercel auto-detects Vite. Leave the settings as-is.
4. (Optional) Add VITE_CHATBOT_API_URL in Vercel's Environment Variables dashboard.
5. Click Deploy.

### Netlify
1. Connect your GitHub repo on netlify.com.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. (Optional) Add env vars under Site Settings -> Environment.
5. Deploy.

---

## Chatbot — AI Layer B (optional)

The chatbot works out of the box using local keyword matching (Layer A).

To add LLM-powered answers:
1. Deploy a small Node/Express or serverless function that:
   - Reads your API key from a server-side environment variable (e.g. GEMINI_API_KEY)
   - Accepts POST { question: "..." }
   - Sends the question + portfolio data as context to the LLM
   - Returns { answer: "..." }
2. Set VITE_CHATBOT_API_URL=https://your-api.example.com/chat in your .env.

Never put your API key in front-end code.

---

## Performance Notes
- 3D scenes are lazy-loaded with React.Suspense.
- Canvas DPR is capped at 1.5x to preserve performance.
- prefers-reduced-motion disables all 3D and complex animations.
- @react-three/fiber and Three.js are code-split into a separate chunk.

---

## License
2026 Shahzaib Ur Rehman | KHUSHWAQT.com
