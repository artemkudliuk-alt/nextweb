import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../utils/servicesData';
import Footer from '../components/Footer';

function LogoIcon({ className }) {
  return (
    <svg className={className} width="20" height="24" viewBox="0 0 59 69" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M46.9196 8.97917V43.3423L0 0V68.909L11.3885 59.9291V26.8483L58.3057 68.9081V0L46.9178 8.97999L46.9196 8.97917Z" fill="currentColor" />
    </svg>
  );
}

function InteractiveVisualCard() {
  const [activeTab, setActiveTab] = useState('grid');
  const [speedProgress, setSpeedProgress] = useState(0);

  useEffect(() => {
    if (activeTab === 'speed') {
      setSpeedProgress(0);
      const timer = setTimeout(() => {
        setSpeedProgress(99);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  return (
    <div className="visual-placeholder-card">
      <div className="visual-card-glow"></div>
      <div className="visual-card-header-bar">
        <div className="system-dots">
          <span className="system-dot red"></span>
          <span className="system-dot yellow"></span>
          <span className="system-dot green"></span>
        </div>
        <div className="visual-card-tabs">
          <button 
            className={`tab-btn ${activeTab === 'grid' ? 'active' : ''}`}
            onClick={() => setActiveTab('grid')}
          >
            Сетка
          </button>
          <button 
            className={`tab-btn ${activeTab === 'chart' ? 'active' : ''}`}
            onClick={() => setActiveTab('chart')}
          >
            Конверсии
          </button>
          <button 
            className={`tab-btn ${activeTab === 'speed' ? 'active' : ''}`}
            onClick={() => setActiveTab('speed')}
          >
            Скорость
          </button>
        </div>
      </div>
      
      <div className="visual-card-body-content">
        {activeTab === 'grid' && (
          <div className="tab-panel grid-panel">
            <div className="wireframe-header">
              <LogoIcon className="wireframe-logo" />
              <div className="wireframe-nav-lines">
                <span className="wireframe-line sm"></span>
                <span className="wireframe-line sm"></span>
                <span className="wireframe-line sm"></span>
              </div>
            </div>
            <div className="wireframe-hero">
              <div className="wireframe-hero-text">
                <span className="wireframe-line lg"></span>
                <span className="wireframe-line md"></span>
                <span className="wireframe-line md"></span>
              </div>
              <div className="wireframe-hero-block">
                <span className="wireframe-block-inner"></span>
              </div>
            </div>
            <div className="wireframe-grid">
              <div className="wireframe-grid-item"></div>
              <div className="wireframe-grid-item"></div>
              <div className="wireframe-grid-item"></div>
            </div>
          </div>
        )}

        {activeTab === 'chart' && (
          <div className="tab-panel chart-panel">
            <div className="chart-info-row">
              <span className="chart-metric">CR +14.2%</span>
              <span className="chart-legend">Конверсия в лид</span>
            </div>
            <div className="chart-svg-container">
              <svg className="chart-svg" viewBox="0 0 200 100" fill="none">
                <path 
                  d="M10 80 Q 40 70 70 45 T 130 55 T 190 20" 
                  stroke="var(--accent-color)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  className="chart-path-anim"
                />
                <path 
                  d="M10 80 Q 40 70 70 45 T 130 55 T 190 20 L 190 100 L 10 100 Z" 
                  fill="url(#chart-gradient)"
                  opacity="0.1"
                />
                <circle cx="190" cy="20" r="5" fill="var(--accent-color)" className="chart-pulse" />
                <defs>
                  <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-color)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'speed' && (
          <div className="tab-panel speed-panel">
            <div className="radial-progress-container">
              <svg className="radial-svg" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  stroke="rgba(255,255,255,0.03)" 
                  strokeWidth="8" 
                  fill="none" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  stroke="url(#speed-gradient)" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * speedProgress) / 100}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
                <defs>
                  <linearGradient id="speed-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00d9ff" />
                    <stop offset="100%" stopColor="var(--accent-color)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="radial-value-wrap">
                <span className="radial-value">{speedProgress}</span>
                <span className="radial-label">Performance</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <>
        <div className="service-detail-page not-found" style={{ padding: '12rem 0 8rem', textAlign: 'center' }}>
          <div className="grid-container">
            <span className="cyber-section-label">// ОШИБКА 404</span>
            <h1 style={{ marginTop: '1.5rem', marginBottom: '1.5rem', fontSize: '3rem', fontWeight: '800' }}>Услуга не найдена</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              Вы перешли на страницу услуги, которая еще находится в разработке или не существует.
            </p>
            <Link to="/" className="btn-premium" style={{ display: 'inline-flex' }}>
              <span>Вернуться на главную</span>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Handle document title updates for SEO
  useEffect(() => {
    if (service) {
      document.title = service.metaTitle || `${service.title} — NextWeb`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', service.metaDescription || '');
      }
    }
  }, [service]);

  return (
    <>
      <div className="service-detail-page">
        {/* Breadcrumbs */}
        <div className="service-breadcrumbs">
          <div className="grid-container">
            <div className="breadcrumbs-inner">
              <Link to="/">Главная</Link>
              <span className="separator">/</span>
              <span className="category-label">{service.category}</span>
              <span className="separator">/</span>
              <span className="current">{service.title}</span>
            </div>
          </div>
        </div>

        <div className="grid-container">
          {/* Service Hero Section */}
          <section className="service-hero-section">
            <div className="service-hero-grid">
              <div className="service-hero-content">
                <span className="cyber-section-label">// {service.category.toUpperCase()}</span>
                <h1 className="service-title">{service.title}</h1>
                <div className="price-tag">
                  <span className="price-label">Стоимость:</span>
                  <span className="price-value">{service.price}</span>
                </div>
                <p className="service-intro">{service.intro}</p>
              </div>
              
              {/* Visual Block / Media Placeholder */}
              <div className="service-visual-block">
                <InteractiveVisualCard />
              </div>
            </div>
          </section>

          {/* Detailed Copy Section */}
          <section className="service-details-section">
            <div className="service-tagline-container">
              <h2 className="service-tagline">{service.tagline}</h2>
              <p className="service-characteristics">{service.characteristics}</p>
            </div>
          </section>

          {/* Structure explorer section */}
          {service.structureItems && (
            <section className="service-structure-section">
              <div className="section-header">
                <span className="cyber-section-label">// СТРУКТУРА РЕШЕНИЯ</span>
                <h2>{service.structureTitle}</h2>
                <p className="structure-desc">{service.structureText}</p>
              </div>
              
              <div className="structure-grid">
                {service.structureItems.map((item, index) => (
                  <div className="structure-card" key={index}>
                    <div className="structure-card-number">{ (index + 1).toString().padStart(2, '0') }</div>
                    <p className="structure-card-text">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Advantages & Bonuses Grid */}
          <section className="service-benefits-section">
            <div className="benefits-grid">
              {/* Advantages block */}
              <div className="benefit-col">
                <span className="cyber-section-label">// ПРЕИМУЩЕСТВА NEXTWEB</span>
                <h3>{service.advantagesTitle}</h3>
                <p className="benefit-p">{service.advantagesText}</p>
                <p className="benefit-p highlight">{service.whyUsText}</p>
              </div>

              {/* Bonuses block */}
              {service.bonuses && (
                <div className="benefit-col">
                  <span className="cyber-section-label">// БОНУСНЫЙ ПАКЕТ</span>
                  <h3>{service.bonusesTitle}</h3>
                  <ul className="bonuses-list">
                    {service.bonuses.map((bonus, index) => (
                      <li key={index} className="bonus-item">
                        <span className="bonus-bullet">✦</span>
                        <span className="bonus-text">{bonus}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Premium Call to Action */}
          <section className="service-cta-section">
            <div className="cta-box">
              <div className="cta-glow"></div>
              <div className="cta-content">
                <h2>Готовы запустить свой {service.title}?</h2>
                <p>Заполните бриф, чтобы мы могли рассчитать точные сроки и стоимость вашего проекта.</p>
                <div className="cta-actions">
                  <a href="#contact" className="btn-premium">
                    <span>Заполнить бриф</span>
                  </a>
                  <Link to="/works" className="btn-secondary">
                    <span>Посмотреть работы</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
