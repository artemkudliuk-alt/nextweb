---
name: ui-ux-pro-max-adapted
description: UI/UX pattern directory adapted for the NEXTWEB brand ecosystem. Standardizes cards, buttons, tabs, and filters.
---

# UI/UX Pro Max Pattern Catalog (NEXTWEB Edition)

Always use these structural layout blueprints when coding new interactive components:

## 🎴 Card Components (Premium Glass Cards)
- **Structure:**
  ```jsx
  <div className="structure-card">
    <div className="structure-card-number">01</div>
    <span className="cyber-section-label">// LABEL</span>
    <h4>Title</h4>
    <p className="structure-card-text">Description</p>
  </div>
  ```
- **Styling Specs:** Semi-translucent dark background (`rgba(255,255,255,0.01)`), light border, hover scale `1.01` transition.

## 🎚️ Interactive Accordions & Toggles
- **Structure:**
  - On desktop, use tab/grid list details.
  - On mobile, convert to accordion lists with `.accordion-item` and toggle states managed reactively.
  - Always register `useAutoAnimate()` on the accordion wrapper to ensure height changes animate smoothly.
  - Reset closed frames to neutral grey borders (`rgba(255, 255, 255, 0.08)`) and borders to active highlights (`var(--accent-color)`) ONLY when open.

## 🔘 Action Buttons (Premium CTAs)
- **Premium Actions:**
  ```jsx
  <button className="btn-premium">
    <span>ACTION TEXT</span>
  </button>
  ```
- **Secondary Actions:**
  ```jsx
  <Link className="btn-secondary">
    <span>ACTION TEXT</span>
  </Link>
  ```

## 🗂️ Interactive Filter Navigation
- **Structure:** Row flex layout with `gap: 0.75rem` wrap.
- **Toggle Behavior:** Active item renders with `.btn-premium`, inactive items render with `.btn-secondary`.
- **Transitions:** Wrap the items grid container in Framer Motion `<motion.div layout>` to animate layout sorting shifts smoothly.
