import React, { useState, useEffect, useRef } from 'react';
import Grid from '../components/Grid';
import Button from '../components/Button';
import TextReveal from '../components/TextReveal';
import TeamPills from '../components/TeamPills';
import DraggableMarquee from '../components/DraggableMarquee';
import AsciiArrows from '../components/AsciiArrows';
import Footer from '../components/Footer';



const sequenceStages = [
  {
    number: '01/',
    title: 'Software Development',
    tags: ['IT CONSULTING', 'SCOPING SESSION', 'PRODUCT DEVELOPMENT', 'PRODUCT MANAGEMENT', 'MVP DEVELOPMENT', 'MAINTENANCE & SUPPORT', 'SAAS'],
    description: 'Оптимизируйте бизнес-процессы вашей компании с помощью разработки индивидуальных CRM, ERP и сложных SaaS-решений, созданных с учетом вашей специфики.'
  },
  {
    number: '02/',
    title: 'Web Development',
    tags: ['WEB APPLICATIONS', 'FRONT-END DEVELOPMENT', 'PROGRESSIVE WEB APPLICATIONS', 'SINGLE PAGE APPLICATION', 'WEB PORTALS', 'CORPORATE WEBSITES'],
    description: 'Создавайте быстрые, надежные веб-приложения и корпоративные порталы, используя передовые фронтенд и бэкенд технологии для стабильного роста вашего бизнеса.'
  },
  {
    number: '03/',
    title: 'Data Science & AI',
    tags: ['AWS & CLOUD', 'BIG DATA SOLUTIONS', 'IOT DEVELOPMENT', 'NFT MARKETPLACE', 'DEVOPS SERVICES'],
    description: 'Принимайте стратегические бизнес-решения на основе данных, используя предиктивную аналитику, интеграцию моделей машинного обучения и облачные вычисления.'
  },
  {
    number: '04/',
    title: 'QA & Software Testing',
    tags: ['TEST AUTOMATION', 'CYBERSECURITY', 'FUNCTIONAL TESTING', 'PERFORMANCE TESTING', 'MOBILE APP TESTING', 'QA CONSULTING', 'LOAD TESTING SERVICES'],
    description: 'Обеспечьте отказоустойчивость, безопасность и безупречную работу вашего цифрового продукта с помощью автоматизированного и ручного тестирования.'
  },
  {
    number: '05/',
    title: 'UX/UI Design',
    tags: ['UX REVIEW', 'PRODUCT DESIGN', 'RAPID UX PROTOTYPING', 'MOBILE APP DESIGN', 'WEB DESIGN SERVICES'],
    description: 'Получите интуитивный и эстетичный интерфейс, вдохновленный потребностями ваших пользователей, спроектированный экспертами по продуктовому дизайну.'
  }
];

const techCategories = [
  {
    id: 'web',
    title: 'Web Platform',
    items: [
      { name: 'React.js', label: 'React.js', developers: 44, color: '#00D9FF' },
      { name: 'TypeScript', label: 'TypeScript', developers: 38, color: '#3178C6' },
      { name: 'Node.js', label: 'Node.js', developers: 35, color: '#339933' },
      { name: 'Python', label: 'Python', developers: 29, color: '#306998' },
      { name: 'GraphQL', label: 'GraphQL', developers: 18, color: '#E10098' },
      { name: 'Turborepo', label: 'Turborepo', developers: 12, color: '#FF007F' },
      { name: 'Material UI', label: 'Material UI', developers: 22, color: '#007FFF' },
      { name: 'React Hook Form', label: 'React Hook Form', developers: 16, color: '#EC5990' }
    ]
  },
  {
    id: 'database',
    title: 'Database',
    items: [
      { name: 'PostgreSQL', label: 'PostgreSQL', developers: 25, color: '#336791' },
      { name: 'MongoDB', label: 'MongoDB', developers: 17, color: '#47A248' },
      { name: 'Redis', label: 'Redis', developers: 21, color: '#D82C20' },
      { name: 'MySQL', label: 'MySQL', developers: 14, color: '#00758F' },
      { name: 'Elasticsearch', label: 'Elasticsearch', developers: 11, color: '#00BFB3' }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    items: [
      { name: 'Docker', label: 'Docker', developers: 30, color: '#2496ED' },
      { name: 'Kubernetes', label: 'Kubernetes', developers: 19, color: '#326CE5' },
      { name: 'Git', label: 'Git / GitHub', developers: 40, color: '#F05032' },
      { name: 'Terraform', label: 'Terraform', developers: 15, color: '#844FBA' },
      { name: 'AWS', label: 'AWS Cloud', developers: 24, color: '#FF9900' },
      { name: 'Ansible', label: 'Ansible', developers: 10, color: '#EE0000' }
    ]
  }
];

const tabDescriptions = {
  web: "Мы создаем быстрые и надежные веб-приложения на базе React.js и Node.js, спроектированные для работы в условиях высоких нагрузок.",
  database: "Проектируем надежные, быстрые реляционные и нереляционные хранилища данных с оптимизацией индексов и репликацией.",
  cloud: "Строим современную отказоустойчивую инфраструктуру в облаках с автоматическим развертыванием и мониторингом (CI/CD)."
};

const TechIcon = ({ name }) => {
  switch (name) {
    case 'React.js':
    case 'React Native':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg react">
          <ellipse cx="50" cy="50" rx="8" ry="22" fill="none" stroke="currentColor" strokeWidth="2.5" className="react-orbit orbit-1" />
          <ellipse cx="50" cy="50" rx="8" ry="22" fill="none" stroke="currentColor" strokeWidth="2.5" className="react-orbit orbit-2" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="8" ry="22" fill="none" stroke="currentColor" strokeWidth="2.5" className="react-orbit orbit-3" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="4.5" fill="currentColor" className="react-core" />
        </svg>
      );
    case 'TypeScript':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg typescript">
          <rect x="10" y="10" width="80" height="80" fill="currentColor" rx="6" />
          <text x="44" y="80" fontFamily="var(--font-sans), sans-serif" fontSize="36" fontWeight="900" fill="#ffffff" className="ts-text">TS</text>
        </svg>
      );
    case 'Node.js':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg node">
          <path d="M46.7 15.6c1.9-1.1 4.7-1.1 6.6 0l25.8 14.9c1.9 1.1 3.3 3.5 3.3 5.7v29.8c0 2.2-1.4 4.6-3.3 5.7L53.3 86.6c-1.9 1.1-4.7 1.1-6.6 0L20.9 71.7c-1.9-1.1-3.3-3.5-3.3-5.7V36.2c0-2.2 1.4-4.6 3.3-5.7l25.8-14.9z" fill="currentColor" />
          <path d="M50 28.5L29.3 40.5v24L50 76.5l20.7-12v-24L50 28.5z" fill="#ffffff" />
          <path d="M50 35.5L35.3 44v17L50 69.5l14.7-8.5v-17L50 35.5z" fill="currentColor" className="node-center" />
        </svg>
      );
    case 'Python':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg python">
          <path d="M50 10c-15.5 0-14.5 6.7-14.5 13.5v7h15V35h-21C22 35 15 40.4 15 52.3c0 12.3 6.1 12.7 14.5 12.7h8.7v-12.3c0-8.2 6.7-15 15-15h14.3v-7.2c0-6.8-5.5-13.5-17.5-13.5z" fill="currentColor" className="py-snake-top" />
          <path d="M50 90c15.5 0 14.5-6.7 14.5-13.5v-7h-15V65h21c7.5 0 14.5-5.4 14.5-17.3c0-12.3-6.1-12.7-14.5-12.7h-8.7v12.3c0 8.2-6.7 15-15 15H32.5v7.2c0 6.8 5.5 13.5 17.5 13.5z" fill="currentColor" className="py-snake-bottom" />
          <circle cx="42" cy="21" r="3.5" fill="#ffffff" />
          <circle cx="58" cy="79" r="3.5" fill="#ffffff" />
        </svg>
      );
    case 'GraphQL':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg graphql">
          <path d="M50 10L85 30v40L50 90 15 70V30z" fill="none" stroke="currentColor" strokeWidth="6" className="gql-hex" />
          <circle cx="50" cy="10" r="10" fill="currentColor" />
          <circle cx="85" cy="30" r="10" fill="currentColor" />
          <circle cx="85" cy="70" r="10" fill="currentColor" />
          <circle cx="50" cy="90" r="10" fill="currentColor" />
          <circle cx="15" cy="70" r="10" fill="currentColor" />
          <circle cx="15" cy="30" r="10" fill="currentColor" />
          <circle cx="50" cy="50" r="15" fill="currentColor" className="gql-center-node" />
          <path d="M50 10L85 70M85 30L15 70M85 70L15 30M50 90L15 30M15 30L50 10M15 70L50 90" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case 'Turborepo':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg turbo">
          <path d="M50 10 A 40 40 0 1 1 10 50 A 40 40 0 0 1 50 10" fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeDasharray="180 80" className="turbo-circle" />
          <path d="M50 35 L50 65 L72 50 Z" fill="currentColor" className="turbo-play" />
        </svg>
      );
    case 'Material UI':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg mui">
          <path d="M15 30 L50 10 L85 30 L50 50 Z" fill="currentColor" className="mui-side-top" />
          <path d="M15 30 L15 70 L50 90 L50 50 Z" fill="currentColor" className="mui-side-left" opacity="0.85" />
          <path d="M50 50 L50 90 L85 70 L85 30 Z" fill="currentColor" className="mui-side-right" opacity="0.7" />
        </svg>
      );
    case 'React Hook Form':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg rhf">
          <path d="M20 20 C35 20 40 10 50 10 C60 10 65 20 80 20 V65 C80 80 50 90 50 90 C50 90 20 80 20 65 Z" fill="currentColor" className="rhf-shield" />
          <path d="M35 38 L45 48 L65 28" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'PostgreSQL':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg pg">
          <path d="M50 15c-16.5 0-30 13.5-30 30 0 9.5 4.5 18 11.5 23.5L30 80h10l2.5-7.5c2.5.5 5 .8 7.5.8s5-.3 7.5-.8L60 80h10L68.5 68.5c7-5.5 11.5-14 11.5-23.5 0-16.5-13.5-30-30-30zm-10 25c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" fill="currentColor" />
        </svg>
      );
    case 'MongoDB':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg mongo">
          <path d="M50 10C46 22 28 42 28 58c0 14 10 22 22 22s22-8 22-22c0-16-18-36-22-48z" fill="currentColor" className="mongo-body" />
          <path d="M50 10v70" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case 'Redis':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg redis">
          <path d="M50 10 L85 22.5 L50 35 L15 22.5 Z" fill="currentColor" className="redis-layer layer-1" />
          <path d="M15 25 L50 37.5 L50 47.5 L15 35 Z" fill="currentColor" className="redis-layer-side-1" opacity="0.9" />
          <path d="M50 37.5 L85 25 L85 35 L50 47.5 Z" fill="currentColor" className="redis-layer-side-2" opacity="0.8" />
          
          <path d="M50 40 L85 52.5 L50 65 L15 52.5 Z" fill="currentColor" className="redis-layer layer-2" />
          <path d="M15 55 L50 67.5 L50 77.5 L15 65 Z" fill="currentColor" className="redis-layer-side-3" opacity="0.9" />
          <path d="M50 67.5 L85 55 L85 65 L50 77.5 Z" fill="currentColor" className="redis-layer-side-4" opacity="0.8" />
        </svg>
      );
    case 'MySQL':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg mysql">
          <path d="M80 50c-5-5-15-7-25-5-10 2-18 8-22 15-3 5-3 10-1 12 3 3 8 2 11 0 4-3 5-8 4-12 5-5 13-7 21-5 8 2 13 8 12 14v10l8-8c5-5 6-16 0-21z" fill="currentColor" className="mysql-dolphin" />
        </svg>
      );
    case 'Elasticsearch':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg elastic">
          <path d="M20 50A30 30 0 0 1 50 20V50H20z" fill="currentColor" className="elastic-part-1" />
          <path d="M50 50V80A30 30 0 0 1 20 50H50z" fill="currentColor" className="elastic-part-2" />
          <path d="M50 50H80A30 30 0 0 1 50 80V50z" fill="currentColor" className="elastic-part-3" />
          <rect x="50" y="20" width="30" height="30" fill="currentColor" className="elastic-part-4" />
        </svg>
      );
    case 'Docker':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg docker">
          <path d="M15 60c10 0 15-5 25-5s15 5 25 5c10 0 15-5 15-10V45H15v15z" fill="currentColor" className="docker-whale-body" />
          <rect x="25" y="30" width="8" height="8" fill="currentColor" className="dk-c-1" />
          <rect x="36" y="30" width="8" height="8" fill="currentColor" className="dk-c-2" />
          <rect x="47" y="30" width="8" height="8" fill="currentColor" className="dk-c-3" />
          <rect x="36" y="20" width="8" height="8" fill="currentColor" className="dk-c-4" />
        </svg>
      );
    case 'Kubernetes':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg k8s">
          <polygon points="50 15, 80 28, 80 62, 50 75, 20 62, 20 28" fill="currentColor" />
          <polygon points="50 22, 74 32, 74 58, 50 68, 26 58, 26 32" fill="#ffffff" />
          <circle cx="50" cy="45" r="10" fill="currentColor" className="k8s-core" />
          <line x1="50" y1="22" x2="50" y2="68" stroke="currentColor" strokeWidth="6" className="k8s-spoke" />
          <line x1="26" y1="32" x2="74" y2="58" stroke="currentColor" strokeWidth="6" className="k8s-spoke" />
          <line x1="26" y1="58" x2="74" y2="32" stroke="currentColor" strokeWidth="6" className="k8s-spoke" />
        </svg>
      );
    case 'Git':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg git">
          <rect x="15" y="15" width="70" height="70" fill="currentColor" rx="10" transform="rotate(45 50 50)" />
          <circle cx="50" cy="35" r="6" fill="#ffffff" />
          <circle cx="50" cy="65" r="6" fill="#ffffff" />
          <circle cx="65" cy="50" r="6" fill="#ffffff" />
          <line x1="50" y1="35" x2="50" y2="65" stroke="#ffffff" strokeWidth="5" />
          <path d="M50 50 C60 50 65 50 65 50" stroke="#ffffff" strokeWidth="5" />
        </svg>
      );
    case 'Terraform':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg terraform">
          <path d="M25 25 L50 12 L50 37 L25 50 Z" fill="currentColor" />
          <path d="M50 37 L75 25 L75 50 L50 62 Z" fill="currentColor" />
          <path d="M25 50 L50 62 L50 87 L25 75 Z" fill="currentColor" />
          <path d="M50 12 L75 25 L50 37 L25 25 Z" fill="currentColor" />
        </svg>
      );
    case 'AWS':
      return (
        <svg viewBox="0 0 100 100" width="54" height="54" className="tech-icon-svg aws">
          <text x="15" y="45" fontFamily="var(--font-sans), sans-serif" fontSize="30" fontWeight="900" fill="currentColor">aws</text>
          <path d="M20 60 C35 75 65 75 75 60" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="aws-smile" />
          <path d="M70 55 L78 61 L70 67" fill="currentColor" />
        </svg>
      );
    case 'Ansible':
      return (
        <svg viewBox="0 0 100 100" width="40" height="40" className="tech-icon-svg ansible">
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M35 70 L50 30 L65 70 M40 56 H60" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Flutter':
      return (
        <svg viewBox="0 0 100 100" width="40" height="40" className="tech-icon-svg flutter">
          <path d="M50 15 L80 45 L50 75 L30 55 L50 35 L65 50 L50 65 L20 35 Z" fill="none" stroke="currentColor" strokeWidth="2.5" className="flutter-logo" />
        </svg>
      );
    case 'Swift':
      return (
        <svg viewBox="0 0 100 100" width="40" height="40" className="tech-icon-svg swift">
          <path d="M80 30 C70 40 55 45 45 45 C30 45 20 35 15 25 C20 40 30 55 45 65 C60 75 75 75 85 70 C75 65 70 55 70 45 C70 35 75 30 80 30 Z" fill="none" stroke="currentColor" strokeWidth="2.5" className="swift-bird" />
        </svg>
      );
    case 'Android':
      return (
        <svg viewBox="0 0 100 100" width="40" height="40" className="tech-icon-svg android">
          <path d="M30 45 C30 25 70 25 70 45 Z" fill="none" stroke="currentColor" strokeWidth="2.5" className="android-head" />
          <circle cx="42" cy="37" r="3" fill="currentColor" />
          <circle cx="58" cy="37" r="3" fill="currentColor" />
          <line x1="38" y1="28" x2="30" y2="18" stroke="currentColor" strokeWidth="2.5" className="android-antenna" />
          <line x1="62" y1="28" x2="70" y2="18" stroke="currentColor" strokeWidth="2.5" className="android-antenna" />
          <rect x="30" y="49" width="40" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    default:
      return null;
  }
};

