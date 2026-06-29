import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedSphere() {
  return (
    <Sphere args={[1, 100, 200]} scale={1.6}>
      <MeshDistortMaterial
        color="#a020f0"
        attach="material"
        distort={0.45}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  );
}

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "О студии NEXTWEB | Премиум веб-разработка";

    // GSAP Timeline Scroll Animations
    gsap.fromTo('.timeline-item', 
      { opacity: 0, y: 50 }, 
      {
        opacity: 1,
        y: 0,
        stagger: 0.25,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-timeline',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
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
              <div className="service-hero-content">
                <span className="cyber-section-label">// О КОМПАНИИ</span>
                <h1 className="service-title">NEXTWEB</h1>
                <div className="price-tag">
                  <span className="price-label">Основано:</span>
                  <span className="price-value">2009 год</span>
                </div>
                <p className="service-intro">
                  Мы проектируем и разрабатываем высоконагруженные веб-системы, премиальные сайты, мобильные интерфейсы и стратегии цифрового маркетинга для лидеров рынка. Наша миссия — создавать программные продукты на стыке искусства и технологий.
                </p>
              </div>

              <div className="service-visual-block" style={{ minHeight: '350px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[3, 5, 2]} intensity={1.8} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  <AnimatedSphere />
                </Canvas>
                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 10 }}>
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--accent-color)', lineHeight: 1 }}>17+ ЛЕТ</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>БЕЗУПРЕЧНОЙ РЕПУТАЦИИ НА IT-РЫНКЕ</div>
                </div>
              </div>
            </div>
          </section>

          {/* Details Section */}
          <section className="service-details-section">
            <div className="service-tagline-container">
              <h2 className="service-tagline">Инженерный подход, эстетика минимализма и нацеленность на финансовый результат.</h2>
              <p className="service-characteristics">
                С 2009 года мы помогаем бизнесу находить общий язык с клиентами в цифровой среде. Мы глубоко погружаемся в бизнес-процессы каждого клиента, собираем требования по стандарту C4, строим надежные архитектурные решения и пишем чистый, поддерживаемый код, который летает на мобильных устройствах.
              </p>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="about-timeline-section" style={{ margin: '6rem 0' }}>
            <div className="section-header" style={{ marginBottom: '3rem' }}>
              <span className="cyber-section-label">// ИСТОРИЯ СТУДИИ</span>
              <h2>Путь от стартапа до лидера рынка</h2>
            </div>
            <div className="about-timeline" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="timeline-item" style={{ display: 'flex', gap: '2rem', borderLeft: '2px solid var(--accent-color)', paddingLeft: '2rem', position: 'relative' }}>
                <div className="timeline-year" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)', minWidth: '70px' }}>2009</div>
                <div className="timeline-content-box">
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Основание NEXTWEB</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>Начали как небольшая команда из 3 человек. Первый офис в Одессе и первый запуск коммерческого проекта.</p>
                </div>
              </div>
              <div className="timeline-item" style={{ display: 'flex', gap: '2rem', borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '2rem', position: 'relative' }}>
                <div className="timeline-year" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-secondary)', minWidth: '70px' }}>2014</div>
                <div className="timeline-content-box">
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Выход на международный рынок</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>Разработали первые крупные проекты для клиентов из Европы и США, внедрили Agile и расширили команду до 15 разработчиков.</p>
                </div>
              </div>
              <div className="timeline-item" style={{ display: 'flex', gap: '2rem', borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '2rem', position: 'relative' }}>
                <div className="timeline-year" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-secondary)', minWidth: '70px' }}>2019</div>
                <div className="timeline-content-box">
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>AI & Data Science экспертиза</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>Запустили направление предиктивной веб-аналитики и машинного обучения, став надежным технологическим партнером enterprise-брендов.</p>
                </div>
              </div>
              <div className="timeline-item" style={{ display: 'flex', gap: '2rem', borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '2rem', position: 'relative' }}>
                <div className="timeline-year" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-secondary)', minWidth: '70px' }}>2026</div>
                <div className="timeline-content-box">
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Лидерство в premium digital</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>Более 300 успешно запущенных проектов. Уникальный стек на стыке WebGL, GPU-анимаций и реактивного управления данными.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="service-structure-section">
            <div className="section-header">
              <span className="cyber-section-label">// НАШИ ЦЕННОСТИ</span>
              <h2>Принципы, на которых мы строим работу</h2>
              <p className="structure-desc">Мы верим, что долговечные продукты создаются только при бескомпромиссном отношении к качеству кода, дизайна и коммуникации.</p>
            </div>
            
            <div className="structure-grid">
              <div className="structure-card">
                <div className="structure-card-number">01</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#fff' }}>Технологическое превосходство</h4>
                <p className="structure-card-text">Никакого устаревшего стека или медленных шаблонов. Пишем чистый JS, используем Vite, оптимизируем GPU-анимации и добиваемся Performance &ge; 95% в Lighthouse.</p>
              </div>
              <div className="structure-card">
                <div className="structure-card-number">02</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#fff' }}>Дизайн для людей</h4>
                <p className="structure-card-text">Дизайн — это не просто красивая обложка. Это то, как продукт работает. Мы проектируем интерфейсы на основе глубокого UX-анализа и тестирования сценариев.</p>
              </div>
              <div className="structure-card">
                <div className="structure-card-number">03</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#fff' }}>Честность и прозрачность</h4>
                <p className="structure-card-text">Работаем по гибкой методологии Time & Material или Fixed Price с детальным логированием времени. Вы всегда знаете, над какими задачами трудится команда.</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="service-cta-section" style={{ marginBottom: '6rem' }}>
            <div className="cta-box">
              <div className="cta-glow"></div>
              <div className="cta-content">
                <h2>Хотите стать частью нашей истории?</h2>
                <p>Напишите нам, чтобы обсудить ваш проект или присоединиться к нашей инженерной команде.</p>
                <div className="cta-actions">
                  <a href="#contact" className="btn-premium">
                    <span>Связаться с нами</span>
                  </a>
                  <Link to="/works" className="btn-secondary">
                    <span>Смотреть проекты</span>
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
