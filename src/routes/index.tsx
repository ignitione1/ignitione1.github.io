import { createFileRoute } from "@tanstack/react-router";
import { StudioLanding } from "@/components/StudioLanding";

export const Route = createFileRoute("/")({
  component: StudioLanding,
  head: () => ({
    meta: [
      { title: "Revyakin.tech — Веб-разработка и мобильные приложения" },
      { name: "description", content: "Разрабатываю сайты, мобильные приложения и сервисы под ключ. React, Flutter, Next.js, Python. Прокопьевск, Россия." },
    ],
  }),
});
