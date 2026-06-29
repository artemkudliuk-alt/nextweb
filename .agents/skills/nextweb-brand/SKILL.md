---
name: nextweb-brand
description: Master brand design system guidelines, colors, fonts, slopes, and glassmorphism definitions for NEXTWEB.
---

# NEXTWEB Brand Design System

Use these absolute design tokens and rules when constructing or refactoring any page, section, component, or visual style on the NEXTWEB site. Never diverge from these standards.

## 🎨 Color System (Palette)

All colors must be strictly neutral, elegant, and muted. No glowing mesh blobs or neon AI gradients.
- **Main Background (Dark):** `#0b0b0c` (Very dark grey/black)
- **Secondary Background (Dark Card):** `rgba(255, 255, 255, 0.02)` / `rgba(11, 11, 12, 0.8)`
- **Solid White (Light Theme Sections):** `#ffffff` (Used strictly for sections like `#whyus` / Our Services to create diagonal contrast)
- **Primary Text:** `#ffffff` (White, high contrast)
- **Secondary Text:** `var(--text-secondary)` / `#a1a1aa` (Muted grey)
- **Accent Highlight:** `var(--accent-color)` / `#a020f0` (Purple) to `#ff1493` (Deep pink)
- **Borders:** `rgba(255, 255, 255, 0.08)` (Subtle, elegant borders)

## ✍️ Typography & Font System

Always pair modern geometric sans-serif typefaces. No serif fonts in UI panels.
- **Main Fonts:** `Geist`, `Satoshi`, or `Cabinet Grotesk`
- **Headings Vibe:** Bold, wide tracking, uppercase labels prefixed by double slashes (e.g., `// 01 . РАЗРАБОТКА`)
- **Body Text:** Elegant line height (1.6), clear paragraph separation.

## 📐 Spacing & Layout Architecture

- **Grid System:** Maintain an 8px modular grid spacing (4px / 8px / 16px / 24px / 32px / 48px / 64px).
- **Layout Slopes:** Diagonal section dividers are generated using `clip-path` slopes with exactly `120px` height difference. Always overlap consecutive sections by `-120px` margin-top on mobile and adjust padding-top to prevent layout gaps.
- **DOM Depth:** Strictly keep DOM tree depth below 14. No nested wrapper `div`s.

## 🧊 Glassmorphism & UI Panels

Premium card components must look like translucent dark glass.
- **CSS Rules:**
  ```css
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  ```

## 🔘 Form Input States (8 Visual States)

All forms must follow these strict states:
1. **Default:** Subtle grey border, dark semi-translucent background.
2. **Hover:** Border shifts to brighter white border (`rgba(255,255,255,0.15)`).
3. **Active/Press:** Input scale-down (scale 0.98) on action buttons.
4. **Focus:** Sharp visible outline or glowing white border with outline offset.
5. **Disabled:** Reduced opacity (0.5), cursor not-allowed.
6. **Loading:** Spinner loader, inputs read-only, submit button showing loading spinner.
7. **Error:** Red border (`#ff4a4a`), validation text below field.
8. **Success:** Green check animation, success wrapper showing submission receipt.
