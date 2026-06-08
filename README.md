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
- **GitHub Actions** — сборка и деплой на VPS по кнопке (`workflow_dispatch`)
- **Nginx** — раздача статики на VPS (без Docker)
- **Let's Encrypt** — SSL-сертификаты

### Интеграции
- **Telegram Bot API** — заявки из контактной формы через serverless-релей на Vercel (токен скрыт в env, в браузер не попадает)

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
├── vps-nginx.conf          # Nginx конфиг для VPS (раздача dist/ + SSL)
└── .github/workflows/
    └── deploy.yml          # Сборка + деплой на VPS по кнопке
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

Деплой на VPS через **GitHub Actions** — вручную, кнопкой (без Docker).

### Как это работает

```
git push → (вручную) Actions → Deploy to VPS → «Run workflow»
         → сборка dist/ на раннере GitHub
         → rsync dist/ на VPS (--delete, чистая перезаливка)
         → Nginx раздаёт /var/www/revyakin
```

### Первоначальная настройка VPS (один раз)

```bash
sudo apt update && sudo apt install -y nginx
sudo mkdir -p /var/www/revyakin
# SSL (если ещё нет):
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d revyakin.tech -d www.revyakin.tech
# Конфиг Nginx:
sudo cp vps-nginx.conf /etc/nginx/sites-available/revyakin.tech
sudo ln -s /etc/nginx/sites-available/revyakin.tech /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Секреты GitHub (Settings → Secrets and variables → Actions)

| Секрет | Значение |
|--------|----------|
| `VPS_HOST` | IP сервера |
| `VPS_USER` | SSH-пользователь |
| `VPS_SSH_KEY` | приватный SSH-ключ для деплоя |
| `VPS_PATH` | путь раздачи, напр. `/var/www/revyakin` |

### Запуск деплоя

GitHub → вкладка **Actions** → workflow **Deploy to VPS** → **Run workflow**.

## 🌐 Особенности

- **Мультиязычность** — поддержка русского и английского языков
- **SEO оптимизация** — мета-теги, Open Graph, Schema.org
- **Интерактивные эффекты** — кастомный курсор, магнитные кнопки, шейдеры
- **Адаптивный дизайн** — корректное отображение на всех устройствах
- **Локальное SEO** — гео-метатеги для региона Кемеровская область
- **Telegram Bot интеграция** — форма заявок отправляет сообщения напрямую в Telegram

## 📝 Переменные окружения

Фронтенд знает только **адрес эндпоинта** контактной формы — это не секрет.
Создайте `.env` на основе `.env.example`:

```env
# URL serverless-функции контактной формы (Vercel)
VITE_CONTACT_API_URL=https://revyakin-contact-api.vercel.app/api/contact
```

Для прод-сборки этот URL уже зашит в `.env.production` (его подхватывает GitHub Actions).

### Контактная форма (Telegram через Vercel)

⚠️ **Токен бота в браузер не кладётся.** Раньше он шёл через `VITE_`-переменную и
попадал в публичный бандл — это утечка. Теперь форма работает через serverless-релей:

```
браузер → POST на VITE_CONTACT_API_URL → Vercel-функция (токен в env) → Telegram
```

Код функции — в отдельном репозитории `revyakin-contact-api`. Настройка:

1. **Создайте бота** через [@BotFather](https://t.me/BotFather), получите токен.
2. **Узнайте chat_id** через [@userinfobot](https://t.me/userinfobot).
3. Задеплойте `revyakin-contact-api` на Vercel, в **Environment Variables** добавьте
   `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `ALLOWED_ORIGIN`.
4. URL Vercel-проекта пропишите в `VITE_CONTACT_API_URL` (и в `.env.production`).

## 📄 Лицензия

Этот проект распространяется под лицензией MIT.

## 👨‍💻 Автор

**Виталий Ревякин** — Full-Stack Developer

- Сайт: [revyakin.tech](https://revyakin.tech)
- GitHub: [@ignitione1](https://github.com/ignitione1)
- Локация: Прокопьевск, Кемеровская область, Россия