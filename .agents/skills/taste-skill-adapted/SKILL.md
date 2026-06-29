---
name: taste-skill-adapted
description: Aesthetics, layout variance, and typographic rules adapted to keep the NEXTWEB website clean and elegant.
---

# Aesthetic Taste Guidelines (NEXTWEB Edition)

Ensure all page designs feel premium, modern, and aligned with high-end digital design standards.

## 🎛️ Design Tuning Dials
Adjust these three dials depending on the page type:
1. **DESIGN_VARIANCE:**
   - **Low (Dashboard/App):** Strict symmetry, high predictability.
   - **Medium (Inside Pages - Services/Contacts):** Structured columns, clean typography, offset headings.
   - **High (Landing/Hero):** Large typography, asymmetric layouts, overlapping elements, WebGL backdrops.
2. **MOTION_INTENSITY:** Keep under `300ms` for interactive states, and use spring-based physics for scroll entrances.
3. **VISUAL_DENSITY:**
   - **Airy (Marketing/Services):** Generous spacing (`80px` - `120px` paddings) to give text breathing room.
   - **Dense (Calculator/Forms):** Compact padding (`16px` - `24px`) for inputs and results.

## 🎯 Visual Harmony & Contrast
- **WCAG AA Compliance:** Text and icons must be easily readable on `#0b0b0c`. Checked borders should be visible but not glowing.
- **Accents:** Use accent highlights (`var(--accent-color)`) sparingly (e.g. key borders, numbers, icons). Avoid painting large solid blocks in accent colors.
- **Focus Rings:** Always provide a clear focus ring on focus-visible states.

## ✍️ Typographic Rhythm
- Heading sizes must be chosen from a strict scale:
  - Display: `3.5rem` - `4.5rem` (Hero headings)
  - Section Title: `2rem` - `2.8rem`
  - Subtitle: `1.2rem` - `1.5rem`
  - Body Text: `0.92rem` - `1rem`
  - Monospace Labels: `0.75rem` - `0.8rem` (prefixed with `//`)
- Keep line-height at `1.6` for paragraphs. Keep paragraph line length under 80 characters for optimal readability.
