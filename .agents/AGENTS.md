# 🚀 ИНСТРУКЦИЯ И КАТАЛОГ ИНСТРУМЕНТОВ (AGENTS.md)

> **ДЛЯ АГЕНТА (ANTIGRAVITY):** Этот файл является твоей системной инструкцией и каталогом ресурсов. Ты обязан строго следовать правилам работы с кодом и использовать приведенные ниже 60 репозиториев/инструментов как «Арсенал» для выбора оптимального стека под задачи пользователя.

---

## 🧠 ГЛАВНЫЕ ПРАВИЛА РАЗРАБОТКИ (ДЛЯ АГЕНТА)

1. **Принцип «Не навреди»:** Перед внесением изменений в CSS или JS для десктопной версии, убедись, что эти изменения не ломают мобильную адаптивность.
2. **Итеративный подход:** Всегда работай по цепочке: Спецификация (`specify init` / планирование) ➔ Обсуждение архитектуры ➔ Кодинг ➔ Автоматические тесты ➔ Ревью.
3. **Защита от перегрузки:** Не устанавливай все библиотеки подряд. Выбирай только те инструменты из каталога ниже, которые необходимы для выполнения текущей задачи пользователя.
4. **Контроль ошибок:** Регулярно запускай линтер и тесты, чтобы вовремя отлавливать регрессии (когда починка одного ломает другое).

---

## 📑 АРСЕНАЛ ИНСТРУМЕНТОВ (60 РЕПОЗИТОРИЕВ ПО МОДУЛЯМ)

### МОДУЛЬ 0: Контроль агента (Правила и планирование)
*Используются для организации процесса разработки, чтобы агент понимал рамки проекта и писал предсказуемый код.*

