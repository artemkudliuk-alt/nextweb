import React, { useEffect, useRef, useState } from 'react';

export default function AsciiArrows({ isHovered = false }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [dimensions, setDimensions] = useState({ width: 550, height: 768 });

  const shapeProgressRef = useRef(0);
  const currentOffsetXRef = useRef(0);
  const currentOffsetYRef = useRef(0);

  // Handle resizing to match container size dynamically
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: width || 550,
          height: height || 768,
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let shapeProgress = shapeProgressRef.current;
    let currentOffsetX = currentOffsetXRef.current;
    let currentOffsetY = currentOffsetYRef.current;

    // Math: Point in triangle check using barycentric coordinates
    const isPointInTriangle = (px, py, ax, ay, bx, by, cx, cy) => {
      const v0x = cx - ax;
      const v0y = cy - ay;
      const v1x = bx - ax;
      const v1y = by - ay;
      const v2x = px - ax;
      const v2y = py - ay;

      const dot00 = v0x * v0x + v0y * v0y;
      const dot01 = v0x * v1x + v0y * v1y;
      const dot02 = v0x * v2x + v0y * v2y;
      const dot11 = v1x * v1x + v1y * v1y;
      const dot12 = v1x * v2x + v1y * v2y;

      const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
      const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
      const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

      return u >= 0 && v >= 0 && u + v <= 1;
    };

    // Math: Distance from point to line segment
    const distanceToLineSegment = (px, py, x1, y1, x2, y2) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const lenSq = dx * dx + dy * dy;
      if (lenSq === 0) return Math.hypot(px - x1, py - y1);
      
      let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
      t = Math.max(0, Math.min(1, t));
      return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
    };

    // Math: Distance to triangle boundaries
    const distanceToTriangleBoundary = (px, py, ax, ay, bx, by, cx, cy) => {
      return Math.min(
        distanceToLineSegment(px, py, ax, ay, bx, by),
        distanceToLineSegment(px, py, bx, by, cx, cy),
        distanceToLineSegment(px, py, cx, cy, ax, ay)
      );
    };

    // Define Grid parameters
    const cols = 34;
    const rows = 46;

    // Triangle shapes coordinates (Normalized 0 to 1, scaled up with safe margins for parallax translation)
    // Front Arrow (larger, right - made 15% wider by shifting right tip to x: 0.97)
    const fA = { x: 0.16, y: 0.13 };
    const fB = { x: 0.97, y: 0.50 };
    const fC = { x: 0.16, y: 0.87 };

    // Back Arrow (smaller, left - shifted left to preserve offset and avoid overlap)
    const bA = { x: 0.04, y: 0.18 };
    const bB = { x: 0.62, y: 0.50 };
    const bC = { x: 0.04, y: 0.82 };

    // Initialize cells grid
    const cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const px = c / (cols - 1);
        const py = r / (rows - 1);

        const isInsideFront = isPointInTriangle(px, py, fA.x, fA.y, fB.x, fB.y, fC.x, fC.y);
        const isInsideBack = isPointInTriangle(px, py, bA.x, bA.y, bB.x, bB.y, bC.x, bC.y);

        let isActive = isInsideFront || isInsideBack;
        let dist = 1.0;
        let isFront = isInsideFront;

        if (isInsideFront) {
          dist = distanceToTriangleBoundary(px, py, fA.x, fA.y, fB.x, fB.y, fC.x, fC.y);
        } else if (isInsideBack) {
          dist = distanceToTriangleBoundary(px, py, bA.x, bA.y, bB.x, bB.y, bC.x, bC.y);
        }

        cells.push({
          c,
          r,
          x: px,
          y: py,
          isActive,
          isFront,
          distToBorder: dist,
          char: '-',
          glitchTimer: Math.random() * 10,
        });
      }
    }

    const symbolSet = ['%', '*', '#', '+', ':'];

    const getSymbolForCell = (cell, tick) => {
      // Background cell character
      if (!cell.isActive) {
        return '-';
      }

      // Border cells (close to edge)
      if (cell.distToBorder < 0.035) {
        const idx = Math.floor((cell.distToBorder * 150 + tick * 0.1) % symbolSet.length);
        return symbolSet[idx];
      }

      // Inner cells (fills)
      return '%';
    };

    // Render loop
    const render = () => {
      const { width, height } = dimensions;
      const tick = Date.now();
      const mouse = mouseRef.current;
      const cellW = width / cols;
      const cellH = height / rows;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      const isMobile = window.innerWidth <= 1024;

      // Interpolate shape hover morph progress (slower and smoother transition)
      // On mobile, the arrow shape breathes between 0.70 and 0.86 to feel dynamic without hover
      const targetProgress = isHovered 
        ? 1 
        : (isMobile ? (0.78 + Math.sin(tick * 0.001) * 0.08) : 0);
      shapeProgress += (targetProgress - shapeProgress) * 0.035;

      // Smooth mouse-following parallax offset or automatic organic floating
      let targetOffsetX = 0;
      let targetOffsetY = 0;
      if (mouse.active) {
        const centerX = width / 2;
        const centerY = height / 2;
        targetOffsetX = ((mouse.x - centerX) / centerX) * 22; // Max 22px parallax offset
        targetOffsetY = ((mouse.y - centerY) / centerY) * 22;
      } else {
        // Slow organic orbiting drift when mouse is inactive (essential for mobile background energy)
        targetOffsetX = Math.sin(tick * 0.0006) * 14;
        targetOffsetY = Math.cos(tick * 0.0006) * 14;
      }
      currentOffsetX += (targetOffsetX - currentOffsetX) * 0.04;
      currentOffsetY += (targetOffsetY - currentOffsetY) * 0.04;

      // Create horizontal gradient for active symbols
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#FF1493');  // Magenta
      gradient.addColorStop(0.5, '#A020F0'); // Violet
      gradient.addColorStop(1, '#00D9FF');   // Cyan

      const fontSize = Math.max(5, Math.round(cellW * 0.95));
      ctx.font = `${fontSize}px "Geist Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Periodic scanline glitch (lasts 150ms every 3.5 seconds) on hover or automatically on mobile
      let isGlitching = false;
      let glitchOffsetX = 0;
      let glitchOffsetY = 0;
      const canGlitch = isHovered || isMobile;
      if (canGlitch && shapeProgress > 0.3) {
        const cycle = tick % 3500;
        if (cycle < 150) {
          isGlitching = true;
          glitchOffsetX = (Math.random() - 0.5) * 12;
          glitchOffsetY = (Math.random() - 0.5) * 6;
        }
      }

      cells.forEach((cell) => {
        const baseX = cell.x * width + cellW / 2;
        const baseY = cell.y * height + cellH / 2;

        let drawX = baseX;
        let drawY = baseY;
        let opacity = 0; // Default background character opacity is 0 (fully transparent)
        let char = '-';
        let isGradientColor = false;

        // 1. Mouse Interaction (Warp, light up, and local shape reveal)
        let mouseDist = 999;
        let spotlightFactor = 0;
        const revealRadius = 90; // Spotlight reveal radius (approx 80-90px)

        if (mouse.active) {
          const mx = mouse.x;
          const my = mouse.y;
          const dx = drawX - mx;
          const dy = drawY - my;
          mouseDist = Math.hypot(dx, dy);

          // Warp coordinates away from mouse (maxDist 90px)
          const maxDist = 90;
          if (mouseDist < maxDist) {
            const pushFactor = (1 - mouseDist / maxDist);
            const angle = Math.atan2(dy, dx);
            drawX += Math.cos(angle) * pushFactor * 8;
            drawY += Math.sin(angle) * pushFactor * 8;

            // Faintly light up non-active cells
            if (!cell.isActive) {
              opacity = pushFactor * 0.18;
              if (pushFactor > 0.4 && Math.random() < 0.15) {
                char = symbolSet[Math.floor(Math.random() * symbolSet.length)];
              }
            }
          }

          // Compute spotlight factor for active shape cells
          if (mouseDist < revealRadius) {
            // Smooth cosine falloff
            spotlightFactor = Math.cos((mouseDist / revealRadius) * Math.PI / 2);
          }
        }

        // 2. Shape Morph State (Based on global hover progress)
        const cellProgress = shapeProgress;

        if (cell.isActive) {
          if (cellProgress > 0.01) {
            isGradientColor = true;
            char = getSymbolForCell(cell, tick);

            // Apply smooth mouse-following parallax offset
            drawX += currentOffsetX;
            drawY += currentOffsetY;

            // Apply scanline glitch displacement and character swaps
            if (isGlitching) {
              drawX += glitchOffsetX + Math.sin(cell.y * Math.PI * 6) * 6;
              drawY += glitchOffsetY;
              if (Math.random() < 0.35) {
                char = symbolSet[Math.floor(Math.random() * symbolSet.length)];
              }
            } else {
              // Flicker/Glitch symbol swaps
              if (Math.random() < 0.03) {
                char = symbolSet[Math.floor(Math.random() * symbolSet.length)];
              }
            }

            // Boundary vs Inner Fill styling
            if (cell.distToBorder < 0.035) {
              // Outlines: Bright neon
              opacity = 0.08 + cellProgress * 0.87; // Up to 0.95 opacity
            } else {
              // Fills: Translucent
              opacity = 0.08 + cellProgress * 0.15; // Up to 0.23 opacity
            }
          } else {
            // Outside spotlight: renders as standard background cell (faint white dash)
            char = '-';
            opacity = 0;
            // Also light up background dash slightly if mouse is near
            if (mouseDist < 90) {
              opacity = (1 - mouseDist / 90) * 0.16;
            }
          }
        }

        // Draw character
        ctx.fillStyle = isGradientColor
          ? gradient
          : `rgba(255, 255, 255, ${opacity})`;

        if (isGradientColor) {
          ctx.globalAlpha = opacity;
        } else {
          ctx.globalAlpha = 1.0;
        }

        ctx.fillText(char, drawX, drawY);
      });

      // Reset alpha
      ctx.globalAlpha = 1.0;

      // Save refs
      shapeProgressRef.current = shapeProgress;
      currentOffsetXRef.current = currentOffsetX;
      currentOffsetYRef.current = currentOffsetY;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions, isHovered]);

  // Handle mouse events locally inside container
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000, active: false };
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
