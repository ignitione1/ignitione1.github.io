import { translations, type Lang } from "@/lib/translations";

interface ServicesPageProps {
  lang: Lang;
}

export function ServicesPage({ lang }: ServicesPageProps) {
  const t = translations[lang];

  return (
    <div className="bg-background text-foreground px-4 py-12 md:px-8 lg:px-16 h-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto pb-20">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          {lang === 'ru' ? 'Услуги веб-разработки и создания мобильных приложений' : 'Web Development and Mobile App Services'}
        </h1>

        <div className="prose prose-invert max-w-none space-y-3 text-foreground/80 text-xs md:text-sm">
          <p className="leading-relaxed">
            {lang === 'ru' 
              ? 'Занимаюсь профессиональной разработкой сайтов, лендингов, веб-приложений и мобильных приложений под ключ. Помогаю запускать MVP для стартапов, создаю цифровые продукты с нуля: от идеи до продакшена. Работаю с бизнесом и стартапами, делаю быстрые и масштабируемые решения. Использую современные технологии: React, Next.js, Python, Node.js, Flutter. Разработка сайтов включает проработку дизайна, адаптивную верстку, интеграцию с CRM и другими сервисами. Создаю сайты, которые работают на бизнес и привлекают клиентов.'
              : 'I specialize in professional website development, landing pages, web applications, and mobile applications. I help launch MVPs for startups, create digital products from scratch: from idea to production. I work with businesses and startups, delivering fast and scalable solutions. I use modern technologies: React, Next.js, Python, Node.js, Flutter. Website development includes design work, responsive layout, integration with CRM and other services. I create websites that work for business and attract customers.'
            }
          </p>

          <h2 className="text-lg md:text-xl font-semibold text-foreground mt-5 mb-2">
            {lang === 'ru' ? 'Разработка сайтов под ключ' : 'Full-Stack Website Development'}
          </h2>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'Профессионально разрабатываю сайты под ключ для бизнеса. Создаю корпоративные сайты, лендинги, интернет-магазины и веб-приложения. Разработка сайтов включает анализ требований, проектирование архитектуры, UI/UX дизайн, адаптивную верстку, бэкенд разработку, интеграцию с платежными системами, CRM, API. Использую современные технологии: React, Next.js, Vue.js, Python, Django, Node.js, NestJS. Разработка сайтов выполняется с учетом SEO-оптимизации, безопасности, производительности. Создаю сайты, которые конвертируют посетителей в клиентов.'
              : 'I professionally develop websites for business. I create corporate websites, landing pages, e-commerce sites, and web applications. Website development includes requirements analysis, architecture design, UI/UX design, responsive layout, backend development, integration with payment systems, CRM, API. I use modern technologies: React, Next.js, Vue.js, Python, Django, Node.js, NestJS. Website development is performed with SEO optimization, security, and performance in mind. I create websites that convert visitors into customers.'
            }
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">
            {lang === 'ru' ? 'Виды сайтов, которые я разрабатываю' : 'Types of websites I develop'}
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>{lang === 'ru' ? 'Корпоративные сайты для бизнеса' : 'Corporate websites for business'}</li>
            <li>{lang === 'ru' ? 'Лендинги для продвижения продуктов и услуг' : 'Landing pages for product and service promotion'}</li>
            <li>{lang === 'ru' ? 'Интернет-магазины с интеграцией платежных систем' : 'E-commerce sites with payment system integration'}</li>
            <li>{lang === 'ru' ? 'Веб-приложения и SaaS-платформы' : 'Web applications and SaaS platforms'}</li>
            <li>{lang === 'ru' ? 'CRM-системы и дашборды' : 'CRM systems and dashboards'}</li>
            <li>{lang === 'ru' ? 'Порталы и каталоги' : 'Portals and catalogs'}</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {lang === 'ru' ? 'Создание лендингов с высокой конверсией' : 'High-Converting Landing Page Development'}
          </h2>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'Разрабатываю эффективные лендинги для продвижения продуктов и услуг. Создаю продающие страницы с высокой конверсией. Лендинг включает уникальный дизайн, адаптивную верстку, интеграцию с формами сбора заявок, аналитикой и маркетинговыми инструментами. Создаю лендинги, которые превращают посетителей в клиентов. Использую A/B тестирование, оптимизирую скорость загрузки, настраиваю интеграцию с рекламными кампаниями. Лендинг разрабатывается с учетом целевой аудитории и бизнес-целей.'
              : 'I develop effective landing pages for promoting products and services. I create selling pages with high conversion. Landing page includes unique design, responsive layout, integration with lead forms, analytics and marketing tools. I create landing pages that turn visitors into customers. I use A/B testing, optimize loading speed, set up integration with advertising campaigns. Landing page is developed with target audience and business goals in mind.'
            }
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {lang === 'ru' ? 'Веб-приложения любой сложности' : 'Web Applications of Any Complexity'}
          </h2>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'Разрабатываю веб-приложения любой сложности. Создаю SaaS-платформы, CRM-системы, дашборды и другие веб-приложения. Веб-приложения разрабатываю с учетом требований к безопасности, масштабируемости и производительности. Использую современные фреймворки и архитектурные паттерны для создания надежных веб-приложений. Веб-приложения включают авторизацию, работу с базами данных, API интеграцию, real-time обновления, уведомления. Разрабатываю как monolith, так и microservices архитектуры.'
              : 'I develop web applications of any complexity. I create SaaS platforms, CRM systems, dashboards and other web applications. Web applications are developed with security, scalability and performance requirements in mind. I use modern frameworks and architectural patterns to create reliable web applications. Web applications include authentication, database work, API integration, real-time updates, notifications. I develop both monolith and microservices architectures.'
            }
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {lang === 'ru' ? 'Разработка MVP для стартапов' : 'MVP Development for Startups'}
          </h2>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'Быстро разрабатываю MVP для стартапов. Помогаю запускать продукт за 1-2 недели. Разработка MVP включает проработку идеи, создание прототипа, разработку базовой функциональности и запуск на рынок. MVP позволяет быстро протестировать гипотезы и получить обратную связь от пользователей с минимальными инвестициями. Разработка MVP выполняется с использованием современных технологий и best practices. Помогаю с приоритизацией функций, выбираю оптимальный стек технологий, настраиваю инфраструктуру.'
              : 'I quickly develop MVP for startups. I help launch a product in 1-2 weeks. MVP development includes idea work, prototyping, basic functionality development and market launch. MVP allows you to quickly test hypotheses and get user feedback with minimal investment. MVP development is performed using modern technologies and best practices. I help with feature prioritization, choose optimal technology stack, set up infrastructure.'
            }
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">
            {lang === 'ru' ? 'Этапы разработки MVP' : 'MVP Development Stages'}
          </h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>{lang === 'ru' ? 'Анализ идеи и требований' : 'Idea and requirements analysis'}</li>
            <li>{lang === 'ru' ? 'Проработка пользовательских сценариев' : 'User scenarios work'}</li>
            <li>{lang === 'ru' ? 'Создание прототипа и дизайна' : 'Prototype and design creation'}</li>
            <li>{lang === 'ru' ? 'Разработка базовой функциональности' : 'Basic functionality development'}</li>
            <li>{lang === 'ru' ? 'Тестирование и запуск' : 'Testing and launch'}</li>
            <li>{lang === 'ru' ? 'Сбор обратной связи и итерации' : 'Feedback collection and iterations'}</li>
          </ol>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {lang === 'ru' ? 'Разработка мобильных приложений iOS и Android' : 'iOS and Android Mobile App Development'}
          </h2>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'Создание мобильных приложений для iOS и Android. Разрабатываю нативные и кроссплатформенные приложения с использованием Flutter. Мобильные приложения включают современный дизайн, интеграцию с API, push-уведомления, работу с камерой, геолокацией, сохранение данных локально. Создаю мобильные приложения, которые работают стабильно и выглядят профессионально. Использую Flutter для кроссплатформенной разработки, что позволяет сэкономить время и бюджет. Мобильные приложения проходят тестирование на различных устройствах.'
              : 'Creating mobile applications for iOS and Android. I develop native and cross-platform applications using Flutter. Mobile applications include modern design, API integration, push notifications, camera work, geolocation, local data storage. I create mobile applications that work stably and look professional. I use Flutter for cross-platform development, which saves time and budget. Mobile applications are tested on various devices.'
            }
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {lang === 'ru' ? 'Технологии, которые я использую' : 'Technologies I Use'}
          </h2>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'В работе использую современные технологии и инструменты. Frontend: React, Next.js, Vue.js, TypeScript, Tailwind CSS. Backend: Python, Django, FastAPI, Node.js, NestJS, Express. Mobile: Flutter, Dart. Базы данных: PostgreSQL, MongoDB, Redis, SQLite. Инфраструктура: Docker, Docker Compose, Nginx, CI/CD, Git. Постоянно изучаю новые технологии и применяю лучшие практики в разработке. Выбираю оптимальный стек технологий под каждый проект.'
              : 'I use modern technologies and tools in my work. Frontend: React, Next.js, Vue.js, TypeScript, Tailwind CSS. Backend: Python, Django, FastAPI, Node.js, NestJS, Express. Mobile: Flutter, Dart. Databases: PostgreSQL, MongoDB, Redis, SQLite. Infrastructure: Docker, Docker Compose, Nginx, CI/CD, Git. I constantly study new technologies and apply best practices in development. I choose optimal technology stack for each project.'
            }
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {lang === 'ru' ? 'Процесс работы над проектом' : 'Project Work Process'}
          </h2>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'Работаю по прозрачному процессу: анализ требований, проектирование, разработка, тестирование, запуск и поддержка. На каждом этапе поддерживаю коммуникацию с клиентом, предоставляю отчеты о прогрессе. Гарантирую качество кода и соблюдение сроков. Разработка ведется с учетом требований к безопасности и производительности. Использую agile методологию, регулярные демо, инкрементальную доставку функционала. Предоставляю доступ к репозиторию, систему таск-трекинга.'
              : 'I work on a transparent process: requirements analysis, design, development, testing, launch and support. At each stage I maintain communication with the client, provide progress reports. I guarantee code quality and deadline compliance. Development is carried out with security and performance requirements in mind. I use agile methodology, regular demos, incremental feature delivery. I provide repository access, task tracking system.'
            }
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {lang === 'ru' ? 'Почему выбирают меня' : 'Why Choose Me'}
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>{lang === 'ru' ? 'Быстрая разработка с использованием AI-инструментов' : 'Fast development using AI tools'}</li>
            <li>{lang === 'ru' ? 'Опыт работы с различными проектами и отраслями' : 'Experience working with various projects and industries'}</li>
            <li>{lang === 'ru' ? 'Индивидуальный подход к каждому клиенту' : 'Individual approach to each client'}</li>
            <li>{lang === 'ru' ? 'Прозрачное ценообразование без скрытых платежей' : 'Transparent pricing without hidden payments'}</li>
            <li>{lang === 'ru' ? 'Поддержка после запуска проекта' : 'Support after project launch'}</li>
            <li>{lang === 'ru' ? 'Современные технологии и best practices' : 'Modern technologies and best practices'}</li>
            <li>{lang === 'ru' ? 'Гарантия качества кода' : 'Code quality guarantee'}</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {lang === 'ru' ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions'}
          </h2>
          
          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">
            {lang === 'ru' ? 'Сколько времени занимает разработка сайта?' : 'How long does website development take?'}
          </h3>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'Время разработки зависит от сложности проекта. Лендинг - 2-3 дня, корпоративный сайт - 1-2 недели, интернет-магазин - 2-4 недели, веб-приложение - 2-4 недели. MVP для стартапа можно запустить за 5-15 дней.'
              : 'Development time depends on project complexity. Landing page - 2-3 days, corporate website - 1-2 weeks, e-commerce - 2-4 weeks, web application - 2-4 weeks. Startup MVP can be launched in 5-15 days.'
            }
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">
            {lang === 'ru' ? 'Сколько стоит разработка?' : 'How much does development cost?'}
          </h3>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'Стоимость зависит от требований проекта. Лендинг от 5 000 руб, корпоративный сайт от 50 000 руб, интернет-магазин от 70 000 руб, веб-приложение от 80 000 руб. MVP для стартапа от 10 000 руб. Точную стоимость могу оценить после обсуждения требований.'
              : 'Cost depends on project requirements. Landing page from 5 000 rub, corporate website from 50 000 rub, e-commerce from 70 000 rub, web application from 80 000 rub. Startup MVP from 10 000 rub. Exact cost can be estimated after discussing requirements.'
            }
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">
            {lang === 'ru' ? 'Какие технологии вы используете?' : 'What technologies do you use?'}
          </h3>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'Использую современные технологии: React, Next.js, Vue.js для frontend, Python, Django, Node.js, NestJS для backend, Flutter для мобильных приложений, PostgreSQL, MongoDB для баз данных, Docker, Nginx для инфраструктуры.'
              : 'I use modern technologies: React, Next.js, Vue.js for frontend, Python, Django, Node.js, NestJS for backend, Flutter for mobile applications, PostgreSQL, MongoDB for databases, Docker, Nginx for infrastructure.'
            }
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">
            {lang === 'ru' ? 'Предоставляете ли поддержку после запуска?' : 'Do you provide support after launch?'}
          </h3>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'Да, предоставляю техническую поддержку после запуска проекта. Включает исправление багов, обновления, мониторинг, консультации. Поддержка может быть почасовой или по контракту.'
              : 'Yes, I provide technical support after project launch. Includes bug fixes, updates, monitoring, consultations. Support can be hourly or contract-based.'
            }
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {lang === 'ru' ? 'География работы' : 'Work Geography'}
          </h2>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'Работаю удаленно с клиентами из любой точки мира. Основной фокус на России: Прокопьевск, Кемерово, Кузбасс, Кемеровская область. Также работаю с клиентами из других регионов и стран. Коммуникация через Telegram, email, видеозвонки.'
              : 'I work remotely with clients from anywhere in the world. Main focus on Russia: Prokopyevsk, Kemerovo, Kuzbass, Kemerovo region. Also work with clients from other regions and countries. Communication via Telegram, email, video calls.'
            }
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">
            {lang === 'ru' ? 'Связаться со мной' : 'Contact Me'}
          </h2>
          <p className="leading-relaxed">
            {lang === 'ru'
              ? 'Готов обсудить ваш проект? Свяжитесь со мной через форму на главной странице или напишите на ignitione1@mail.ru. Также можете написать в Telegram: @vitaly_revyakin. Отвечу в течение 24 часов.'
              : 'Ready to discuss your project? Contact me via the form on the main page or write to ignitione1@mail.ru. You can also write to Telegram: @vitaly_revyakin. I will respond within 24 hours.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
