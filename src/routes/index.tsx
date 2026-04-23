import { createFileRoute } from "@tanstack/react-router";
import { StudioLanding } from "@/components/StudioLanding";

export const Route = createFileRoute("/")({
  component: StudioLanding,
  head: () => ({
    meta: [
      { title: "Студия разработки — продукты, которые работают" },
      { name: "description", content: "Создаём сайты, веб-приложения и сервисы под ключ — от идеи до запуска." },
    ],
  }),
});
