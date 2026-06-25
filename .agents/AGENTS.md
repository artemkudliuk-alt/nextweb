# Workspace Agent Rules

These rules apply universally to all tasks performed by the AI agent (Antigravity) in this workspace.

## 1. Automatic Skill Application (Mandatory)

The agent MUST automatically and proactively read, reference, and apply the appropriate instructions in `.agents/skills/` without the user having to explicitly request them:

- **Before starting any creative work (features, components, layout modifications)**: Apply **`brainstorming`** to explore user intent, prevent coding before design approval, and propose 2-3 approaches.
- **For any UI layout, design, or redesign task**: Apply **`design-taste-frontend`**, **`frontend-design`**, and **`ui-ux-pro-max`** to read the room (Brief Inference), configure the 3 Dials, avoid AI-slop templates, and implement custom typography, grids, and states.
- **Before starting any new page or major component**: Apply **`creative-ideation`** to brainstorm and propose 3 distinct design concepts, layout patterns, and third-party integrations (e.g. Spline, Rive, Lottie) before writing code.
- **Before writing code for any layout or design task**: Apply **`design-mockup-generator`** to generate high-fidelity visual layout mockups using the image generation tool and outline visual proposals for review.
- **For any Animation or Transition task**: Apply **`remotion-best-practices`** to enforce physics-based spring movements, staggered delays, and smooth text reveals.
- **For any React Coding task**: Apply **`vercel-react-best-practices`** to ensure components are performance-optimized, state updates are isolated, and no unnecessary re-renders occur.
- **For any UI Review, Audit, or Final Polish task**: Apply **`web-design-guidelines`** to check accessibility, focus states, and interaction states.
- **For any Page Creation or SEO task**: Apply **`seo-audit`** to verify HTML5 semantic hierarchy, dynamically loaded title/meta tags, and JSON-LD schema microdata.

## 2. Visual and Interaction Standard

- Do not show raw text placeholders. Design rich, high-fidelity interactive elements (e.g. calculators, configurations) that provide immediate value.
- Enforce the "Lila Ban" from `GEMINI.md`: keep colors strictly neutral, elegant, and muted. Never use neon acid gradients.
