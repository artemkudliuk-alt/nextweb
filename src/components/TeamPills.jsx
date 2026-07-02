import { useRef, useState } from "react";

const initialPills = [
  { id: 1, name: "Веб-разработчик", left: "50%", top: "16%", color: "#3B82F6", driftDelay: "0s" },
  {
    id: 2,
    name: "UI/UX дизайнер",
    left: "88.89%",
    top: "25.95%",
    color: "#FF4D6D",
    driftDelay: "1.5s",
  },
  { id: 3, name: "Бренд-дизайнер", left: "105%", top: "50%", color: "#FFB703", driftDelay: "3s" },
  {
    id: 4,
    name: "Иллюстратор",
    left: "88.89%",
    top: "74.04%",
    color: "#06D6A0",
    driftDelay: "4.5s",
  },
  { id: 5, name: "3D дизайнер", left: "50%", top: "84%", color: "#8338EC", driftDelay: "2s" },
  {
    id: 6,
    name: "Моушн-дизайнер",
    left: "11.1%",
    top: "74.04%",
    color: "#FF7B00",
    driftDelay: "3.5s",
  },
  {
    id: 7,
    name: "Креативный директор",
    left: "-5%",
    top: "50%",
    color: "#EF233C",
    driftDelay: "0.8s",
  },
  {
    id: 8,
    name: "Продуктовый дизайнер",
    left: "11.1%",
    top: "25.95%",
    color: "#FB6F92",
    driftDelay: "2.5s",
  },
];

export default function TeamPills() {
  const [pills, setPills] = useState(initialPills);
  const [dragState, setDragState] = useState({
    id: null,
    startX: 0,
    startY: 0,
    origLeft: 0,
    origTop: 0,
  });
  const containerRef = useRef(null);

  const handleMouseDown = (e, pill) => {
    if (!containerRef.current) return;

    // Disable default drag behaviours
    e.preventDefault();

    const pillElement = e.currentTarget;

    // Parse current left and top as percentages or pixels
    const style = window.getComputedStyle(pillElement);
    const leftPx = parseFloat(style.left);
    const topPx = parseFloat(style.top);

    setDragState({
      id: pill.id,
      startX: e.clientX,
      startY: e.clientY,
      origLeft: leftPx,
      origTop: topPx,
    });
  };

  const handleMouseMove = (e) => {
    if (dragState.id === null || !containerRef.current) return;

    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;

    const rect = containerRef.current.getBoundingClientRect();
    const newLeftPx = dragState.origLeft + dx;
    const newTopPx = dragState.origTop + dy;

    // Convert back to percentages
    const newLeftPct = `${(newLeftPx / rect.width) * 100}%`;
    const newTopPct = `${(newTopPx / rect.height) * 100}%`;

    setPills((prev) =>
      prev.map((p) => {
        if (p.id === dragState.id) {
          return { ...p, left: newLeftPct, top: newTopPct };
        }
        return p;
      }),
    );
  };

  const handleMouseUp = () => {
    setDragState({ id: null, startX: 0, startY: 0, origLeft: 0, origTop: 0 });
  };

  // Add styles dynamically for drift animation
  const styleTag = (
    <style>
      {`
        .drifting-pill {
          animation: floatAnimation 6s ease-in-out infinite alternate;
        }
        @keyframes floatAnimation {
          0% {
            transform: translate(-50%, -50%) translate(0, 0);
          }
          50% {
            transform: translate(-50%, -50%) translate(8px, -12px);
          }
          100% {
            transform: translate(-50%, -50%) translate(-6px, 10px);
          }
        }
      `}
    </style>
  );

  return (
    <div
      className="container dedicated-oval"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {styleTag}

      <h2 className="heading">
        Выделенная команда, <br />
        полностью интегрированная
      </h2>

      <div className="pills">
        {pills.map((pill) => {
          const isDragging = dragState.id === pill.id;
          return (
            <div
              key={pill.id}
              className={`pill ${isDragging ? "" : "drifting-pill"}`}
              style={{
                left: pill.left,
                top: pill.top,
                backgroundColor: pill.color,
                color: "#000000",
                transform: isDragging ? "translate(-50%, -50%) scale(1.05)" : undefined,
                animationDelay: pill.driftDelay,
                cursor: isDragging ? "grabbing" : "grab",
                zIndex: isDragging ? 10 : 2,
                transition: isDragging ? "none" : "background-color 0.3s, transform 0.2s",
                boxShadow: isDragging ? "0 15px 35px rgba(0,0,0,0.8)" : undefined,
              }}
              onMouseDown={(e) => handleMouseDown(e, pill)}
            >
              {pill.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
