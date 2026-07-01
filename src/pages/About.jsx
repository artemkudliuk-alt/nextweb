import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const timelineData = [
  {
    year: '2009',
    title: 'Основание NEXTWEB',
    description: 'Начали как небольшая команда из 3 человек. Первый офис в Одессе и первый запуск коммерческого проекта.',
    active: true,
  },
  {
    year: '2014',
    title: 'Выход на международный рынок',
    description: 'Разработали первые крупные проекты для клиентов из Европы и США, внедрили Agile и расширили команду до 15 разработчиков.',
    active: false,
  },
  {
    year: '2019',
    title: 'AI & Data Science экспертиза',
    description: 'Запустили направление предиктивной веб-аналитики и машинного обучения, став надежным технологическим партнером enterprise-брендов.',
    active: false,
  },
  {
    year: '2026',
    title: 'Лидерство в premium digital',
    description: 'Более 300 успешно запущенных проектов. Уникальный стек на стыке WebGL, GPU-анимаций и реактивного управления данными.',
    active: false,
  }
];

const valuesData = [
  {
    num: '01',
    title: 'Технологическое превосходство',
    text: 'Никакого устаревшего стека или медленных шаблонов. Пишем чистый JS, используем Vite, оптимизируем GPU-анимации и добиваемся Performance ≥ 95% в Lighthouse.'
  },
  {
    num: '02',
    title: 'Дизайн для людей',
    text: 'Дизайн — это не просто красивая обложка. Это то, как продукт работает. Мы проектируем интерфейсы на основе глубокого UX-анализа и тестирования сценариев.'
  },
  {
    num: '03',
    title: 'Честность и прозрачность',
    text: 'Работаем по гибкой методологии Time & Material или Fixed Price с детальным логированием времени. Вы всегда знаете, над какими задачами трудится команда.'
  }
];

// SVG icons for timeline years
function IconSeed() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M5 3a7 7 0 0 0 14 0" />
      <path d="M9.1 9a3 3 0 1 0 5.82 0" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconBrain() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0v.05A5 5 0 0 1 17 7v1h.5a2.5 2.5 0 0 1 0 5H17v1a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-1h-.5a2.5 2.5 0 0 1 0-5H7V7a5 5 0 0 1 2.5-4.95V2z" />
    </svg>
  );
}

function IconTrophy() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
    </svg>
  );
}

const timelineIcons = [IconSeed, IconGlobe, IconBrain, IconTrophy];

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'О студии NEXTWEB | Премиум веб-разработка';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'NEXTWEB — украинская студия премиум веб-разработки с 2009 года. Более 300 проектов для технологических компаний и брендов по всему миру.');
    }
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
              <span className="current">О компании</span>
            </div>
          </div>
        </div>

        <div className="grid-container">
          {/* Hero Section */}
          <section className="service-hero-section">
            <div className="service-hero-grid">
              <motion.div
                className="service-hero-content"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="cyber-section-label">// О КОМПАНИИ</span>
                <h1 className="service-title">NEXTWEB</h1>
                <div className="price-tag">
                  <span className="price-label">Основано:</span>
                  <span className="price-value">2009 год</span>
                </div>
                <p className="service-intro">
                  Мы проектируем и разрабатываем высоконагруженные веб-системы, премиальные сайты, мобильные интерфейсы и стратегии цифрового маркетинга для лидеров рынка. Наша миссия — создавать программные продукты на стыке искусства и технологий.
                </p>
              </motion.div>

              {/* CSS Morphing Sphere — replaces Three.js AnimatedSphere */}
              <motion.div
                className="about-morph-sphere-wrap"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                <div className="about-morph-sphere" />
                <div className="about-morph-sphere-stat">
                  <div className="stat-value">17+ ЛЕТ</div>
                  <div className="stat-label">Безупречной репутации на IT-рынке</div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Details Section */}
          <motion.section
            className="service-details-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="service-tagline-container">
              <h2 className="service-tagline">Инженерный подход, эстетика минимализма и нацеленность на финансовый результат.</h2>
              <p className="service-characteristics">
                С 2009 года мы помогаем бизнесу находить общий язык с клиентами в цифровой среде. Мы глубоко погружаемся в бизнес-процессы каждого клиента, собираем требования по стандарту C4, строим надежные архитектурные решения и пишем чистый, поддерживаемый код, который летает на мобильных устройствах.
              </p>
            </div>
          </motion.section>

          {/* Timeline Section */}
          <section className="about-timeline-section" style={{ margin: '6rem 0' }}>
            <motion.div
              className="section-header"
              style={{ marginBottom: '3rem' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2>Путь от стартапа до лидера рынка</h2>
            </motion.div>
            <div className="about-timeline" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {timelineData.map((item, idx) => {
                const IconComponent = timelineIcons[idx];
                return (
                  <motion.div
                    key={item.year}
                    className={`timeline-item${item.active ? ' timeline-item--active' : ''}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1], delay: idx * 0.12 }}
                    style={{
                      display: 'flex',
                      gap: '2rem',
                      borderLeft: `2px solid ${item.active ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)'}`,
                      paddingLeft: '2rem',
                      position: 'relative'
                    }}
                  >
                    <span
                      className="timeline-icon"
                      style={{ color: item.active ? 'var(--accent-color)' : 'rgba(255,255,255,0.3)' }}
                    >
                      <IconComponent />
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: item.active ? 'var(--accent-color)' : 'var(--text-secondary)',
                          marginBottom: '0.3rem'
                        }}
                      >
                        {item.year}
                      </div>
                      <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Values Section */}
          <section className="service-structure-section">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2>Принципы, на которых мы строим работу</h2>
              <p className="structure-desc">Мы верим, что долговечные продукты создаются только при бескомпромиссном отношении к качеству кода, дизайна и коммуникации.</p>
            </motion.div>

            <div className="structure-grid">
              {valuesData.map((v, idx) => (
                <motion.div
                  key={v.num}
                  className="structure-card about-values-card"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                >
                  <div className="structure-card-number">{v.num}</div>
                  <h4>{v.title}</h4>
                  <p className="structure-card-text">{v.text}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <motion.section
            className="service-cta-section"
            style={{ marginBottom: '6rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cta-box">
              <div className="cta-glow" />
              <div className="cta-content">
                <h2>Хотите стать частью нашей истории?</h2>
                <p>Напишите нам, чтобы обсудить ваш проект или присоединиться к нашей инженерной команде.</p>
                <div className="cta-actions">
                  <a href="#contact" className="btn-premium"><span>Связаться с нами</span></a>
                  <Link to="/works" className="btn-secondary"><span>Смотреть проекты</span></Link>
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
