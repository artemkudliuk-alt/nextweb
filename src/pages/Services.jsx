import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import TextReveal from '../components/TextReveal';

// Icon Components for each service card
const Icons = {
  card: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 12h8M8 16h5"/><circle cx="6" cy="8" r="1" fill="currentColor"/>
    </svg>
  ),
  showcase: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  landing: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h8"/>
    </svg>
  ),
  corporate: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M9 21V7l6-4v18M9 11h6"/>
    </svg>
  ),
  portal: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  interface: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.5 7 7.5 1-5.5 5.4 1.3 7.6L12 20l-6.8 3 1.3-7.6L1 10l7.5-1z"/>
    </svg>
  ),
  shop: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  app: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  logo: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 3.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  ),
  identity: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 20v-8.5M12 20H6l-2-4 6-2.5M12 20h6l2-4-6-2.5"/>
    </svg>
  ),
  seo: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
    </svg>
  ),
  ppc: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  smm: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  support: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  audit: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  'ux-ui': () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  devops: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  hourly: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  consulting: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  copywriting: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  analytics: () => (
    <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  )
};

// Data Arrays for Service Cards
const developmentCards = [
  {
    id: 'card',
    title: 'Сайт-визитка',
    price: 'От $1 500',
    desc: 'Простой и эффективный сайт для быстрого старта, презентации компании, услуг или продукта.',
    tags: ['React', 'Vite', 'SEO', 'Responsive'],
    bullets: ['Разработка ТЗ и структуры', 'Дизайн ключевых блоков', 'Адаптивная верстка'],
    images: {
      desc: '/_sa/img/services/3LuWbO4vFz5rXLmfBA6fFedCstiyjjs4V7axiN9R.png',
      tablet: '/_sa/img/services/5aiLfmiFufjO85fWyOaYFYVpWQApnXRYEOgrsLjQ.png',
      mobile: '/_sa/img/services/L65oIntDVuHVVGvDjYwtncAlNdoL52ykpQ85SM58.png'
    }
  },
  {
    id: 'showcase',
    title: 'Сайт-витрина',
    price: 'От $3 000',
    desc: 'Онлайн-каталог товаров или услуг с подробным описанием и возможностью быстрой связи.',
    tags: ['Next.js', 'Catalog', 'Fast Load', 'Filters'],
    bullets: ['Каталог с фильтрами', 'Оптимизация производительности', 'Интеграция систем связи'],
    images: {
      desc: '/_sa/img/services/Pkepine6uqomDZTEBqhsyRNddwsB0Eu58pU3wPta.png',
      tablet: '/_sa/img/services/dvVPWfPJlPVoMskov1IAE8MgTR753bmJN585qwbU.png',
      mobile: '/_sa/img/services/jlq5GzTFrVsl6YYcmcKnSGt9KEUXjXUlqZpWHR95.png'
    }
  },
  {
    id: 'landing',
    title: 'Landing Page',
    price: 'От $2 000',
    desc: 'Одностраничный сайт с высокой конверсией, спроектированный под конкретное целевое действие.',
    tags: ['High CR', 'A/B Test', 'Framer Motion'],
    bullets: ['Маркетинговый анализ', 'Проектирование структуры', 'Интеграция аналитики'],
    images: {
      desc: '/_sa/img/services/dTFdRhd5QNaLGlFXEeBwO0PKMvMFFyYTwsfqygUG.png',
      tablet: '/_sa/img/services/oj3jhMngW54bYhlgy09DXECjyJN8ogjnSy47KDVy.png',
      mobile: '/_sa/img/services/jaGBzuO8PmLL7F6CC5KGu7ogXGyw061KZqzctj6d.png'
    }
  },
  {
    id: 'corporate',
    title: 'Корпоративный сайт',
    price: 'От $6 000',
    desc: 'Многофункциональный ресурс компании для укрепления имиджа, автоматизации процессов и привлечения клиентов.',
    tags: ['CMS', 'Jira', 'Agile', 'Security'],
    bullets: ['Интерактивная архитектура', 'Укрепление имиджа', 'Интеграция CRM-систем'],
    images: {
      desc: '/_sa/img/services/f9Hhn2LGZUyUjqjbXqimhpGTzASauJRa8QVWhS1x.png',
      tablet: '/_sa/img/services/UlTOttwFc8eb9KTdvv3LJ42gPNf8g7aTk2v9LWOR.png',
      mobile: '/_sa/img/services/QnFEscWsmi07hzfBYMM9KrQ0uiNv3UA2QRiSh2mV.png'
    }
  },
  {
    id: 'portal',
    title: 'Веб-портал',
    price: 'От $12 000',
    desc: 'Сложная информационная система с личными кабинетами, базами данных и высокой нагрузкой.',
    tags: ['SaaS', 'Database', 'High Load', 'Secure API'],
    bullets: ['Сложная архитектура БД', 'Личные кабинеты', 'Оптимизация под нагрузки'],
    images: {
      desc: '/_sa/img/services/5WtEGkofvsOFTQwdJZFmZEKOP5aUJRWBdPnUcm6f.png',
      tablet: '/_sa/img/services/fJ5Wj4IWyUeAird6zmnNifjZVbmZJstaSycuGa67.png',
      mobile: '/_sa/img/services/iRNt01BDzA0ochnwbwUv0ptuOiemQhEo9prooUqV.png'
    }
  },
  {
    id: 'interface',
    title: 'Проектирование интерфейсов',
    price: 'От $2 500',
    desc: 'Разработка UX/UI архитектуры, кликабельных прототипов и логики взаимодействия пользователя.',
    tags: ['Figma', 'UX Audit', 'Wireframes', 'C4 Model'],
    bullets: ['UX/UI проектирование', 'Интерактивные прототипы', 'Юзабилити-тестирование'],
    images: {
      desc: '/_sa/img/services/FgvCOx6yCrzMr47skHUmU3hQBPT7MoebjqrJZi79.png',
      tablet: '/_sa/img/services/36MyNZU3fZVRSkp9ftxtScqt0GC2uM9oTdLvLOWL.png',
      mobile: '/_sa/img/services/blMKEDH5TKLwSnHTfnuRutHSwona3MdvaQUkXTbS.png'
    }
  },
  {
    id: 'shop',
    title: 'Интернет-магазин',
    price: 'От $8 000',
    desc: 'Полноценная торговая площадка с интеграцией платежных систем, CRM, служб доставки и каталогов.',
    tags: ['Stripe', 'CRM Integration', 'Delivery', 'SEO'],
    bullets: ['Интеграция корзины и оплаты', 'Настройка личного кабинета', 'Каталоги и службы доставки'],
    images: {
      desc: '/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png',
      tablet: '/_sa/img/services/45x4Djynue4IvMeJ2k2r63muNK6iPQQdn8dfE9n8.png',
      mobile: '/_sa/img/services/Q39cUbMwyHvkoTijs7bmgPuEq1tyFEvboMNWPHO3.png'
    }
  },
  {
    id: 'app',
    title: 'Веб-приложение',
    price: 'От $10 000',
    desc: 'Интерактивный веб-сервис (SaaS, дашборды, личные кабинеты) с уникальным бизнес-функционалом.',
    tags: ['SaaS', 'Dashboard', 'WebSockets', 'REST API'],
    bullets: ['Бизнес-функционал', 'Интеграция API', 'Real-time дашборды'],
    images: {
      desc: '/_sa/img/services/UkfvRNxNsscDlsDw9q4MxnYEZEnWUmoXDbZJJ5Aq.png',
      tablet: '/_sa/img/services/DgGkFva0xK8YacXI1YvJ8NVTFVwdmNWqFRTLpOik.png',
      mobile: '/_sa/img/services/5lEdSMmCqp3BzZM7VIqQeZyy026jhOwW8qw1XCQi.png'
    }
  }
];

