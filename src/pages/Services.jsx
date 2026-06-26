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
    development: { isStart: true, isEnd: false },
    brandingMarketing: { isStart: true, isEnd: false },
    supportOperations: { isStart: true, isEnd: false }
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

  // Dynamic canvas background animation using NextWeb theme colors - Lava Lamp Effect
  useEffect(() => {
    const canvas = document.getElementById('gradient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Viewport-relative blobs (Strictly NextWeb brand RGB colors: Cyber-cyan, Magenta, and Purple)
    const blobs = [
      { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: 350, baseR: 350, vx: 0.45, vy: 0.32, color: 'rgba(0, 217, 255, 0.85)', phase: Math.random() * 100 }, // Cyber-cyan
      { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: 400, baseR: 400, vx: -0.32, vy: 0.38, color: 'rgba(255, 20, 147, 0.8)', phase: Math.random() * 100 },  // Magenta
      { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: 380, baseR: 380, vx: 0.28, vy: -0.35, color: 'rgba(160, 32, 240, 0.8)', phase: Math.random() * 100 },  // Purple
      { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: 280, baseR: 280, vx: -0.38, vy: -0.28, color: 'rgba(0, 217, 255, 0.85)', phase: Math.random() * 100 }, // Cyber-cyan small
      { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: 320, baseR: 320, vx: 0.32, vy: 0.32, color: 'rgba(255, 20, 147, 0.8)', phase: Math.random() * 100 },   // Magenta small
      { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: 420, baseR: 420, vx: -0.25, vy: -0.32, color: 'rgba(160, 32, 240, 0.8)', phase: Math.random() * 100 }  // Purple large
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.003;

      blobs.forEach(b => {
        // Slow organic velocity oscillation (Lava lamp vertical/horizontal drift)
        b.x += b.vx + Math.sin(time + b.phase) * 0.15;
        b.y += b.vy + Math.cos(time + b.phase) * 0.15;

        // Size pulsation (lava lamp bubble expansion / contraction)
        b.r = b.baseR + Math.sin(time * 1.2 + b.phase) * 35;

        // Smooth bounce when bubbles drift off-viewport
        if (b.x < -b.r / 2 || b.x > canvas.width + b.r / 2) b.vx *= -1;
        if (b.y < -b.r / 2 || b.y > canvas.height + b.r / 2) b.vy *= -1;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.color);
        grad.addColorStop(0.5, b.color); // Solid center for metaball merging
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
      setScrollStates(prev => ({
        ...prev,
        [id]: { isStart, isEnd }
      }));
    }
  };

  // Trigger initial checks for all sliders
  useEffect(() => {
    Object.keys(trackRefs).forEach(id => {
      handleScroll(id);
    });
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

  return (
    <>
      <div className="services-root">
        {/* Dynamic Blurred Shader Canvas Backdrop */}
        <div className="page-constructor">
          <div className="page-constructor__bg isLoaded">
            <canvas id="gradient-canvas" width="1440" height="600" className="isLoaded"></canvas>
          </div>

          {/* 1. DEVELOPMENT SECTION */}
          <section className="page-constructor__section">
            <div className="services-unified" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div className="block-padding block-padding_desktop" style={{ paddingTop: '117px' }}></div>
              <div className="block-padding block-padding_tablet" style={{ paddingTop: '146px' }}></div>
              <div className="block-padding block-padding_mobile" style={{ paddingTop: '57px' }}></div>
              
              <section id="services-development" className="services-section">
                <div className="services__text">
                  <h2 className="services__title"><TextReveal text="Разработка" glitch={true} /></h2>
                  <p className="services__description">
                    Создаем современные, быстрые и масштабируемые веб-ресурсы. От простых посадочных страниц до высоконагруженных веб-приложений и уникальных интерфейсов.
                  </p>
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
                          <h3>Сайт-визитка</h3>
                          <span className="services__card-price desctop">
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
                          <h3>Сайт-витрина</h3>
                          <span className="services__card-price desctop">
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
                          <h3>Landing Page</h3>
                          <span className="services__card-price desctop">
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
                          <h3>Корпоративный сайт</h3>
                          <span className="services__card-price desctop">
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
                          <h3>Веб-портал</h3>
                          <span className="services__card-price desctop">
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
                          <h3>Проектирование интерфейсов</h3>
                          <span className="services__card-price desctop">
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
                          <h3>Интернет-магазин</h3>
                          <span className="services__card-price desctop">
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
                          <h3>Веб-приложение</h3>
                          <span className="services__card-price desctop">
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

                  {/* Slider controls */}
                  <div>
                    <button 
                      className={`swiper-button-next ${scrollStates.development.isEnd ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('development', 'right')}
                      aria-label="Next slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <button 
                      className={`swiper-button-prev ${scrollStates.development.isStart ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('development', 'left')}
                      style={{ transform: 'rotate(180deg)' }}
                      aria-label="Previous slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </section>

          {/* 2. BRANDING & MARKETING SECTION */}
          <section className="page-constructor__section">
            <div className="services-unified" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div className="block-padding block-padding_desktop" style={{ paddingTop: '222px' }}></div>
              <div className="block-padding block-padding_tablet" style={{ paddingTop: '171px' }}></div>
              <div className="block-padding block-padding_mobile" style={{ paddingTop: '100px' }}></div>

              <section id="services-branding-marketing" className="services-section">
                <div className="services__text">
                  <h2 className="services__title"><TextReveal text="Брендинг и маркетинг" glitch={true} /></h2>
                  <p className="services__description">
                    Формируем сильный визуальный образ бренда и привлекаем клиентов через комплексные маркетинговые каналы: от создания фирменного стиля до SEO, контекста и SMM.
                  </p>
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
                          <h3>Разработка логотипа</h3>
                          <span className="services__card-price desctop">
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
                          <h3>Фирменный стиль</h3>
                          <span className="services__card-price desctop">
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
                          <h3>SEO-оптимизация</h3>
                          <span className="services__card-price desctop">
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
                          <h3>Контекстная реклама</h3>
                          <span className="services__card-price desctop">
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
                          <h3>SMM-продвижение</h3>
                          <span className="services__card-price desctop">
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

                  {/* Slider controls */}
                  <div>
                    <button 
                      className={`swiper-button-next ${scrollStates.brandingMarketing.isEnd ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('brandingMarketing', 'right')}
                      aria-label="Next slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <button 
                      className={`swiper-button-prev ${scrollStates.brandingMarketing.isStart ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('brandingMarketing', 'left')}
                      style={{ transform: 'rotate(180deg)' }}
                      aria-label="Previous slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </section>

          {/* 3. SUPPORT & OPERATIONS SECTION */}
          <section className="page-constructor__section">
            <div className="services-unified" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div className="block-padding block-padding_desktop" style={{ paddingTop: '90px' }}></div>
              <div className="block-padding block-padding_tablet" style={{ paddingTop: '68px' }}></div>
              <div className="block-padding block-padding_mobile" style={{ paddingTop: '48px' }}></div>

              <section id="services-support-operations" className="services-section">
                <div className="services__text">
                  <h2 className="services__title"><TextReveal text="Поддержка и операции" glitch={true} /></h2>
                  <p className="services__description">
                    Обеспечиваем стабильную работу ваших веб-ресурсов. Оказываем услуги технической поддержки, DevOps-инжиниринга, IT-консалтинга, аудита безопасности, юзабилити и оптимизации.
                  </p>
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
                          <h3>Поддержка сайтов</h3>
                          <span className="services__card-price desctop">
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

                    {/* Slide 2: Технический аудит & UX/UI консалтинг (Stacked Text Cards with corner graphics) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card_stack">
                        <div className="services__card">
                          <div className="services__card-ccccc">
                            <Link to="/service/audit" className="services__card-container services__card-container-text">
                              <h3>Технический аудит</h3>
                              <span className="services__card-price desctop">
                                От $500
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Глубокий анализ кода, скорости загрузки, серверной архитектуры, SEO-ошибок и уязвимостей.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От $500
                              </span>
                              <div className="services__card-small-img-wr">
                                <img src="/_sa/img/services/P59g84goAUdEc9h8xH9YpACf9T4jZqxQf5DxhESD.png" alt="" loading="lazy" />
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div className="services__card" style={{ marginTop: '30px' }}>
                          <div className="services__card-ccccc">
                            <Link to="/service/ux-ui" className="services__card-container services__card-container-text">
                              <h3>UX/UI консалтинг</h3>
                              <span className="services__card-price desctop">
                                От $600
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Аудит юзабилити интерфейса сайта или приложения. Поиск причин низкой конверсии и брошенных корзин.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От $600
                              </span>
                              <div className="services__card-small-img-wr">
                                <img src="/_sa/img/services/FgvCOx6yCrzMr47skHUmU3hQBPT7MoebjqrJZi79.png" alt="" loading="lazy" />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Slide 3: DevOps и облака (Large Image Card) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/devops" className="services__card-container services__card-container-img">
                          <h3>DevOps и облака</h3>
                          <span className="services__card-price desctop">
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

                    {/* Slide 4: Почасовая разработка & IT-консалтинг (Stacked Text Cards with corner graphics) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card_stack">
                        <div className="services__card">
                          <div className="services__card-ccccc">
                            <Link to="/service/hourly" className="services__card-container services__card-container-text">
                              <h3>Почасовая разработка</h3>
                              <span className="services__card-price desctop">
                                От $40 / час
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Гибкий формат разработки с оплатой за фактически затраченное время (Time & Material).
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От $40 / час
                              </span>
                              <div className="services__card-small-img-wr">
                                <img src="/_sa/img/services/3LuWbO4vFz5rXLmfBA6fFedCstiyjjs4V7axiN9R.png" alt="" loading="lazy" />
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div className="services__card" style={{ marginTop: '30px' }}>
                          <div className="services__card-ccccc">
                            <Link to="/service/consulting" className="services__card-container services__card-container-text">
                              <h3>IT-консалтинг</h3>
                              <span className="services__card-price desctop">
                                От $100 / час
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Экспертный консалтинг: выбор стека, аудит кода, проектирование System Design и ИТ-архитектуры.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От $100 / час
                              </span>
                              <div className="services__card-small-img-wr">
                                <img src="/_sa/img/services/uJEVTMswdwntPfDGMjc9NshSj1zzC5KoEZslI9PS.png" alt="" loading="lazy" />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Slide 5: Копирайтинг и контент & Веб-аналитика (Stacked Text Cards with corner graphics) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card_stack">
                        <div className="services__card">
                          <div className="services__card-ccccc">
                            <Link to="/service/copywriting" className="services__card-container services__card-container-text">
                              <h3>Копирайтинг и контент</h3>
                              <span className="services__card-price desctop">
                                От $15 / 1000 зн.
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Написание экспертных статей, SEO-оптимизированных текстов, продающего контента для лендингов.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От $15 / 1000 зн.
                              </span>
                              <div className="services__card-small-img-wr">
                                <img src="/_sa/img/services/5lXRPRmqGnKTGgJGa3g7Y3iPejliMrVuKDx8bpXp.png" alt="" loading="lazy" />
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div className="services__card" style={{ marginTop: '30px' }}>
                          <div className="services__card-ccccc">
                            <Link to="/service/analytics" className="services__card-container services__card-container-text">
                              <h3>Веб-аналитика</h3>
                              <span className="services__card-price desctop">
                                От $300
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Настройка веб-аналитики (GA4, Яндекс.Метрика), отслеживание целей, построение отчетов и дашбордов.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От $300
                              </span>
                              <div className="services__card-small-img-wr">
                                <img src="/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png" alt="" loading="lazy" />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slider controls */}
                  <div>
                    <button 
                      className={`swiper-button-next ${scrollStates.supportOperations.isEnd ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('supportOperations', 'right')}
                      aria-label="Next slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <button 
                      className={`swiper-button-prev ${scrollStates.supportOperations.isStart ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('supportOperations', 'left')}
                      style={{ transform: 'rotate(180deg)' }}
                      aria-label="Previous slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                  </div>
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
