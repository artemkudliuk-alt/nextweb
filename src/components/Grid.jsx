import React from 'react';

export default function Grid({ children, cols = 8, className = '' }) {
  const bars = Array.from({ length: cols }, (_, i) => <div key={i} />);
  
  return (
    <div className={`grid-layout ${className}`} style={{ '--cols': cols }}>
      <div className="grid-bars" aria-hidden="true">
        {bars}
      </div>
      <div className="grid-content">
        {children}
      </div>
    </div>
  );
}
