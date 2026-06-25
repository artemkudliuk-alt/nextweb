---
name: design-mockup-generator
description: Skill for generating high-fidelity UI design mockup images, prompting image generation tools, and iterating on visual concepts with the user before writing any React or CSS code.
---

# UI Design Mockup & Visual Concept Iteration Skill

This skill enforces a "Design-First" workflow where visual mockup images are generated, presented, and approved before any frontend code is written.

## 1. THE MOCKUP-FIRST WORKFLOW
Whenever a new page, major redesign, or layout changes are requested:
1. **Brief & Grounding**: Identify the product, target audience, and the page's main job. Ground it in the subject's world (materials, vernacular, instruments).
2. **Visual Concepts**: Propose 2-3 design concepts (e.g., Tech Blueprint, Swiss Editorial, Interactive Dashboard).
3. **Mockup Generation**: Use the `generate_image` tool to render a visual representation of the layout.
4. **Motion & Media Spec**: Outline exactly what animations, videos, or assets will be needed.
5. **Critique & Approval**: Show the mockup to the user, critique it for "AI-slop defaults", adjust it based on feedback, and wait for explicit approval before writing code.

## 2. IMAGE GENERATION PROMPT ENGINEERING
Use this structured prompt formula for the `generate_image` tool:
- **Formula**: `[Layout/Project Type] + [Style/Aesthetic] + [Color Palette/Mood] + [Composition/Interface Details] + [Technical Constraints]`
- **Bans**: Exclude device frames (laptops, phones, tablets) using `--no device frames, laptop, phone` to get clean flat UI screens.
- **Style Raw**: Use clean, vector-aligned keywords for crisp interface layouts.

### Prompt Templates
- **Minimal Tech Blueprint (Concept A)**:
  `"Clean 2D layout website mockup, technical blueprint aesthetic, thin en-dash lines, monospace annotations, dark mode #000000 base, cyber cyan outline buttons, Cabinet Grotesk typography, premium UI interface design --no device frames, laptop, phone"`
- **Swiss Editorial Grid (Concept B)**:
  `"Swiss style editorial landing page UI design, asymmetrical grid layout, high typography hierarchy, Outfit font, bold contrasting headings, dark mode theme, very minimal, clean grid borders --no device frames, laptop, phone"`
- **High-End Interactive Configurator (Concept C)**:
  `"Sleek dark B2B dashboard control panel UI mockup, minimal sliders, tabular numbers, clean typography, outline inputs, dark grey card dividers, cyber blue accents --no device frames, laptop, phone"`

## 3. ANTI-AI-SLOP DESIGN RULES (Calibration)
When designing and reviewing layouts, actively avoid the three typical AI design patterns:
1. **Warm Cream / Terracotta / Serif**: Near #F4F1EA background with a high-contrast serif display font and terracotta accent.
2. **Neon Acid / Dark Mesh**: Near-black background with a single neon acid-green, pink, or cyan gradient accent.
3. **Faux Broadsheet**: Broadsheet layout with zero border-radius and hairline rules everywhere.

Instead, build custom identities:
- **Typography Personality**: Pair display and body faces intentionally (e.g. Outfit for headers, Geist Mono for tech parameters).
- **Structure is Information**: Numbers (01, 02), eyeballing, and dividers must encode *true information* (e.g., sequential processes), not just decorate features.
- **Motion Limits**: Orchestrate a single high-quality moment (like a scroll reveal or active states) rather than scattered micro-effects. Less is more.
- **Grid Alignment**: Maintain absolute pixel alignment with the site's 8-column layout grid. Use the `--border-color` variable (`rgba(255,255,255,0.07)`) for clean visual grids.