const getDevelopersText = (count) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} РАЗРАБОТЧИКОВ`;
  }
  if (lastDigit === 1) {
    return `${count} РАЗРАБОТЧИК`;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} РАЗРАБОТЧИКА`;
  }
  return `${count} РАЗРАБОТЧИКОВ`;
};

const worksData = [
  {
    id: 1,
    title: "Car Detail Lab",
    subtitle: "Детейлинг-маркет и обучение",
    link: "https://cardetaillab.ua/",
    image: "/1.png"
  },
  {
    id: 2,
    title: "Barba Textile (Btex)",
    subtitle: "Оптовый интернет-магазин тканей",
    link: "https://barbatextile.ua/",
    image: "/2.png"
  },
  {
    id: 3,
    title: "Redling Hotel",
    subtitle: "Семейный отель у моря в Одессе",
    link: "https://redling-hotel.com.ua/",
    image: "/3.png"
  },
  {
    id: 4,
    title: "Устрой Благо",
    subtitle: "Ландшафтный дизайн и благоустройство",
    link: "https://blagoustroy.com.ua/",
    image: "/4.png"
  },
  {
    id: 5,
    title: "Bavaria Автоцентр",
    subtitle: "Сервисный центр BMW и детейлинг",
    link: "https://bavaria.od.ua/",
    image: "/5.png"
  },
  {
    id: 6,
    title: "Ресторан Куманец",
    subtitle: "25 лет гордости за украинскую кухню",
    link: "https://kumanets.com.ua/",
    image: "/6.png"
  }
];
const testimonialsData = [
  {
    id: 1,
    projectTitle: "Barba Textile (Btex)",
    shortName: "BTEX",
    projectUrl: "https://barbatextile.ua/",
    authorName: "Дмитрий Баранов",
    authorRole: "Директор по маркетингу",
    avatar: "/avatar_btex.png",
    logoPath: "/btex_logo.svg",
    glowColor: "rgba(160, 32, 240, 0.4)", // Purple
    rating: 5,
    reviewText: "Перед нами стояла задача масштабирования оптовых онлайн-продаж. Команда NextWeb создала современный интернет-магазин с автоматической синхронизацией тысяч товарных позиций со складами в реальном времени. Внедрение удобного поиска, умных фильтров и бесшовной интеграции с ERP-системой позволило нам увеличить оптовый оборот через сайт на 40% за первые 6 месяцев."
  },
  {
    id: 2,
    projectTitle: "Redling Hotel",
    shortName: "REDLING",
    projectUrl: "https://redling-hotel.com.ua/",
    authorName: "Екатерина Ковальчук",
    authorRole: "Управляющая отелем",
    avatar: "/avatar_redling.png",
    logoPath: "/Redling_logo.svg",
    glowColor: "rgba(255, 20, 147, 0.4)", // Pink
    rating: 5,
    reviewText: "Сайт для премиального отеля — это его цифровое лицо. NextWeb создали изысканный дизайн, передающий атмосферу нашего отеля у моря, и внедрили удобный модуль бронирования номеров. Гости отмечают простоту и удобство бронирования, а мы получили значительное снижение комиссии от сторонних сервисов. Поддержка клиентов после запуска заслуживает отдельной благодарности."
  },
  {
    id: 3,
    projectTitle: "Устрой Благо",
    shortName: "BLAGO",
    projectUrl: "https://blagoustroy.com.ua/",
    authorName: "Сергей Яковлев",
    authorRole: "Руководитель студии",
    avatar: "/avatar_blago.png",
    logoPath: "/Blago_logo.png",
    glowColor: "rgba(0, 217, 255, 0.4)", // Cyan
    rating: 5,
    reviewText: "Для студии ландшафтного дизайна критически важно показать визуальное качество работ. Наш новый сайт портфолио от NextWeb — это произведение искусства. Интерактивная галерея проектов, плавные анимации и высокая скорость работы на мобильных устройствах привлекают к нам клиентов премиум-сегмента. Поток качественных лидов вырос почти сразу после релиза."
  },
  {
    id: 4,
    projectTitle: "Ресторан Куманец",
    shortName: "KUMANETS",
    projectUrl: "https://kumanets.com.ua/",
    authorName: "Ольга Петренко",
    authorRole: "Управляющая рестораном",
    avatar: "/avatar_kumanets.png",
    logoPath: "/kumanets_logo.png",
    glowColor: "rgba(255, 20, 147, 0.4)", // Pink
    rating: 5,
    reviewText: "Сайт нашего легендарного ресторана украинской кухни должен был стать по-настоящему аппетитным и функциональным. NextWeb справились с задачей на все сто. Красивое адаптивное онлайн-меню, простая форма резерва столов и интеграция с системой доставки помогли нам привлечь новую молодую аудиторию и увеличить количество заказов на вынос. Очень рекомендуем эту команду!"
  }
];

const getCardOffset = (idx, activeIdx, total) => {
  let diff = idx - activeIdx;
  while (diff < -total / 2) diff += total;
  while (diff > total / 2) diff -= total;
  return diff;
};

