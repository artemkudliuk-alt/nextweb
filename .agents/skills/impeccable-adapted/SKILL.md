---
name: impeccable-adapted
description: Impeccable UI quality guidelines adapted for NEXTWEB. Controls DOM nesting, bans generic AI layouts, and enforces semantic correctness.
---

# Impeccable Quality Standards (NEXTWEB Edition)

Ensure all generated frontend components are unique, premium, and free from typical "AI generation patterns". Follow these strict rules to deliver award-winning code.

## 🚫 AI Slop & Generic Patterns Ban List

AI agents tend to output identical layouts. Explicitly BAN the following generic styles:
- **No Glowing Mesh Blobs:** Do not place glowing purple/blue blurry circles in the background behind cards.
- **No Center-Everything Layouts:** Do not center-align all headings, descriptions, and buttons. Use asymmetric grid offsets.
- **No Nested Div Bloat:** Prohibit wrapper `<div>` elements that lack semantic meaning. Use grid/flex directly on parent wrappers.
- **No Em-Dashes in UI:** Use colon `:`, dash `-`, or clear spacing instead of em-dashes `—` in user interfaces.

## 📐 Semantic HTML5 Layouts

Organize markup using native, clean HTML5 tags:
- Use `<main>` for primary page content.
- Use `<section>` with clear IDs and labels.
- Use `<article>` for list items like blog posts or testimonials.
- Use `<header>` and `<footer>` appropriately.
- Ensure all interactive elements have unique IDs for E2E testing.

## 🔍 Code Polish & Anti-Bloat Audit

Before finishing any task, run these self-check routines:
1. **DOM Tree Depth:** Is the maximum DOM tree depth under 14? If not, flatten the hierarchy by converting wrapper divs into grid cells.
2. **Keyboard Navigation:** Do all custom buttons/cards have `tabIndex={0}` and ARIA roles if they are clickable?
3. **CSS Variable Reusability:** Are all colors declared using NEXTWEB tokens (`var(--accent-color)`, etc.) instead of hardcoded hex values?
