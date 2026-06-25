import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const partnersData = [
  {
    name: "Amazon Web Services (AWS)",
    category: "Облачная инфраструктура",
    description: "Развертывание масштабируемых и безопасных веб-приложений, баз данных и систем доставки контента (CDN)."
  },
  {
    name: "Google Cloud Platform",
    category: "Аналитика и AI",
    description: "Интеграция интеллектуальных алгоритмов, машинного обучения и расширенной веб-аналитики GA4."
  },
  {
    name: "Cloudflare",
    category: "Безопасность и DNS",
    description: "Защита сайтов от DDoS атак, ускорение загрузки контента с помощью глобальной сети edge-серверов."
  },
  {
    name: "Figma",
    category: "Дизайн и прототипирование",
    description: "Инструмент для совместного проектирования UX/UI интерфейсов и ведения единой дизайн-системы."
  }
];

export default function Partners() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Партнеры NEXTWEB | Технологический стек";
  }, []);

  return (
    <>
      <div className="service-detail-page">
        {/* Breadcrumbs */}
        <div className="service-breadcrumbs">
          <div className="grid-container">
            <div className="breadcrumbs-inner">
              <Link to="/">Главная</Link>
              <span className="separator">/</span>
              <span className="current">Партнеры</span>
            </div>
          </div>
        </div>

        <div className="grid-container">
          {/* Hero Section */}
          <section className="service-hero-section">
            <div className="service-hero-grid">
              <div className="service-hero-content">
                <span className="cyber-section-label">// ПАРТНЕРСКАЯ ЭКОСИСТЕМА</span>
                <h1 className="service-title">Партнеры</h1>
                <p className="service-intro">
                  Для решения сложных задач мы объединяем усилия с ведущими глобальными технологическими платформами. Это позволяет нам внедрять передовые стандарты безопасности, отказоустойчивости и производительности.
                </p>
              </div>

              <div className="service-visual-block">
                <div className="visual-placeholder-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="visual-card-glow"></div>
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--accent-color)' }}>GLOBAL</div>
                  <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold', marginTop: '0.5rem' }}>ТЕХНОЛОГИЧЕСКИЙ СТЕК</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Интеграции с лидерами индустрии</div>
                </div>
              </div>
            </div>
          </section>

          {/* Partners Grid */}
          <section className="service-structure-section" style={{ marginTop: '2rem' }}>
            <div className="structure-grid">
              {partnersData.map((partner, idx) => (
                <div className="structure-card" key={idx}>
                  <div className="structure-card-number">{(idx + 1).toString().padStart(2, '0')}</div>
                  <span className="cyber-section-label" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>// {partner.category.toUpperCase()}</span>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>{partner.name}</h4>
                  <p className="structure-card-text">{partner.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="service-cta-section" style={{ marginBottom: '6rem', marginTop: '4rem' }}>
            <div className="cta-box">
              <div className="cta-glow"></div>
              <div className="cta-content">
                <h2>Хотите стать нашим технологическим партнером?</h2>
                <p>Напишите нам, чтобы обсудить возможности интеграции и совместных проектов.</p>
                <div className="cta-actions">
                  <a href="#contact" className="btn-premium">
                    <span>Связаться</span>
                  </a>
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
