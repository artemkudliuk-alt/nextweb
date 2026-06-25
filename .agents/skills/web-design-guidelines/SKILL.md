---
name: web-design-guidelines
description: Review UI code for compliance with Web Interface Guidelines including accessibility, focus states, forms, animation performance, typography, and content handling.
---

# Web Design Guidelines Skill

Ensure high quality, accessible, and performant web interfaces.

## Rules & Principles

1. **Accessibility**:
   - Interactive elements must be semantic (`<button>`, `<a>`, `<Link>`) or have keyboard handlers.
   - Icons need `aria-hidden="true"`, icon-only buttons need `aria-label`.
   - Ensure proper contrast (WCAG AA).

2. **Focus States**:
   - Interactive elements must have a visible focus state (`:focus-visible`).
   - Never disable the outline without providing an alternative focus ring.

3. **Forms**:
   - All inputs must have clickable labels.
   - Use correct types (`email`, `tel`, etc.) and `autocomplete` fields.
   - Inline error display and input disabled states must be styled cleanly.

4. **Animations**:
   - Respect `prefers-reduced-motion`.
   - Only animate `transform` and `opacity` to avoid reflows.
   - Avoid `transition: all`. List animated properties explicitly.
