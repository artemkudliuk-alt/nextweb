import React, { useState, useEffect } from 'react';

export default function InteractiveVisualCard() {
  const [activeTab, setActiveTab] = useState('wireframe');
  const [radialVal, setRadialVal] = useState(0);

  // Radial animation for the Performance tab when active
  useEffect(() => {
    if (activeTab !== 'performance') {
      setRadialVal(0);
      return;
    }

    let startTimestamp = null;
    const duration = 1200; // 1.2s animation
    const targetVal = 99;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setRadialVal(Math.floor(easeProgress * targetVal));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [activeTab]);

  return (
    <div className="visual-placeholder-card">
      <div className="visual-card-glow" />
      
      {/* Header bar of our mockup browser/dashboard */}
      <div className="visual-card-header-bar">
        <div className="system-dots">
          <span className="system-dot red" />
          <span className="system-dot yellow" />
          <span className="system-dot green" />
        </div>
        <div className="visual-card-tabs">
          <button 
            type="button"
            className={`tab-btn ${activeTab === 'wireframe' ? 'active' : ''}`}
            onClick={() => setActiveTab('wireframe')}
          >
            Structure
          </button>
          <button 
            type="button"
            className={`tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            Metrics
          </button>
          <button 
            type="button"
            className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance')}
          >
            Speed
          </button>
        </div>
      </div>

      {/* Body content based on active tab */}
      <div className="visual-card-body-content">
        {activeTab === 'wireframe' && (
          <div className="tab-panel grid-panel">
            <div className="wireframe-header">
              <span className="wireframe-line sm" />
              <div className="wireframe-nav-lines">
                <span className="wireframe-line sm" />
                <span className="wireframe-line sm" />
                <span className="wireframe-line sm" />
              </div>
            </div>
            <div className="wireframe-hero">
              <div className="wireframe-hero-text">
                <span className="wireframe-line lg" />
                <span className="wireframe-line md" />
                <span className="wireframe-line sm" />
              </div>
              <div className="wireframe-hero-block">
                <div className="wireframe-block-inner" />
              </div>
            </div>
            <div className="wireframe-grid">
              <div className="wireframe-grid-item" />
              <div className="wireframe-grid-item" />
              <div className="wireframe-grid-item" />
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="tab-panel chart-panel">
            <div className="chart-info-row">
              <div>
                <span className="chart-legend">Daily Operations</span>
                <div className="chart-metric">458,924</div>
              </div>
              <span className="chart-legend" style={{ color: '#863bff' }}>+18.4%</span>
            </div>
            
            <div className="chart-svg-container">
              <svg className="chart-svg" viewBox="0 0 400 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#863bff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#863bff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area under chart path */}
                <path 
                  d="M 0 160 L 0 120 Q 80 80 160 110 T 320 40 L 400 20 L 400 160 Z" 
                  fill="url(#chartGlow)"
                />
                {/* Stroke line path */}
                <path 
                  className="chart-path-anim"
                  d="M 0 120 Q 80 80 160 110 T 320 40 L 400 20" 
                  fill="none" 
                  stroke="#863bff" 
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Pulse point at the end */}
                <circle 
                  className="chart-pulse"
                  cx="400" 
                  cy="20" 
                  r="6" 
                  fill="#ffffff" 
                  stroke="#863bff" 
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="tab-panel speed-panel">
            <div className="radial-progress-container">
              <svg className="radial-svg" viewBox="0 0 100 100">
                {/* Track */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="42" 
                  fill="transparent" 
                  stroke="rgba(255,255,255,0.03)" 
                  strokeWidth="6" 
                />
                {/* Dash value circle */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="42" 
                  fill="transparent" 
                  stroke="#863bff" 
                  strokeWidth="6" 
                  strokeDasharray={2 * Math.PI * 42}
                  strokeDashoffset={2 * Math.PI * 42 * (1 - radialVal / 100)}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                />
              </svg>
              <div className="radial-value-wrap">
                <span className="radial-value">{radialVal}</span>
                <span className="radial-label">Vitals</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