1. **github/spec-kit** — [https://github.com/github/spec-kit](https://github.com/github/spec-kit)
   * **Назначение:** Инициализация спецификаций и планов разработки в проекте. Команда `specify init` создает скелет для работы агента.
2. **multica-ai/andrej-karpathy-skills** — [https://github.com/multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)
   * **Назначение:** Знаменитые 12 правил для ИИ, предотвращающие ложные допущения, лишние изменения рабочего кода и необоснованное усложнение.
3. **ciembor/agent-rules-books** — [https://github.com/ciembor/agent-rules-books](https://github.com/ciembor/agent-rules-books)
   * **Назначение:** Готовые стандарты правил чистого кода (Clean Code), рефакторинга и DDD для ИИ-агентов.
4. **sanjeed5/awesome-cursor-rules-mdc** — [https://github.com/sanjeed5/awesome-cursor-rules-mdc](https://github.com/sanjeed5/awesome-cursor-rules-mdc)
   * **Назначение:** Огромная библиотека файлов правил для различных языков программирования и фреймворков (TS, React, Next.js).
5. **RayFernando1337/llm-cursor-rules** — [https://github.com/RayFernando1337/llm-cursor-rules](https://github.com/RayFernando1337/llm-cursor-rules)
   * **Назначение:** Генератор иерархических правил. Помогает создавать легкие глобальные и детальные локальные инструкции.
6. **VoltAgent/awesome-agent-skills** — [https://github.com/VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)
   * **Назначение:** База официальных и протестированных навыков (SKILL.md) для интеграции в ИИ-окружение.
7. **kodustech/awesome-agent-skills** — [https://github.com/kodustech/awesome-agent-skills](https://github.com/kodustech/awesome-agent-skills)
   * **Назначение:** Еще одна курируемая коллекция практических навыков для автоматизации рутинных задач агента.

---

### МОДУЛЬ 1: Мульти-агентная оркестрация (Для автономных систем)
*Используются, если необходимо построить отдельное внешнее приложение, где несколько ИИ-агентов работают в команде.*

8. **crewAIInc/crewAI** — [https://github.com/crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)
   * **Назначение:** Фреймворк для создания ролевых агентов (например, PM, Разработчик, QA), обменивающихся задачами.
9. **geekan/MetaGPT** — [https://github.com/geekan/MetaGPT](https://github.com/geekan/MetaGPT)
   * **Назначение:** Симуляция полноценной ИТ-компании внутри ИИ. На выходе генерирует документацию и код проекта.
10. **microsoft/autogen** — [https://github.com/microsoft/autogen](https://github.com/microsoft/autogen)
    * **Назначение:** Инструмент от Microsoft для создания многоагентных диалоговых систем с возможностью контроля человеком.
11. **langchain-ai/langgraph** — [https://github.com/langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)
    * **Назначение:** Библиотека для построения сложных циклических графов и логики состояний между агентами.
12. **MervinPraison/PraisonAI** — [https://github.com/MervinPraison/PraisonAI](https://github.com/MervinPraison/PraisonAI)
    * **Назначение:** Упрощенный фреймворк для запуска мульти-агентных систем с самопроверкой кода и поддержкой протоколов MCP.

---

### МОДУЛЬ 2: Старт сайта (Бойлерплейты / Шаблоны)
*Готовые основы для быстрого развертывания проекта со всеми преднастроенными тестами, линтерами и стилями.*

13. **ixartz/Next-js-Boilerplate** — [https://github.com/ixartz/Next-js-Boilerplate](https://github.com/ixartz/Next-js-Boilerplate)
    * **Назначение:** Самый популярный шаблон на Next.js, TypeScript, Tailwind 4, Vitest, Playwright и Storybook. Идеально для большинства сайтов.
14. **ixartz/SaaS-Boilerplate** — [https://github.com/ixartz/SaaS-Boilerplate](https://github.com/ixartz/SaaS-Boilerplate)
    * **Назначение:** Полный шаблон для коммерческих сервисов с мультитенантностью, подписками, мультиязычностью (i18n) и панелью управления.
15. **t3-oss/create-t3-app** — [https://github.com/t3-oss/create-t3-app](https://github.com/t3-oss/create-t3-app)
    * **Назначение:** Инициализатор проектов с упором на максимальную безопасность типов (TypeScript) на базе Next.js, Prisma, Tailwind и tRPC.
16. **virastack/nextjs-boilerplate** — [https://github.com/virastack/nextjs-boilerplate](https://github.com/virastack/nextjs-boilerplate)
    * **Назначение:** Шаблон Next.js, оптимизированный под ИИ-разработку, содержащий встроенные дисциплинарные правила для агентов.
17. **mickasmt/next-saas-stripe-starter** — [https://github.com/mickasmt/next-saas-stripe-starter](https://github.com/mickasmt/next-saas-stripe-starter)
    * **Назначение:** Минималистичный шаблон со встроенной интеграцией Stripe (оплаты, подписки, вебхуки) и shadcn/ui.
18. **darkroomengineering/satus** — [https://github.com/darkroomengineering/satus](https://github.com/darkroomengineering/satus)
    * **Назначение:** Премиум-шаблон для создания интерактивных креативных сайтов (включает интеграцию GSAP, Lenis, WebGL и CMS Sanity). *Примечание: Изменено название организации (убран дефис).*

---

### МОДУЛЬ 3: UI-основа (Интерфейс и стили)
*Базовые строительные блоки интерфейса и библиотека стилей.*

19. **shadcn/ui** — [https://github.com/shadcn/ui](https://github.com/shadcn/ui)
    * **Назначение:** Набор доступных, копируемых компонентов UI (модальные окна, кнопки, формы), которые можно легко стилизовать. *Примечание: Изменено название репозитория с shadcn-ui/ui.*
20. **radix-ui/primitives** — [https://github.com/radix-ui/primitives](https://github.com/radix-ui/primitives)
    * **Назначение:** Безстилевые низкоуровневые компоненты для React с фокусом на доступность (accessibility). База для shadcn.
21. **tailwindlabs/tailwindcss** — [https://github.com/tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
    * **Назначение:** CSS-фреймворк для быстрой стилизации компонентов прямо в HTML-коде с помощью утилитарных классов.

---

### МОДУЛЬ 4: Премиум-компоненты (Эстетика и «дорогой» вид)
*Готовые визуальные блоки с современным дизайном, эффектами свечения, сетками и микро-анимациями.*

22. **Aceternity UI** — [https://ui.aceternity.com](https://ui.aceternity.com)
    * **Назначение:** Коллекция премиум-компонентов в темных тонах (3D-карточки, неоновые эффекты, свечение, анимированные кнопки).
23. **magicuidesign/magicui** — [https://github.com/magicuidesign/magicui](https://github.com/magicuidesign/magicui)
    * **Назначение:** Библиотека визуальных эффектов (световые лучи, неоновые границы, интерактивные сетки, анимации текста).
24. **birobirobiro/awesome-shadcn-ui** — [https://github.com/birobirobiro/awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui)
    * **Назначение:** Огромная подборка готовых секций, лендингов и расширений, построенных на базе экосистемы shadcn.
25. **Tailark** — [https://tailark.com](https://tailark.com)
    * **Назначение:** 300+ готовых дизайнерских блоков для маркетинговых сайтов, чтобы избежать шаблонного вида страниц.
26. **Cult UI** — [https://www.cult-ui.com](https://www.cult-ui.com)
    * **Назначение:** Нестандартные и креативные интерактивные компоненты на базе Framer Motion и Tailwind CSS.
27. **Origin UI** — [https://originui.com](https://originui.com)
    * **Назначение:** Библиотека сложных интерактивных полей ввода, селекторов и переключателей с проработанным дизайном.
28. **Skiper UI** — [https://skiper-ui.com](https://skiper-ui.com)
    * **Назначение:** Подборка уникальных дизайнерских блоков интерфейса, легко интегрируемых через реестр shadcn.

---

### МОДУЛЬ 5: Движки анимации (Интерактивное движение)
*Позволяют оживить элементы, настроить реакцию на прокрутку страницы и сделать переходы между страницами плавными.*

29. **greensock/GSAP** — [https://github.com/greensock/GSAP](https://github.com/greensock/GSAP)
    * **Назначение:** Самый мощный индустриальный движок анимации. Модуль ScrollTrigger незаменим для сложной анимации по мере прокрутки.
30. **motiondivision/motion** — [https://github.com/motiondivision/motion](https://github.com/motiondivision/motion) (сайт: [https://motion.dev](https://motion.dev))
    * **Назначение:** Официальная библиотека анимации для React (бывший Framer Motion). Проста в использовании для жестов и переходов layouts.
31. **darkroomengineering/lenis** — [https://github.com/darkroomengineering/lenis](https://github.com/darkroomengineering/lenis)
    * **Назначение:** Библиотека для плавного инерционного скролла страницы (создает ощущение дорогого киноэффекта при прокрутке). *Примечание: Изменено название организации (убран дефис).*
32. **pmndrs/react-spring** — [https://github.com/pmndrs/react-spring](https://github.com/pmndrs/react-spring)
    * **Назначение:** Физико-ориентированный движок анимации на пружинах для создания естественных и отзывчивых переходов.
33. **juliangarnier/anime** — [https://github.com/juliangarnier/anime](https://github.com/juliangarnier/anime)
    * **Назначение:** Очень легкая JavaScript-библиотека для анимации CSS-свойств, SVG-путей и создания таймлайнов.
34. **airbnb/lottie-web** — [https://github.com/airbnb/lottie-web](https://github.com/airbnb/lottie-web)
    * **Назначение:** Рендеринг сложной векторной графики и анимаций, экспортированных в формат JSON из Adobe After Effects.
35. **formkit/auto-animate** — [https://github.com/formkit/auto-animate](https://github.com/formkit/auto-animate)
    * **Назначение:** Ультралегкий инструмент, автоматически анимирующий любые изменения в DOM (добавление, удаление, сортировка элементов).

---

### МОДУЛЬ 6: 3D и WebGL (Глубина и объем)
*Используются для создания award-level сайтов с трехмерной интерактивной графикой.*

36. **mrdoob/three.js** — [https://github.com/mrdoob/three.js](https://github.com/mrdoob/three.js)
    * **Назначение:** Главный и самый популярный движок для работы с 3D-графикой в браузере.
37. **pmndrs/react-three-fiber** — [https://github.com/pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber)
    * **Назначение:** Обертка над Three.js для декларативного рендеринга 3D-сцен в виде стандартных React-компонентов.
38. **pmndrs/drei** — [https://github.com/pmndrs/drei](https://github.com/pmndrs/drei)
    * **Назначение:** Набор готовых хелперов, шейдеров, камер и элементов управления для ускорения разработки в react-three-fiber.
39. **theatre-js/theatre** — [https://github.com/theatre-js/theatre](https://github.com/theatre-js/theatre)
    * **Назначение:** Визуальный таймлайн-редактор для тонкой настройки сложных 3D-анимаций прямо в браузере с сохранением кода.
40. **Spline** — [https://spline.design](https://spline.design)
    * **Назначение:** Инструмент визуального 3D-дизайна, позволяющий легко создавать интерактивные 3D-сцены и экспортировать их в код сайта.

---

### МОДУЛЬ 7: Формы и Управление данными (Логика)
*Обеспечивают стабильную работу с пользовательским вводом, формами и получением данных с сервера.*

41. **react-hook-form/react-hook-form** — [https://github.com/react-hook-form/react-hook-form](https://github.com/react-hook-form/react-hook-form)
    * **Назначение:** Библиотека для управления формами in React. Минимизирует лишние перерисовки (ре-рендеры), работает очень быстро.
42. **colinhacks/zod** — [https://github.com/colinhacks/zod](https://github.com/colinhacks/zod)
    * **Назначение:** Инструмент для валидации схем данных. В связке с react-hook-form гарантирует корректность ввода пользователя.
43. **TanStack/query** — [https://github.com/TanStack/query](https://github.com/TanStack/query)
    * **Назначение:** Мощный инструмент для кеширования, синхронизации и обновления данных, получаемых от API.
44. **TanStack/table** — [https://github.com/TanStack/table](https://github.com/TanStack/table)
    * **Назначение:** Библиотека для создания сложных таблиц (сортировка, фильтрация, пагинация) без привязки к конкретному UI.

---

### МОДУЛЬ 8: Backend, Авторизация и CMS (Инфраструктура)
*Отвечают за хранение данных пользователей, регистрацию и удобное управление контентом на сайте.*

45. **better-auth/better-auth** — [https://github.com/better-auth/better-auth](https://github.com/better-auth/better-auth)
    * **Назначение:** Современная и безопасная система аутентификации для TypeScript (сессии, роли, OAuth-провайдеры).
46. **drizzle-team/drizzle-orm** — [https://github.com/drizzle-team/drizzle-orm](https://github.com/drizzle-team/drizzle-orm)
    * **Назначение:** Сверхбыстрый и типобезопасный ORM-инструмент для взаимодействия с базами данных SQL на сервере или edge-функциях.
47. **supabase/supabase** — [https://github.com/supabase/supabase](https://github.com/supabase/supabase)
    * **Назначение:** Альтернатива Firebase с базой Postgres, авторизацией, файловым хранилищем и real-time обновлениями «из коробки».
48. **payloadcms/payload** — [https://github.com/payloadcms/payload](https://github.com/payloadcms/payload)
    * **Назначение:** Мощная Headless CMS на TypeScript, которая интегрируется прямо в проект Next.js для управления страницами.
49. **sanity-io/sanity** — [https://github.com/sanity-io/sanity](https://github.com/sanity-io/sanity)
    * **Назначение:** Гибкая платформа для управления контентом с визуальным редактором, часто используемая в премиум-сайтах.

---

### МОДУЛЬ 9: SEO и Производительность (Оптимизация)
*Делают сайт видимым для поисковых систем Google/Яндекс и обеспечивают мгновенную загрузку страниц.*

50. **garmeeh/next-seo** — [https://github.com/garmeeh/next-seo](https://github.com/garmeeh/next-seo)
    * **Назначение:** Удобное управление мета-тегами, Open Graph разметкой и JSON-LD структурированными данными в Next.js.
51. **vercel/next.js** — [https://github.com/vercel/next.js](https://github.com/vercel/next.js)
    * **Назначение:** Основной React-фреймворк для построения быстрых сайтов с рендерингом на сервере (SSR) и генерацией статики (SSG).
52. **pmndrs/zustand** — [https://github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)
    * **Назначение:** Минималистичный и быстрый менеджер глобального состояния приложения без сложного кода, в отличие от Redux.

---

### МОДУЛЬ 10: Ресурсы, Иконки и Ассеты (Графика)
*Шрифты, наборы иконок и графические ресурсы для стильного оформления.*

53. **lucide-icons/lucide** — [https://github.com/lucide-icons/lucide](https://github.com/lucide-icons/lucide)
    * **Назначение:** Огромный и чистый пак SVG-иконок, который используется по умолчанию в компонентах shadcn/ui.
54. **tabler/tabler-icons** — [https://github.com/tabler/tabler-icons](https://github.com/tabler/tabler-icons)
    * **Назначение:** Набор из более чем 5000+ бесплатных векторных иконок для тонкой настройки интерфейса.
55. **bradtraversy/design-resources-for-developers** — [https://github.com/bradtraversy/design-resources-for-developers](https://github.com/bradtraversy/design-resources-for-developers)
    * **Назначение:** Курируемая база полезных ссылок на бесплатные шрифты, палитры, паттерны, мокапы и дизайн-системы.
56. **transitions.dev** — [https://transitions.dev](https://transitions.dev)
    * **Назначение:** Каталог премиальных интерактивных переходов и эффектов с открытым исходным кодом.

---

### МОДУЛЬ 11: Тестирование и Качество кода (QA)
*Инструменты, которые агент обязан запускать перед сдачей работы, чтобы гарантировать работоспособность мобильной и десктопной версий.*

57. **CodeRabbit** — [https://coderabbit.ai](https://coderabbit.ai)
    * **Назначение:** Интеграция искусственного интеллекта для автоматического ревью пулл-реквестов в GitHub, отлавливающего скрытые баги.
58. **qodo-ai/pr-agent** — [https://github.com/qodo-ai/pr-agent](https://github.com/qodo-ai/pr-agent)
    * **Назначение:** Инструмент с открытым исходным кодом для автоматического ревью изменений кода с учетом контекста всего проекта.
59. **biomejs/biome** — [https://github.com/biomejs/biome](https://github.com/biomejs/biome)
    * **Назначение:** Сверхбыстрая альтернатива ESLint и Prettier в одном флаконе. Мгновенно форматирует код и находит ошибки синтаксиса.
60. **microsoft/playwright** — [https://github.com/microsoft/playwright](https://github.com/microsoft/playwright)
    * **Назначение:** Инструмент для сквозного тестирования. Эмулирует действия пользователя на разных устройствах (десктоп, iOS, Android), проверяя стабильность верстки.
