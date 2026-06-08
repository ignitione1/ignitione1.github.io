/// <reference types="vite/client" />

interface ImportMetaEnv {
  // URL serverless-функции, которая прячет токен и шлёт заявку в Telegram.
  // НЕ секрет — это просто адрес эндпоинта.
  readonly VITE_CONTACT_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
