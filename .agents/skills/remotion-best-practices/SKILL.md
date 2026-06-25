---
name: remotion-best-practices
description: Guidance on creating fluid, mathematical, and physics-based animations in React, including spring functions, staggering, and text reveals.
---

# Remotion Best Practices (Physics & Animations)

Inject dynamic, organic animation quality into React layouts using native math, CSS custom properties, and standard web APIs.

## Rules & Principles

1. **Spring Physics**:
   - Prefer пружинные (spring-like) transitions instead of simple linear easings.
   - Use custom cubic-bezier properties that mimic spring bounce (e.g. `cubic-bezier(0.34, 1.56, 0.64, 1)` or `cubic-bezier(0.175, 0.885, 0.32, 1.275)`).

2. **Staggered Animations**:
   - Animate lists, grids, or sequences with a cascade delay.
   - Use CSS custom properties for index-based animation delays: `transition-delay: calc(var(--index) * 0.05s)`.

3. **Text Reveals**:
   - Use clip-path reveals or translating wrapper blocks for titles:
     ```css
     .reveal-wrapper { overflow: hidden; }
     .reveal-content { transform: translate3d(0, 100%, 0); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
     ```
