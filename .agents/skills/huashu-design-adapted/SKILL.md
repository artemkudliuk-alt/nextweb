---
name: huashu-design-adapted
description: High-fidelity design review and auditing skill configured for NEXTWEB deliverables (prototypes, layouts, micro-interactions).
---

# HuaShu Design Audit (NEXTWEB Edition)

Use this 5-dimensional audit protocol to review any generated React page or component before submitting it to the user.

## 📊 1. Visual Hierarchy & Weight
- **Heading Contrast:** Ensure headings stand out clearly from body text using bold weights (700+) and wide tracking.
- **Section Labels:** Prefix section headings with double slashes (e.g., `// СВЯЗАТЬСЯ С НАМИ`) in monospace fonts or Geist Mono.
- **Focal Point:** Ensure each viewport has exactly one primary call-to-action (CTA) button utilizing the `.btn-premium` class.

## ⚖️ 2. Layout & Spacing Balance
- **Variance:** Avoid symmetric grid cards where possible. Break the grid with offset columns, varying card heights, or asymmetric spacers.
- **Mobile Comfort:** Double-check padding-top on mobile sections to protect headings from clipping under diagonal срезы (`clip-path`).
- **White Space:** Ensure elements have room to breathe. Minimum section padding on desktop is `6rem`, and `10rem` on mobile (to buffer clip-path slopes).

## 👁️ 3. Accessibility & Contrast (WCAG AA)
- **Contrast Check:** Verify that all text matches WCAG AA standards (minimum 4.5:1 ratio against the dark background).
- **Text-Secondary:** Use `#a1a1aa` for secondary descriptions. Never go darker than `#71717a` for text.
- **Focus Rings:** Interactive components must have a visible focus ring on focus-visible states.

## ⚡ 4. Motion & Performance (GPU Acceleration)
- **Transform/Opacity Only:** Strictly only animate CSS `transform` and `opacity` properties.
- **Spring Curves:** Use physical spring timings (tension 210, friction 20) instead of linear CSS transitions.
- **Prefers-Reduced-Motion:** Respect system settings. Provide fallback instant rendering for users with motion sensitivity.

## 🏗️ 5. Structure & Layout Stability
- **Mobile min-h:** Use `min-h-[100dvh]` instead of `100vh` on full-screen preloading/hero containers to prevent resizing jumps when address bars shrink.
- **Asset Loading:** Always specify correct widths, heights, and loading="lazy" for images to avoid Layout Shifts (CLS).
