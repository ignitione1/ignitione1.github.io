import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Revyakin.tech — Веб-разработка и мобильные приложения" },
      { name: "description", content: "Разрабатываю сайты, мобильные приложения и сервисы под ключ. React, Flutter, Next.js, Python. Прокопьевск, Россия." },
      { name: "description", content: "I build websites, mobile apps, and services from scratch. React, Flutter, Next.js, Python. Prokopyevsk, Russia.", lang: "en" },
      { property: "og:title", content: "Revyakin.tech — Веб-разработка и мобильные приложения" },
      { property: "og:description", content: "Разрабатываю сайты, мобильные приложения и сервисы под ключ. React, Flutter, Next.js, Python. Прокопьевск, Россия." },
      { property: "og:title", content: "Revyakin.tech — Web Development and Mobile Apps", lang: "en" },
      { property: "og:description", content: "I build websites, mobile apps, and services from scratch. React, Flutter, Next.js, Python. Prokopyevsk, Russia.", lang: "en" },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/images/logo.png",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
