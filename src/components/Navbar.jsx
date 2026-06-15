import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

export default function Navbar({ onPlayClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled threshold
      if (currentScrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle anchor navigation from other pages
  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for page load, then scroll
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${hidden ? 'hidden' : ''} ${scrolled ? 'scrolled' : ''}`}>
        <div className="grid-container">
          <div className="navbar-inner">
            {/* Left Nav links */}
            <div className="navbar-left">
              <a href="#whyus" className="nav-link active" onClick={(e) => handleNavClick(e, '#whyus')}>О нас</a>
              <a href="#approach" className="nav-link" onClick={(e) => handleNavClick(e, '#approach')}>Услуги</a>
              <Link to="/works" className="nav-link" onClick={() => setMenuOpen(false)}>Портфолио</Link>
              <a href="#pricing" className="nav-link" onClick={(e) => handleNavClick(e, '#pricing')}>Контакты</a>
            </div>
 
            {/* Mobile menu button */}
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <span>{menuOpen ? 'Закрыть' : 'Меню'}</span>
              <div className="btn-arrow-clip" style={{ width: '13px', height: '13px', display: 'inline-block' }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: menuOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }}>
                  <path d="M10.0208 3.41421L1.41421 12.0208L0 10.6066L8.60659 2H1.02082V0H12.0208V11H10.0208V3.41421Z" fill="white"></path>
                </svg>
              </div>
            </button>
 
            {/* Center Logo */}
            <Link to="/" className="nav-logo-link" aria-label="Home" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span className="nav-logo-stack">
                <img src="/Nextweb_logo.svg" alt="NEXTWEB" className="nav-logo-text" />
                <img src="/NEXTWEB_background_mark.png" alt="NEXTWEB Mark" className="nav-logo-hover-icon" />
              </span>
            </Link>
 
            {/* Right button */}
            <div className="navbar-right">
              <Button text="НАЧАТЬ ПРОЕКТ" href="https://cal.com/verteal/15min" target="_blank" rel="noopener noreferrer" variant="light" />
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Logo Icon (Arrows) when scrolled */}
      <Link 
        to="/" 
        className={`scroll-fixed-icon ${scrolled && !menuOpen ? 'visible' : ''}`} 
        onClick={(e) => {
          e.preventDefault();
          setMenuOpen(false);
          if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
              if (onPlayClick) onPlayClick();
            }, 150);
          } else {
            if (onPlayClick) onPlayClick();
          }
        }}
        style={{
          position: 'fixed',
          top: '12px',
          zIndex: 101,
          opacity: scrolled && !menuOpen ? 1 : 0,
          transform: scrolled && !menuOpen ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.3s, transform 0.3s',
          pointerEvents: scrolled && !menuOpen ? 'auto' : 'none',
          display: 'flex',
          alignItems: 'center'
        }}
        aria-label="Home"
      >
        <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nav-video-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF1493" />
              <stop offset="50%" stopColor="#A020F0" />
              <stop offset="100%" stopColor="#00D9FF" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="44" stroke="url(#nav-video-gradient)" strokeWidth="4" fill="url(#nav-video-gradient)" fillOpacity="0.15" />
          <path d="M42 35 L70 50 L42 65 Z" fill="url(#nav-video-gradient)" stroke="url(#nav-video-gradient)" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* Floating Button when scrolled */}
      <div 
        className={`scroll-fixed-button ${scrolled && !menuOpen ? 'visible' : ''}`} 
        style={{
          position: 'fixed',
          top: '12px',
          zIndex: 101,
          opacity: scrolled && !menuOpen ? 1 : 0,
          transform: scrolled && !menuOpen ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.3s, transform 0.3s',
          pointerEvents: scrolled && !menuOpen ? 'auto' : 'none'
        }}
      >
        <Button text="НАЧАТЬ ПРОЕКТ" href="https://cal.com/verteal/15min" target="_blank" rel="noopener noreferrer" variant="light" />
      </div>

      {/* Full screen mobile menu drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 2rem',
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? 'visible' : 'hidden',
        transition: 'opacity 0.4s ease, visibility 0.4s'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '2rem', fontWeight: '500' }}>
          <a href="#whyus" onClick={(e) => handleNavClick(e, '#whyus')} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>О нас</a>
          <a href="#approach" onClick={(e) => handleNavClick(e, '#approach')} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Услуги</a>
          <Link to="/works" onClick={() => setMenuOpen(false)} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Портфолио</Link>
          <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Контакты</a>
        </div>
        <div style={{ marginTop: '4rem' }}>
          <Button text="НАЧАТЬ ПРОЕКТ" href="https://cal.com/verteal/15min" target="_blank" rel="noopener noreferrer" variant="light" />
        </div>
      </div>
    </>
  );
}
