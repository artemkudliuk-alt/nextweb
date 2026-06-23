# Project Guidelines & Performance Standards (Antigravity 2.0)

This file defines the strict developer constraints and performance requirements for all developers and AI coding agents working on the NEXTWEB codebase.

## Strict Architectural Constraints

### 1. DOM Integrity & Layout
- **Maximum DOM Depth:** Do not exceed a DOM tree depth of 14.
- **Semantic Markup:** Use HTML5 semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **No Div Bloat:** Prohibit nested `<div>` wrappers that lack semantic, functional, or styling value. Prefer CSS Grid and Flexbox on parent elements.

### 2. Styling & Typography (The Lila Ban)
- **Neutral Palette:** Colors must be strictly neutral, elegant, and muted.
- **No Acid Gradients:** Do not use neon violet/blue gradients, glowing shadows, or hyper-acidic accents.
- **Typography:** Use the Geist, Satoshi, or Cabinet Grotesk font families. Do not use serif fonts in UI panels or dashboard elements.
- **Viewport Stability:** Use `min-h-[100dvh]` on full-screen sections (like preloader or hero section) instead of `100vh` to avoid layout shifts on mobile browsers (Safari/Chrome iOS) when navbars shrink or expand.

### 3. Performance & GPU Acceleration
- **GPU-Only Animations:** Only animate CSS `transform` (e.g. `translate3d`, `scale`, `rotate`) and `opacity` properties. These run hardware-accelerated on the compositor thread.
- **Blacklisted Animations:** Never animate layout geometry properties (`width`, `height`, `top`, `left`, `margin`, `padding`, `right`, `bottom`) as they cause page-wide Reflow and Repaint.
- **Interactive Leaf Components:** Isolate continuous micro-interactions (e.g., custom animations, custom hover coordinates) inside dedicated leaf client components.
- **No Custom Cursors:** Custom JS-driven cursors are strictly prohibited due to their high rendering overhead and latency.

### 4. Dependency Blacklist
Do not install or import the following heavy or redundant packages:
- `jquery`
- `gsap` (ScrollTrigger, etc.)
- `scrollmagic`
- `aos`
- `animejs`
- `lodash`
- `moment`

Use standard browser Web APIs (e.g., `IntersectionObserver`, `requestAnimationFrame`, `ResizeObserver`) and modular Vanilla JS for all animation, scrolling, and utility features.

# Design Taste — frontend ruleset (Emil + Taste + Impeccable, сжато)

## 0. Перед кодом — прочитать бриф
Всегда сначала одной строкой: «Читаю это как: <тип страницы> для <аудитория>, язык <vibe>, ближе к <дизайн-система/семейство>.»

Учесть: тип страницы, аудиторию, существующие бренд-ассеты (лого/цвет/шрифт — для редизайна это стартовый материал, не опционал), тихие ограничения (a11y, госсектор, дети, регуляторка — они ПЕРЕБИВАЮТ вкусовые предпочтения).

## 1. Три «ручки» (выставить под бриф)
- VARIANCE — насколько ломать сетку/симметрию (premium-лендинг высоко, дашборд низко)
- MOTION — сколько движения (брендовый лендинг высоко, продуктовый UI сдержанно)
- DENSITY — плотность контента (маркетинг — воздух, b2b-таблицы — плотно)

## 2. Brand vs Product режим
- Brand/лендинг: выразительно, крупная типографика, асимметрия, моушн.
- Product/app: сдержанно, предсказуемо, состояния важнее эффектов.

## 3. Анти-слоп (жёсткие баны)
- Никаких generic AI-теллов: фиолетово-синие градиент-блобы, всё по центру, одинаковые карточки-сетки, эмодзи-буллеты, дефолтный hero с blur-кляксой.
- Em-dash в текстах интерфейса — запрещён.
- Честность с дизайн-системами: если бриф ложится на готовую систему (shadcn, Radix, Carbon, Material, Primer и т.д.) — ставь официальный пакет и используй его, не воссоздавай CSS руками и не переопределяй 90% токенов. Одна система на проект, не мешать.

## 4. Типографика / цвет / пространство (Impeccable)
- Type scale осознанный (не 5 случайных размеров): дисплей / заголовок / тело / подпись.
- OKLCH цвета, ограниченная палитра + 1 акцент, проверять контраст (WCAG AA).
- Spacing по шкале (4/8 grid), ритм важнее точечных значений.
- 8 состояний компонента: default, hover, active, focus, disabled, loading, error, success. Видимый focus-ring, keyboard nav, корректная семантика dialog/popover.

## 5. Моушн (Emil Kowalski)
- Тайминги: нажатие кнопки 100–160ms, дропдаун 150–250ms, модалка 200–500ms. UI-анимации в целом < 300ms.
- НЕ ease-in для интерфейсного входа (ощущается вязко) — ease-out или кастомная кривая / spring.
- Кастомные easing вместо CSS-дефолтов. Springs для естественности (как Sonner/Vaul).
- Press-feedback: лёгкий scale-down на :active, чтобы кнопка ощущалась кликабельной.
- Не анимировать высокочастотные действия (то, что дёргается постоянно).
- Анимировать только transform/opacity/clip-path (перф). Списки — stagger.
- Уважать prefers-reduced-motion: давать reduced-вариант.

## 6. Скролл-сторителлинг
GSAP + ScrollTrigger для scroll-driven. Скелет: pin → progress → tween, очищать триггеры на unmount. Media tied to scroll — фиксировать playbackRate/currentTime по прогрессу, не по времени.

## 7. Перед сдачей — pre-flight
Сам себя ревью: соответствие брифу, контраст, состояния, моушн-тайминги, нет ли слопа. Не останавливаться на первом черновике — один проход критики обязателен.