export default function Home({ isVideoOpen, setIsVideoOpen }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isArrowsHovered, setIsArrowsHovered] = useState(false);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: 'Создание сайта',
    message: 'Привет, очень хочу новый сайт. Жду ответа :)'
  });
  const [formStatus, setFormStatus] = useState('idle');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
    }, 1200);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  const heroRef = useRef(null);
  const dimmerRef = useRef(null);
  const heroSceneRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroFooterRef = useRef(null);
  const cardsRef = useRef(null);

  const sectionsWrapRef = useRef(null);
  const menuRef = useRef(null);
  const descriptionRef = useRef(null);
  const dedicatedRef = useRef(null);
  const divider2Ref = useRef(null);
  const diagonalTrackRef = useRef(null);
  const worksTrackRef = useRef(null);

  const card1Ref = useRef(null);
  const canvasRef = useRef(null);
  const dividerBarRef = useRef(null);
  const menuItemsRef = useRef([]);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const whyUsRef = useRef(null);
  const sequenceIslandRef = useRef(null);
  const sequenceMenuRef = useRef(null);
  const techTabsRef = useRef(null);
  const carouselContainerRef = useRef(null);
  
  const [activeCategory, setActiveCategory] = useState('tech');
  const [activeTechTab, setActiveTechTab] = useState('web');
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const activeProjectIdxRef = useRef(0);

  // Screen 4 click-driven sequence player state & refs
  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(0);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const animationFrameIdRef = useRef(null);
  const isChaoticRef = useRef(false);
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef(null);
  const animateFramesRef = useRef(null);



  const animateFrames = () => {
    const current = currentFrameRef.current;
    const target = targetFrameRef.current;

    if (current === target) {
      animationFrameIdRef.current = null;
      return;
    }

    const diff = Math.abs(target - current);
    let step = 1;

    if (isChaoticRef.current) {
      // Chaotic transition: high-speed playback with soft deceleration (ease-out) near target
      if (diff > 200) step = 30;
      else if (diff > 120) step = 20;
      else if (diff > 60) step = 12;
      else if (diff > 30) step = 7;
      else if (diff > 15) step = 4;
      else if (diff > 5) step = 2;
      else step = 1;
    } else {
      // Normal sequential transition: speed untouched
      if (diff > 100) step = 8;
      else if (diff > 50) step = 5;
      else if (diff > 20) step = 3;
      else if (diff > 5) step = 2;
    }

    let nextFrame = current;
    if (current < target) {
      nextFrame = Math.min(target, current + step);
    } else {
      nextFrame = Math.max(target, current - step);
    }

    currentFrameRef.current = nextFrame;

    if (imagesRef.current && imagesRef.current.length > 0) {
      const img = imagesRef.current[nextFrame - 1];
      if (img && img.complete) {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }
    }

    if (dividerBarRef.current) {
      const progress = (nextFrame - 1) / 299;
      dividerBarRef.current.style.height = `${progress * 100}%`;
    }

    animationFrameIdRef.current = requestAnimationFrame(animateFramesRef.current);
  };
  animateFramesRef.current = animateFrames;

  const changeStage = (idx) => {
    const isChaotic = Math.abs(idx - activeStageRef.current) > 1;
    isChaoticRef.current = isChaotic;
    setActiveStage(idx);
    activeStageRef.current = idx;
    const targets = [1, 92, 151, 221, 300];
    targetFrameRef.current = targets[idx];
    if (!animationFrameIdRef.current) {
      animationFrameIdRef.current = requestAnimationFrame(animateFramesRef.current);
    }
  };

  const handleStageClick = (idx) => {
    isClickingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    changeStage(idx);

    if (whyUsRef.current) {
      whyUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    clickTimeoutRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    const menuEl = sequenceMenuRef.current;
    if (!menuEl) return;

    let accumDelta = 0;
    const threshold = 60; // threshold to trigger stage switch

    const handleWheel = (e) => {
      if (window.innerWidth <= 1024) return;

      const currentStage = activeStageRef.current;
      const direction = e.deltaY > 0 ? 1 : -1;

      // Reset accumulation on scroll direction change
      if ((direction === 1 && accumDelta < 0) || (direction === -1 && accumDelta > 0)) {
        accumDelta = 0;
      }

      // Check if we should block the page scroll and switch stages
      if (direction === 1 && currentStage < 4) {
        e.preventDefault();
        accumDelta += e.deltaY;
        if (accumDelta >= threshold) {
          changeStage(currentStage + 1);
          accumDelta = 0;
        }
      } else if (direction === -1 && currentStage > 0) {
        e.preventDefault();
        accumDelta += e.deltaY;
        if (accumDelta <= -threshold) {
          changeStage(currentStage - 1);
          accumDelta = 0;
        }
      } else {
        accumDelta = 0;
      }
    };

    menuEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      menuEl.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    const workEl = document.getElementById('work');
    if (!workEl) return;

    let accumDelta = 0;
    const threshold = 60; // threshold to switch tab

    const handleWheel = (e) => {
      if (window.innerWidth <= 1024) return;
      if (window.scrollY >= window.innerHeight * 9.2 - 5) return;

      const categories = ['web', 'database', 'cloud'];
      const currentIdx = categories.indexOf(activeTechTab);
      const direction = e.deltaY > 0 ? 1 : -1;

      const rect = workEl.getBoundingClientRect();
      // If scrolling down, but top of #work hasn't reached the top of the viewport yet
      if (direction === 1 && rect.top > 5) {
        return;
      }
      // If scrolling up, but top of #work has already moved below the top of the viewport
      if (direction === -1 && rect.top < -5) {
        return;
      }

      // Reset accumulation on scroll direction change
      if ((direction === 1 && accumDelta < 0) || (direction === -1 && accumDelta > 0)) {
        accumDelta = 0;
      }

      // Check if we can change tabs in this direction
      if (direction === 1 && currentIdx < categories.length - 1) {
        e.preventDefault();
        const rectAfter = workEl.getBoundingClientRect();
        if (Math.abs(rectAfter.top) > 1) {
          window.scrollTo({
            top: window.scrollY + rectAfter.top,
            behavior: 'auto'
          });
        }
        accumDelta += e.deltaY;
        if (accumDelta >= threshold) {
          setActiveTechTab(categories[currentIdx + 1]);
          accumDelta = 0;
        }
      } else if (direction === -1 && currentIdx > 0) {
        e.preventDefault();
        const rectAfter = workEl.getBoundingClientRect();
        if (Math.abs(rectAfter.top) > 1) {
          window.scrollTo({
            top: window.scrollY + rectAfter.top,
            behavior: 'auto'
          });
        }
        accumDelta += e.deltaY;
        if (accumDelta <= -threshold) {
          setActiveTechTab(categories[currentIdx - 1]);
          accumDelta = 0;
        }
      } else {
        accumDelta = 0;
      }
    };

    workEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      workEl.removeEventListener('wheel', handleWheel);
    };
  }, [activeTechTab]);

  useEffect(() => {
    const containerEl = carouselContainerRef.current;
    if (!containerEl) return;

    let accumDelta = 0;
    const threshold = 60;

    const handleWheelCarousel = (e) => {
      if (window.innerWidth <= 1024) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const isAtEnd = activeTestimonialIdx === testimonialsData.length - 1;
      const isAtStart = activeTestimonialIdx === 0;

      // Allow default page scrolling if trying to scroll out of testimonials bounds
      if ((direction === 1 && isAtEnd) || (direction === -1 && isAtStart)) {
        return;
      }

      // Intercept wheel scroll specifically over the carousel container to cycle reviews
      e.preventDefault();

      // Reset accumulation on scroll direction change
      if ((direction === 1 && accumDelta < 0) || (direction === -1 && accumDelta > 0)) {
        accumDelta = 0;
      }

      accumDelta += e.deltaY;

      if (direction === 1 && accumDelta >= threshold) {
        setIsReviewExpanded(false);
        setActiveTestimonialIdx((prev) => prev + 1);
        accumDelta = 0;
      } else if (direction === -1 && accumDelta <= -threshold) {
        setIsReviewExpanded(false);
        setActiveTestimonialIdx((prev) => prev - 1);
        accumDelta = 0;
      }
    };

    containerEl.addEventListener('wheel', handleWheelCarousel, { passive: false });
    return () => {
      containerEl.removeEventListener('wheel', handleWheelCarousel);
    };
  }, [activeTestimonialIdx]);

  useEffect(() => {
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    activeStageRef.current = activeStage;
  }, [activeStage]);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;
    const rY = px * 15;
    const rX = -py * 15;
    const isActive = card.classList.contains('active');
    card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(${isActive ? 1.05 : 1.02}, ${isActive ? 1.05 : 1.02}, 1.02)`;

    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;
    card.style.setProperty('--sheen-x', `${sheenX}%`);
    card.style.setProperty('--sheen-y', `${sheenY}%`);
    card.style.setProperty('--sheen-opacity', '1');
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = '';
    card.style.setProperty('--sheen-opacity', '0');
  };

  const handleCategoryClick = (category, cardRef) => {
    setActiveCategory(category);
    if (window.innerWidth <= 1024) {
      if (cardRef.current) {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  useEffect(() => {
    if (window.innerWidth > 1024) return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -45% 0px',
      threshold: 0.1,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === card1Ref.current) {
            setActiveCategory('tech');
          } else if (entry.target === card2Ref.current) {
            setActiveCategory('team');
          } else if (entry.target === card3Ref.current) {
            setActiveCategory('marketing');
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, observerOptions);

    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);
    if (card3Ref.current) observer.observe(card3Ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = 300;
    const loadedImages = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/sequence/ezgif-frame-${numStr}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  useEffect(() => {
    if (imagesLoaded && canvasRef.current && imagesRef.current[0]) {
      const canvas = canvasRef.current;
      const firstImg = imagesRef.current[0];
      canvas.width = firstImg.naturalWidth || 1280;
      canvas.height = firstImg.naturalHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
      }
    }
  }, [imagesLoaded]);



  useEffect(() => {
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let reqId = null;

    const updateParallax = () => {
      // Linear interpolation (lerp) for soft easing (0.04 for very soft Apple-style inertia)
      currentScrollY += (targetScrollY - currentScrollY) * 0.04;
      
      const vh = Math.max(window.innerHeight || 0, 1);
      const progress = Math.min(currentScrollY / vh, 1);



      
      
      // Remove dimming overlay completely
      if (dimmerRef.current) {
        dimmerRef.current.style.opacity = 0;
      }
      
      // Slow WebGL scene upward parallax (12% of scroll, clamped to 12% of viewport height max)
      if (heroSceneRef.current) {
        const bgY = -(progress * vh * 0.12);
        heroSceneRef.current.style.transform = `translateY(${bgY}px)`;
        heroSceneRef.current.style.zIndex = '0';
      }

      // Center content: moves up gently + scales down slightly (10% shrink) and fades out
      if (heroContentRef.current) {
        const contentY = -(currentScrollY * 0.25);
        const scale = 1 - progress * 0.1;
        heroContentRef.current.style.transform = `translateY(${contentY}px) scale(${scale})`;
        heroContentRef.current.style.opacity = Math.max(0, 1 - progress);
      }

      // Footer bar: drifts down very slightly and fades out
      if (heroFooterRef.current) {
        const footerY = currentScrollY * 0.05;
        heroFooterRef.current.style.transform = `translateY(${footerY}px)`;
        heroFooterRef.current.style.opacity = Math.max(0, 1 - progress);
      }

      // Accelerated vertical transition along the slant slope (Slanted vertical entrance)
      let parentTranslateY = 0;
      if (sectionsWrapRef.current) {
        if (currentScrollY < vh) {
          const transitionProgress = Math.max(0, Math.min(currentScrollY / vh, 1));
          parentTranslateY = (1 - transitionProgress) * 60; // slide up from 60vh
          sectionsWrapRef.current.style.transform = `translateY(${parentTranslateY}vh)`;
          
          // Dynamic clip-path during transition (slanted edge that flattens out)
          const slantHeight = (1 - transitionProgress) * 120;
          sectionsWrapRef.current.style.clipPath = `polygon(0 ${slantHeight}px, 100% 0, 100% 100%, 0 100%)`;
          
          // Animate Divider 1 slope and opacity
          const divider1 = sectionsWrapRef.current.querySelector('.tech-glow-divider-1');
          if (divider1) {
            divider1.style.opacity = Math.max(0, 1 - transitionProgress).toString();
            const line1 = divider1.querySelector('line');
            if (line1) {
              line1.setAttribute('y1', slantHeight.toString());
            }
          }
        } else {
          sectionsWrapRef.current.style.transform = 'none';
          sectionsWrapRef.current.style.clipPath = 'none'; // Completely flat white page when resting!
          
          const divider1 = sectionsWrapRef.current.querySelector('.tech-glow-divider-1');
          if (divider1) {
            divider1.style.opacity = '0';
          }
        }
      }

      // Category menu slides in horizontally from the left
      if (menuRef.current) {
        if (window.innerWidth > 1024) {
          const transitionProgress = Math.max(0, Math.min(currentScrollY / vh, 1));
          const menuOffset = (1 - transitionProgress) * -25; // slide in from left (-25vw) to stay inside parent bounds
          menuRef.current.style.transform = `translateX(${menuOffset}vw)`;
        } else {
          menuRef.current.style.transform = 'none';
        }
      }

      // Description text slides in horizontally from the right (negative offset to stay inside parent bounds)
      if (descriptionRef.current) {
        if (window.innerWidth > 1024) {
          const transitionProgress = Math.max(0, Math.min(currentScrollY / vh, 1));
          const textOffset = (1 - transitionProgress) * -15; // slide in from left (-15vw)
          descriptionRef.current.style.transform = `translateX(${textOffset}vw)`;
        } else {
          descriptionRef.current.style.transform = 'none';
        }
      }

      // Add visible class to #approach when scrolled into view (visible after 20% height)
      const approachEl = document.getElementById('approach');
      if (approachEl) {
        if (progress > 0.2) {
          approachEl.classList.add('visible');
        } else {
          approachEl.classList.remove('visible');
        }
      }

      // Cards slide horizontally elastically during scroll transition on desktop
      if (cardsRef.current) {
        if (window.innerWidth > 1024) {
          const transitionProgress = Math.max(0, Math.min(currentScrollY / vh, 1));
          const cardsOffset = (1 - transitionProgress) * -10; // slide in from left (-10vw) to stay inside parent bounds
          cardsRef.current.style.transform = `translateX(${cardsOffset}vw)`;
        } else {
          cardsRef.current.style.transform = 'none';
        }
      }

      // Dynamic sticky behavior & reverse diagonal slide-out for #approach
      if (approachEl) {
        if (window.innerWidth > 1024) {
          const divider2 = divider2Ref.current;
          if (currentScrollY >= vh * 1.3) {
            const progress3 = Math.max(0, Math.min((currentScrollY - vh * 1.3) / vh, 1));
            const translateX = progress3 * 100; // slides horizontally to the right
            approachEl.style.transform = `translate(${translateX}vw, 0vh)`;

            // Show Divider 2 (sliding vertical line at the left edge) during slide-out and fade it out as it leaves
            if (divider2) {
              divider2.style.transform = `translate(${translateX}vw, 0vh)`;
              divider2.style.opacity = Math.max(0, 1 - progress3).toString();
            }
          } else {
            approachEl.style.transform = 'none';

            // Hide Divider 2 when resting
            if (divider2) {
              divider2.style.transform = 'none';
              divider2.style.opacity = '0';
            }
          }

          // Toggle visibility and pointer-events cleanly instead of position sticky
          // to prevent delayed layout-shift snaps
          if (currentScrollY >= vh * 2.3) {
            approachEl.style.visibility = 'hidden';
            approachEl.style.pointerEvents = 'none';
          } else {
            approachEl.style.visibility = 'visible';
            approachEl.style.pointerEvents = 'auto';
          }
        } else {
          approachEl.style.transform = '';
          approachEl.style.visibility = '';
          approachEl.style.pointerEvents = '';
          
          const divider2 = divider2Ref.current;
          if (divider2) {
            divider2.style.transform = '';
            divider2.style.opacity = '';
          }
        }
      }
      // Sticky inner opacity, blur, and translation logic (entry and exit)
      const stickyInner = dedicatedRef.current?.querySelector('.dedicated-sticky-inner');
      if (stickyInner) {
        if (window.innerWidth > 1024) {
          if (currentScrollY < vh * 5.2) {
            const fadeProgress = Math.max(0, Math.min((currentScrollY - vh * 1.3) / vh, 1));
            stickyInner.style.opacity = fadeProgress;
            stickyInner.style.filter = `blur(${(1 - fadeProgress) * 15}px)`;
            stickyInner.style.transform = 'translateY(0px)';
          } else {
            const exitProgress = Math.max(0, Math.min((currentScrollY - vh * 5.2) / vh, 1));
            stickyInner.style.opacity = 1 - exitProgress;
            stickyInner.style.filter = `blur(${exitProgress * 15}px)`;
            stickyInner.style.transform = `translateY(${exitProgress * 500}px)`;
          }
        } else {
          stickyInner.style.opacity = '';
          stickyInner.style.filter = '';
          stickyInner.style.transform = '';
        }
      }

      // Split Screen Layout translation, project index tracking, and image parallax logic
      if (worksTrackRef.current) {
        if (window.innerWidth > 1024) {
          let translateYVal = 0;
          let activeIdx = 0;
          
          if (currentScrollY >= vh * 1.3 && currentScrollY < vh * 2.3) {
            const slideProgress = (currentScrollY - vh * 1.3) / vh;
            // Slide up the track slightly on entry
            translateYVal = (1 - slideProgress) * 15;
            activeIdx = 0;
          } else if (currentScrollY >= vh * 2.3 && currentScrollY < vh * 2.8) {
            // Resting buffer: first project stays focused
            translateYVal = 0;
            activeIdx = 0;
          } else if (currentScrollY >= vh * 2.8) {
            const scrollProgressWorks = Math.max(0, Math.min((currentScrollY - vh * 2.8) / (1.5 * vh), 1));
            // Calculate max translation based on actual scrollHeight
            const trackHeightVal = worksTrackRef.current.scrollHeight || 2800;
            const viewportHeight = window.innerHeight;
            const maxScroll = Math.max(0, trackHeightVal - viewportHeight + 100);
            translateYVal = scrollProgressWorks * -maxScroll;

            // Math to determine which card is closest to the middle of the viewport
            const cardHeight = 580;
            const cardGap = 64;
            const viewportCenter = viewportHeight / 2;
            let minDistance = Infinity;
            let bestIdx = 0;

            for (let i = 0; i < worksData.length; i++) {
              // Scroll track offset + padding-top (12vh) + card index * spacing + half card height
              const cardCenter = translateYVal + (viewportHeight * 0.12) + i * (cardHeight + cardGap) + cardHeight / 2;
              const distance = Math.abs(cardCenter - viewportCenter);
              if (distance < minDistance) {
                minDistance = distance;
                bestIdx = i;
              }
            }
            activeIdx = bestIdx;
          } else {
            translateYVal = 15;
            activeIdx = 0;
          }
          
          // Apply vertical scroll translation
          worksTrackRef.current.style.transform = `translateY(${translateYVal}px)`;

          // Smoothly set active project state if it changed
          if (activeIdx !== activeProjectIdxRef.current) {
            activeProjectIdxRef.current = activeIdx;
            setActiveProjectIdx(activeIdx);
          }

          // Image vertical parallax calculation
          const viewportHeight = window.innerHeight;
          const viewportCenter = viewportHeight / 2;
          const cards = worksTrackRef.current.querySelectorAll('.work-grid-card');
          cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const offsetFromCenter = cardCenter - viewportCenter;
            const img = card.querySelector('.work-parallax-img');
            if (img) {
              const translateY = offsetFromCenter * 0.05;
              img.style.transform = `scale(1.05) translateY(${translateY}px)`;
            }
          });
        } else {
          worksTrackRef.current.style.transform = '';
          const images = worksTrackRef.current.querySelectorAll('.work-parallax-img');
          images.forEach((img) => {
            img.style.transform = '';
          });
        }
      }

      // Slanted Wipe & Parallax transition for Screen 4 (#whyus)
      const whyUsEl = whyUsRef.current;
      const islandEl = sequenceIslandRef.current;
      if (whyUsEl || islandEl) {
        if (window.innerWidth > 1024) {
          const isCurrentlyVisible = whyUsEl && whyUsEl.style.visibility !== 'hidden';
          const shouldBeVisible = isCurrentlyVisible 
            ? (currentScrollY >= vh * 5.2 && currentScrollY < vh * 9.0)
            : (currentScrollY >= vh * 5.2 && currentScrollY < vh * 8.9);

          if (shouldBeVisible) {
            if (whyUsEl) {
              whyUsEl.style.visibility = 'visible';
              whyUsEl.style.pointerEvents = 'auto';
            }

            let wipeProgress = 0;
            if (currentScrollY < vh * 6.2) {
              wipeProgress = (currentScrollY - vh * 5.2) / vh;
            } else {
              wipeProgress = 1;
            }

            if (whyUsEl) {
              if (wipeProgress >= 0.99) {
                whyUsEl.style.clipPath = 'none';
              } else {
                const slantHeight = (1 - wipeProgress) * 120;
                whyUsEl.style.clipPath = `polygon(0 ${slantHeight}px, 100% 0, 100% 100%, 0 100%)`;
              }

              const glowDivider3 = whyUsEl.querySelector('.tech-glow-divider-3');
              if (glowDivider3) {
                glowDivider3.style.opacity = Math.max(0, 1 - wipeProgress).toString();
                const line3 = glowDivider3.querySelector('#tech-glow-line-3');
                if (line3 && wipeProgress < 0.99) {
                  line3.setAttribute('y1', ((1 - wipeProgress) * 120).toString());
                }
              }
            }
            if (islandEl) {
              const islandY = (1 - wipeProgress) * 60;
              islandEl.style.transform = `translateY(${islandY}px)`;
            }
          } else {
            // Completely hide and deactivate when outside its active range
            if (whyUsEl) {
              whyUsEl.style.visibility = 'hidden';
              whyUsEl.style.pointerEvents = 'none';
            }
            if (islandEl) {
              islandEl.style.transform = 'none';
            }

            // Kill frame updates and force correct boundaries depending on scroll direction
            if (currentScrollY >= vh * 8.7) {
              if (activeStageRef.current !== 4) {
                setActiveStage(4);
                activeStageRef.current = 4;
              }
              currentFrameRef.current = 300;
              targetFrameRef.current = 300;
              if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
              }
              if (dividerBarRef.current) {
                dividerBarRef.current.style.height = '100%';
              }
            } else if (currentScrollY < vh * 5.2) {
              if (activeStageRef.current !== 0) {
                setActiveStage(0);
                activeStageRef.current = 0;
              }
              currentFrameRef.current = 1;
              targetFrameRef.current = 1;
              if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
              }
              if (dividerBarRef.current) {
                dividerBarRef.current.style.height = '0%';
              }
            }
          }
        } else {
          if (whyUsEl) {
            whyUsEl.style.clipPath = 'none';
            whyUsEl.style.visibility = '';
            whyUsEl.style.pointerEvents = '';
          }
          if (islandEl) islandEl.style.transform = 'none';
        }
      }

      // Slanted Wipe & Parallax transition for Screen 5 (#work)
      const workEl = document.getElementById('work');
      const screen6El = document.getElementById('screen6');
      if (workEl) {
        if (window.innerWidth > 1024) {
          const divider2 = divider2Ref.current;
          
          if (currentScrollY >= vh * 9.2) {
            // Set default hidden styles for workEl when we are past testimonials entry
            if (currentScrollY >= vh * 10.2) {
              workEl.style.removeProperty('position');
              workEl.style.removeProperty('top');
              workEl.style.removeProperty('left');
              workEl.style.removeProperty('width');
              workEl.style.removeProperty('height');
              workEl.style.removeProperty('margin-top');
              workEl.style.transform = 'none';
              workEl.style.visibility = 'hidden';
              workEl.style.pointerEvents = 'none';
            } else {
              // 9.2 <= scroll < 10.2: workEl is fixed underneath testimonials sliding in
              workEl.style.setProperty('position', 'fixed', 'important');
              workEl.style.setProperty('top', '0', 'important');
              workEl.style.setProperty('left', '0', 'important');
              workEl.style.setProperty('width', '100%', 'important');
              workEl.style.setProperty('height', '100vh', 'important');
              workEl.style.setProperty('margin-top', '0', 'important');
              workEl.style.transform = 'none';
              workEl.style.visibility = 'visible';
              workEl.style.pointerEvents = 'auto';
            }

            // --- Screen 6 (Testimonials) Fixed Positioning Logic ---
            if (screen6El) {
              if (currentScrollY < vh * 12.2) {
                // Active range for Screen 6
                screen6El.style.setProperty('position', 'fixed', 'important');
                screen6El.style.setProperty('top', '0', 'important');
                screen6El.style.setProperty('left', '0', 'important');
                screen6El.style.setProperty('width', '100%', 'important');
                screen6El.style.setProperty('height', '100vh', 'important');
                screen6El.style.visibility = 'visible';
                screen6El.style.pointerEvents = 'auto';
                screen6El.style.display = 'flex';

                if (currentScrollY < vh * 10.2) {
                  // Sliding in
                  const progress5 = Math.max(0, Math.min((currentScrollY - vh * 9.2) / vh, 1));
                  const translateXScreen6 = (-1 + progress5) * 100;
                  screen6El.style.transform = `translateX(${translateXScreen6}vw)`;
                  if (divider2) {
                    divider2.style.transform = `translateX(${translateXScreen6 + 100}vw)`;
                    divider2.style.opacity = Math.max(0, 1 - progress5).toString();
                  }
                } else {
                  // Resting visible
                  screen6El.style.transform = 'none';
                  if (divider2) {
                    divider2.style.transform = 'none';
                    divider2.style.opacity = '0';
                  }
                }
              } else {
                // Past Screen 6 active range
                screen6El.style.removeProperty('position');
                screen6El.style.removeProperty('top');
                screen6El.style.removeProperty('left');
                screen6El.style.removeProperty('width');
                screen6El.style.removeProperty('height');
                screen6El.style.transform = 'none';
                screen6El.style.visibility = 'hidden';
                screen6El.style.pointerEvents = 'none';
                screen6El.style.display = 'none';
              }
            }

            // --- Screen 7 (Contact Form) Position & Transition Logic ---
            const screen7El = document.getElementById('screen7-container');
            if (screen7El) {
              if (currentScrollY >= vh * 10.2 && currentScrollY < vh * 13.2) {
                screen7El.style.setProperty('position', 'fixed', 'important');
                screen7El.style.setProperty('top', '0', 'important');
                screen7El.style.setProperty('left', '0', 'important');
                screen7El.style.setProperty('width', '100%', 'important');
                screen7El.style.setProperty('height', '100vh', 'important');
                screen7El.style.visibility = 'visible';
                screen7El.style.pointerEvents = 'auto';
                screen7El.style.display = 'block';

                const glowDivider7 = screen7El.querySelector('.tech-glow-divider-7');
                const line7 = screen7El.querySelector('#tech-glow-line-7');

                if (currentScrollY < vh * 11.2) {
                  // Sliding up
                  const contactProgress = Math.max(0, Math.min((currentScrollY - vh * 10.2) / vh, 1));
                  const translateYVal = (1 - contactProgress) * vh;
                  screen7El.style.transform = `translateY(${translateYVal}px)`;
                  screen7El.style.opacity = '1';

                  const slantHeight = (1 - contactProgress) * 120;
                  screen7El.style.clipPath = `polygon(0 0, 100% ${slantHeight}px, 100% 100%, 0 100%)`;

                  if (line7) {
                    line7.setAttribute('y2', slantHeight.toString());
                  }
                  if (glowDivider7) {
                    glowDivider7.style.opacity = Math.max(0, 1 - contactProgress).toString();
                  }
                  const bottomDivider = screen7El.querySelector('.tech-glow-divider-7-bottom');
                  if (bottomDivider) {
                    bottomDivider.style.opacity = '0';
                  }
                } else if (currentScrollY >= vh * 12.2) {
                  // Sliding up and out (Screen 8 / Footer entry)
                  const progressF = Math.max(0, Math.min((currentScrollY - vh * 12.2) / vh, 1));
                  const translateYVal = -progressF * vh;
                  screen7El.style.transform = `translateY(${translateYVal}px)`;
                  screen7El.style.opacity = '1';
                  screen7El.style.clipPath = 'none';
                  if (glowDivider7) {
                    glowDivider7.style.opacity = '0';
                  }
                  const bottomDivider = screen7El.querySelector('.tech-glow-divider-7-bottom');
                  if (bottomDivider) {
                    const opacityVal = progressF <= 0.5 ? 1 : Math.max(0, 2 * (1 - progressF));
                    bottomDivider.style.opacity = opacityVal.toString();
                  }
                } else {
                  // Resting visible
                  screen7El.style.transform = 'none';
                  screen7El.style.opacity = '1';
                  screen7El.style.clipPath = 'none';
                  if (glowDivider7) {
                    glowDivider7.style.opacity = '0';
                  }
                  const bottomDivider = screen7El.querySelector('.tech-glow-divider-7-bottom');
                  if (bottomDivider) {
                    bottomDivider.style.opacity = '0';
                  }
                }
              } else {
                screen7El.style.removeProperty('position');
                screen7El.style.removeProperty('top');
                screen7El.style.removeProperty('left');
                screen7El.style.removeProperty('width');
                screen7El.style.removeProperty('height');
                screen7El.style.transform = 'translateY(100vh)';
                screen7El.style.opacity = '0';
                screen7El.style.visibility = 'hidden';
                screen7El.style.pointerEvents = 'none';
                screen7El.style.display = 'none';
                screen7El.style.clipPath = '';
              }
            }

            // --- Screen 8 (Footer) Position & Transition Logic ---
            const footerEl = document.querySelector('.main-footer');
            if (footerEl) {
              if (window.innerWidth > 1024) {
                if (currentScrollY >= vh * 12.2) {
                  footerEl.style.setProperty('position', 'fixed', 'important');
                  footerEl.style.setProperty('top', '0', 'important');
                  footerEl.style.setProperty('left', '0', 'important');
                  footerEl.style.setProperty('width', '100%', 'important');
                  footerEl.style.setProperty('height', '100vh', 'important');
                  footerEl.style.visibility = 'visible';
                  footerEl.style.pointerEvents = 'auto';
                  footerEl.style.display = 'flex';

                  const progressF = Math.max(0, Math.min((currentScrollY - vh * 12.2) / vh, 1));
                  const glowDividerF = footerEl.querySelector('.tech-glow-divider');
                  const lineF = footerEl.querySelector('#tech-glow-line-footer');

                  const translateYVal = (1 - progressF) * vh;
                  footerEl.style.transform = `translateY(${translateYVal}px)`;

                  footerEl.style.clipPath = 'none';
                  if (lineF) {
                    lineF.setAttribute('y2', '60');
                  }
                  if (glowDividerF) {
                    glowDividerF.style.opacity = '0';
                  }
                } else {
                  // Hidden before scroll reach
                  footerEl.style.removeProperty('position');
                  footerEl.style.removeProperty('top');
                  footerEl.style.removeProperty('left');
                  footerEl.style.removeProperty('width');
                  footerEl.style.removeProperty('height');
                  footerEl.style.transform = 'translateY(100vh)';
                  footerEl.style.visibility = 'hidden';
                  footerEl.style.pointerEvents = 'none';
                  footerEl.style.display = 'none';
                  footerEl.style.clipPath = '';
                }
              } else {
                // Mobile reset
                footerEl.style.transform = '';
                footerEl.style.visibility = '';
                footerEl.style.pointerEvents = '';
                footerEl.style.removeProperty('position');
                footerEl.style.removeProperty('top');
                footerEl.style.removeProperty('left');
                footerEl.style.removeProperty('width');
                footerEl.style.removeProperty('height');
                footerEl.style.display = '';
                footerEl.style.clipPath = '';
              }
            }

          } else {
            // --- Default state before currentScrollY reaches vh * 9.2 ---
            workEl.style.removeProperty('position');
            workEl.style.removeProperty('top');
            workEl.style.removeProperty('left');
            workEl.style.removeProperty('width');
            workEl.style.removeProperty('height');
            workEl.style.removeProperty('margin-top');
            workEl.style.transform = 'none';
            workEl.style.visibility = 'visible';
            workEl.style.pointerEvents = 'auto';

            // Restoring the Slanted Wipe & Parallax transition for Screen 5 (#work)
            const rect = workEl.getBoundingClientRect();
            const workTopDoc = window.scrollY + rect.top;
            const easedRectTop = workTopDoc - currentScrollY;
            let workProgress = 1 - (easedRectTop / vh);
            if (window.scrollY >= vh * 9.2 || currentScrollY >= vh * 8.79) {
              workProgress = 1;
            } else {
              workProgress = Math.max(0, Math.min(1, workProgress));
            }

            if (workProgress >= 0.99) {
              workEl.style.clipPath = 'none';
            } else {
              const slantHeight = (1 - workProgress) * 120;
              workEl.style.clipPath = `polygon(0 0, 100% ${slantHeight}px, 100% 100%, 0 100%)`;
            }

            const glowDivider = workEl.querySelector('.tech-glow-divider');
            if (glowDivider) {
              glowDivider.style.opacity = Math.max(0, 1 - workProgress).toString();
              const line = glowDivider.querySelector('#tech-glow-line');
              if (line && workProgress < 0.99) {
                line.setAttribute('y2', ((1 - workProgress) * 120).toString());
              }
            }

             if (screen6El) {
              screen6El.style.removeProperty('position');
              screen6El.style.removeProperty('top');
              screen6El.style.removeProperty('left');
              screen6El.style.removeProperty('width');
              screen6El.style.removeProperty('height');
              screen6El.style.transform = 'none';
              screen6El.style.visibility = 'hidden';
              screen6El.style.pointerEvents = 'none';
              screen6El.style.display = 'none';
            }



            if (divider2 && !(currentScrollY >= vh * 1.3 && currentScrollY < vh * 2.3)) {
              divider2.style.transform = 'none';
              divider2.style.opacity = '0';
            }

            const screen7El = document.getElementById('screen7-container');
            if (screen7El) {
              screen7El.style.removeProperty('position');
              screen7El.style.removeProperty('top');
              screen7El.style.removeProperty('left');
              screen7El.style.removeProperty('width');
              screen7El.style.removeProperty('height');
              screen7El.style.transform = 'translateY(100vh)';
              screen7El.style.visibility = 'hidden';
              screen7El.style.pointerEvents = 'none';
              screen7El.style.display = 'none';
              screen7El.style.clipPath = '';
            }
          }
        } else {
          // Mobile reset
          workEl.style.transform = '';
          workEl.style.visibility = '';
          workEl.style.pointerEvents = '';
          
          if (screen6El) {
            screen6El.style.removeProperty('position');
            screen6El.style.removeProperty('top');
            screen6El.style.removeProperty('left');
            screen6El.style.removeProperty('width');
            screen6El.style.removeProperty('height');
            screen6El.style.transform = '';
            screen6El.style.visibility = '';
            screen6El.style.pointerEvents = '';
            screen6El.style.display = '';
          }

          const screen7El = document.getElementById('screen7-container');
          if (screen7El) {
            screen7El.style.transform = '';
            screen7El.style.visibility = '';
            screen7El.style.pointerEvents = '';
            screen7El.style.removeProperty('position');
            screen7El.style.removeProperty('top');
            screen7El.style.removeProperty('left');
            screen7El.style.removeProperty('width');
            screen7El.style.removeProperty('height');
            screen7El.style.display = '';
            screen7El.style.clipPath = '';
          }


          
          if (divider2) {
            divider2.style.transform = '';
            divider2.style.opacity = '';
          }
      }
    }



      // Hide hero when fully covered by subsequent section
      if (heroRef.current) {
        if (progress >= 0.99) {
          heroRef.current.style.visibility = 'hidden';
          heroRef.current.style.pointerEvents = 'none';
        } else {
          heroRef.current.style.visibility = 'visible';
          heroRef.current.style.pointerEvents = 'auto';
        }
      }

      // Continue update loop if target is not reached
      if (Math.abs(targetScrollY - currentScrollY) > 0.1) {
        reqId = requestAnimationFrame(updateParallax);
      } else {
        reqId = null;
      }
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      if (!reqId) {
        reqId = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateParallax();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (reqId) cancelAnimationFrame(reqId);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

      if (heroSceneRef.current) {
        heroSceneRef.current.style.transform = '';
        heroSceneRef.current.style.zIndex = '';
      }
    };
  }, []);



  useEffect(() => {
    const initUnicorn = () => {
      if (window.UnicornStudio && window.UnicornStudio.init) {
        try {
          window.UnicornStudio.init();
          const canvasEl = document.getElementById('unicorn-BX9TXhOJpVNQUH431cnU');
          if (canvasEl) {
            canvasEl.style.opacity = '1';
          }
        } catch (e) {
          console.warn('Unicorn Studio initialization deferred:', e);
        }
      } else {
        setTimeout(initUnicorn, 100);
      }
    };
    initUnicorn();
  }, []);

  const handleLearnApproach = (e) => {
    e.preventDefault();
    const el = document.querySelector('#approach');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      {/* Divider 2: Sliding Vertical Glowing Line at the left edge of #approach (slides with it) */}
      <div ref={divider2Ref} className="tech-glow-divider-2-fixed">
        <svg viewBox="0 0 100 1080" width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="tech-glow-grad-2" gradientUnits="userSpaceOnUse" x1="50" y1="0" x2="50" y2="1080">
              <stop offset="0%" stopColor="#00D9FF" />
              <stop offset="50%" stopColor="#A020F0" />
              <stop offset="100%" stopColor="#FF1493" />
            </linearGradient>
            <filter id="tech-glow-blur-2" filterUnits="userSpaceOnUse" x="-100" y="-100" width="300" height="1280">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect x="47" y="0" width="6" height="1080" fill="url(#tech-glow-grad-2)" filter="url(#tech-glow-blur-2)" />
        </svg>
      </div>

      {/* Global SVG gradients and filters moved to local divider SVGs to resolve rendering and clipping issues */}

      {/* WebGL Canvas Background — global fixed layer */}
      <div 
        ref={heroSceneRef} 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '115vh', 
          zIndex: 0, 
          willChange: 'transform',
          pointerEvents: 'none'
        }}
      >
        <div 
          id="unicorn-BX9TXhOJpVNQUH431cnU" 
          className="scene" 
          data-us-project="BX9TXhOJpVNQUH431cnU" 
          data-us-scale="1" 
          data-us-dpi="1.5" 
          data-us-fps="60" 
          data-us-lazyload="false" 
          style={{ 
            opacity: 0, 
            transition: 'opacity 1.2s ease', 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: 0 
          }}
        />
      </div>
      
      {/* Overlay gradient to colorize WebGL grayscale particles into magenta/cyan */}
      <div className="scene-overlay" style={{ position: 'fixed', zIndex: 1 }} />

      {/* ----------------- HERO SECTION ----------------- */}
      <section 
        id="hero" 
        ref={heroRef} 
        style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 1, 
          height: '100vh', 
          overflow: 'hidden' 
        }}
      >
        {/* Dynamic dimming overlay */}
        <div 
          ref={dimmerRef}
          className="hero-scroll-dimmer" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: '#000000', 
            opacity: 0, 
            zIndex: 3, 
            pointerEvents: 'none',
            transition: 'opacity 0.02s linear'
          }} 
        />
        {/* WebGL Background removed from Hero context, now runs globally on absolute background */}
 
        {/* Full-height Grid lines in background */}
        <div className="grid-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1 }}>
          <div className="grid-bars" style={{ height: '100%', '--cols': 8 }}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        
        {/* Interactive ASCII Brand Arrows Hover Zone */}
        <div 
          className="hero-tryzub-hover-zone"
          onMouseEnter={() => setIsArrowsHovered(true)}
          onMouseLeave={() => setIsArrowsHovered(false)}
        >
          <AsciiArrows isHovered={isArrowsHovered} />
        </div>
        
        <div className="grid-container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative', zIndex: 2 }}>
          
          {/* Main content grid centering wrapper — parallax layer */}
          <div 
            ref={heroContentRef}
            style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', willChange: 'transform, opacity', transformOrigin: 'center center' }}
          >
            <div className="grid-content" style={{ '--cols': 8 }}>
              <div className="content" style={{ gridColumn: '2 / span 6' }}>
                <h1 className="heading hero-main-heading" style={{ margin: 0 }}>
                  <TextReveal text="ПРОЕКТИРУЕМ" delay={0.2} glitch={true} />
                  <TextReveal text="СОЗДАЁМ" delay={0.35} className="gradient-text-cyan-pink" glitch={true} />
                  <TextReveal text="РАЗВИВАЕМ" delay={0.5} className="gradient-text-cyan-pink" glitch={true} />
                </h1>
                
                <p className="subtitle" style={{
                  animation: 'fadeInUp 1s ease forwards',
                  animationDelay: '0.8s',
                  opacity: 0
                }}>
                  Разработка сайтов, брендинг, интерфейсы и интернет-маркетинг. 
                  <br className="desktop-only" />
                  От идеи и проектирования до запуска и масштабирования бизнеса.
                </p>
                
                <div className="button-wrap" style={{
                  animation: 'fadeInUp 1.2s ease forwards',
                  animationDelay: '1s',
                  opacity: 0
                }}>
                  <Button text="Обсудить проект" href="https://cal.com/verteal/15min" target="_blank" rel="noopener noreferrer" variant="light" />
                </div>
              </div>
            </div>
          </div>
 
          {/* Hero Bottom Footer grid — parallax layer (drifts down) */}
          <div 
            ref={heroFooterRef}
            className="footer" 
            style={{
              animation: 'fadeInUp 1.4s ease forwards',
              animationDelay: '1.2s',
              opacity: 0,
              willChange: 'transform, opacity'
            }}
          >
            <Grid cols={8} className="hero-footer-grid">
              <div className="tagline" style={{ gridColumn: '1 / span 3', alignSelf: 'center' }}>
                <p style={{ margin: 0, whiteSpace: 'nowrap' }}>Цифровое агентство полного цикла</p>
              </div>
              <div className="hero-video-trigger-wrap" style={{ gridColumn: '4 / span 2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                <button 
                  className="hero-video-play-btn" 
                  onClick={() => setIsVideoOpen(true)}
                  aria-label="Смотреть шоурил"
                >
                  <span className="play-btn-glow-ring"></span>
                  <svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="tryzub-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FF1493" />
                        <stop offset="50%" stopColor="#A020F0" />
                        <stop offset="100%" stopColor="#00D9FF" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="44" stroke="url(#tryzub-gradient)" strokeWidth="4" fill="url(#tryzub-gradient)" fillOpacity="0.15" />
                    <path d="M42 32 L70 50 L42 68 Z" fill="url(#tryzub-gradient)" stroke="url(#tryzub-gradient)" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className="hero-video-label">Смотреть шоурил</span>
              </div>
              <div className="services" style={{ gridColumn: '6 / span 3', alignSelf: 'center' }}>
                <div className="services-video-wrap">
                  <video className="services-video" src="/websites.mp4" autoPlay loop muted playsInline />
                </div>
                <ul className="hero-services-list">
                  <li><span className="service-dot dot-pink"></span>РАЗРАБОТКА</li>
                  <li><span className="service-dot dot-purple"></span>ПОДДЕРЖКА</li>
                  <li><span className="service-dot dot-blue"></span>UI/UX</li>
                  <li><span className="service-dot dot-cyan"></span>МАРКЕТИНГ</li>
                </ul>
              </div>
            </Grid>
          </div>
        </div>
      </section>

      {/* Scroll spacer to preserve viewport height during portal zoom fixed transition */}
      <div className="portal-scroll-spacer" style={{ height: '100vh' }} />

      {/* Wrapper to stack and slide subsequent sections over the sticky Hero background */}
      <div ref={sectionsWrapRef} className="home-sections-wrap" style={{ clipPath: 'polygon(0 120px, calc(100% + 100px) 0, calc(100% + 100px) 100%, 0 100%)' }}>
        {/* Divider 1: Static Glowing Line at the top of #approach */}
        <div className="tech-glow-divider tech-glow-divider-1">
          <svg viewBox="0 0 1440 120" width="100%" height="120" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="tech-glow-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="50%" stopColor="#A020F0" />
                <stop offset="100%" stopColor="#FF1493" />
              </linearGradient>
              <filter id="tech-glow-blur-1" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <line x1="0" y1="120" x2="1440" y2="0" stroke="url(#tech-glow-grad-1)" strokeWidth="8" filter="url(#tech-glow-blur-1)" />
          </svg>
        </div>

        {/* ----------------- APPROACH SECTION ----------------- */}
        <section id="approach" className="approach-section-clean">
          <div className="approach-container-clean">
            {/* Left Column: CEO */}
            <div className="approach-col-avatar-clean">
              <div className="ceo-avatar-wrap-clean" onClick={() => setIsVideoOpen && setIsVideoOpen(true)}>
                <img src="/avatar_igor.png" alt="Игорь Табаев" className="ceo-avatar-img-clean" />
                <div className="ceo-play-btn-clean">
                  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" className="play-icon-svg">
                    <defs>
                      <linearGradient id="play-btn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00D1FF" />
                        <stop offset="50%" stopColor="#7B3FF2" />
                        <stop offset="100%" stopColor="#FF2EBE" />
                      </linearGradient>
                    </defs>
                    <path d="M8 5v14l11-7z" fill="url(#play-btn-grad)" />
                  </svg>
                </div>
              </div>
              <div className="ceo-info-clean">
                <h4 className="ceo-name-clean">Игорь Табаев</h4>
                <span className="ceo-title-clean">CEO NEXTWEB</span>
              </div>
            </div>

            {/* Right Column: Text content */}
            <div className="approach-col-text-clean">
              <span className="approach-label-clean">// 01 . НАШ ПОДХОД</span>
              <h2 className="approach-heading-clean">
                NextWeb работает на рынке информационных<br />
                технологий с 2009 года и за это время эффективно<br />
                реализовали множество проектов в областях<br />
                электронной коммерции и интернет-маркетинга.
              </h2>
              <p className="approach-desc-clean">
                Мы работаем в тесном контакте с нашими клиентами для<br className="br-desktop" />
                решения конкретных бизнес-задач.
              </p>
            </div>

            {/* Bottom row: Cards */}
            {/* Card 1 */}
            <div className="approach-card-item-clean approach-card-first">
              <span className="approach-card-number-clean">01</span>
              <h3 className="approach-card-title-clean">СОВРЕМЕННЫЕ ТЕХНОЛОГИИ</h3>
              <p className="approach-card-desc-clean">
                От проверенных временем WordPress, OpenCart и<br className="br-desktop" />
                Shopify до гибких Laravel, Node.js и React. Подбираем<br className="br-desktop" />
                стек под задачи бизнеса, а не навязываем шаблоны.
              </p>
              <div className="approach-card-tags-clean">
                <span className="approach-card-tag-clean">WordPress</span>
                <span className="approach-card-tag-clean">OpenCart</span>
                <span className="approach-card-tag-clean">Shopify</span>
                <span className="approach-card-tag-clean">Laravel</span>
                <span className="approach-card-tag-clean">Node.js</span>
                <span className="approach-card-tag-clean">React</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="approach-card-item-clean">
              <span className="approach-card-number-clean">02</span>
              <h3 className="approach-card-title-clean">СИЛЬНАЯ КОМАНДА</h3>
              <p className="approach-card-desc-clean">
                В нашей команде нет случайных людей. Мы<br className="br-desktop" />
                проактивны, честны и берем ответственность за<br className="br-desktop" />
                каждый релиз. Работаем короткими итерациями с<br className="br-desktop" />
                прозрачным результатом.
              </p>
              <div className="approach-card-tags-clean">
                <span className="approach-card-tag-clean">Proactive</span>
                <span className="approach-card-tag-clean">Responsible</span>
                <span className="approach-card-tag-clean">Decent</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="approach-card-item-clean">
              <span className="approach-card-number-clean">03</span>
              <h3 className="approach-card-title-clean">ЭФФЕКТИВНЫЙ МАРКЕТИНГ</h3>
              <p className="approach-card-desc-clean">
                Интегрируем инструменты интернет-маркетинга и<br className="br-desktop" />
                глубокую аналитику в единую стратегию.<br className="br-desktop" />
                Ориентируемся на окупаемость (ROI) и реальный рост<br className="br-desktop" />
                продаж, а не на пустые клики.
              </p>
              <div className="approach-card-tags-clean">
                <span className="approach-card-tag-clean">Strategy</span>
                <span className="approach-card-tag-clean">Analytics</span>
                <span className="approach-card-tag-clean">Growth</span>
              </div>
            </div>
          </div>
        </section>

      {/* ----------------- SELECTED WORKS VIEWPORT STICKY SECTION ----------------- */}
      <section id="dedicated" ref={dedicatedRef}>
        <div className="dedicated-sticky-container">
          <div className="dedicated-sticky-inner">
            <div className="works-split-layout">
              {/* Left Column: Fixed Project Meta Info */}
              <div className="works-left-panel">
                <span className="cyber-section-label">// 02 . ИЗБРАННЫЕ РАБОТЫ</span>
                
                <div className="works-left-content-wrap">
                  <div className="works-left-content" key={activeProjectIdx}>
                    <span className="works-project-number">
                      {String(activeProjectIdx + 1).padStart(2, '0')}
                    </span>
                    <h2 className="works-project-title">
                      {worksData[activeProjectIdx]?.title}
                    </h2>
                    <p className="works-project-subtitle">
                      {worksData[activeProjectIdx]?.subtitle}
                    </p>
                    <a
                      href={worksData[activeProjectIdx]?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="works-project-link"
                    >
                      <span>Смотреть кейс</span>
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 10.5L10.5 1.5M10.5 1.5H3.5M10.5 1.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Scrollable Cards Grid */}
              <div className="works-right-panel">
                <div className="works-scroll-track" ref={worksTrackRef}>
                  {worksData.map((project, idx) => (
                    <div 
                      key={project.id}
                      className={`work-grid-card ${activeProjectIdx === idx ? 'active' : ''}`}
                      onMouseMove={handleCardMouseMove}
                      onMouseLeave={handleCardMouseLeave}
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="work-grid-link">
                        <div className="work-grid-image-wrap">
                          <img src={project.image} alt={project.title} className="work-parallax-img" />
                        </div>
                        {/* Hidden on desktop, shown on mobile for redundancy */}
                        <div className="work-grid-meta">
                          <div className="work-grid-title-wrap">
                            <span className="work-grid-title">{project.title}</span>
                            <svg className="work-grid-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.5 10.5L10.5 1.5M10.5 1.5H3.5M10.5 1.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="work-grid-subtitle">{project.subtitle}</span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- WHY US SECTION ----------------- */}
      <section id="whyus" ref={whyUsRef} style={{ height: '300vh', background: '#ffffff', borderTop: 'none' }}>
        {/* Divider 3: Dynamic Glowing Line at the top of #whyus */}
        <div className="tech-glow-divider tech-glow-divider-3">
          <svg viewBox="0 0 1440 120" width="100%" height="120" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="tech-glow-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="50%" stopColor="#A020F0" />
                <stop offset="100%" stopColor="#FF1493" />
              </linearGradient>
              <filter id="tech-glow-blur-3" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <line id="tech-glow-line-3" x1="0" y1="120" x2="1440" y2="0" stroke="url(#tech-glow-grad-3)" strokeWidth="8" filter="url(#tech-glow-blur-3)" />
          </svg>
        </div>

        <div className="sequence-sticky-container">
          <span className="cyber-section-label sequence-section-label">// 03 . НАШИ УСЛУГИ</span>
          <div className="sequence-island" ref={sequenceIslandRef}>
            <div className="sequence-canvas-wrap">
              <canvas ref={canvasRef} className="sequence-canvas" />
              <div className="sequence-canvas-mask" />
            </div>
            
            <div className="sequence-divider-wrap">
              <div ref={dividerBarRef} className="sequence-divider-bar" />
            </div>
            
            <div className="sequence-menu" ref={sequenceMenuRef}>
              <ul className="sequence-menu-list">
                {sequenceStages.map((stage, idx) => (
                  <li 
                    key={idx} 
                    ref={el => menuItemsRef.current[idx] = el}
                    className={`sequence-menu-item ${idx === activeStage ? 'active' : ''}`}
                    onClick={() => handleStageClick(idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="sequence-menu-number">{stage.number}</span>
                    <div className="sequence-menu-content">
                      <span className="sequence-menu-text">{stage.title}</span>
                      <div className="sequence-menu-details">
                        <div className="sequence-menu-tags">
                          {stage.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="sequence-menu-tag">{tag}</span>
                          ))}
                        </div>
                        <p className="sequence-menu-desc">{stage.description}</p>
                        <a 
                          href="https://cal.com/verteal/15min" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="sequence-menu-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="sequence-menu-link-text">ПОДРОБНЕЕ</span>
                          <span className="sequence-menu-link-arrow">
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.5 10.5L10.5 1.5M10.5 1.5H3.5M10.5 1.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile responsive fallback layout */}
        <div className="sequence-mobile-layout">
          <h2 className="sequence-mobile-heading">Наши услуги</h2>
          <ul className="sequence-mobile-list">
            {sequenceStages.map((stage, idx) => (
              <li key={idx} className="sequence-mobile-item">
                <div className="sequence-mobile-top">
                  <span className="sequence-mobile-number">{stage.number}</span>
                  <span className="sequence-mobile-text">{stage.title}</span>
                </div>
                <div className="sequence-mobile-details-static">
                  <div className="sequence-mobile-tags">
                    {stage.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="sequence-mobile-tag">{tag}</span>
                    ))}
                  </div>
                  <p className="sequence-mobile-desc">{stage.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="work">
        {/* Glow Line Sweep Divider */}
        <div className="tech-glow-divider">
          <svg viewBox="0 0 1440 150" width="100%" height="150" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="tech-glow-grad-work" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="50%" stopColor="#A020F0" />
                <stop offset="100%" stopColor="#FF1493" />
              </linearGradient>
              <filter id="tech-glow-blur-work" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <line id="tech-glow-line" x1="0" y1="0" x2="1440" y2="120" stroke="url(#tech-glow-grad-work)" strokeWidth="8" filter="url(#tech-glow-blur-work)" />
          </svg>
        </div>

        <div className="tech-section-header">
          <span className="cyber-section-label">// 04 . СТЕК ТЕХНОЛОГИЙ</span>
        </div>
        
        <div className="tech-deck-island">
          {/* Left Column: Vertical Menu */}
          <div className="tech-tabs-sidebar" ref={techTabsRef}>
            <ul className="tech-tabs-list">
              {techCategories.map((category, idx) => (
                <li
                  key={category.id}
                  className={`tech-tab-item ${activeTechTab === category.id ? 'active' : ''}`}
                  onClick={() => setActiveTechTab(category.id)}
                >
                  <div className="tech-tab-header">
                    <span className="tech-tab-title">{category.title}</span>
                  </div>
                  <div className={`tech-tab-collapse ${activeTechTab === category.id ? 'open' : ''}`}>
                    <div className="tech-tab-collapse-inner">
                      <p className="tech-tab-desc">{tabDescriptions[category.id]}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Vertical divider line */}
          <div className="tech-deck-divider"></div>
          
          {/* Right Column: Grid of Tech Cards */}
          <div className="tech-grid-container">
            <div className="tech-grid">
              {techCategories.find(c => c.id === activeTechTab)?.items.map((tech) => (
                <div 
                  key={tech.name} 
                  className="tech-card"
                  style={{ '--tech-color': tech.color }}
                >
                  {/* Border Beam effect wrapper */}
                  <div className="tech-card-border-beam"></div>
                  
                  {/* Card Content */}
                  <div className="tech-card-inner">
                    <div className="tech-card-icon-wrap">
                      <TechIcon name={tech.name} />
                    </div>
                    <div className="tech-card-info">
                      <span className="tech-card-name">[{tech.label.toUpperCase()}]</span>
                      <span className="tech-card-devs">{getDevelopersText(tech.developers)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile responsive fallback layout */}
        <div className="tech-mobile-layout">
          <h2 className="tech-mobile-heading">Стек технологий</h2>
          <div className="tech-mobile-categories">
            {techCategories.map((category) => (
              <div key={category.id} className="tech-mobile-category">
                <h3 className="tech-mobile-category-title">{category.title}</h3>
                <div className="tech-mobile-grid">
                  {category.items.map((tech) => (
                    <div 
                      key={tech.name} 
                      className="tech-mobile-card"
                      style={{ '--tech-color': tech.color }}
                    >
                      <div className="tech-card-icon-wrap">
                        <TechIcon name={tech.name} />
                      </div>
                      <div className="tech-card-info">
                        <span className="tech-card-name">[{tech.label.toUpperCase()}]</span>
                        <span className="tech-card-devs">{getDevelopersText(tech.developers)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SCREEN 6: TESTIMONIALS SLIDER ----------------- */}
      <section id="screen6" className="testimonials-section">
        {/* Shifting neon background glow */}
        <div 
          className="testimonials-glow" 
          style={{ 
            backgroundColor: testimonialsData[activeTestimonialIdx]?.glowColor || 'rgba(160, 32, 240, 0.4)'
          }} 
        />

          <div className="testimonials-header">
            <span className="cyber-section-label">// 05 . ОТЗЫВЫ КЛИЕНТОВ</span>
            <h2 className="testimonials-title">
              <TextReveal text="Истории успеха наших партнеров" glitch={true} />
            </h2>
          </div>

          {/* Testimonials Carousel Track with Infinite Circular Layout */}
          <div ref={carouselContainerRef} className="testimonials-carousel-container">
            <div className="testimonials-track">
              {testimonialsData.map((item, idx) => {
                const isActive = idx === activeTestimonialIdx;
                const offset = getCardOffset(idx, activeTestimonialIdx, testimonialsData.length);
                const isSide = Math.abs(offset) === 1;
                const isHidden = Math.abs(offset) > 1;
                
                return (
                  <div 
                    key={item.id} 
                    className={`testimonial-card ${isActive ? 'active' : 'inactive'}`}
                    style={isMobile ? {
                      position: 'relative',
                      left: 'auto',
                      transform: 'none',
                      opacity: 1,
                      filter: 'none',
                      pointerEvents: 'auto',
                      display: 'grid'
                    } : {
                      transform: `translateX(calc(-50% + ${offset * 764}px)) scale(${isActive ? 1 : 0.9})`,
                      left: '50%',
                      position: 'absolute',
                      zIndex: isActive ? 10 : 5,
                      opacity: isActive ? 1 : (isSide ? 0.45 : 0),
                      filter: isActive ? 'blur(0)' : (isSide ? 'blur(6px) grayscale(0.3)' : 'blur(12px)'),
                      pointerEvents: isActive ? 'auto' : (isSide ? 'auto' : 'none'),
                      display: isHidden ? 'none' : 'grid'
                    }}
                    onClick={() => {
                      if (!isActive) {
                        setIsReviewExpanded(false);
                        setActiveTestimonialIdx(idx);
                      }
                    }}
                  >
                    {/* Left Column - Glassmorphic details */}
                    <div className="testimonial-left">
                      {/* Author Info */}
                      <div className="testimonial-author">
                        <div className="testimonial-avatar">
                          <span className="avatar-ring"></span>
                          <img 
                            src={item.avatar} 
                            alt={item.authorName} 
                            className="avatar-img" 
                          />
                        </div>
                        <div className="testimonial-author-meta">
                          <span className="author-name">{item.authorName}</span>
                          <span className="author-role">{item.authorRole}</span>
                        </div>
                      </div>

                      {/* Brand Name & Logo below it */}
                      <div className="testimonial-brand-wrap">
                        <span className="testimonial-brand-name">{item.projectTitle}</span>
                        <div className="testimonial-brand-logo-container">
                          <img 
                            src={item.logoPath} 
                            alt={`${item.projectTitle} logo`} 
                            className="testimonial-brand-logo" 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Review Content */}
                    <div className="testimonial-right">
                      {/* 5 Stars */}
                      <div className="testimonial-rating">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <svg key={i} className="star-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quotation Marks */}
                      <span className="testimonial-quote-mark">“</span>

                      {/* Review Text */}
                      <div className="testimonial-text-container">
                        <p className={`testimonial-text ${isActive && isReviewExpanded ? 'expanded' : ''}`}>
                          {item.reviewText}
                        </p>
                        {isActive && (
                          <button 
                            className="testimonial-toggle-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsReviewExpanded(!isReviewExpanded);
                            }}
                          >
                            {isReviewExpanded ? 'Скрыть' : 'Читать полностью'}
                          </button>
                        )}
                      </div>

                      {/* Button Action */}
                      <div className="testimonial-action">
                        <a 
                          href={item.projectUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="testimonial-site-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Перейти на сайт</span>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 10.5L10.5 1.5M10.5 1.5H3.5M10.5 1.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Brand Tabs Navigation */}
          <div className="testimonials-brand-tabs">
            {testimonialsData.map((item, idx) => {
              const isActive = idx === activeTestimonialIdx;
              return (
                <button
                  key={item.id}
                  className={`brand-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setIsReviewExpanded(false);
                    setActiveTestimonialIdx(idx);
                  }}
                  style={{
                    '--brand-glow-color': item.glowColor
                  }}
                >
                  <span className="brand-tab-dot"></span>
                  <span className="brand-tab-text">{item.shortName}</span>
                </button>
              );
            })}
          </div>
      </section>

      <div id="screen7-container">
        <section id="screen7" className="contact-section">
          {/* Glow Line Sweep Divider */}
          <div className="tech-glow-divider tech-glow-divider-7">
            <svg viewBox="0 0 1440 120" width="100%" height="120" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="tech-glow-grad-7" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D9FF" />
                  <stop offset="50%" stopColor="#A020F0" />
                  <stop offset="100%" stopColor="#FF1493" />
                </linearGradient>
                <filter id="tech-glow-blur-7" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <line id="tech-glow-line-7" x1="0" y1="0" x2="1440" y2="120" stroke="url(#tech-glow-grad-7)" strokeWidth="8" filter="url(#tech-glow-blur-7)" />
            </svg>
          </div>

          <div className="contact-container">
            <div className="contact-grid">
              {/* Left Side: Info */}
              <div className="contact-info">
                <h2 className="contact-title">Обсудить проект</h2>
                <p className="contact-subtitle">
                  Мы работаем в тесном контакте с нашими клиентами для решения конкретных бизнес-задач
                </p>
                
                <div className="contact-avatars-wrap">
                  <div className="contact-avatars">
                    <div className="contact-avatar-circle circle-1">
                      <img src="/avatar_redhat.png" alt="Bearded man in red hat avatar" />
                    </div>
                    <div className="contact-avatar-circle circle-2">
                      <img src="/avatar_shark.png" alt="Smiling shark avatar" />
                    </div>
                  </div>
                  <div className="contact-avatar-text">
                    <span className="contact-avatar-label">ОБЫЧНО МЫ ОТВЕЧАЕМ</span>
                    <span className="contact-avatar-sublabel">В ТЕЧЕНИЕ ОДНОГО РАБОЧЕГО ДНЯ</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="contact-form-card">
                {formStatus === 'success' ? (
                  <div className="contact-success-message">
                    <div className="success-icon-wrap">
                      <svg className="success-svg" viewBox="0 0 52 52">
                        <circle className="success-circle" cx="26" cy="26" r="25" fill="none" />
                        <path className="success-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                      </svg>
                    </div>
                    <h3 className="success-heading">Заявка отправлена!</h3>
                    <p className="success-message">
                      Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
                    </p>
                    <button className="contact-reset-btn" onClick={() => setFormStatus('idle')}>
                      Отправить еще раз
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="input-group">
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          placeholder="Ваше имя" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          className="contact-input" 
                        />
                      </div>
                      <div className="input-group">
                        <input 
                          type="text" 
                          name="phone" 
                          required 
                          placeholder="Номер телефона" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          className="contact-input" 
                        />
                      </div>
                    </div>

                    <div className="input-group select-group">
                      <label className="select-label">Что вас интересует?</label>
                      <div className="custom-select-wrapper">
                        <select 
                          name="interest" 
                          value={formData.interest} 
                          onChange={handleInputChange} 
                          className="contact-select"
                        >
                          <option value="Создание сайта">Создание сайта</option>
                          <option value="Брендинг">Брендинг</option>
                          <option value="UI/UX Дизайн">UI/UX Дизайн</option>
                          <option value="Интернет-маркетинг">Интернет-маркетинг</option>
                          <option value="Другое">Другое</option>
                        </select>
                        <div className="select-arrow-icon">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="input-group">
                      <label className="textarea-label">Ваше сообщение</label>
                      <textarea 
                        name="message" 
                        rows="3" 
                        required 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        className="contact-textarea" 
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === 'sending'} 
                      className="contact-submit-btn-premium"
                    >
                      <span>{formStatus === 'sending' ? 'Отправка...' : 'Отправить заявку'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Glow Line Divider at the bottom of Screen 7 container */}
        <div 
          className="tech-glow-divider-7-bottom" 
          style={{ 
            position: 'absolute', 
            bottom: '-2px', 
            left: 0, 
            width: '100%', 
            height: '4px', 
            background: 'linear-gradient(90deg, #00D9FF 0%, #A020F0 50%, #FF1493 100%)', 
            zIndex: 100, 
            boxShadow: '0 0 10px #00D9FF, 0 0 20px #A020F0, 0 0 30px #FF1493',
            pointerEvents: 'none',
            transition: 'opacity 0.05s ease-out',
            opacity: 0
          }} 
        />
      </div>

      <Footer />

      <div className="testimonials-spacer" style={{ height: isMobile ? '0px' : '600vh' }}></div>
      </div>

      {/* Keyframe drift animation inject */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Parallax Video Revealer Screen */}
      <div 
        className={`video-revealer ${isVideoOpen ? 'open' : ''}`}
        onClick={() => setIsVideoOpen(false)}
      >
        <div className="video-inner-container" onClick={(e) => e.stopPropagation()}>
          {isVideoOpen && (
            <video 
              className="revealer-video" 
              src="/websites.mp4" 
              autoPlay 
              loop 
              muted={false} 
              controls 
              playsInline
            />
          )}
          <button className="video-close-btn" onClick={() => setIsVideoOpen(false)} aria-label="Закрыть">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