const brandingMarketingCards = [
  {
    id: 'logo',
    title: 'Разработка логотипа',
    price: 'От $2 000',
    desc: 'Создание уникального логотипа, который выделит компанию среди конкурентов и запомнится аудитории.',
    tags: ['Vector', 'Brandbook', '3 Concepts', 'Source Files'],
    bullets: ['Анализ рынка и конкурентов', '3 уникальных концепта', 'Подготовка исходных файлов'],
    images: {
      desc: '/_sa/img/services/FgvCOx6yCrzMr47skHUmU3hQBPT7MoebjqrJZi79.png',
      tablet: '/_sa/img/services/36MyNZU3fZVRSkp9ftxtScqt0GC2uM9oTdLvLOWL.png',
      mobile: '/_sa/img/services/blMKEDH5TKLwSnHTfnuRutHSwona3MdvaQUkXTbS.png'
    }
  },
  {
    id: 'identity',
    title: 'Фирменный стиль',
    price: 'От $3 500',
    desc: 'Разработка единой визуальной системы бренда: шрифты, цвета, полиграфия и брендбук.',
    tags: ['Guidelines', 'Colors', 'Stationery', 'Social Media'],
    bullets: ['Разработка дизайн-системы', 'Фирменные цвета и шрифты', 'Создание полного брендбука'],
    images: {
      desc: '/_sa/img/services/UkfvRNxNsscDlsDw9q4MxnYEZEnWUmoXDbZJJ5Aq.png',
      tablet: '/_sa/img/services/DgGkFva0xK8YacXI1YvJ8NVTFVwdmNWqFRTLpOik.png',
      mobile: '/_sa/img/services/5lEdSMmCqp3BzZM7VIqQeZyy026jhOwW8qw1XCQi.png'
    }
  },
  {
    id: 'seo',
    title: 'SEO-оптимизация',
    price: 'От $1 500',
    desc: 'Комплексное поисковое продвижение для вывода сайта в топ Яндекса и Google, привлечение органического трафика.',
    tags: ['Audit', 'Linkbuilding', 'Keywords', 'GA4'],
    bullets: ['Технический SEO-аудит', 'Сбор семантического ядра', 'Внешнее продвижение'],
    images: {
      desc: '/_sa/img/services/F7Dv44rQ3onIMC4xd5vwQfqq044O5iHmQ5JBGHoH.png',
      tablet: '/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png',
      mobile: '/_sa/img/services/Q39cUbMwyHvkoTijs7bmgPuEq1tyFEvboMNWPHO3.png'
    }
  },
  {
    id: 'ppc',
    title: 'Контекстная реклама',
    price: 'От $1 000',
    desc: 'Настройка и ведение рекламных кампаний в Яндекс.Директ для быстрого получения целевых заявок.',
    tags: ['Yandex.Direct', 'Google Ads', 'ROI', 'Analytics'],
    bullets: ['Настройка кабинета', 'Анализ конкурентных ставок', 'Аналитика конверсий'],
    images: {
      desc: '/_sa/img/services/P59g84goAUdEc9h8xH9YpACf9T4jZqxQf5DxhESD.png',
      tablet: '/_sa/img/services/uJEVTMswdwntPfDGMjc9NshSj1zzC5KoEZslI9PS.png',
      mobile: '/_sa/img/services/F7Dv44rQ3onIMC4xd5vwQfqq044O5iHmQ5JBGHoH.png'
    }
  },
  {
    id: 'smm',
    title: 'SMM-продвижение',
    price: 'От $2 500',
    desc: 'Продвижение бренда в социальных сетях, создание вовлекающего контента, дизайн сообществ и таргетированная реклама.',
    tags: ['Instagram', 'Telegram', 'Content Plan', 'Design'],
    bullets: ['Составление контент-плана', 'Дизайн сообществ и постов', 'Таргетированная реклама'],
    images: {
      desc: '/_sa/img/services/5lXRPRmqGnKTGgJGa3g7Y3iPejliMrVuKDx8bpXp.png',
      tablet: '/_sa/img/services/XH6X8dd7nP4NZ1aAjTaerMwwGYvIlDWBnOrGhN77.png',
      mobile: '/_sa/img/services/50lqzMOLSnqh2D93CrmUgJu4xxPO24ipUD4PtTyF.png'
    }
  }
];

