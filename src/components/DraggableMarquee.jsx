import { useEffect, useRef, useState } from "react";

const logos = [
  "/marquee/databerry.webp",
  "/marquee/freu.webp",
  "/marquee/limrun.webp",
  "/marquee/rivermarkets.webp",
  "/marquee/rixx.webp",
  "/marquee/unabyss.webp",
  "/marquee/yansu.webp",
];

export default function DraggableMarquee() {
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const currentX = useRef(0);
  const animationFrameId = useRef(null);

  // Triple the logos list to make sure we always have enough items for infinite scroll
  const items = [...logos, ...logos, ...logos, ...logos];

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const autoScrollSpeed = -0.8; // pixels per frame

    const update = () => {

      if (!isDragging) {
        // Apply velocity decay
        if (Math.abs(velocity.current) > 0.05) {
          currentX.current += velocity.current;
          velocity.current *= 0.95; // friction
        } else {
          // Normal auto scroll
          currentX.current += autoScrollSpeed;
        }

        // Loop boundaries
        const singleWidth = list.scrollWidth / 4;
        if (currentX.current <= -singleWidth * 2) {
          currentX.current += singleWidth;
        } else if (currentX.current >= 0) {
          currentX.current -= singleWidth;
        }

        list.style.transform = `translate3d(${currentX.current}px, 0, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(update);
    };

    animationFrameId.current = requestAnimationFrame(update);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.pageX;
    scrollLeft.current = currentX.current;
    velocity.current = 0;
    lastX.current = e.pageX;
    lastTime.current = performance.now();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const x = e.pageX;
    const time = performance.now();
    const dt = time - lastTime.current;

    const dx = x - startX.current;
    currentX.current = scrollLeft.current + dx;

    // Calculate velocity (pixels per millisecond -> scaled)
    if (dt > 0) {
      velocity.current = ((x - lastX.current) / dt) * 16.66; // Normalized to ~60fps frame time
    }

    lastX.current = x;
    lastTime.current = time;

    // Loop boundary check while dragging
    const list = listRef.current;
    if (list) {
      const singleWidth = list.scrollWidth / 4;
      if (currentX.current <= -singleWidth * 2) {
        currentX.current += singleWidth;
        scrollLeft.current += singleWidth;
        startX.current = x; // Reset anchor
      } else if (currentX.current >= 0) {
        currentX.current -= singleWidth;
        scrollLeft.current -= singleWidth;
        startX.current = x; // Reset anchor
      }
      list.style.transform = `translate3d(${currentX.current}px, 0, 0)`;
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="draggable-marquee"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      <div
        className="draggable-marquee-list"
        ref={listRef}
        style={{
          display: "flex",
          gap: "4rem",
          userSelect: "none",
          willChange: "transform",
        }}
      >
        {items.map((logo, index) => (
          <div key={index} className="draggable-marquee-item">
            <img src={logo} alt="client logo" draggable="false" />
          </div>
        ))}
      </div>
    </div>
  );
}
