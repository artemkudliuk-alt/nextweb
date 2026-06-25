---
name: design-taste-frontend
description: Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships interfaces that do not look templated.
---

# tasteskill: Anti-Slop Frontend Skill

Landing pages, portfolios, and redesigns. Not dashboards, not data tables, not multi-step product UI. Every rule below is **contextual**. First read the brief, then pull only what fits.

## 0. BRIEF INFERENCE (Read the Room First)

Before touching code, infer what the user wants. State in one line: 
**"Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>."**

### Anti-Default Discipline
Do not default to:
- AI-purple gradients.
- Centered hero over dark mesh.
- Three equal feature cards.
- Generic glassmorphism on everything.
- Infinite-loop micro-animations.
- Inter + slate-900 typography.

## 1. THE THREE DIALS (Core Configuration)

After the design read, set three dials:
- **`DESIGN_VARIANCE`** (1 = Perfect Symmetry, 10 = Artsy Chaos)
- **`MOTION_INTENSITY`** (1 = Static, 10 = Cinematic / Physics)
- **`VISUAL_DENSITY`** (1 = Art Gallery / Airy, 10 = Cockpit / Packed Data)

Baseline: `8 / 6 / 4`.

## 2. DESIGN PRINCIPLES
- **Typography**: Display and body font pairings, tabular numbers for stats/currencies, text-wrap balance for headings.
- **Bento & Layout Grid**: Break identical layouts, align elements to asymmetrical grid tracks.
- **States & Micro-interactions**: Smooth transitions (< 300ms), active state scale-down press feedback, keyboard nav focus-visible outlines.
- **Performance**: Animate `transform` and `opacity` only. Avoid layout shifts.
