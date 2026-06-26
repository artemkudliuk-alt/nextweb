import React, { useEffect, useRef, useState } from 'react';

function GlitchChar({ char, revealed, delay = 0, index = 0 }) {
  const [displayChar, setDisplayChar] = useState(char);
  const [isGlitching, setIsGlitching] = useState(false);
  const timerRef = useRef(null);

  const startGlitch = (durationTicks = 3) => {
    if (isGlitching || char === ' ') return;
    setIsGlitching(true);
    
    let count = 0;
    const glitchSymbols = 'ΔX01Ø&@#%?*+=-_';
    
    const tick = () => {
      if (count < durationTicks) {
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

  const handleMouseEnter = () => {
    startGlitch(3);
  };

  useEffect(() => {
    if (revealed && char !== ' ') {
      const baseDelay = delay * 1000;
      const staggerDelay = index * 20; // 20ms staggered delay per letter
      const totalDelay = baseDelay + staggerDelay;

      const timer = setTimeout(() => {
        startGlitch(6); // 6 ticks (360ms) for initial page load to make the loader visible
      }, totalDelay);

      return () => clearTimeout(timer);
    }
  }, [revealed]);

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
          const triggerReveal = () => {
            setRevealed(true);
            observer.unobserve(entry.target);
          };

          const pageWrapper = document.querySelector('.page-wrapper');
          const sectionParent = ref.current?.closest('.page-constructor__section');

          const checkConditions = () => {
            const isPageLoaded = !pageWrapper || !pageWrapper.classList.contains('loading');
            const isSectionActive = !sectionParent || sectionParent.classList.contains('is-active');
            return isPageLoaded && isSectionActive;
          };

          if (!checkConditions()) {
            const mutationObserver = new MutationObserver(() => {
              if (checkConditions()) {
                triggerReveal();
                mutationObserver.disconnect();
              }
            });
            if (pageWrapper) {
              mutationObserver.observe(pageWrapper, { attributes: true, attributeFilter: ['class'] });
            }
            if (sectionParent) {
              mutationObserver.observe(sectionParent, { attributes: true, attributeFilter: ['class'] });
            }
          } else {
            triggerReveal();
          }
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
                  <GlitchChar 
                    key={charIndex} 
                    char={char} 
                    revealed={revealed} 
                    delay={delay + index * 0.15} 
                    index={charIndex} 
                  />
                ))
              : line}
          </span>
        </span>
      ))}
    </span>
  );
}
