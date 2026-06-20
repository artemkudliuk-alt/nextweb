/**
 * Nextweb Performance Utilities (Antigravity 2.0)
 * Native Vanilla JS utilities for hardware-accelerated scroll reveal and magnetic hover.
 */

/**
 * Initializes scroll reveal animations using IntersectionObserver.
 * Elements should have the [data-reveal] attribute.
 */
export function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (elements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.style.willChange = 'transform, opacity';

        requestAnimationFrame(() => {
          target.classList.add('reveal-visible');
        });

        // Clean up will-change after transition finishes
        target.addEventListener('transitionend', () => {
          target.style.willChange = 'auto';
        }, { once: true });

        observer.unobserve(target);
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));

  // Return cleanup function
  return () => {
    elements.forEach(el => observer.unobserve(el));
    observer.disconnect();
  };
}

/**
 * Initializes hardware-accelerated magnetic hover effects for elements with [data-magnetic] attribute.
 * Moves elements using CSS variables and transform: translate3d.
 */
export function initMagneticHover() {
  const elements = document.querySelectorAll('[data-magnetic]');
  if (elements.length === 0) return;

  const cleanups = [];

  elements.forEach(element => {
    const onMouseMove = (e) => {
      const bound = element.getBoundingClientRect();
      const x = e.clientX - bound.left - (bound.width / 2);
      const y = e.clientY - bound.top - (bound.height / 2);

      // Dampening factor of 0.3 for subtle attraction
      element.style.setProperty('--mx', `${x * 0.3}px`);
      element.style.setProperty('--my', `${y * 0.3}px`);
      element.style.setProperty('will-change', 'transform');
    };

    const onMouseLeave = () => {
      element.style.setProperty('--mx', '0px');
      element.style.setProperty('--my', '0px');

      element.addEventListener('transitionend', () => {
        element.style.setProperty('will-change', 'auto');
      }, { once: true });
    };

    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    cleanups.push(() => {
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
    });
  });

  // Return cleanup function
  return () => {
    cleanups.forEach(cleanup => cleanup());
  };
}
