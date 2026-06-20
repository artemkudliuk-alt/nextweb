# Project Guidelines & Performance Standards (Antigravity 2.0)

This file defines the strict developer constraints and performance requirements for all developers and AI coding agents working on the NEXTWEB codebase.

## Strict Architectural Constraints

### 1. DOM Integrity & Layout
- **Maximum DOM Depth:** Do not exceed a DOM tree depth of 14.
- **Semantic Markup:** Use HTML5 semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **No Div Bloat:** Prohibit nested `<div>` wrappers that lack semantic, functional, or styling value. Prefer CSS Grid and Flexbox on parent elements.

### 2. Styling & Typography (The Lila Ban)
- **Neutral Palette:** Colors must be strictly neutral, elegant, and muted.
- **No Acid Gradients:** Do not use neon violet/blue gradients, glowing shadows, or hyper-acidic accents.
- **Typography:** Use the Geist, Satoshi, or Cabinet Grotesk font families. Do not use serif fonts in UI panels or dashboard elements.
- **Viewport Stability:** Use `min-h-[100dvh]` on full-screen sections (like preloader or hero section) instead of `100vh` to avoid layout shifts on mobile browsers (Safari/Chrome iOS) when navbars shrink or expand.

### 3. Performance & GPU Acceleration
- **GPU-Only Animations:** Only animate CSS `transform` (e.g. `translate3d`, `scale`, `rotate`) and `opacity` properties. These run hardware-accelerated on the compositor thread.
- **Blacklisted Animations:** Never animate layout geometry properties (`width`, `height`, `top`, `left`, `margin`, `padding`, `right`, `bottom`) as they cause page-wide Reflow and Repaint.
- **Interactive Leaf Components:** Isolate continuous micro-interactions (e.g., custom animations, custom hover coordinates) inside dedicated leaf client components.
- **No Custom Cursors:** Custom JS-driven cursors are strictly prohibited due to their high rendering overhead and latency.

### 4. Dependency Blacklist
Do not install or import the following heavy or redundant packages:
- `jquery`
- `gsap` (ScrollTrigger, etc.)
- `scrollmagic`
- `aos`
- `animejs`
- `lodash`
- `moment`

Use standard browser Web APIs (e.g., `IntersectionObserver`, `requestAnimationFrame`, `ResizeObserver`) and modular Vanilla JS for all animation, scrolling, and utility features.
