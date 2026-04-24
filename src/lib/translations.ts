export const translations = {
  ru: {
    nav: {
      home: "Главная",
      work: "Работы",
      services: "Услуги",
      about: "Обо мне",
      contact: "Контакты",
    },
    hero: {
      badge: "Веб-разработка & App",
      title: "Разрабатываю продукты, которые работают",
      description: "Создаю сайты, мобильные приложения и сервисы под ключ — от идеи до запуска. Быстро, надёжно, с заботой о деталях.",
      ctaProject: "Обсудить проект",
      ctaServices: "Мои услуги",
    },
    work: {
      title: "Проекты",
      subtitle: "/ Избранные работы",
      githubLink: "🔗 Посмотреть на GitHub",
      projects: [
        {
          n: "01",
          t: "GreenG — маркетплейс садовых услуг",
          s: "Мобильное приложение / React + Flutter",
          y: "2026",
          description: "<strong>GreenG</strong> — двусторонний маркетплейс для поиска исполнителей садовых услуг, объединяющий мобильное приложение (Flutter), веб-интерфейс и административную панель. Обеспечивает геолокационный поиск заказов на карте, чат в реальном времени и интегрированную систему платежей.\n\n<strong>Технологии:</strong> NestJS 11, TypeScript, Flutter 3.9, React 18, MongoDB 7.0, Redis 7, Socket.IO, Stripe API, Google Maps API, Firebase Cloud Messaging, Docker, Nginx, Prometheus, Grafana.\n\n<strong>Проблема:</strong> сложно быстро найти исполнителя услуг и организовать коммуникацию и оплату.\n<strong>Решение:</strong> мобильный маркетплейс с геолокацией, чатом и встроенными платежами.\n\n<strong>✔ Результат:</strong> создана масштабируемая платформа с микросервисной архитектурой, обеспечивающая обработку 1000+ запросов в минуту. Синхронизация данных в реальном времени сократила время обработки заказов на 60%.",
        },
        {
          n: "02",
          t: "Inna Bot — интеллектуальный userbot Telegram",
          s: "Telegram bot / Python, Telethon, OpenAI",
          y: "2025",
          description: "<strong>Inna Bot</strong> — продвинутый Telegram-бот с искусственным интеллектом, объединяющий RAG-систему и машинное обучение. Обеспечивает естественное общение с контекстной памятью, анализом предпочтений пользователей и мультимодальной обработкой.\n\n- RAG-система с векторным поиском по истории диалогов (ChromaDB, русскоязычные embeddings)\n- ML-анализ предпочтений пользователей и персонализация ответов\n- Мультимодальная обработка: голосовые сообщения (STT/TTS), анализ изображений (GPT-4o Vision)\n- Интеллектуальный веб-поиск с автоматическим определением необходимости\n- Система напоминаний и управление бюджетом API-запросов\n- Модульная архитектура с разделением на сервисы\n\n<strong>Технологии:</strong> Python, Telethon, OpenAI GPT-4o/GPT-4o Vision, Sentence Transformers, ChromaDB, scikit-learn, spaCy, SQLite, SerpAPI, Yandex SpeechKit, AsyncIO.\n\n<strong>Проблема:</strong> шаблонные боты без контекста и персонализации.\n<strong>Решение:</strong> AI-бот с RAG-подходом, контекстной памятью и мультимодальной обработкой.\n\n<strong>✔ Результат:</strong> создан интеллектуальный бот с персонализацией на основе ML-анализа, RAG-системой для контекстных ответов и мультимодальной обработкой для естественного общения.",
        },
        {
          n: "03",
          t: "СантехникЪ — интернет-магазин",
          s: "Современный интернет-магазин сантехнической продукции / React, TypeScript",
          y: "2026",
          description: "<strong>СантехникЪ</strong> — современный интернет-магазин сантехнической продукции для локального рынка. Реализован многоуровневый каталог товаров с удобной навигацией, умным поиском и полной информацией о компании. Проект ориентирован на локальное SEO-продвижение, высокую производительность и комфортное использование на мобильных устройствах.\n\n<strong>Технологии:</strong> React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, React Query, SEO-оптимизация, lazy loading, JSON-каталог.\n\n<strong>Проблема:</strong> низкая видимость в поиске и сложная навигация по каталогу.\n<strong>Решение:</strong> SEO-ориентированный e-commerce с быстрым и адаптивным интерфейсом.\n\n<strong>✔ Результат:</strong> создан быстрый и масштабируемый e-commerce сайт с древовидной структурой каталога, SEO-оптимизированными страницами и адаптивным интерфейсом, готовый к продвижению в локальной выдаче.",
          githubLink: "https://github.com/ignitione1/plumbing_store",
        },
        {
          n: "04",
          t: "TaskFlow — управление задачами + Telegram-бот",
          s: "Современная система управления задачами / Python + Aiogram",
          y: "2025",
          description: "<strong>TaskFlow</strong> — современная система управления задачами, объединяющая веб-интерфейс и Telegram-бот. Обеспечивает полную синхронизацию данных и автоматические уведомления.\n\n<strong>Технологии:</strong> Django 5.2, DRF, Pure JS, Bootstrap 5, Django Channels (WebSocket), Celery, Redis, SQLite, Aiogram, Daphne.\n\n<strong>Проблема:</strong> разрозненные задачи и уведомления в разных инструментах.\n<strong>Решение:</strong> единая система с веб-интерфейсом и Telegram-ботом с real-time синхронизацией.\n\n<strong>✔ Результат:</strong> сократил время управления задачами на 40% за счет синхронизации веб-интерфейса и Telegram-бота в реальном времени.",
          githubLink: "https://github.com/ignitione1/TaskFlow",
        },
      ],
    },
    services: {
      title: "Услуги",
      subtitle: "/ Мои компетенции",
      items: {
        web: {
          title: "Веб-разработка",
          description: "Сайты и веб-приложения любой сложности — от лендингов до корпоративных платформ",
        },
        mobile: {
          title: "Мобильные приложения",
          description: "Нативные и кроссплатформенные приложения для iOS и Android — от прототипа до App Store",
        },
        backend: {
          title: "Бэкенд и API",
          description: "Разработка серверной части, интеграции, базы данных и облачная инфраструктура",
        },
        design: {
          title: "UI/UX Дизайн",
          description: "Удобные интерфейсы: прототипы, дизайн-системы, адаптив",
        },
      },
    },
    about: {
      title: "Пишу код. Решаю бизнес-задачи",
      description1: "Превращаю идеи в работающие продукты. Без воды и лишних слов.",
      description2: "Беру проекты под ключ и остаюсь на связи после запуска — потому что хороший продукт развивается постоянно.",
      stats: {
        projects: {
          value: "10+",
          label: "Проектов",
          sublabel: "Запущено и работает",
        },
        experience: {
          value: "2",
          label: "Года",
          sublabel: "На рынке разработки",
        },
        clients: {
          value: "98%",
          label: "Клиентов",
          sublabel: "Возвращаются снова",
        },
      },
      ctaProject: "Начать проект",
      ctaWork: "Смотреть работы",
    },
    contact: {
      title: "Давайте поговорим",
      subtitle: "/ Свяжитесь со мной",
      email: "Email",
      location: "Локация",
      locationValue: "Прокопьевск, Россия",
      form: {
        name: "Имя",
        namePlaceholder: "Ваше имя",
        contact: "Контакты",
        contactPlaceholder: "telegram, vk, email...",
        message: "Сообщение",
        messagePlaceholder: "Расскажите о вашем проекте...",
        submit: "Отправить",
        submitting: "Отправка...",
        success: "Отправлено!",
        error: "Ошибка отправки. Попробуйте позже.",
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      work: "Work",
      services: "Services",
      about: "About",
      contact: "Contact",
    },
    hero: {
      badge: "Web Development & App",
      title: "I build products that work",
      description: "I create websites, mobile apps, and services from scratch — from idea to launch. Fast, reliable, with attention to detail.",
      ctaProject: "Discuss project",
      ctaServices: "My services",
    },
    work: {
      title: "Projects",
      subtitle: "/ Selected work",
      githubLink: "🔗 View on GitHub",
      projects: [
        {
          n: "01",
          t: "GreenG — Garden Services Marketplace",
          s: "Mobile App / React + Flutter",
          y: "2026",
          description: "<strong>GreenG</strong> — a two-sided marketplace for finding garden service providers, combining a mobile app (Flutter), web interface, and admin panel. Features geolocation-based order search on map, real-time chat, and integrated payment system.\n\n<strong>Technologies:</strong> NestJS 11, TypeScript, Flutter 3.9, React 18, MongoDB 7.0, Redis 7, Socket.IO, Stripe API, Google Maps API, Firebase Cloud Messaging, Docker, Nginx, Prometheus, Grafana.\n\n<strong>Problem:</strong> difficult to quickly find service providers and organize communication and payments.\n<strong>Solution:</strong> mobile marketplace with geolocation, chat, and built-in payments.\n\n<strong>✔ Result:</strong> created a scalable platform with microservices architecture handling 1000+ requests per minute. Real-time data synchronization reduced order processing time by 60%.",
        },
        {
          n: "02",
          t: "Inna Bot — Intelligent Telegram Userbot",
          s: "Telegram bot / Python, Telethon, OpenAI",
          y: "2025",
          description: "<strong>Inna Bot</strong> — an advanced Telegram bot with artificial intelligence, combining RAG system and machine learning. Provides natural conversation with contextual memory, user preference analysis, and multimodal processing.\n\n- RAG system with vector search on conversation history (ChromaDB, Russian embeddings)\n- ML analysis of user preferences and response personalization\n- Multimodal processing: voice messages (STT/TTS), image analysis (GPT-4o Vision)\n- Intelligent web search with automatic necessity detection\n- Reminder system and API request budget management\n- Modular architecture with service separation\n\n<strong>Technologies:</strong> Python, Telethon, OpenAI GPT-4o/GPT-4o Vision, Sentence Transformers, ChromaDB, scikit-learn, spaCy, SQLite, SerpAPI, Yandex SpeechKit, AsyncIO.\n\n<strong>Problem:</strong> template bots without context and personalization.\n<strong>Solution:</strong> AI bot with RAG approach, contextual memory, and multimodal processing.\n\n<strong>✔ Result:</strong> created an intelligent bot with personalization based on ML analysis, RAG system for contextual responses, and multimodal processing for natural conversation.",
        },
        {
          n: "03",
          t: "СантехникЪ — E-commerce Store",
          s: "Modern plumbing products store / React, TypeScript",
          y: "2026",
          description: "<strong>СантехникЪ</strong> — a modern e-commerce store for plumbing products for the local market. Features a multi-level product catalog with easy navigation, smart search, and complete company information. The project is focused on local SEO promotion, high performance, and comfortable mobile usage.\n\n<strong>Technologies:</strong> React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, React Query, SEO optimization, lazy loading, JSON catalog.\n\n<strong>Problem:</strong> low search visibility and complex catalog navigation.\n<strong>Solution:</strong> SEO-oriented e-commerce with fast and responsive interface.\n\n<strong>✔ Result:</strong> created a fast and scalable e-commerce site with tree-structured catalog, SEO-optimized pages, and responsive interface, ready for local search promotion.",
          githubLink: "https://github.com/ignitione1/plumbing_store",
        },
        {
          n: "04",
          t: "TaskFlow — Task Management + Telegram Bot",
          s: "Modern task management system / Python + Aiogram",
          y: "2025",
          description: "<strong>TaskFlow</strong> — a modern task management system combining web interface and Telegram bot. Provides full data synchronization and automatic notifications.\n\n<strong>Technologies:</strong> Django 5.2, DRF, Pure JS, Bootstrap 5, Django Channels (WebSocket), Celery, Redis, SQLite, Aiogram, Daphne.\n\n<strong>Problem:</strong> scattered tasks and notifications across different tools.\n<strong>Solution:</strong> unified system with web interface and Telegram bot with real-time synchronization.\n\n<strong>✔ Result:</strong> reduced task management time by 40% through real-time synchronization of web interface and Telegram bot.",
          githubLink: "https://github.com/ignitione1/TaskFlow",
        },
      ],
    },
    services: {
      title: "Services",
      subtitle: "/ My expertise",
      items: {
        web: {
          title: "Web Development",
          description: "Websites and web applications of any complexity — from landing pages to corporate platforms",
        },
        mobile: {
          title: "Mobile Apps",
          description: "Native and cross-platform apps for iOS and Android — from prototype to App Store",
        },
        backend: {
          title: "Backend & API",
          description: "Server-side development, integrations, databases, and cloud infrastructure",
        },
        design: {
          title: "UI/UX Design",
          description: "User-friendly interfaces: prototypes, design systems, responsive",
        },
      },
    },
    about: {
      title: "I write code. I solve business problems",
      description1: "I turn ideas into working products. No fluff, no wasted words.",
      description2: "I take end-to-end projects and stay available after launch — because good products keep evolving.",
      stats: {
        projects: {
          value: "10+",
          label: "Projects",
          sublabel: "Launched and running",
        },
        experience: {
          value: "2",
          label: "Years",
          sublabel: "In development",
        },
        clients: {
          value: "98%",
          label: "Clients",
          sublabel: "Come back again",
        },
      },
      ctaProject: "Start project",
      ctaWork: "View work",
    },
    contact: {
      title: "Let's talk",
      subtitle: "/ Get in touch",
      email: "Email",
      location: "Location",
      locationValue: "Prokopyevsk, Russia",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        contact: "Contact",
        contactPlaceholder: "telegram, vk, email...",
        message: "Message",
        messagePlaceholder: "Tell me about your project...",
        submit: "Send",
        submitting: "Sending...",
        success: "Sent!",
        error: "Error sending. Try again later.",
      },
    },
  },
}

export type Lang = keyof typeof translations
export type TranslationKey = keyof typeof translations.ru