const supportOperationsCards = [
  {
    id: 'support',
    title: 'Поддержка сайтов',
    price: 'От $200 / мес.',
    desc: 'Комплексное техническое и информационное обслуживание вашего ресурса. Бесперебойная работа и доработка функционала.',
    tags: ['24/7 Monitor', 'Bugfix', 'Updates', 'Backups'],
    bullets: ['Мониторинг работоспособности', 'Быстрое устранение ошибок', 'Резервное копирование'],
    images: {
      desc: '/_sa/img/services/UkfvRNxNsscDlsDw9q4MxnYEZEnWUmoXDbZJJ5Aq.png',
      tablet: '/_sa/img/services/DgGkFva0xK8YacXI1YvJ8NVTFVwdmNWqFRTLpOik.png',
      mobile: '/_sa/img/services/5lEdSMmCqp3BzZM7VIqQeZyy026jhOwW8qw1XCQi.png'
    }
  },
  {
    id: 'audit',
    title: 'Технический аудит',
    price: 'От $500',
    desc: 'Глубокий анализ кода, скорости загрузки, серверной архитектуры, SEO-ошибок и уязвимостей.',
    tags: ['Code Audit', 'Load Test', 'SEO Audit', 'Security'],
    bullets: ['Анализ серверной архитектуры', 'Проверка безопасности', 'Оптимизация скорости'],
    images: {
      desc: '/_sa/img/services/P59g84goAUdEc9h8xH9YpACf9T4jZqxQf5DxhESD.png',
      tablet: '/_sa/img/services/P59g84goAUdEc9h8xH9YpACf9T4jZqxQf5DxhESD.png',
      mobile: '/_sa/img/services/P59g84goAUdEc9h8xH9YpACf9T4jZqxQf5DxhESD.png'
    }
  },
  {
    id: 'ux-ui',
    title: 'UX/UI консалтинг',
    price: 'От $600',
    desc: 'Аудит юзабилити интерфейса сайта или приложения. Поиск причин низкой конверсии и брошенных корзин.',
    tags: ['Figma', 'Usability', 'C4 Model', 'Wireframes'],
    bullets: ['Аудит путей пользователя', 'Поиск барьеров конверсии', 'Рекомендации по доработкам'],
    images: {
      desc: '/_sa/img/services/FgvCOx6yCrzMr47skHUmU3hQBPT7MoebjqrJZi79.png',
      tablet: '/_sa/img/services/FgvCOx6yCrzMr47skHUmU3hQBPT7MoebjqrJZi79.png',
      mobile: '/_sa/img/services/FgvCOx6yCrzMr47skHUmU3hQBPT7MoebjqrJZi79.png'
    }
  },
  {
    id: 'devops',
    title: 'DevOps и облака',
    price: 'От $800',
    desc: 'Настройка серверов (AWS, GCP, DO), контейнеризация Docker/Kubernetes, мониторинг и CI/CD автоматизация.',
    tags: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'],
    bullets: ['Контейнеризация приложений', 'Настройка CI/CD пайплайнов', 'Масштабирование серверов'],
    images: {
      desc: '/_sa/img/services/5WtEGkofvsOFTQwdJZFmZEKOP5aUJRWBdPnUcm6f.png',
      tablet: '/_sa/img/services/fJ5Wj4IWyUeAird6zmnNifjZVbmZJstaSycuGa67.png',
      mobile: '/_sa/img/services/iRNt01BDzA0ochnwbwUv0ptuOiemQhEo9prooUqV.png'
    }
  },
  {
    id: 'hourly',
    title: 'Почасовая разработка',
    price: 'От $40 / час',
    desc: 'Гибкий формат разработки с оплатой за фактически затраченное время (Time & Material).',
    tags: ['T&M', 'Jira', 'Agile', 'Flexible'],
    bullets: ['Гибкое планирование спринтов', 'Прозрачные отчеты по Jira', 'Быстрый запуск доработок'],
    images: {
      desc: '/_sa/img/services/3LuWbO4vFz5rXLmfBA6fFedCstiyjjs4V7axiN9R.png',
      tablet: '/_sa/img/services/3LuWbO4vFz5rXLmfBA6fFedCstiyjjs4V7axiN9R.png',
      mobile: '/_sa/img/services/3LuWbO4vFz5rXLmfBA6fFedCstiyjjs4V7axiN9R.png'
    }
  },
  {
    id: 'consulting',
    title: 'IT-консалтинг',
    price: 'От $100 / час',
    desc: 'Экспертный консалтинг: выбор стека, аудит кода, проектирование System Design и ИТ-архитектуры.',
    tags: ['Stack Choice', 'SysDesign', 'Architecture', 'Code Review'],
    bullets: ['Проектирование архитектуры', 'Аудит кодовой базы', 'Выбор технологий под проект'],
    images: {
      desc: '/_sa/img/services/uJEVTMswdwntPfDGMjc9NshSj1zzC5KoEZslI9PS.png',
      tablet: '/_sa/img/services/uJEVTMswdwntPfDGMjc9NshSj1zzC5KoEZslI9PS.png',
      mobile: '/_sa/img/services/uJEVTMswdwntPfDGMjc9NshSj1zzC5KoEZslI9PS.png'
    }
  },
  {
    id: 'copywriting',
    title: 'Копирайтинг и контент',
    price: 'От $15 / 1000 зн.',
    desc: 'Написание экспертных статей, SEO-оптимизированных текстов, продающего контента для лендингов.',
    tags: ['SEO Articles', 'Copywriting', 'LSI', 'Sales Copy'],
    bullets: ['Написание экспертных статей', 'Оптимизация текстов под SEO', 'Продающие тексты для лендингов'],
    images: {
      desc: '/_sa/img/services/5lXRPRmqGnKTGgJGa3g7Y3iPejliMrVuKDx8bpXp.png',
      tablet: '/_sa/img/services/5lXRPRmqGnKTGgJGa3g7Y3iPejliMrVuKDx8bpXp.png',
      mobile: '/_sa/img/services/5lXRPRmqGnKTGgJGa3g7Y3iPejliMrVuKDx8bpXp.png'
    }
  },
  {
    id: 'analytics',
    title: 'Веб-аналитика',
    price: 'От $300',
    desc: 'Настройка веб-аналитики (GA4, Яндекс.Метрика), отслеживание целей, построение отчетов и дашбордов.',
    tags: ['GA4', 'Yandex.Metrika', 'Goals', 'Dashboards'],
    bullets: ['Настройка целей и конверсий', 'Интеграция tracking-пикселей', 'Создание дашбордов в Looker'],
    images: {
      desc: '/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png',
      tablet: '/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png',
      mobile: '/_sa/img/services/rYECvJ4lQtng1wTQVTvbeh2YVQnD2eTBWs5iDdFd.png'
    }
  }
];

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

  // Render a slider track from card data
  const renderSliderTrack = (cards) => {
    return cards.map((card, idx) => {
      const CardIcon = Icons[card.id] || Icons.card;
      return (
        <div key={`${card.id}-${idx}`} className="services__slide swiper-slide">
          <div className="services__card">
            <Link to={`/service/${card.id}`} className="services__card-container services__card-container-img">
              <div className="services__card-header-frame">
                <CardIcon className="service-card-icon" />
                <div className="services__card-title-box">
                  <h3>{card.title}</h3>
                  <span className="services__card-price-tag">{card.price}</span>
                </div>
              </div>
              
              <div className="services__card-hover-content">
                <p className="services__card-description">
                  {card.desc}
                </p>

                <div className="service-tech-tags">
                  {card.tags.map((t, tIdx) => (
                    <span key={tIdx} className="tech-tag">{t}</span>
                  ))}
                </div>

                <div className="service-bullets-block">
                  <span className="bullets-title">Что входит:</span>
                  <ul className="service-bullets-list">
                    {card.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="services__card-img-wr">
                <img src={card.images.desc} alt="#" loading="lazy" className="services__card-img services__card-img_desc" />
                <img src={card.images.tablet} alt="#" loading="lazy" className="services__card-img services__card-img_tablet" />
                <img src={card.images.mobile} alt="#" loading="lazy" className="services__card-img services__card-img_mobile" />
              </div>
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="services-root">
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
                  <div className="services__text services__text-with-counter">
                    <div className="services__title-group">
                      <h2 className="services__title"><TextReveal text="Разработка" glitch={true} /></h2>
                      <div className="service-counter">
                        <span className="counter-num">01</span>
                        <div className="counter-lines">
                          <span className="counter-line active"></span>
                          <span className="counter-line"></span>
                          <span className="counter-line"></span>
                        </div>
                      </div>
                    </div>
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
                    {renderSliderTrack(developmentCards)}
                  </div>
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
                  <div className="services__text services__text-with-counter">
                    <div className="services__title-group">
                      <h2 className="services__title"><TextReveal text="Брендинг и маркетинг" glitch={true} /></h2>
                      <div className="service-counter">
                        <span className="counter-num">02</span>
                        <div className="counter-lines">
                          <span className="counter-line"></span>
                          <span className="counter-line active"></span>
                          <span className="counter-line"></span>
                        </div>
                      </div>
                    </div>
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
                    {renderSliderTrack(brandingMarketingCards)}
                  </div>
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
                  <div className="services__text services__text-with-counter">
                    <div className="services__title-group">
                      <h2 className="services__title"><TextReveal text="Поддержка и операции" glitch={true} /></h2>
                      <div className="service-counter">
                        <span className="counter-num">03</span>
                        <div className="counter-lines">
                          <span className="counter-line"></span>
                          <span className="counter-line"></span>
                          <span className="counter-line active"></span>
                        </div>
                      </div>
                    </div>
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
                    {renderSliderTrack(supportOperationsCards)}
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
