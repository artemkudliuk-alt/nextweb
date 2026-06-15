import React, { useEffect, useRef, useState } from 'react';

function GlitchChar({ char }) {
  const [displayChar, setDisplayChar] = useState(char);
  const [isGlitching, setIsGlitching] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    if (isGlitching || char === ' ') return;
    setIsGlitching(true);
    
    let count = 0;
    const glitchSymbols = 'ΔX01Ø&@#%?*+=-_';
    
    const tick = () => {
      if (count < 3) {
        const randomChar = glitchSymbols[Math.floor(Math.random() * glitchSymbols.length)];
        setDisplayChar(randomChar);
        count++;
        timerRef.current = setTimeout(tick, 60);
      } else {
        setDisplayChar(char);
        setIsGlitching(false);
      }
    };
    tick();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (char === ' ') {
    return <span className="glitch-space">&nbsp;</span>;
  }

  return (
    <span 
      className="glitch-letter-wrap"
      onMouseEnter={handleMouseEnter}
      style={{
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'bottom'
      }}
    >
      <span style={{ visibility: 'hidden' }}>{char}</span>
      <span 
        className={`glitch-letter ${isGlitching ? 'glitching' : ''}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        {displayChar}
      </span>
    </span>
  );
}

export default function TextReveal({ text, className = '', delay = 0, glitch = false }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const lines = typeof text === 'string' ? text.split('\n') : [text];

  return (
    <span ref={ref} className={`text-reveal-container ${className}`}>
      {lines.map((line, index) => (
        <span key={index} className="text-reveal-line" style={{ display: 'block' }}>
          <span
            className={`text-reveal-inner ${revealed ? 'revealed' : ''}`}
            style={{
              transitionDelay: `${delay + index * 0.15}s`,
            }}
          >
            {glitch && typeof line === 'string'
              ? line.split('').map((char, charIndex) => (
                  <GlitchChar key={charIndex} char={char} />
                ))
              : line}
          </span>
        </span>
      ))}
    </span>
  );
}
