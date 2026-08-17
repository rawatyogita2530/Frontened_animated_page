# Codex Biosciences — React Creative Frontend

A premium, animation-driven biotechnology landing page rebuilt in **React + GSAP + Three.js**.

## Stack

- React
- Vite
- JavaScript (ES modules)
- GSAP + ScrollTrigger
- Three.js + OrbitControls
- CSS

## Highlights

- Cinematic biotech intro animation
- Interactive 3D DNA helix
- Mouse movement and drag interaction
- Scroll-driven molecular story
- Clickable research/capability detail modal
- Animated density visualization
- Interactive encode → synthesize → store → retrieve pipeline
- Magnetic buttons and cursor micro-interactions
- Responsive desktop, tablet and mobile layouts
- `prefers-reduced-motion` support

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.


## Architecture

```text
src/
├── App.jsx
├── main.jsx
├── siteAnimations.js
└── styles.css
```


## Design approach

The visual language uses dark scientific environments, warm editorial sections, molecular color accents, and restrained motion. The animation is tied to the biotech story rather than added as decoration: the DNA model responds to pointer movement and scrolling, while the molecular story and research pipeline respond to the visitor's actions.

