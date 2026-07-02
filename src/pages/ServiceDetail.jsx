import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../utils/servicesData';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCalculator from '../components/ServiceCalculator';
import { useTrail, animated } from '@react-spring/web';

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'speed') {
      setSpeedProgress(0);
    }
  };

  useEffect(() => {
    if (activeTab === 'speed') {
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
            onClick={() => handleTabChange('grid')}
          >
            Сетка
          </button>
          <button 
            className={`tab-btn ${activeTab === 'chart' ? 'active' : ''}`}
            onClick={() => handleTabChange('chart')}
          >
            Конверсии
          </button>
          <button 
            className={`tab-btn ${activeTab === 'speed' ? 'active' : ''}`}
            onClick={() => handleTabChange('speed')}
          >
            Скорость
          </button>
        </div>
      </div>
      
      <div className="visual-card-body-content" style={{ overflow: 'hidden', position: 'relative', height: '240px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'grid' && (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="tab-panel grid-panel"
            >
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
            </motion.div>
          )}

          {activeTab === 'chart' && (
            <motion.div 
              key="chart"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="tab-panel chart-panel"
            >
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
            </motion.div>
          )}

          {activeTab === 'speed' && (
            <motion.div 
              key="speed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="tab-panel speed-panel"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BespokeCardService() {
  const [activeApproach, setActiveApproach] = useState('positioning');
  const [activeCase, setActiveCase] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Разработка сайта-визитки под ключ | NEXTWEB";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Делаем премиальные сайты-визитки, которые создают сильный образ бренда, доносят преимущества и вызывают желание купить.');
    }
  }, []);

  const cases = [
    {
      title: "Digitale",
      subtitle: "Сайт для бизнес-конференции",
      desc: "Рассказали о событии, спикерах и участниках конференции. Повысили узнаваемость сайта и бренда. Улучшили сервис с помощью разработки.",
      video: "/websites.mp4",
      link: "/case/all/digitale"
    },
    {
      title: "The Voice",
      subtitle: "Сайт на Tilda для бренда премиальных акустических систем",
      desc: "Сделали главную страницу и еще три посадочных — для каждой колонки бренда. Премиальность продукта показали с помощью дизайна.",
      video: "/cardetailed.mp4",
      link: "/case/all/voice"
    }
  ];

  return (
    <div className="card-bespoke">
      {/* 1. Hero Jumbotron Section */}
      <section className="jumbotron-video-aurora">
        {/* Aurora is global via App.jsx */}

        <div className="grid-container jumbotron-container">
          <div className="jumbotron-text-content">
            <span className="cyber-section-label">// РАЗРАБОТКА САЙТА-ВИЗИТКИ</span>
            <h1 className="jumbotron-video-aurora__title">
              Разрабатываем сайты, которые создают сильный образ бренда
            </h1>
            <h4 className="jumbotron-video-aurora__subtitle">
              И дают высокую конверсию в продажи
            </h4>
            <div className="jumbotron-actions">
              <a href="#contact" className="btn-premium">
                <span>Оставить заявку</span>
              </a>
            </div>
          </div>

          <div className="jumbotron-video-aurora_blok">
            <div className="device-frame-macbook">
              <video 
                src="/cardetailed.mp4" 
                poster="/_sa/img/storage__AndTNWYK9X0q8jK1uKSkDrOF4PAEKyfO91k2aqI5.webp"
                muted 
                playsInline 
                loop 
                autoPlay 
                className="jumbotron-video-aurora__video"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Approach Section */}
      <section className="static-atom-section">
        <div className="grid-container">
          <div className="static-atom-header">
            <span className="cyber-section-label">// МЕТОДОЛОГИЯ</span>
            <h2 className="static-atom-title">Наш подход</h2>
            <p className="static-atom-desc">
              Создаем сайты, помогающие раскрыть бренд, влюбить в себя клиентов,
              увеличить продажи продуктов и услуг. Проектируем с прицелом на синергию
              с рекламными каналами, контент-маркетингом и SEO.
            </p>
          </div>

          <div className="approach-interactive-grid">
            <div className="approach-tabs-nav">
              <button 
                className={`approach-tab-btn ${activeApproach === 'positioning' ? 'active' : ''}`}
                onClick={() => setActiveApproach('positioning')}
              >
                <span className="step-num">01</span>
                <span className="step-name">Позиционирование</span>
              </button>
              <button 
                className={`approach-tab-btn ${activeApproach === 'design' ? 'active' : ''}`}
                onClick={() => setActiveApproach('design')}
              >
                <span className="step-num">02</span>
                <span className="step-name">Дизайн</span>
              </button>
              <button 
                className={`approach-tab-btn ${activeApproach === 'synergy' ? 'active' : ''}`}
                onClick={() => setActiveApproach('synergy')}
              >
                <span className="step-num">03</span>
                <span className="step-name">Синергия</span>
              </button>
            </div>

            <div className="approach-tab-content-panel">
              <AnimatePresence mode="wait">
                {activeApproach === 'positioning' && (
                  <motion.div
                    key="pos"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="approach-tab-body"
                  >
                    <h4>Раскрываем позиционирование</h4>
                    <p>
                      За 17 лет агентство обрело стратегическое мышление в маркетинге и разработке
                      сайтов. Поэтому мы находим и формулируем преимущества бренда и его продуктов.
                      Усиливаем текущее позиционирование.
                    </p>
                  </motion.div>
                )}
                {activeApproach === 'design' && (
                  <motion.div
                    key="des"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="approach-tab-body"
                  >
                    <h4>Дизайн как преимущество</h4>
                    <p>
                      Влюбляем в бренд через красивый дизайн. Формируем желание попробовать продукт
                      или услугу: выделяем сильные стороны, делаем сайт понятным и удобным.
                      Усиливаем впечатление через анимации и интерактивы.
                    </p>
                  </motion.div>
                )}
                {activeApproach === 'synergy' && (
                  <motion.div
                    key="syn"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="approach-tab-body"
                  >
                    <h4>Думаем о синергии</h4>
                    <p>
                      Разрабатывая сайт, мы продумываем посадочные страницы для рекламного трафика,
                      а также контентное и SEO-наполнение для органического продвижения. И конечно,
                      учитываем интеграции с CRM, системами аналитики, телефонией и чатами.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="approach-conversion-card">
            <div className="conversion-card-glow"></div>
            <div className="conversion-content">
              <h3>Высокая конверсия и сильный бренд</h3>
              <p>
                Перфекционизм в дизайне и маркетинговое мышление максимизируют продажи в краткосрочной и долгосрочной перспективе.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Case Studies Slider Section */}
      <section className="bespoke-cases-section">
        <div className="grid-container">
          <div className="cases-section-header">
            <div>
              <span className="cyber-section-label">// ПОРТФОЛИО</span>
              <h2>Наши работы</h2>
            </div>
            <div className="slider-controls-wrap">
              <button 
                className="slider-nav-btn prev"
                onClick={() => setActiveCase(prev => (prev === 0 ? cases.length - 1 : prev - 1))}
                aria-label="Previous case"
              >
                ←
              </button>
              <button 
                className="slider-nav-btn next"
                onClick={() => setActiveCase(prev => (prev === cases.length - 1 ? 0 : prev + 1))}
                aria-label="Next case"
              >
                →
              </button>
            </div>
          </div>

          <div className="cases-slider-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="case-slide-layout"
              >
                <div className="case-slide-media">
                  <video 
                    src={cases[activeCase].video}
                    muted 
                    playsInline 
                    loop 
                    autoPlay 
                    className="case-slide-video"
                  />
                </div>
                <div className="case-slide-text">
                  <h3>{cases[activeCase].title}</h3>
                  <span className="case-subtitle">{cases[activeCase].subtitle}</span>
                  <p>{cases[activeCase].desc}</p>
                  <Link to={cases[activeCase].link} className="btn-secondary">
                    <span>Смотреть кейс</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. Pricing Cards Grid */}
      <section className="bespoke-prices-section">
        <div className="grid-container">
          <div className="prices-header">
            <span className="cyber-section-label">// ТАРИФЫ</span>
            <h2>Стоимость разработки</h2>
          </div>

          <div className="prices-cards-grid">
            <div className="price-card-wrapper">
              <div className="price-card">
                <h3>Лендинг</h3>
                <p>Для тестирования бизнес-идей и получения быстрых результатов</p>
                <div className="price-tag">
                  <span className="price-val">~ 230 000 ₽</span>
                </div>
                <Link to="/service/landing" className="price-card-link">
                  <span>Подробнее</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5"/></svg>
                </Link>
              </div>
            </div>

            <div className="price-card-wrapper">
              <div className="price-card highlighted">
                <div className="highlight-tag">Популярно</div>
                <h3>Интернет-магазин</h3>
                <p>Большой каталог, глубокая аналитика и простая оплата</p>
                <div className="price-tag">
                  <span className="price-val">~ 1 404 000 ₽</span>
                </div>
                <Link to="/service/shop" className="price-card-link">
                  <span>Подробнее</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5"/></svg>
                </Link>
              </div>
            </div>

            <div className="price-card-wrapper">
              <div className="price-card">
                <h3>Корпоративный сайт</h3>
                <p>Платформа бренда для постоянного контакта с покупателями</p>
                <div className="price-tag">
                  <span className="price-val">~ 1 112 000 ₽</span>
                </div>
                <Link to="/service/corporate" className="price-card-link">
                  <span>Подробнее</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "How We Do It" Steps + Device Mockups */}
      <section className="bespoke-process-section">
        <div className="grid-container">
          <div className="process-header">
            <span className="cyber-section-label">// ПРОЦЕСС</span>
            <h2>Как мы это делаем</h2>
          </div>

          <div className="process-interactive-layout">
            <div className="process-accordions">
              {/* Step 1 */}
              <div className={`process-step-box ${activeStep === 1 ? 'active' : ''}`} onClick={() => setActiveStep(1)}>
                <div className="step-header-row">
                  <span className="step-num">1</span>
                  <h3>Маркетинговое проектирование</h3>
                </div>
                <div className="step-expandable-content">
                  <p className="step-lead">
                    Создаем платформу сайта: проектируем структуру, пишем чистовой контент и оформляем блоки в формате прототипа.
                  </p>
                  <div className="step-subpoints">
                    <div className="subpoint">
                      <h4>Проводим маркетинговые исследования</h4>
                      <p>Погружаемся в бизнес клиента. Анализируем аудиторию, конкурентов и составляем портреты целевой аудитории.</p>
                    </div>
                    <div className="subpoint">
                      <h4>Разрабатываем структуру и пишем контент</h4>
                      <p>Проектируем структуру сайта на основе исследований и пишем тексты, раскрывающие преимущества.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`process-step-box ${activeStep === 2 ? 'active' : ''}`} onClick={() => setActiveStep(2)}>
                <div className="step-header-row">
                  <span className="step-num">2</span>
                  <h3>Дизайн сайта</h3>
                </div>
                <div className="step-expandable-content">
                  <p className="step-lead">
                    Создаем красивый концепт дизайна сайта, оживляем его анимацией и адаптируем под все экраны.
                  </p>
                  <div className="step-subpoints">
                    <div className="subpoint">
                      <h4>Согласно вашему вкусу</h4>
                      <p>Собираем лучшие референсы мирового дизайна и вместе выбираем стилистическое направление.</p>
                    </div>
                    <div className="subpoint">
                      <h4>Дизайн высокого уровня</h4>
                      <p>Создаем премиальный дизайн страниц с тонкими деталями и микро-анимациями.</p>
                    </div>
                    <div className="subpoint">
                      <h4>Идеально на каждом экране</h4>
                      <p>Особое внимание уделяем мобильной адаптации, чтобы все элементы оставались удобными.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`process-step-box ${activeStep === 3 ? 'active' : ''}`} onClick={() => setActiveStep(3)}>
                <div className="step-header-row">
                  <span className="step-num">3</span>
                  <h3>Разработка и запуск</h3>
                </div>
                <div className="step-expandable-content">
                  <p className="step-lead">
                    Верстаем пиксель-перфект, интегрируем современную систему управления сайтом и настраиваем маркетинговые инструменты.
                  </p>
                  <div className="step-subpoints">
                    <div className="subpoint">
                      <h4>Профессиональная верстка</h4>
                      <p>Создаем чистый, оптимизированный код для мгновенной загрузки на любых устройствах.</p>
                    </div>
                    <div className="subpoint">
                      <h4>Интеграция систем аналитики</h4>
                      <p>Подключаем CRM, пиксели соцсетей, цели Яндекс.Метрики и Google Analytics.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Devices Mockup Visual display (relative Macbook + iPad + iPhone stack) */}
            <div className="process-visual-devices-display">
              <div className="mocks-layout">
                {/* Macbook */}
                <div className="device-mock macbook-wrapper">
                  <div className="device-screen macbook-screen">
                    <video src="/cardetailed.mp4" muted playsInline loop autoPlay />
                  </div>
                  <div className="macbook-base"></div>
                </div>

                {/* iPad */}
                <div className="device-mock ipad-wrapper">
                  <div className="device-screen ipad-screen">
                    <video src="/cardetailed.mp4" muted playsInline loop autoPlay />
                  </div>
                </div>

                {/* iPhone */}
                <div className="device-mock iphone-wrapper">
                  <div className="device-screen iphone-screen">
                    <video src="/Mob_hero_banner.mp4" muted playsInline loop autoPlay />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Calculator Section */}
      <section className="bespoke-calculator-section">
        <div className="grid-container">
          <span className="cyber-section-label">// КАЛЬКУЛЯТОР СТОИМОСТИ</span>
          <ServiceCalculator basePriceString="от 230 000 ₽" serviceTitle="Сайт-визитка" />
        </div>
      </section>

      {/* 7. Premium Call to Action */}
      <section className="bespoke-cta-section">
        <div className="grid-container">
          <div className="cta-box">
            <div className="cta-glow"></div>
            <div className="cta-content">
              <h2>Готовы запустить свой Сайт-визитка?</h2>
              <p>Заполните форму обратной связи, чтобы получить подробный расчет и концепцию для вашего проекта.</p>
              <div className="cta-actions">
                <a href="#contact" className="btn-premium">
                  <span>Оставить заявку</span>
                </a>
                <Link to="/works" className="btn-secondary">
                  <span>Посмотреть работы</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function StandardServiceDetail({ serviceId }) {
  const service = servicesData[serviceId];

  const [inView, setInView] = useState(false);
  const [prevServiceId, setPrevServiceId] = useState(serviceId);
  const sectionRef = useRef(null);

  if (serviceId !== prevServiceId) {
    setPrevServiceId(serviceId);
    setInView(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [serviceId]);

  const trail = useTrail(service?.structureItems ? service.structureItems.length : 0, {
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { 
      opacity: inView ? 1 : 0, 
      transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)' 
    },
    config: { mass: 1, tension: 210, friction: 20 },
  });

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
            <section ref={sectionRef} className="service-structure-section">
              <div className="section-header">
                <span className="cyber-section-label">// СТРУКТУРА РЕШЕНИЯ</span>
                <h2>{service.structureTitle}</h2>
                <p className="structure-desc">{service.structureText}</p>
              </div>
              
              <div className="structure-grid">
                {trail.map((style, index) => (
                  <animated.div style={style} className="structure-card" key={index}>
                    <div className="structure-card-number">{ (index + 1).toString().padStart(2, '0') }</div>
                    <p className="structure-card-text">{service.structureItems[index]}</p>
                  </animated.div>
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

          {/* Interactive Project Calculator */}
          <section className="service-calculator-section" style={{ marginTop: '8rem', marginBottom: '8rem' }}>
            <ServiceCalculator basePriceString={service.price} serviceTitle={service.title} />
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

export default function ServiceDetail() {
  const { serviceId } = useParams();

  if (serviceId === 'card') {
    return <BespokeCardService />;
  }

  return <StandardServiceDetail serviceId={serviceId} />;
}
