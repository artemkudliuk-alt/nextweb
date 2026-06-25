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
    strategy: useRef(null),
    promotion: useRef(null),
    branding: useRef(null),
    sites: useRef(null),
    industries: useRef(null),
    cases: useRef(null),
    clients: useRef(null)
  };

  const [scrollStates, setScrollStates] = useState({
    strategy: { isStart: true, isEnd: false },
    promotion: { isStart: true, isEnd: false },
    branding: { isStart: true, isEnd: false },
    sites: { isStart: true, isEnd: false },
    industries: { isStart: true, isEnd: false },
    cases: { isStart: true, isEnd: false },
    clients: { isStart: true, isEnd: false }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Услуги интернет маркетинга — NextWeb';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Комплекс услуг маркетинга и продвижения в digital. Ознакомиться с ценами и узнать подробней о каждой услуге на сайте NextWeb.');
    }
  }, []);

  // Dynamic canvas background animation using NextWeb theme colors - Lava Lamp Effect
  useEffect(() => {
    const canvas = document.getElementById('gradient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Viewport-relative blobs (Strictly NextWeb brand RGB colors: Cyber-cyan and Magenta)
    const blobs = [
      { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: 450, baseR: 450, vx: 0.35, vy: 0.28, color: 'rgba(0, 217, 255, 0.45)', phase: Math.random() * 100 }, // Cyber-cyan
      { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: 500, baseR: 500, vx: -0.28, vy: 0.35, color: 'rgba(255, 20, 147, 0.42)', phase: Math.random() * 100 }, // Magenta
      { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: 480, baseR: 480, vx: 0.25, vy: -0.3, color: 'rgba(0, 217, 255, 0.4)', phase: Math.random() * 100 },   // Cyber-cyan 2
      { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: 380, baseR: 380, vx: -0.3, vy: -0.25, color: 'rgba(255, 20, 147, 0.4)', phase: Math.random() * 100 },  // Magenta 2
      { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: 420, baseR: 420, vx: 0.28, vy: 0.28, color: 'rgba(0, 217, 255, 0.45)', phase: Math.random() * 100 },  // Cyber-cyan small
      { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: 520, baseR: 520, vx: -0.22, vy: -0.28, color: 'rgba(255, 20, 147, 0.4)', phase: Math.random() * 100 }  // Magenta small
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
      const cardWidth = id === 'clients' ? 288 : 401; // card width + margin
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

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="services-root">
        {/* Category Anchor Menu */}
        <div className="services-title-anchor">
          <div className="title-anchor services__container">
            <h1 className="title-anchor__heading"><TextReveal text="Услуги" glitch={true} /></h1>
            <ul className="title-anchor__list">
              <li>
                <a href="#services-strategy" className="categories__link font-mono" onClick={(e) => handleAnchorClick(e, 'services-strategy')}>
                  Стратегия
                </a>
              </li>
              <li>
                <a href="#services-promotion" className="categories__link font-mono" onClick={(e) => handleAnchorClick(e, 'services-promotion')}>
                  Продвижение
                </a>
              </li>
              <li>
                <a href="#services-branding" className="categories__link font-mono" onClick={(e) => handleAnchorClick(e, 'services-branding')}>
                  Брендинг
                </a>
              </li>
              <li>
                <a href="#services-sites" className="categories__link font-mono" onClick={(e) => handleAnchorClick(e, 'services-sites')}>
                  Сайты
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Dynamic Blurred Shader Canvas Backdrop */}
        <div className="page-constructor">
          <div className="page-constructor__bg isLoaded">
            <canvas id="gradient-canvas" width="1440" height="600" className="isLoaded"></canvas>
          </div>

          {/* 1. STRATEGY SECTION */}
          <section className="page-constructor__section">
            <div className="services-unified" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div className="block-padding block-padding_desktop" style={{ paddingTop: '117px' }}></div>
              <div className="block-padding block-padding_tablet" style={{ paddingTop: '146px' }}></div>
              <div className="block-padding block-padding_mobile" style={{ paddingTop: '57px' }}></div>
              
              <section id="services-strategy" className="services-section">
                <div className="services__text">
                  <h2 className="services__title"><TextReveal text="Стратегия" glitch={true} /></h2>
                  <p className="services__description">
                    Выстраиваем комплексный маркетинг услуг со стратегии. Она определяет эффективность performance и брендинга.
                  </p>
                </div>

                <div className="services__context-slider swiper-container">
                  <div 
                    ref={trackRefs.strategy}
                    onScroll={() => handleScroll('strategy')}
                    className="services__context-wrapper swiper-wrapper"
                  >
                    {/* Card 1: Marketing Strategy */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/strategy" className="services__card-container services__card-container-img">
                          <h3>Маркетинговая стратегия</h3>
                          <span className="services__card-price desctop">
                            От 900 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Долгосрочно развиваем бизнес через планы по улучшению продаж и продвижению.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 900 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/3LuWbO4vFz5rXLmfBA6fFedCstiyjjs4V7axiN9R.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/5aiLfmiFufjO85fWyOaYFYVpWQApnXRYEOgrsLjQ.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/L65oIntDVuHVVGvDjYwtncAlNdoL52ykpQ85SM58.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 2: Brand Strategy */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/branding" className="services__card-container services__card-container-img">
                          <h3>Бренд-стратегия</h3>
                          <span className="services__card-price desctop">
                            От 1 800 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Создаем сильный и узнаваемый бренд.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 1 800 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/5WtEGkofvsOFTQwdJZFmZEKOP5aUJRWBdPnUcm6f.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/fJ5Wj4IWyUeAird6zmnNifjZVbmZJstaSycuGa67.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/iRNt01BDzA0ochnwbwUv0ptuOiemQhEo9prooUqV.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 3: Stacked Text Cards (Communication & Content) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card_stack">
                        <div className="services__card">
                          <div className="services__card-ccccc">
                            <Link to="/service/corporate" className="services__card-container services__card-container-text">
                              <h3>Коммуникационная стратегия</h3>
                              <span className="services__card-price desctop">
                                От 1 500 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                План работы с аудиторией через контент-маркетинг и performance.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 1 500 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>

                        <div className="services__card" style={{ marginTop: '30px' }}>
                          <div className="services__card-ccccc">
                            <Link to="/service/corporate" className="services__card-container services__card-container-text">
                              <h3>Контент-стратегия</h3>
                              <span className="services__card-price desctop">
                                От 460 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Разрабатываем план развития контента.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 460 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Slide 4: Single Stacked Text Card */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card_stack">
                        <div className="services__card">
                          <div className="services__card-ccccc">
                            <Link to="/service/corporate" className="services__card-container services__card-container-text">
                              <h3>Мини-стратегия</h3>
                              <span className="services__card-price desctop">
                                От 250 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Разработка краткосрочной стратегии для быстрого запуска.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 250 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slider Arrow Controls */}
                  <div>
                    <button 
                      className={`swiper-button-next ${scrollStates.strategy.isEnd ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('strategy', 'right')}
                      aria-label="Next slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <button 
                      className={`swiper-button-prev ${scrollStates.strategy.isStart ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('strategy', 'left')}
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

          {/* 2. PROMOTION SECTION */}
          <section className="page-constructor__section">
            <div className="services-unified" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div className="block-padding block-padding_desktop" style={{ paddingTop: '222px' }}></div>
              <div className="block-padding block-padding_tablet" style={{ paddingTop: '171px' }}></div>
              <div className="block-padding block-padding_mobile" style={{ paddingTop: '100px' }}></div>

              <section id="services-promotion" className="services-section">
                <div className="services__text">
                  <h2 className="services__title"><TextReveal text="Продвижение" glitch={true} /></h2>
                  <p className="services__description">
                    Развиваем известность бренда через performance. Опираемся на исследования, тестируем гипотезы, масштабируем и максимизируем прибыль от маркетинга.
                  </p>
                </div>

                <div className="services__context-slider swiper-container">
                  <div 
                    ref={trackRefs.promotion}
                    onScroll={() => handleScroll('promotion')}
                    className="services__context-wrapper swiper-wrapper"
                  >
                    {/* Card 1: Complex Promotion */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/smm" className="services__card-container services__card-container-img">
                          <h3>Комплексное продвижение</h3>
                          <span className="services__card-price desctop">
                            От 300 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Доносим преимущества бренда до аудитории и увеличиваем конверсию через различные инструменты.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 300 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/5lXRPRmqGnKTGgJGa3g7Y3iPejliMrVuKDx8bpXp.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/XH6X8dd7nP4NZ1aAjTaerMwwGYvIlDWBnOrGhN77.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/50lqzMOLSnqh2D93CrmUgJu4xxPO24ipUD4PtTyF.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 2: Complex SMM */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/smm" className="services__card-container services__card-container-img">
                          <h3>Комплексный SMM</h3>
                          <span className="services__card-price desctop">
                            От 235 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Создаем сильный бренд, регулярно общаемся с аудиторией и отслеживаем ее путь от поста до покупки.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 235 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/WaD3ICf6YvMYCaDuNPSDnKv0sDfHyqM5NcJonrQj.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/62hhgcZoPWxIBS9y9CJOtkfD06VxptTHBuXvYusF.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/12PZ7ZZRMJmGygjbUdCQf4NxniSGS9yAB1OaP9IH.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 3: Contextual Ads */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/ppc" className="services__card-container services__card-container-img">
                          <h3>Контекстная реклама</h3>
                          <span className="services__card-price desctop">
                            От 107 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Увеличиваем трафик на сайт и доводим аудиторию до покупки.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 107 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/P59g84goAUdEc9h8xH9YpACf9T4jZqxQf5DxhESD.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/uJEVTMswdwntPfDGMjc9NshSj1zzC5KoEZslI9PS.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/F7Dv44rQ3onIMC4xd5vwQfqq044O5iHmQ5JBGHoH.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 4: Targeted Ads */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/smm" className="services__card-container services__card-container-img">
                          <h3>Таргетированная реклама</h3>
                          <span className="services__card-price desctop">
                            От 107 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Увеличиваем продажи с помощью соцсетей.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 107 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/jaGBzuO8PmLL7F6CC5KGu7ogXGyw061KZqzctj6d.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/45x4Djynue4IvMeJ2k2r63muNK6iPQQdn8dfE9n8.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 5: SEO */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/seo" className="services__card-container services__card-container-img">
                          <h3>SEO</h3>
                          <span className="services__card-price desctop">
                            От 120 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Оптимизируем сайт и выводим его в топ по релевантным запросам.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 120 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/F7Dv44rQ3onIMC4xd5vwQfqq044O5iHmQ5JBGHoH.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/Q39cUbMwyHvkoTijs7bmgPuEq1tyFEvboMNWPHO3.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 6: Stacked Text Cards (Maps & Dzen) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card_stack">
                        <div className="services__card">
                          <div className="services__card-ccccc">
                            <Link to="/service/seo" className="services__card-container services__card-container-text">
                              <h3>Продвижение в Яндекс Картах и 2ГИС</h3>
                              <span className="services__card-price desctop">
                                От 40 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Настраиваем георекламу и продвижение карточек, чтобы клиенты находили вас в картах.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 40 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>

                        <div className="services__card" style={{ marginTop: '30px' }}>
                          <div className="services__card-ccccc">
                            <Link to="/service/seo" className="services__card-container services__card-container-text">
                              <h3>Продвижение статей в Дзен/ПромоСтраницах</h3>
                              <span className="services__card-price desctop">
                                От 15 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Расскажем о вашем бизнесе через статьи, которые читают тысячи людей в нужных вам городах.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 15 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Slide 7: Stacked Text Cards (Analytics) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card_stack">
                        <div className="services__card">
                          <div className="services__card-ccccc">
                            <Link to="/service/seo" className="services__card-container services__card-container-text">
                              <h3>Сквозная аналитика</h3>
                              <span className="services__card-price desctop">
                                От 88 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Оптимизируем маркетинговые расходы и повышаем эффективность.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 88 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>

                        <div className="services__card" style={{ marginTop: '30px' }}>
                          <div className="services__card-ccccc">
                            <Link to="/service/seo" className="services__card-container services__card-container-text">
                              <h3>Бизнес-аналитика</h3>
                              <span className="services__card-price desctop">
                                От 108 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Оцениваем эффективность рекламы и рентабельность бизнеса.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 108 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slider controls */}
                  <div>
                    <button 
                      className={`swiper-button-next ${scrollStates.promotion.isEnd ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('promotion', 'right')}
                      aria-label="Next slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <button 
                      className={`swiper-button-prev ${scrollStates.promotion.isStart ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('promotion', 'left')}
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

          {/* 3. BRANDING SECTION */}
          <section className="page-constructor__section">
            <div className="services-unified" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div className="block-padding block-padding_desktop" style={{ paddingTop: '222px' }}></div>
              <div className="block-padding block-padding_tablet" style={{ paddingTop: '171px' }}></div>
              <div className="block-padding block-padding_mobile" style={{ paddingTop: '100px' }}></div>

              <section id="services-branding" className="services-section">
                <div className="services__text">
                  <h2 className="services__title"><TextReveal text="Брендинг" glitch={true} /></h2>
                  <p className="services__description">
                    Усиливаем performance цепляющим брендингом. Создаем дизайн для сайта, соцсетей и баннеров, контент-маркетинг в блог и сторонние площадки. Формируем положительный образ компании.
                  </p>
                </div>

                <div className="services__context-slider swiper-container">
                  <div 
                    ref={trackRefs.branding}
                    onScroll={() => handleScroll('branding')}
                    className="services__context-wrapper swiper-wrapper"
                  >
                    {/* Card 1: Brand style */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/identity" className="services__card-container services__card-container-img">
                          <h3>Фирменный стиль</h3>
                          <span className="services__card-price desctop">
                            От 350 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Разрабатываем логотип и элементы фирменного стиля, которые будут привлекать внимание и нравиться вашей аудитории.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 350 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/UkfvRNxNsscDlsDw9q4MxnYEZEnWUmoXDbZJJ5Aq.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/DgGkFva0xK8YacXI1YvJ8NVTFVwdmNWqFRTLpOik.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/5lEdSMmCqp3BzZM7VIqQeZyy026jhOwW8qw1XCQi.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 2: Naming */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/logo" className="services__card-container services__card-container-img">
                          <h3>Нейминг</h3>
                          <span className="services__card-price desctop">
                            От 189 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Создаем цепляющее название, слоган или дескриптор.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 189 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/FgvCOx6yCrzMr47skHUmU3hQBPT7MoebjqrJZi79.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/36MyNZU3fZVRSkp9ftxtScqt0GC2uM9oTdLvLOWL.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/blMKEDH5TKLwSnHTfnuRutHSwona3MdvaQUkXTbS.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 3: Content Marketing */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/logo" className="services__card-container services__card-container-img">
                          <h3>Контент-маркетинг</h3>
                          <span className="services__card-price desctop">
                            От 450 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Исследуем нишу компании и формируем вокруг бренда аудиторию, которая рекомендует вас другим.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 450 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/wawgPlsg9pEaCjRTVDDIkmMBHelubInUEF624zE8.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/jblNXuTUR2xBWb8zMozHOIVQHCGuAxahUPnM5lfj.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/otpjA6B5pBu5jIAlGvFLhc9FC9v9OtCLjP7YGdb8.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 4: Stacked Text Cards (PR & Influence) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card_stack">
                        <div className="services__card">
                          <div className="services__card-ccccc">
                            <Link to="/service/identity" className="services__card-container services__card-container-text">
                              <h3>PR-продвижение</h3>
                              <span className="services__card-price desctop">
                                От 262 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Находим СМИ, которые читает ваша аудитория, продумываем инфоповоды.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 262 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>

                        <div className="services__card" style={{ marginTop: '30px' }}>
                          <div className="services__card-ccccc">
                            <Link to="/service/identity" className="services__card-container services__card-container-text">
                              <h3>Influence-маркетинг</h3>
                              <span className="services__card-price desctop">
                                От 122 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Подбираем лидеров мнений для партнерства и взаимодействуем.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 122 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card 5: Photo and Video */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/identity" className="services__card-container services__card-container-img">
                          <h3>Фото и видео</h3>
                          <span className="services__card-price desctop">
                            От 107 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Создаем цепляющие видео и фото для решения маркетинговых задач. Улучшаем репутацию бренда.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 107 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/FkOjC1n11Xn1I0Yf635EjEDrqjLAw0nPgztmyP7b.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/s8UtweiSsFTik8ptmoRj3BcrvatU62r2kEizGS4i.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/THcZCdwQ1gvzOsyaHlJIOHJ4J4Vx5tVwUt95Z2NZ.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 6: Stacked Text Cards (Blogging & Email) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card_stack">
                        <div className="services__card">
                          <div className="services__card-ccccc">
                            <Link to="/service/identity" className="services__card-container services__card-container-text">
                              <h3>Ведение блога</h3>
                              <span className="services__card-price desctop">
                                От 166 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Берем ведение корпоративного блога на себя. Знакомим читателей с культурой и услугами компании.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 166 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>

                        <div className="services__card" style={{ marginTop: '30px' }}>
                          <div className="services__card-ccccc">
                            <Link to="/service/identity" className="services__card-container services__card-container-text">
                              <h3>Email-маркетинг</h3>
                              <span className="services__card-price desctop">
                                От 150 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Разрабатываем цепочки писем для удержания и дожима клиентов.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 150 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slider controls */}
                  <div>
                    <button 
                      className={`swiper-button-next ${scrollStates.branding.isEnd ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('branding', 'right')}
                      aria-label="Next slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <button 
                      className={`swiper-button-prev ${scrollStates.branding.isStart ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('branding', 'left')}
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

          {/* 4. SITES SECTION */}
          <section className="page-constructor__section">
            <div className="services-unified" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div className="block-padding block-padding_desktop" style={{ paddingTop: '222px' }}></div>
              <div className="block-padding block-padding_tablet" style={{ paddingTop: '171px' }}></div>
              <div className="block-padding block-padding_mobile" style={{ paddingTop: '100px' }}></div>

              <section id="services-sites" className="services-section">
                <div className="services__text">
                  <h2 className="services__title"><TextReveal text="Сайты" glitch={true} /></h2>
                  <p className="services__description">
                    Разрабатываем лендинги, корпоративные сайты и интернет-магазины. Увеличиваем конверсию за счёт продуманной структуры и дизайна, интеграций и аналитики. Обеспечиваем поддержку и развитие проектов, чтобы сайт оставался удобным, современным и эффективным инструментом продаж.
                  </p>
                </div>

                <div className="services__context-slider swiper-container">
                  <div 
                    ref={trackRefs.sites}
                    onScroll={() => handleScroll('sites')}
                    className="services__context-wrapper swiper-wrapper"
                  >
                    {/* Card 1: Production (Sites hub) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/corporate" className="services__card-container services__card-container-img">
                          <h3>Сайты</h3>
                          <span className="services__card-price desctop">
                            От 230 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Создаем сайты, помогающие раскрыть бренд, влюбить в себя клиентов, увеличить продажи продуктов и услуг.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 230 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/Pkepine6uqomDZTEBqhsyRNddwsB0Eu58pU3wPta.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/dvVPWfPJlPVoMskov1IAE8MgTR753bmJN585qwbU.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/jlq5GzTFrVsl6YYcmcKnSGt9KEUXjXUlqZpWHR95.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 2: Corporate website */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/corporate" className="services__card-container services__card-container-img">
                          <h3>Корпоративный сайт</h3>
                          <span className="services__card-price desctop">
                            От 400 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Создаем сайты, которые раскрывают бренд и налаживают контакт с покупателями.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 400 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/f9Hhn2LGZUyUjqjbXqimhpGTzASauJRa8QVWhS1x.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/UlTOttwFc8eb9KTdvv3LJ42gPNf8g7aTk2v9LWOR.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/QnFEscWsmi07hzfBYMM9KrQ0uiNv3UA2QRiSh2mV.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 3: Tilda Landing */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/landing" className="services__card-container services__card-container-img">
                          <h3>Лендинг на Tilda</h3>
                          <span className="services__card-price desctop">
                            От 150 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Создаем лендинги для тестирований бизнес-идей и получения быстрых результатов.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 150 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/dTFdRhd5QNaLGlFXEeBwO0PKMvMFFyYTwsfqygUG.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/oj3jhMngW54bYhlgy09DXECjyJN8ogjnSy47KDVy.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/jaGBzuO8PmLL7F6CC5KGu7ogXGyw061KZqzctj6d.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Card 4: Shop */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/service/shop" className="services__card-container services__card-container-img">
                          <h3>Интернет-магазин</h3>
                          <span className="services__card-price desctop">
                            От 600 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Разрабатываем большие каталоги с глубокой аналитикой и простой оплатой.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 600 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/45x4Djynue4IvMeJ2k2r63muNK6iPQQdn8dfE9n8.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/Q39cUbMwyHvkoTijs7bmgPuEq1tyFEvboMNWPHO3.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Slide 5: Stacked Text Cards (Conversion & Support) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card_stack">
                        <div className="services__card">
                          <div className="services__card-ccccc">
                            <Link to="/service/interface" className="services__card-container services__card-container-text">
                              <h3>Увеличение конверсии сайта</h3>
                              <span className="services__card-price desctop">
                                От 55 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Даём рекомендации по улучшению сайта, чтобы повысить конверсию.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 55 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>

                        <div className="services__card" style={{ marginTop: '30px' }}>
                          <div className="services__card-ccccc">
                            <Link to="/service/support" className="services__card-container services__card-container-text">
                              <h3>Техническая поддержка сайта</h3>
                              <span className="services__card-price desctop">
                                От 47 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Обеспечиваем стабильную работу сайта: быстро исправляем ошибки и обновляем функционал.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 47 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Slide 6: Single Stacked Text Card (AI) */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card_stack">
                        <div className="services__card">
                          <div className="services__card-ccccc">
                            <Link to="/service/app" className="services__card-container services__card-container-text">
                              <h3>Внедрение ИИ в бизнес</h3>
                              <span className="services__card-price desctop">
                                От 60 000 <span className="rooble">₽</span>
                              </span>
                              <p className="services__card-description services__card-description-animation">
                                Внедряем интеллектуальные цифровые системы, интегрированные в реальные процессы компании.
                              </p>
                              <span className="services__card-price tablet-mobile">
                                От 60 000 <span className="rooble">₽</span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slider controls */}
                  <div>
                    <button 
                      className={`swiper-button-next ${scrollStates.sites.isEnd ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('sites', 'right')}
                      aria-label="Next slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <button 
                      className={`swiper-button-prev ${scrollStates.sites.isStart ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('sites', 'left')}
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

          {/* 5. INDUSTRY SOLUTIONS (No Anchor Link) */}
          <section className="page-constructor__section">
            <div className="services-unified" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div className="block-padding block-padding_desktop" style={{ paddingTop: '90px' }}></div>
              <div className="block-padding block-padding_tablet" style={{ paddingTop: '68px' }}></div>
              <div className="block-padding block-padding_mobile" style={{ paddingTop: '48px' }}></div>

              <section className="services-section">
                <div className="services__text">
                  <h2 className="services__title"><TextReveal text="Отраслевые решения" glitch={true} /></h2>
                  <p className="services__description">
                    Каждая сфера имеет свою специфику продуктов и продвижении. Мы ведем комплексный маркетинг услуг для рынка E-commerce, медицинских организаций, недвижимости и IT-продуктов.
                  </p>
                </div>

                <div className="services__context-slider swiper-container">
                  <div 
                    ref={trackRefs.industries}
                    onScroll={() => handleScroll('industries')}
                    className="services__context-wrapper swiper-wrapper"
                  >
                    {/* Industry 1: Medicine */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/contacts" className="services__card-container services__card-container-img">
                          <h3>Маркетинг для медицины</h3>
                          <span className="services__card-price desctop">
                            От 600 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Продвигаем клиники и врачей, привлекаем пациентов, учитывая юридические нюансы.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 600 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/aOjVUqDTRLSYOBhjrxYzg0gFlqwBian9ej9hK863.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/StfDMsdJnZ8woAfjFq8vXEPw0o5FYPoDTgSjbEyJ.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/0MrOsIUKYsyjHRCkZzfNPkaLiFu51GhHxEUOFttx.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Industry 2: Real estate */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/contacts" className="services__card-container services__card-container-img">
                          <h3>Маркетинг для недвижимости</h3>
                          <span className="services__card-price desctop">
                            От 600 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Выделяем риелторов и застройщиков среди конкурентов, привлекаем заявки и доводим до покупки.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 600 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/XCHlOrAS3SbxMF1IhxmTWUyoBrxV3CthrxNqbfu6.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/Hbb3ri0FXJDWm1NNIfrKVyeKDJ4ATe4L1tCpK82X.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/MTYv3Aoh2CSamTyQtkvLBBDyUBAWfbNo6fPzbwhF.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Industry 3: IT */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/contacts" className="services__card-container services__card-container-img">
                          <h3>Маркетинг для IT</h3>
                          <span className="services__card-price desctop">
                            От 850 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Исследуем рынок IT-услуг, упаковываем продукт, увеличиваем узнаваемость и клиентскую базу.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 850 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/jL5GcF8qpwKEbfrx3kGh2Fb4toXtbVPf7JdnjWEP.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/P59g84goAUdEc9h8xH9YpACf9T4jZqxQf5DxhESD.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/uJEVTMswdwntPfDGMjc9NshSj1zzC5KoEZslI9PS.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Industry 4: Ecom */}
                    <div className="services__slide swiper-slide">
                      <div className="services__card">
                        <Link to="/contacts" className="services__card-container services__card-container-img">
                          <h3>Маркетинг для E-commerce</h3>
                          <span className="services__card-price desctop">
                            От 595 000 <span className="rooble">₽</span>
                          </span>
                          <p className="services__card-description services__card-description-animation">
                            Развиваем проекты электронной торговли, увеличиваем продажи интернет-магазинов и маркетплейсов.
                          </p>
                          <span className="services__card-price tablet-mobile">
                            От 595 000 <span className="rooble">₽</span>
                          </span>
                          <div className="services__card-img-wr">
                            <img src="/_sa/img/services/xQFFOjjcUlgfmfulYkneuAqyu0hh85oobv8FlCVy.png" alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                            <img src="/_sa/img/services/htv6S2Dm9EREEWcf9ERrwwXVWSahJsCwsUMPJK2v.png" alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                            <img src="/_sa/img/services/F7Dv44rQ3onIMC4xd5vwQfqq044O5iHmQ5JBGHoH.png" alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Slider controls */}
                  <div>
                    <button 
                      className={`swiper-button-next ${scrollStates.industries.isEnd ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('industries', 'right')}
                      aria-label="Next slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <button 
                      className={`swiper-button-prev ${scrollStates.industries.isStart ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('industries', 'left')}
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

          {/* Separator Section */}
          <section className="page-constructor__section">
            <div>
              <section className="seporator-section">
                <div className="seporator-section__liner"></div>
              </section>
            </div>
          </section>

          {/* 6. CASES SECTION */}
          <section className="page-constructor__section">
            <div className="services-unified" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div className="block-padding block-padding_desktop" style={{ paddingTop: '90px' }}></div>
              <div className="block-padding block-padding_tablet" style={{ paddingTop: '68px' }}></div>
              <div className="block-padding block-padding_mobile" style={{ paddingTop: '48px' }}></div>

              <section className="services-section">
                <div className="services__text">
                  <h2 className="services__title"><TextReveal text="Кейсы комплексного маркетинга" glitch={true} /></h2>
                </div>

                <div className="services__context-slider swiper-container">
                  <div 
                    ref={trackRefs.cases}
                    onScroll={() => handleScroll('cases')}
                    className="services__context-wrapper swiper-wrapper"
                  >
                    {/* Case 1: Darkrain */}
                    <div className="swiper-slide mor-cases-slide" style={{ backgroundImage: "url('/_sa/img/storage__WLXF5HzKVQUYRIDLQ7zOSRVDwZw17ziScjgTQABI.jpg')" }}>
                      <Link to="/works" className="mor-cases-slide__link">
                        <p className="mor-cases-slide__text">
                          С 2018 развиваем интернет-магазин и реализуем комплексное продвижение бренда украшений Darkrain
                        </p>
                      </Link>
                    </div>

                    {/* Case 2: Boca */}
                    <div className="swiper-slide mor-cases-slide" style={{ backgroundImage: "url('/_sa/img/storage__fcinfNVrWIvITcJr2rUpiKLo7K4C8Oif44dl5Kjs.webp')" }}>
                      <Link to="/works" className="mor-cases-slide__link">
                        <p className="mor-cases-slide__text">
                          Увеличили продажи с помощью инструментов контекстной и георекламы
                        </p>
                      </Link>
                    </div>

                    {/* Case 3: Medical холдинг */}
                    <div className="swiper-slide mor-cases-slide" style={{ backgroundImage: "url('/_sa/img/storage__AndTNWYK9X0q8jK1uKSkDrOF4PAEKyfO91k2aqI5.webp')" }}>
                      <Link to="/works" className="mor-cases-slide__link">
                        <p className="mor-cases-slide__text">
                          Комплексное продвижение medical холдинга
                        </p>
                      </Link>
                    </div>

                    {/* Case 4: Eurostroy */}
                    <div className="swiper-slide mor-cases-slide" style={{ backgroundImage: "url('/_sa/img/storage__eEn5z5K1VqnFurjwT6vHFhSyHwKolEzUF41JawC9.jpg')" }}>
                      <Link to="/works" className="mor-cases-slide__link">
                        <p className="mor-cases-slide__text">
                          На 30% увеличили число конверсий для «Евростроя»
                        </p>
                      </Link>
                    </div>

                    {/* Case 5: Orange */}
                    <div className="swiper-slide mor-cases-slide" style={{ backgroundImage: "url('/_sa/img/storage__gxMhco4GICqvNHFrpJgfjadii3akfWNphHHA44Zr.jpg')" }}>
                      <Link to="/works" className="mor-cases-slide__link">
                        <p className="mor-cases-slide__text">
                          Вывели международного интегратора IT-сервисов Orange в digital в России
                        </p>
                      </Link>
                    </div>

                    {/* Case 6: Cromi */}
                    <div className="swiper-slide mor-cases-slide" style={{ backgroundImage: "url('/_sa/img/storage__chL4LbnmmiU2maPGxKZgbFOkCsbzoA5kgg4YSpUh.jpg')" }}>
                      <Link to="/works" className="mor-cases-slide__link">
                        <p className="mor-cases-slide__text">
                          Новый бренд и сайт для дистрибьютора звукового оборудования Cromi
                        </p>
                      </Link>
                    </div>

                    {/* Case 7: VoMoloko */}
                    <div className="swiper-slide mor-cases-slide" style={{ backgroundImage: "url('/_sa/img/storage__ixkjBrB1pCELGeNMCtA8BgK78AYiofKaJhJch2zK.jpg')" }}>
                      <Link to="/works" className="mor-cases-slide__link">
                        <p className="mor-cases-slide__text mor-cases-slide__text_black">
                          Обновили образ бренда и привлекли покупателей для дистрибьютера «Во!Молоко»
                        </p>
                      </Link>
                    </div>

                    {/* Case 8: Skladno */}
                    <div className="swiper-slide mor-cases-slide" style={{ backgroundImage: "url('/_sa/img/storage__qaCLQ6fqiMYmxsozvWrmZGiALhEHrhOemSYToCyR.jpg')" }}>
                      <Link to="/works" className="mor-cases-slide__link">
                        <p className="mor-cases-slide__text">
                          В 6 раз окупили вложения в маркетинг для «Складно»
                        </p>
                      </Link>
                    </div>

                    {/* Case Last Link */}
                    <div className="swiper-slide mor-cases-slide mor-cases-slide_link">
                      <p className="more-cases-slider__slide-link">
                        <Link to="/works">Смотреть больше кейсов</Link>
                      </p>
                    </div>
                  </div>

                  {/* Slider controls */}
                  <div>
                    <button 
                      className={`swiper-button-next ${scrollStates.cases.isEnd ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('cases', 'right')}
                      aria-label="Next slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <button 
                      className={`swiper-button-prev ${scrollStates.cases.isStart ? 'swiper-button-disabled' : ''}`}
                      onClick={() => scrollTrack('cases', 'left')}
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

          {/* 7. CLIENTS SECTION */}
          <section className="page-constructor__section">
            <div className="clients-wrapper clients-mainstr clients-wrapper_main-structure">
              <div className="clients-new-section home-between">
                <div className="clients-new home-ledge">
                  <h2 className="home-clients-awards__title"><TextReveal text="Наши клиенты" glitch={true} /></h2>
                  <div className="swiper-buttons-clients">
                    <button 
                      className={`swiper-button-prev-clients ${scrollStates.clients.isStart ? 'swiper-button-disabled-custom' : ''}`}
                      onClick={() => scrollTrack('clients', 'left')}
                      aria-label="Previous slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <button 
                      className={`swiper-button-next-clients ${scrollStates.clients.isEnd ? 'swiper-button-disabled-custom' : ''}`}
                      onClick={() => scrollTrack('clients', 'right')}
                      aria-label="Next slide"
                    >
                      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.39844 0.900391L10.5908 10.0928L1.39844 19.2852" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div 
                  ref={trackRefs.clients}
                  onScroll={() => handleScroll('clients')}
                  className="swiper-container swiper-container-clients-new"
                >
                  <div className="swiper-wrapper clients-new__context-wrapper">
                    {/* Client Logos */}
                    <div className="swiper-slide clients-new__slide">
                      <img src="/_sa/img/storage__mtsBTKBo2pcgymTuOBVX2TH40nBNPWpwZACScRMg.png" alt="MTS" loading="lazy" />
                    </div>
                    <div className="swiper-slide clients-new__slide">
                      <img src="/_sa/img/storage__T0iEKGWlNMfQ9nL1Sukiu40aYVGzlwE3MwklJFZ7.png" alt="T0i" loading="lazy" />
                    </div>
                    <div className="swiper-slide clients-new__slide">
                      <img src="/_sa/img/storage__48eY8HtiowBxzmSHd4CppIf3uiamDHFxKTeIhHBQ.png" alt="48e" loading="lazy" />
                    </div>
                    <div className="swiper-slide clients-new__slide">
                      <img src="/_sa/img/storage__QfyxZ8bEL5NTkfkRPolKdC1eOsuKWtRagVlEgmTp.png" alt="Qfy" loading="lazy" />
                    </div>
                    <div className="swiper-slide clients-new__slide">
                      <img src="/_sa/img/storage__di6OvWVvImeiVprIQOsnSThMtQArzCThnt9aNQHl.png" alt="Volvo Penta" loading="lazy" />
                    </div>
                    <div className="swiper-slide clients-new__slide">
                      <img src="/_sa/img/storage__U2ZXSKj2Xd41ig5teXMv2vMMlLlDEI5z7bRf78HV.svg" alt="U2Z" loading="lazy" />
                    </div>
                    <div className="swiper-slide clients-new__slide">
                      <img src="/_sa/img/storage__VYilJPLPBBeu4APyQHjwOyBQPS93Tahs75rGmk8w.svg" alt="VYi" loading="lazy" />
                    </div>
                    <div className="swiper-slide clients-new__slide">
                      <img src="/_sa/img/storage__bR5c6wK4E0fnHM77iHDSUFS4S0A3h99BlK4LRSYG.png" alt="Orange" loading="lazy" />
                    </div>
                    <div className="swiper-slide clients-new__slide">
                      <img src="/_sa/img/storage__PGi2bChOs2bXV2X4tL3pLVtNqreYGocLWQJwqX0V.png" alt="PGi" loading="lazy" />
                    </div>
                    <div className="swiper-slide clients-new__slide">
                      <img src="/_sa/img/storage__b19c5BeePbOyZZRh25xCqnZhmRzHvHuvtOOOE66Y.png" alt="b19" loading="lazy" />
                    </div>
                    <div className="swiper-slide clients-new__slide">
                      <img src="/_sa/img/storage__NROwzT3nByfcmr5WtQFlPRD1nlfL3VxceucgN1C3.png" alt="NRO" loading="lazy" />
                    </div>
                    <div className="swiper-slide clients-new__slide">
                      <img src="/_sa/img/storage__sCAHr1EVxx63n932wlgY12N3VvOym4rB0595WOJG.png" alt="sCA" loading="lazy" />
                    </div>
                  </div>
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
