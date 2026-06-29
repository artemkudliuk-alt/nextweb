import { useEffect, useRef, useState } from "react";

export default function Preloader({ onComplete }) {
  const [hidden, setHidden] = useState(false);
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Animate counter 0 → 100 over 1800ms
    const duration = 1800;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const timer = setTimeout(() => {
      setHidden(true);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (onComplete) onComplete();
    }, 2200);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div className={`preloader ${hidden ? "hidden" : ""}`}>
      {/* Center: arrows + logo stacked tight */}
      <div className="preloader-center">
        <div className="preloader-logo-wrap">
          <div className="preloader-logo-dark"></div>
          <div className="preloader-logo-white"></div>
        </div>
        <div className="preloader-brand">
          <img src="/Nextweb_logo.svg" alt="NEXTWEB" />
        </div>
      </div>

      {/* Bottom row: counter only */}
      <div className="preloader-bottom">
        <span ref={counterRef} className="preloader-counter">
          {String(count).padStart(2, "0")}
        </span>
      </div>

      {/* Thin progress line */}
      <div className="preloader-progress">
        <div className="preloader-progress-bar" style={{ width: `${count}%` }} />
      </div>
    </div>
  );
}
