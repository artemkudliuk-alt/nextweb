import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const partnersData = [
  {
    name: 'Amazon Web Services (AWS)',
    category: 'Облачная инфраструктура',
    description: 'Развертывание масштабируемых и безопасных веб-приложений, баз данных и систем доставки контента (CDN).',
    iconType: 'cloud',
  },
  {
    name: 'Google Cloud Platform',
    category: 'Аналитика и AI',
    description: 'Интеграция интеллектуальных алгоритмов, машинного обучения и расширенной веб-аналитики GA4.',
    iconType: 'brain',
  },
  {
    name: 'Cloudflare',
    category: 'Безопасность и DNS',
    description: 'Защита сайтов от DDoS атак, ускорение загрузки контента с помощью глобальной сети edge-серверов.',
    iconType: 'shield',
  },
  {
    name: 'Figma',
    category: 'Дизайн и прототипирование',
    description: 'Инструмент для совместного проектирования UX/UI интерфейсов и ведения единой дизайн-системы.',
    iconType: 'figma',
  }
];

function PartnerIcon({ type }) {
  const props = { width: 32, height: 32, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', style: { color: 'var(--accent-color)', opacity: 0.8, marginBottom: '0.75rem' } };

  if (type === 'cloud') {
    return (
      <svg {...props}>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    );
  }
  if (type === 'brain') {
    return (
      <svg {...props}>
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      </svg>
    );
  }
  if (type === 'shield') {
    return (
      <svg {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  // figma
  return (
    <svg {...props}>
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  );
}

export default function Partners() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Партнеры NEXTWEB | Технологический стек';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Технологические партнеры студии NEXTWEB: AWS, Google Cloud, Cloudflare, Figma и другие лидеры индустрии.');
    }
  }, []);

  return (
    <>
      <div className="service-detail-page">
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
          {/* Hero */}
          <section className="service-hero-section">
            <div className="service-hero-grid">
              <motion.div
                className="service-hero-content"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="cyber-section-label">// ПАРТНЕРСКАЯ ЭКОСИСТЕМА</span>
                <h1 className="service-title">Партнеры</h1>
                <p className="service-intro">
                  Для решения сложных задач мы объединяем усилия с ведущими глобальными технологическими платформами. Это позволяет нам внедрять передовые стандарты безопасности, отказоустойчивости и производительности.
                </p>
              </motion.div>

              <motion.div
                className="service-visual-block"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              >
                <div className="visual-placeholder-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="visual-card-glow" />
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--accent-color)', fontFamily: 'var(--font-sans), sans-serif' }}>GLOBAL</div>
                  <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold', marginTop: '0.5rem' }}>ТЕХНОЛОГИЧЕСКИЙ СТЕК</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Интеграции с лидерами индустрии</div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Partners Grid */}
          <section className="service-structure-section" style={{ marginTop: '2rem' }}>
            <div className="structure-grid">
              {partnersData.map((partner, idx) => (
                <motion.div
                  key={idx}
                  className="structure-card"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                >
                  <PartnerIcon type={partner.iconType} />
                  <div className="structure-card-number">{(idx + 1).toString().padStart(2, '0')}</div>
                  <span className="cyber-section-label" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>// {partner.category.toUpperCase()}</span>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>{partner.name}</h4>
                  <p className="structure-card-text">{partner.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <motion.section
            className="service-cta-section"
            style={{ marginBottom: '6rem', marginTop: '4rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cta-box">
              <div className="cta-glow" />
              <div className="cta-content">
                <h2>Хотите стать нашим технологическим партнером?</h2>
                <p>Напишите нам, чтобы обсудить возможности интеграции и совместных проектов.</p>
                <div className="cta-actions">
                  <a href="#contact" className="btn-premium"><span>Связаться</span></a>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
}
