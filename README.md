# Covalent Bio — Animated Biotech Landing Page (v2)

A premium, fully-animated landing page for **Covalent Bio**, a fictional
computational protein-design biotech ("we design proteins the way
engineers design bridges"). This is the full interactive build, using the
exact stack called for in the brief: **React, TypeScript, Tailwind CSS,
GSAP, Framer Motion, and Three.js.**

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 19 + TypeScript, via Vite | Fast dev server, strict typing, component reuse |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) | Design tokens (color/type) defined once, used everywhere |
| 3D | Three.js via `@react-three/fiber` + `@react-three/drei` | Real WebGL — the hero's rotating double helix and the CTA's distorted blob are both live 3D scenes, not video/lottie |
| Scroll & timeline animation | GSAP + `ScrollTrigger` | Scroll-jacked horizontal pipeline section, scroll-scrubbed progress fills, staged entrance timelines |
| Micro-interaction / gesture animation | Framer Motion | Magnetic buttons, 3D tilt + spotlight cards, custom cursor, preloader curtain, mobile drawer |
| Smooth scroll | Lenis (wired into GSAP's ticker) | Keeps native scroll and ScrollTrigger perfectly in sync |

## Run it locally

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build & preview a production bundle

```bash
npm run build      # type-checks with tsc, then builds with Vite → dist/
npm run preview    # serves the production build locally
```

## Deploying it live

It's a standard Vite SPA — any static host works with zero config:

- **Vercel:** `npx vercel` from the project root (auto-detects Vite).
- **Netlify:** drag the `dist/` folder onto Netlify's "Deploys" page, or
  connect the repo with build command `npm run build` and publish
  directory `dist`.
- **GitHub Pages:**
  ```bash
  git init && git add . && git commit -m "Covalent Bio landing page"
  git branch -M main
  git remote add origin <your-empty-github-repo-url>
  git push -u origin main
  ```
  then build with `npm run build` and publish `dist/` via GitHub Pages
  (or use the `gh-pages` package to automate the push).

## Project structure

```
src/
├── components/
│   ├── Preloader.tsx      # 0→100% counter + clip-path curtain reveal
│   ├── CustomCursor.tsx   # cursor that scales over [data-cursor="hover"]
│   ├── Navbar.tsx         # condensing nav, mobile drawer (Framer Motion)
│   ├── Magnetic.tsx       # reusable magnetic-hover wrapper for buttons
│   ├── Hero.tsx           # staged GSAP entrance + 3D helix background
│   ├── About.tsx          # scroll-revealed thesis + animated counters
│   ├── Pipeline.tsx       # scroll-jacked horizontal 4-stage sequence
│   ├── StageCanvas.tsx    # tiny per-stage animated Canvas 2D diagram
│   ├── Explore.tsx        # wrapper for the draggable 3D molecule viewer
│   ├── ScrambleText.tsx   # decode-style text reveal (IntersectionObserver)
│   ├── Capabilities.tsx   # 3D-tilt, spotlight-hover capability cards
│   ├── Stats.tsx          # light-mode contrast section, animated counters
│   ├── FinalCTA.tsx       # 3D blob background + briefing request form
│   └── Footer.tsx
├── three/
│   ├── DNAHelix.tsx       # R3F double-helix + scroll-driven camera dolly
│   ├── ShaderField.tsx    # custom GLSL simplex-noise plasma background
│   ├── MoleculeExplorer.tsx # OrbitControls ball-and-stick molecule + hotspots
│   └── Blob.tsx           # R3F distorted, emissive icosahedron
├── hooks/useSmoothScroll.ts
├── App.tsx
└── index.css              # Tailwind v4 theme tokens + base styles
```

Every animated surface has a `prefers-reduced-motion` fallback (Lenis is
skipped, continuous `requestAnimationFrame` loops don't start, GSAP
timelines resolve to their end state instantly).

## What's genuinely different from a template

**The hero visual is real 3D with a scroll-driven camera, not a static render.**
`DNAHelix.tsx` builds two intertwined strands from parametric equations,
instances spheres along each with `THREE.InstancedMesh`, connects them with
`TubeGeometry` ribbons and cylindrical rungs, and sits in front of a custom
GLSL simplex-noise shader field (`ShaderField.tsx`) that drifts toward the
pointer. As you scroll out of the hero, a `ScrollTrigger`-driven progress
value feeds straight into the Three.js render loop: the camera dollies
*into* the strand, the field of view widens, and the rotation speeds up —
a real flythrough, not a CSS parallax trick.

**You can pick up and rotate an actual output.** The "Live model" section
(`MoleculeExplorer.tsx`) renders a small ball-and-stick molecular cluster
with `OrbitControls` fully enabled — drag to orbit, scroll to zoom — with
three hotspot labels anchored to real 3D coordinates via drei's `<Html>`,
each describing what that residue does. It's a genuine interactive 3D
object, not a video loop pretending to be one.

**The platform section scroll-jacks on purpose.** `Pipeline.tsx` pins the
section and drives a horizontal `xPercent` tween off vertical scroll input
via `ScrollTrigger`'s `containerAnimation`, so the four pipeline stages
(target → fold → bind → validate) play out like a horizontal filmstrip
while the page still scrolls normally before and after it.

**Text decodes into place.** `ScrambleText.tsx` is a small reusable hook
that cycles each section's eyebrow label through random glyphs before it
resolves to real text, triggered once per element via
`IntersectionObserver` — a cheap, on-brand nod to "decoding a sequence"
that costs nothing on the main thread once it's done.

**Every card reacts individually, and the cursor has weight.**
`Capabilities.tsx` tracks the mouse per-card to drive a spring-based 3D
tilt and a following radial spotlight. The custom cursor
(`CustomCursor.tsx`) trails three lagging dots at different spring
stiffnesses for a comet effect, and scales into a full circle over any
`data-cursor="hover"` element.

## Verification performed in this environment

- `tsc -b --noEmit` — clean, no type errors, after every round of changes.
- `npm run build` — production build succeeds; the CTA blob and the
  molecule explorer are both code-split into their own lazy chunks since
  they're below the fold (~397 KB gzipped main bundle).
- Headless Chromium smoke test against the built `dist/` bundle, scrolled
  through the entire page in ten steps (triggering the pinned pipeline,
  the shader field, the camera dolly, and the OrbitControls molecule) —
  zero console/page errors other than a font-domain fetch blocked by this
  sandbox's own network allowlist (fonts load normally in a real
  browser/host).

## Notes on this deliverable

Built directly by Claude in one working session. I can't push to a real
GitHub account or stand up a live hosting URL on your behalf — the
commands above are the exact ones to do either in a couple of minutes
once you have this folder.
