---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults.
---

# Frontend Design Skill

Approach every design task as a lead designer at a high-end agency. Build distinctive, opinionated user interfaces that avoid "AI slop" templates.

## Rules & Principles

1. **Aesthetic Direction**:
   - Establish a clear visual identity (e.g., tech-brutalist, minimalist grid, monospace-blueprint).
   - Use custom typography scales, weights, and letter-spacing (Satoshi, Geist, Cabinet Grotesk).
   - Reject plain gradients, glowing shadows, or generic centered grids.

2. **Typography**:
   - Pair display and body fonts intentionally.
   - Use monospace elements for metadata/counters to convey structure.

3. **Spatial Composition**:
   - Keep plenty of white space ("air") for marketing layouts.
   - Use hairline dividers (`1px solid rgba(255,255,255,0.05)`) and grid lines instead of solid boxes.

4. **Motion & Interaction**:
   - Keep UI transitions under 300ms.
   - Use spring easing or custom cubic-bezier (no ease-in for entries).
   - Apply active press states (scale down slightly on active state).
