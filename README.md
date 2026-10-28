# Shahzaib Ur Rehman — Portfolio · KHUSHWAQT.com

A production-ready, fully responsive personal portfolio built with **React 18 + Vite**, **Three.js**, **Framer Motion**, **GSAP + Lenis**, and **Tailwind CSS v4**.

---

## Tech Stack

| Layer          | Technology                                              |
|----------------|---------------------------------------------------------|
| Framework      | React 18 + Vite 8                                       |
| 3D / WebGL     | Three.js · @react-three/fiber · @react-three/drei       |
| Animation      | Framer Motion · GSAP + ScrollTrigger                    |
| Smooth Scroll  | Lenis (`@studio-freight/lenis`)                         |
| Styling        | Tailwind CSS v4                                         |
| Fonts          | Outfit · Plus Jakarta Sans · DM Sans (Google Fonts)     |
| Icons          | react-icons                                             |

---

## Folder Structure

```
src/
├── components/
│   ├── Chatbot.jsx          # Floating AI chat widget
│   ├── CursorGlow.jsx       # Custom purple cursor glow
│   ├── ExpandableCard.jsx   # Reusable summary-first expandable card
│   ├── LoadingScreen.jsx    # Animated intro screen
│   ├── Navbar.jsx           # Sticky glass navbar (logo grows on Hero)
│   ├── SectionHeader.jsx    # Gradient heading + eyebrow chip
│   └── TiltCard.jsx         # 3D perspective tilt on hover
├── data/
│   └── portfolio.js         # Single source of truth — ALL content
├── hooks/
│   ├── useLenis.js          # Lenis smooth scroll + GSAP sync
│   ├── useMouseParallax.js  # Normalised mouse {x,y} for 3D parallax
│   ├── useReducedMotion.js  # Respects prefers-reduced-motion
│   └── useScrollSection.js  # Active nav link via IntersectionObserver
├── sections/
│   ├── Hero.jsx             # Full-screen hero with 3D background
│   ├── About.jsx            # Two-column: text + 3D tech core
│   ├── Education.jsx        # Animated timeline
│   ├── Skills.jsx           # Proficiency rings + nested sub-skills
│   ├── Projects.jsx         # 3D-tilt cards with expandable features
│   ├── Experience.jsx       # Expandable cards + nested responsibilities
│   └── Contact.jsx          # Animated icon buttons + footer
├── three/
│   ├── HeroScene.jsx        # Wireframe icosahedron + code particles
│   └── TechCoreScene.jsx    # Orbiting tech logos around glowing core
├── App.jsx
├── main.jsx
└── index.css                # Global styles, glass-card, gradient-text
public/
└── assets/
    ├── logo.png             # KHUSHWAQT.com logo
    └── profile.jpg          # Profile picture
.github/workflows/
└── deploy.yml               # GitHub Pages auto-deploy on push to main
```

---

## Quick Start

### Prerequisites
- **Node.js** >= 18
- **npm** >= 9 (comes with Node)

### 1 — Install dependencies
```bash
cd "d:\My Portfolio"
npm install
```

### 2 — Start development server
```bash
npm run dev
```
Open **http://localhost:5173**

### 3 — Build for production
```bash
npm run build
```
Output goes to `dist/`. Preview locally:
```bash
npm run preview
```

---

## Deploy to GitHub Pages (Automatic)

### First-time setup — do this once

**Step 1: Create a GitHub repository**
1. Go to https://github.com/new
2. Name it (e.g. `portfolio`) — keep it **public**
3. Do NOT initialise with README (the repo is already initialised locally)

**Step 2: Push your code**
```bash
cd "d:\My Portfolio"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```
Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual values.

**Step 3: Enable GitHub Pages**
1. On GitHub, go to your repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

**Step 4: Set the base URL (important!)**

Your site will live at one of two addresses:

| Scenario | URL | `VITE_BASE_URL` value |
|----------|-----|-----------------------|
| Repo named `username.github.io` | `https://username.github.io` | `/` |
| Any other repo name | `https://username.github.io/repo-name/` | `/repo-name/` |
| Custom domain (CNAME) | `https://yourdomain.com` | `/` |

**To set it:** Go to your repo → **Settings** → **Variables** → **Actions** → New repository variable:
- Name: `VITE_BASE_URL`
- Value: `/` or `/your-repo-name/`

**Step 5: Trigger a deployment**

The GitHub Action runs automatically on every `git push` to `main`. Or trigger it manually:
- Repo → **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**

After ~2 minutes your site will be live at the URL shown in Settings → Pages.

---

### Custom Domain (optional)
1. Buy a domain and add a CNAME DNS record pointing to `username.github.io`
2. Create `public/CNAME` file with your domain (no `https://`):
   ```
   yourdomain.com
   ```
3. Set `VITE_BASE_URL` to `/`
4. In GitHub Settings → Pages → Custom domain → enter your domain

---

## AI Chatbot — LLM Mode (optional)

The chatbot works out-of-the-box using local keyword matching.

To enable LLM-powered answers:
1. Deploy a serverless function (e.g. Vercel Edge, Cloudflare Worker) that:
   - Reads your API key from a **server-side** env var (e.g. `GEMINI_API_KEY`)
   - Accepts `POST { "question": "..." }`
   - Returns `{ "answer": "..." }`
2. Copy `.env.example` to `.env` and set:
   ```
   VITE_CHATBOT_API_URL=https://your-proxy.example.com/chat
   ```

> **Never put an API key in front-end code.**

---

## Performance
- 3D scenes are lazy-loaded via `React.Suspense`
- Canvas DPR capped at 1.5× (performance/quality balance)
- Three.js, Framer Motion, and GSAP are split into separate chunks for better caching
- `prefers-reduced-motion` disables all 3D and complex animations
- Fonts loaded via Google Fonts with `display=swap`

---

## License
&copy; 2026 **Shahzaib Ur Rehman** | KHUSHWAQT.com
