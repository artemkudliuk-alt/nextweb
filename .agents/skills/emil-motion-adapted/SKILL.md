---
name: emil-motion-adapted
description: Motion design, transitions, physical spring animations, and GPU performance optimization rules.
---

# Motion & Interaction Design (NEXTWEB Edition)

Always use these rules to ensure animations feel responsive, physical, and run at a stable 60 FPS.

## ⏱️ Animation Timings & Curves
- **Button Press Feedback:** Keep duration at `100ms` - `160ms`. Add a subtle scale-down (`scale(0.97)` / `translate3d(0, 0, 0)`) inside active states to make buttons feel clickable.
- **Dropdowns & Selects:** Keep duration at `150ms` - `250ms` using `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out quint). Never use `ease-in` for entries as it feels sluggish.
- **Modals & Overlays:** Keep duration at `200ms` - `350ms`.

## 🌀 Spring-Based Physics (useTrail / Framer Motion)
- **Trail Grids:** When displaying lists (e.g. Partners, Blog, Portfolio), animate their entrance using a spring-based physics model.
- **Config Parameters:**
  - `mass: 1`
  - `tension: 210` (snappy)
  - `friction: 20` (smooth dampening)
- **Stagger:** Add a 15ms - 25ms stagger delay per item to create a cascading effect.

## 🚀 GPU Performance & Reflow Prevention
- **Transforms Only:** Never animate layout geometry properties (`width`, `height`, `top`, `left`, `margin`, `padding`). They trigger page-wide Reflow.
- **Allowed Animated Properties:** Only animate `transform` (e.g., `translate3d`, `scale`, `rotate`) and `opacity`.
- **Keyboard Navigation:** Ensure animations do not shift the focus ring or cause unexpected layout jumps during tab-based keyboard navigation.
