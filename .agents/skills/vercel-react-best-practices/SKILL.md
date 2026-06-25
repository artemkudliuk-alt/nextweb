---
name: vercel-react-best-practices
description: Core guidelines for building high-performance React applications, optimizing re-renders, state management, and memory usage during animations.
---

# Vercel React Best Practices Skill

Ensure ultra-smooth user experiences and 60+ FPS animation stability in React applications.

## Rules & Principles

1. **Optimize Re-renders**:
   - Isolate micro-interactions (like interactive sliders, graphics, or hover trackers) inside leaf components so that state updates do not trigger page-wide React tree re-renders.
   - Use `React.memo` for components that receive static props.
   - Memoize handlers and complex calculations using `useCallback` and `useMemo`.

2. **State Location**:
   - Keep state local to the components that need it.
   - Avoid globally triggering context updates for simple visual switches.

3. **DOM Reads & Performance**:
   - Never query the DOM directly inside animation loops.
   - Batch reads and writes. Use CSS variables to pass continuous values (e.g. mouse coordinates) to styles, rather than updating React state on every mouse movement.
