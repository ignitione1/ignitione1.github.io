# Revyakin.tech — Портфолио Full-Stack Разработчика

Современный портфолио-сайт с интерактивными визуальными эффектами и мультиязычной поддержкой.

## 🚀 Технологии

### Frontend
- **React 19** — библиотека для построения пользовательских интерфейсов
- **TypeScript** — типизация JavaScript
- **Vite** — сборщик и dev-сервер
- **React Router DOM** — клиентская маршрутизация
- **Tailwind CSS v4** — утилитарный CSS-фреймворк
- **Lucide React** — иконки
- **Shaders** — WebGL шейдеры для визуальных эффектов

### Инструменты разработки
- **ESLint** — линтинг кода
- **Prettier** — форматирование кода
- **TypeScript ESLint** — линтинг TypeScript

### Деплой
- **Docker** — контейнеризация
- **GitHub Pages** — хостинг статического сайта
- **Nginx** — веб-сервер для продакшена

### Интеграции
- **Telegram Bot API** — отправка заявок из контактной формы в Telegram

## 📁 Структура проекта

```
portfolio/
├── src/
│   ├── components/          # React-компоненты
│   │   ├── CustomCursor.tsx        # Кастомный курсор
│   │   ├── ServicesPage.tsx        # Страница услуг
│   │   ├── StudioLanding.tsx       # Главная лендинг-страница
│   │   ├── grain-overlay.tsx       # Эффект зернистости
│   │   ├── magnetic-button.tsx     # Магнитная кнопка
│   │   └── sections/               # Секции лендинга
│   ├── lib/                # Утилиты и хелперы
│   │   └── translations.ts  # Переводы (RU/EN)
│   ├── App.tsx             # Главный компонент с роутингом
│   ├── main.tsx            # Точка входа
│   ├── styles.css          # Глобальные стили
│   └── index.css           # Tailwind стили
├── public/                 # Статические файлы
├── dist/                   # Сборка (генерируется)
├── index.html              # HTML-шаблон с SEO мета-тегами
├── vite.config.ts          # Конфигурация Vite
├── tsconfig.json           # Конфигурация TypeScript
├── Dockerfile              # Docker-образ
├── Dockerfile.vps          # Docker-образ для VPS
├── docker-compose.yml      # Docker Compose
├── nginx.conf              # Nginx конфиг
└── vps-nginx.conf          # Nginx конфиг для VPS
```

## 🛠️ Установка и запуск

### Требования
- Node.js 18+
- npm или yarn
- Docker (опционально)

### Локальная разработка

1. **Клонирование репозитория**
```bash
git clone https://github.com/ignitione1/ignitione1.github.io.git
cd portfolio
```

2. **Установка зависимостей**
```bash
npm install
```

3. **Запуск dev-сервера**
```bash
npm run dev
```
Сайт будет доступен по адресу `http://localhost:5173`

4. **Сборка для продакшена**
```bash
npm run build
```

## 🚢 Деплой

### GitHub Pages

```bash
npm run deploy
```

### Docker

**Сборка образа**
```bash
docker build -t portfolio .
```

**Запуск через Docker Compose**
```bash
docker-compose up
```

### VPS (с Docker)

```bash
docker build -f Dockerfile.vps -t portfolio-vps .
docker run -p 80:80 portfolio-vps
```

## 🌐 Особенности

- **Мультиязычность** — поддержка русского и английского языков
- **SEO оптимизация** — мета-теги, Open Graph, Schema.org
- **Интерактивные эффекты** — кастомный курсор, магнитные кнопки, шейдеры
- **Адаптивный дизайн** — корректное отображение на всех устройствах
- **Локальное SEO** — гео-метатеги для региона Кемеровская область
- **Telegram Bot интеграция** — форма заявок отправляет сообщения напрямую в Telegram

## 📝 Переменные окружения

Создайте файл `.env` на основе `.env.example`:

```env
# Telegram Bot Configuration
# Получите токен у @BotFather в Telegram
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here

# Ваш chat_id (получите через @userinfobot или API)
VITE_TELEGRAM_CHAT_ID=your_chat_id_here
```

### Настройка Telegram Bot

1. **Создайте бота** через [@BotFather](https://t.me/BotFather) в Telegram
2. **Получите токен** бота и добавьте его в `VITE_TELEGRAM_BOT_TOKEN`
3. **Получите ваш chat_id** через [@userinfobot](https://t.me/userinfobot) или API
4. **Добавьте chat_id** в `VITE_TELEGRAM_CHAT_ID`

Форма заявок на сайте будет отправлять сообщения напрямую в ваш Telegram.

## 📄 Лицензия

Этот проект распространяется под лицензией MIT.

## 👨‍💻 Автор

**Виталий Ревякин** — Full-Stack Developer

- Сайт: [revyakin.tech](https://revyakin.tech)
- GitHub: [@ignitione1](https://github.com/ignitione1)
- Локация: Прокопьевск, Кемеровская область, Россия