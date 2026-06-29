---
name: website-cloner-template-adapted
description: Section cloner and page-recreation guidelines. Directs how to extract layouts from other sites and adapt them to the NEXTWEB brand tokens.
---

# Code Cloner & Style Adapter (NEXTWEB Edition)

When instructed to "recreate" or "clone" a section or page layout from a reference URL or screenshot:

## 1. Style Extraction & Sanitization
- **Strip Raw Styles:** Remove all external, third-party global styles, inline hardcoded margins, and inline font declarations from the imported markup.
- **Translate to Brand CSS Variables:** Map all colors to the NEXTWEB design system variables:
  - Reference dark background -> `#0b0b0c`
  - Reference secondary text -> `var(--text-secondary)` / `#a1a1aa`
  - Reference purple/pink accent -> `var(--accent-color)`
  - Reference borders -> `rgba(255,255,255,0.08)`
- **Font Remapping:** Re-map external fonts (e.g. Inter, SF Pro, system-ui) to `Satoshi` or `Geist` to match the core NEXTWEB typographic hierarchy.

## 2. Structural Reconstruction
- **No Div Bloat:** Flatten nested layout hierarchies. If a reference block uses 5 nested wrapper divs to position a card, rebuild it using CSS Grid or Flexbox on the parent card wrapper.
- **Semantic Tags:** Convert generic `div`s from the scraped structure into semantic elements (`article`, `section`, `nav`).
- **Media Queries:** Convert absolute width breakpoints into our responsive breakpoints:
  - Desktop: `(min-width: 1025px)`
  - Mobile/Tablet: `(max-width: 1024px)`

## 3. Transition & Animation Hydration
- Replace static buttons/links with NEXTWEB hover structures:
  - Premium buttons -> Use `<button className="btn-premium"><span>LABEL</span></button>`
  - Secondary buttons -> Use `<Link className="btn-secondary"><span>LABEL</span></Link>`
- Replace basic transitions with spring-based motion curves (`framer-motion` layout animations or `react-spring` trails).
