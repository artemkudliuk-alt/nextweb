import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import TextReveal from '../components/TextReveal';

// Local images as fallback or specific visual overrides if needed
import serviceSitesImg from '../assets/service_sites.png';
import serviceBrandingImg from '../assets/service_branding.png';
import serviceMarketingImg from '../assets/service_marketing.png';
import serviceSupportImg from '../assets/service_support.png';

export default function Services() {
  const trackRefs = {
    development: useRef(null),
    brandingMarketing: useRef(null),
    supportOperations: useRef(null)
  };

  const [scrollStates, setScrollStates] = useState({
    development: { isStart: true, isEnd: false, hasOverflow: false },
    brandingMarketing: { isStart: true, isEnd: false, hasOverflow: false },
    supportOperations: { isStart: true, isEnd: false, hasOverflow: false }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Услуги интернет маркетинга — NextWeb';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Комплекс услуг маркетинга и продвижения в digital. Ознакомиться с ценами и узнать подробней о каждой услуге на сайте NextWeb.');
    }
    
    // Add page-specific class to body for scope overrides
    document.body.classList.add('services-body');
    return () => {
      document.body.classList.remove('services-body');
    };
  }, []);

  // Canvas rendering has been migrated to high-performance CSS Aurora in index.css
  useEffect(() => {}, []);

  const scrollTrack = (id, direction) => {
    const ref = trackRefs[id];
    if (ref && ref.current) {
      const cardWidth = 401; // card width + margin
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = (id) => {
    const el = trackRefs[id].current;
    if (el) {
      const isStart = el.scrollLeft <= 15;
      const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 15;
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setScrollStates(prev => ({
        ...prev,
        [id]: { isStart, isEnd, hasOverflow }
      }));
    }
  };

  // Trigger initial checks and window resize checks for all sliders
  useEffect(() => {
    const checkAll = () => {
      Object.keys(trackRefs).forEach(id => {
        handleScroll(id);
      });
    };
    // Short delay to allow DOM render and fonts loading
    const timer = setTimeout(checkAll, 100);
    window.addEventListener('resize', checkAll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkAll);
    };
  }, []);

  // IntersectionObserver to detect active section stacking and trigger animations
  useEffect(() => {
    const sections = document.querySelectorAll('.page-constructor__section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
          } else {
            entry.target.classList.remove('is-active');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const divider2Ref = useRef(null);
  const divider3Ref = useRef(null);
  const line2MainRef = useRef(null);
  const line3MainRef = useRef(null);

  // Dynamic slant-flattening transition scroll listener
  useEffect(() => {
    const handleWindowScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const updateSectionTransition = (sectionEl, dividerEl, lineMainEl, direction) => {
        if (!sectionEl) return;
        const rect = sectionEl.getBoundingClientRect();
        
        // Progress goes from 0 (when top of section enters viewport bottom) 
        // to 1 (when top of section reaches viewport top)
        let progress = 1 - (rect.top / viewportHeight);
        progress = Math.max(0, Math.min(1, progress));

        const slantHeight = (1 - progress) * 120;

        if (progress < 1) {
          if (direction === 'left') {
            sectionEl.style.clipPath = `polygon(0 ${slantHeight}px, 100% 0, 100% 100%, 0 100%)`;
            sectionEl.style.webkitClipPath = `polygon(0 ${slantHeight}px, 100% 0, 100% 100%, 0 100%)`;
          } else {
            sectionEl.style.clipPath = `polygon(0 0, 100% ${slantHeight}px, 100% 100%, 0 100%)`;
            sectionEl.style.webkitClipPath = `polygon(0 0, 100% ${slantHeight}px, 100% 100%, 0 100%)`;
          }
          if (dividerEl) {
            dividerEl.style.opacity = (1 - progress).toString();
          }
        } else {
          sectionEl.style.clipPath = 'none';
          sectionEl.style.webkitClipPath = 'none';
          if (dividerEl) {
            dividerEl.style.opacity = '0';
          }
        }

        if (lineMainEl) {
          if (direction === 'left') {
            lineMainEl.setAttribute('y1', slantHeight.toString());
            lineMainEl.setAttribute('y2', '0');
          } else {
            lineMainEl.setAttribute('y1', '0');
            lineMainEl.setAttribute('y2', slantHeight.toString());
          }
        }
      };

      requestAnimationFrame(() => {
        updateSectionTransition(section2Ref.current, divider2Ref.current, line2MainRef.current, 'left');
        updateSectionTransition(section3Ref.current, divider3Ref.current, line3MainRef.current, 'right');
      });
    };

    window.addEventListener('scroll', handleWindowScroll);
    window.addEventListener('resize', handleWindowScroll);
    // Initial call
    handleWindowScroll();

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('resize', handleWindowScroll);
    };
  }, []);

  return (
    <>
      <div className="services-root">
        {/* Dynamic Blurred Shader Canvas Backdrop */}
        <div className="page-constructor">
          <div className="page-constructor__bg isLoaded">
            {/* Aurora is global in App.jsx — no duplicate needed */}
          </div>

          {/* 1. DEVELOPMENT SECTION */}
          <section className="page-constructor__section page-constructor__section--dev">
            <div className="services-unified" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div className="block-padding block-padding_desktop" style={{ paddingTop: '117px' }}></div>
              <div className="block-padding block-padding_tablet" style={{ paddingTop: '146px' }}></div>
              <div className="block-padding block-padding_mobile" style={{ paddingTop: '57px' }}></div>
              
              <section id="services-development" className="services-section">
                <div className="services__header-row">
                  <div className="services__text">
                    <h2 className="services__title"><TextReveal text="Разработка" glitch={true} /></h2>
                    <p className="services__description">
                      Создаем современные, быстрые и масштабируемые веб-ресурсы. От простых посадочных страниц до высоконагруженных веб-приложений и уникальных интерфейсов.
                    </p>
                  </div>
                  {scrollStates.development.hasOverflow && (
                    <div className="services__slider-nav">
                      <button 
                        className={`slider-nav-btn prev ${scrollStates.development.isStart ? 'disabled' : ''}`}
                        onClick={() => scrollTrack('development', 'left')}
                        aria-label="Previous slide"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button 
                        className={`slider-nav-btn next ${scrollStates.development.isEnd ? 'disabled' : ''}`}
                        onClick={() => scrollTrack('development', 'right')}
                        aria-label="Next slide"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                <div className="services__context-slider swiper-container">
                  <div 
                    ref={trackRefs.development}
                    onScroll={() => handleScroll('development')}
                    className="services__context-wrapper swiper-wrapper"
                  >
                    {/* Slide 1: Сайт-визитка */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/card" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 12h8M8 16h5"/><circle cx="6" cy="8" r="1" fill="currentColor"/></svg>
                          <h3>Сайт-визитка</h3>
                          <span className="services__card-price desktop">
                            От $1 500
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Простой и эффективный сайт для быстрого старта, презентации компании, услуг или продукта.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $1 500
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/3LuWbO4vFz5rXLmfBA6fFedCstiyjjs4V7axiN9R.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/5aiLfmiFufjO85fWyOaYFYVpWQApnXRYEOgrsLjQ.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/L65oIntDVuHVVGvDjYwtncAlNdoL52ykpQ85SM58.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 2: Сайт-витрина */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/showcase" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                          <h3>Сайт-витрина</h3>
                          <span className="services__card-price desktop">
                            От $3 000
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Онлайн-каталог товаров или услуг с подробным описанием и возможностью быстрой связи.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $3 000
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/Pkepine6uqomDZTEBqhsyRNddwsB0Eu58pU3wPta.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/dvVPWfPJlPVoMskov1IAE8MgTR753bmJN585qwbU.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/jlq5GzTFrVsl6YYcmcKnSGt9KEUXjXUlqZpWHR95.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 3: Landing Page */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/landing" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h8"/></svg>
                          <h3>Landing Page</h3>
                          <span className="services__card-price desktop">
                            От $2 000
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Одностраничный сайт с высокой конверсией, спроектированный под конкретное целевое действие.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $2 000
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/dTFdRhd5QNaLGlFXEeBwO0PKMvMFFyYTwsfqygUG.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/oj3jhMngW54bYhlgy09DXECjyJN8ogjnSy47KDVy.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/jaGBzuO8PmLL7F6CC5KGu7ogXGyw061KZqzctj6d.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 4: Корпоративный сайт */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/corporate" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M9 21V7l6-4v18M9 11h6"/></svg>
                          <h3>Корпоративный сайт</h3>
                          <span className="services__card-price desktop">
                            От $6 000
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Многофункциональный ресурс компании для укрепления имиджа, автоматизации процессов и привлечения клиентов.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $6 000
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/f9Hhn2LGZUyUjqjbXqimhpGTzASauJRa8QVWhS1x.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/UlTOttwFc8eb9KTdvv3LJ42gPNf8g7aTk2v9LWOR.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/QnFEscWsmi07hzfBYMM9KrQ0uiNv3UA2QRiSh2mV.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 5: Веб-портал */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/portal" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                          <h3>Веб-портал</h3>
                          <span className="services__card-price desktop">
                            От $12 000
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Сложная информационная система с личными кабинетами, базами данных и высокой нагрузкой.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $12 000
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/5WtEGkofvsOFTQwdJZFmZEKOP5aUJRWBdPnUcm6f.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/fJ5Wj4IWyUeAird6zmnNifjZVbmZJstaSycuGa67.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/iRNt01BDzA0ochnwbwUv0ptuOiemQhEo9prooUqV.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 6: Проектирование интерфейсов */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/interface" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.5 7 7.5 1-5.5 5.4 1.3 7.6L12 20l-6.8 3 1.3-7.6L1 10l7.5-1z"/></svg>
                          <h3>Проектирование интерфейсов</h3>
                          <span className="services__card-price desktop">
                            От $2 500
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Разработка UX/UI архитектуры, кликабельных прототипов и логики взаимодействия пользователя.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $2 500
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/FgvCOx6yCrzMr47skHUmU3hQBPT7MoebjqrJZi79.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/36MyNZU3fZVRSkp9ftxtScqt0GC2uM9oTdLvLOWL.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/blMKEDH5TKLwSnHTfnuRutHSwona3MdvaQUkXTbS.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 7: Интернет-магазин */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/shop" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                          <h3>Интернет-магазин</h3>
                          <span className="services__card-price desktop">
                            От $8 000
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Полноценная торговая площадка с интеграцией платежных систем, CRM, служб доставки и каталогов.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $8 000
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/45x4Djynue4IvMeJ2k2r63muNK6iPQQdn8dfE9n8.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/Q39cUbMwyHvkoTijs7bmgPuEq1tyFEvboMNWPHO3.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 8: Веб-приложение */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/app" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                          <h3>Веб-приложение</h3>
                          <span className="services__card-price desktop">
                            От $10 000
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Интерактивный веб-сервис (SaaS, дашборды, личные кабинеты) с уникальным бизнес-функционалом.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $10 000
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/UkfvRNxNsscDlsDw9q4MxnYEZEnWUmoXDbZJJ5Aq.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/DgGkFva0xK8YacXI1YvJ8NVTFVwdmNWqFRTLpOik.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/5lEdSMmCqp3BzZM7VIqQeZyy026jhOwW8qw1XCQi.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Slider controls removed */}
                </div>
              </section>
            </div>
          </section>

          {/* 2. BRANDING & MARKETING SECTION */}
          <section ref={section2Ref} className="page-constructor__section page-constructor__section--brand">
            <div ref={divider2Ref} className="tech-glow-divider tech-glow-divider-services-2" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120px', zIndex: 10, pointerEvents: 'none' }}>
              <svg viewBox="0 0 1440 120" width="100%" height="120" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="tech-glow-grad-services-2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00D9FF" stopOpacity="1" />
                    <stop offset="50%" stopColor="#A020F0" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FF1493" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <line ref={line2MainRef} className="tech-glow-line-main" x1="0" y1="120" x2="1440" y2="0" stroke="url(#tech-glow-grad-services-2)" strokeWidth="4" />
              </svg>
            </div>
            <div className="services-unified" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div className="block-padding block-padding_desktop" style={{ paddingTop: '222px' }}></div>
              <div className="block-padding block-padding_tablet" style={{ paddingTop: '171px' }}></div>
              <div className="block-padding block-padding_mobile" style={{ paddingTop: '100px' }}></div>

              <section id="services-branding-marketing" className="services-section">
                <div className="services__header-row">
                  <div className="services__text">
                    <h2 className="services__title"><TextReveal text="Брендинг и маркетинг" glitch={true} /></h2>
                    <p className="services__description">
                      Формируем сильный визуальный образ бренда и привлекаем клиентов через комплексные маркетинговые каналы: от создания фирменного стиля до SEO, контекста и SMM.
                    </p>
                  </div>
                  {scrollStates.brandingMarketing.hasOverflow && (
                    <div className="services__slider-nav">
                      <button 
                        className={`slider-nav-btn prev ${scrollStates.brandingMarketing.isStart ? 'disabled' : ''}`}
                        onClick={() => scrollTrack('brandingMarketing', 'left')}
                        aria-label="Previous slide"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button 
                        className={`slider-nav-btn next ${scrollStates.brandingMarketing.isEnd ? 'disabled' : ''}`}
                        onClick={() => scrollTrack('brandingMarketing', 'right')}
                        aria-label="Next slide"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                <div className="services__context-slider swiper-container">
                  <div 
                    ref={trackRefs.brandingMarketing}
                    onScroll={() => handleScroll('brandingMarketing')}
                    className="services__context-wrapper swiper-wrapper"
                  >
                    {/* Card 1: Разработка логотипа */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/logo" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 3.3 2.4-7.4L2 9.4h7.6z"/></svg>
                          <h3>Разработка логотипа</h3>
                          <span className="services__card-price desktop">
                            От $2 000
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Создание уникального логотипа, который выделит компанию среди конкурентов и запомнится аудитории.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $2 000
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/FgvCOx6yCrzMr47skHUmU3hQBPT7MoebjqrJZi79.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/36MyNZU3fZVRSkp9ftxtScqt0GC2uM9oTdLvLOWL.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/blMKEDH5TKLwSnHTfnuRutHSwona3MdvaQUkXTbS.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 2: Фирменный стиль */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/identity" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 20v-8.5M12 20H6l-2-4 6-2.5M12 20h6l2-4-6-2.5"/></svg>
                          <h3>Фирменный стиль</h3>
                          <span className="services__card-price desktop">
                            От $3 500
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Разработка единой визуальной системы бренда: шрифты, цвета, полиграфия и брендбук.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $3 500
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/UkfvRNxNsscDlsDw9q4MxnYEZEnWUmoXDbZJJ5Aq.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/DgGkFva0xK8YacXI1YvJ8NVTFVwdmNWqFRTLpOik.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/5lEdSMmCqp3BzZM7VIqQeZyy026jhOwW8qw1XCQi.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 3: SEO-оптимизация */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/seo" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
                          <h3>SEO-оптимизация</h3>
                          <span className="services__card-price desktop">
                            От $1 500
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Комплексное поисковое продвижение для вывода сайта в топ Яндекса и Google, привлечение органического трафика.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $1 500
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/F7Dv44rQ3onIMC4xd5vwQfqq044O5iHmQ5JBGHoH.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/Q39cUbMwyHvkoTijs7bmgPuEq1tyFEvboMNWPHO3.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 4: Контекстная реклама */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/ppc" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          <h3>Контекстная реклама</h3>
                          <span className="services__card-price desktop">
                            От $1 000
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Настройка и ведение рекламных кампаний в Яндекс.Директ для быстрого получения целевых заявок.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $1 000
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/P59g84goAUdEc9h8xH9YpACf9T4jZqxQf5DxhESD.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/uJEVTMswdwntPfDGMjc9NshSj1zzC5KoEZslI9PS.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/F7Dv44rQ3onIMC4xd5vwQfqq044O5iHmQ5JBGHoH.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 5: SMM-продвижение */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/smm" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                          <h3>SMM-продвижение</h3>
                          <span className="services__card-price desktop">
                            От $2 500
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Продвижение бренда в социальных сетях, создание вовлекающего контента, дизайн сообществ и таргетированная реклама.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $2 500
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/5lXRPRmqGnKTGgJGa3g7Y3iPejliMrVuKDx8bpXp.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/XH6X8dd7nP4NZ1aAjTaerMwwGYvIlDWBnOrGhN77.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/50lqzMOLSnqh2D93CrmUgJu4xxPO24ipUD4PtTyF.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Slider controls removed */}
                </div>
              </section>
            </div>
          </section>

          {/* 3. SUPPORT & OPERATIONS SECTION */}
          <section ref={section3Ref} className="page-constructor__section page-constructor__section--support">
            <div ref={divider3Ref} className="tech-glow-divider tech-glow-divider-services-3" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120px', zIndex: 10, pointerEvents: 'none' }}>
              <svg viewBox="0 0 1440 120" width="100%" height="120" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="tech-glow-grad-services-3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00D9FF" stopOpacity="1" />
                    <stop offset="50%" stopColor="#A020F0" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FF1493" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <line ref={line3MainRef} className="tech-glow-line-main" x1="0" y1="0" x2="1440" y2="120" stroke="url(#tech-glow-grad-services-3)" strokeWidth="4" />
              </svg>
            </div>
            <div className="services-unified" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div className="block-padding block-padding_desktop" style={{ paddingTop: '90px' }}></div>
              <div className="block-padding block-padding_tablet" style={{ paddingTop: '68px' }}></div>
              <div className="block-padding block-padding_mobile" style={{ paddingTop: '48px' }}></div>

              <section id="services-support-operations" className="services-section">
                <div className="services__header-row">
                  <div className="services__text">
                    <h2 className="services__title"><TextReveal text="Поддержка и операции" glitch={true} /></h2>
                    <p className="services__description">
                      Обеспечиваем стабильную работу ваших веб-ресурсов. Оказываем услуги технической поддержки, DevOps-инжиниринга, IT-консалтинга, аудита безопасности, юзабилити и оптимизации.
                    </p>
                  </div>
                  {scrollStates.supportOperations.hasOverflow && (
                    <div className="services__slider-nav">
                      <button 
                        className={`slider-nav-btn prev ${scrollStates.supportOperations.isStart ? 'disabled' : ''}`}
                        onClick={() => scrollTrack('supportOperations', 'left')}
                        aria-label="Previous slide"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button 
                        className={`slider-nav-btn next ${scrollStates.supportOperations.isEnd ? 'disabled' : ''}`}
                        onClick={() => scrollTrack('supportOperations', 'right')}
                        aria-label="Next slide"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                <div className="services__context-slider swiper-container">
                  <div 
                    ref={trackRefs.supportOperations}
                    onScroll={() => handleScroll('supportOperations')}
                    className="services__context-wrapper swiper-wrapper"
                  >
                    {/* Slide 1: Поддержка сайтов (Large Image Card) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/support" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                          <h3>Поддержка сайтов</h3>
                          <span className="services__card-price desktop">
                            От $200 / мес.
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Комплексное техническое и информационное обслуживание вашего ресурса. Бесперебойная работа и доработка функционала.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $200 / мес.
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/UkfvRNxNsscDlsDw9q4MxnYEZEnWUmoXDbZJJ5Aq.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/DgGkFva0xK8YacXI1YvJ8NVTFVwdmNWqFRTLpOik.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/5lEdSMmCqp3BzZM7VIqQeZyy026jhOwW8qw1XCQi.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 2: Технический аудит */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/audit" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                          <h3>Технический аудит</h3>
                          <span className="services__card-price desktop">
                            От $500
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Глубокий анализ кода, скорости загрузки, серверной архитектуры, SEO-ошибок и уязвимостей.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $500
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/P59g84goAUdEc9h8xH9YpACf9T4jZqxQf5DxhESD.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/P59g84goAUdEc9h8xH9YpACf9T4jZqxQf5DxhESD.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/P59g84goAUdEc9h8xH9YpACf9T4jZqxQf5DxhESD.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 3: UX/UI консалтинг */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/ux-ui" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          <h3>UX/UI консалтинг</h3>
                          <span className="services__card-price desktop">
                            От $600
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Аудит юзабилити интерфейса сайта или приложения. Поиск причин низкой конверсии и брошенных корзин.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $600
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/FgvCOx6yCrzMr47skHUmU3hQBPT7MoebjqrJZi79.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/FgvCOx6yCrzMr47skHUmU3hQBPT7MoebjqrJZi79.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/FgvCOx6yCrzMr47skHUmU3hQBPT7MoebjqrJZi79.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 4: DevOps и облака */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/devops" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                          <h3>DevOps и облака</h3>
                          <span className="services__card-price desktop">
                            От $800
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Настройка серверов (AWS, GCP, DO), контейнеризация Docker/Kubernetes, мониторинг и CI/CD автоматизация.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $800
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/5WtEGkofvsOFTQwdJZFmZEKOP5aUJRWBdPnUcm6f.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/fJ5Wj4IWyUeAird6zmnNifjZVbmZJstaSycuGa67.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/iRNt01BDzA0ochnwbwUv0ptuOiemQhEo9prooUqV.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 5: Почасовая разработка */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/hourly" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          <h3>Почасовая разработка</h3>
                          <span className="services__card-price desktop">
                            От $40 / час
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Гибкий формат разработки с оплатой за фактически затраченное время (Time & Material).
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $40 / час
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/3LuWbO4vFz5rXLmfBA6fFedCstiyjjs4V7axiN9R.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/3LuWbO4vFz5rXLmfBA6fFedCstiyjjs4V7axiN9R.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/3LuWbO4vFz5rXLmfBA6fFedCstiyjjs4V7axiN9R.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 6: IT-консалтинг */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/consulting" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                          <h3>IT-консалтинг</h3>
                          <span className="services__card-price desktop">
                            От $100 / час
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Экспертный консалтинг: выбор стека, аудит кода, проектирование System Design и ИТ-архитектуры.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $100 / час
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/uJEVTMswdwntPfDGMjc9NshSj1zzC5KoEZslI9PS.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/uJEVTMswdwntPfDGMjc9NshSj1zzC5KoEZslI9PS.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/uJEVTMswdwntPfDGMjc9NshSj1zzC5KoEZslI9PS.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 7: Копирайтинг и контент */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/copywriting" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                          <h3>Копирайтинг и контент</h3>
                          <span className="services__card-price desktop">
                            От $15 / 1000 зн.
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Написание экспертных статей, SEO-оптимизированных текстов, продающего контента для лендингов.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $15 / 1000 зн.
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/5lXRPRmqGnKTGgJGa3g7Y3iPejliMrVuKDx8bpXp.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/5lXRPRmqGnKTGgJGa3g7Y3iPejliMrVuKDx8bpXp.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/5lXRPRmqGnKTGgJGa3g7Y3iPejliMrVuKDx8bpXp.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 8: Веб-аналитика */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/analytics" className="services__card-container services__card-container-img">
                          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                          <h3>Веб-аналитика</h3>
                          <span className="services__card-price desktop">
                            От $300
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Настройка веб-аналитики (GA4, Яндекс.Метрика), отслеживание целей, построение отчетов и дашбордов.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От $300
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Slider controls removed */}
                </div>
              </section>
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
