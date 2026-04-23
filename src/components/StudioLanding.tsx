import { useEffect, useRef, useState } from "react";
import { Mail, MapPin } from "lucide-react";
import { CustomCursor } from "./CustomCursor";
import { ShaderBackground } from "./ShaderBackground";

const navItems = ["Главная", "Работы", "Услуги", "О нас", "Контакты"];

function PrimaryButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`relative overflow-hidden rounded-full font-medium transition-all duration-300 ease-out
        bg-foreground/95 text-background hover:bg-foreground backdrop-blur-md hover:scale-[1.02] active:scale-[0.98]
        px-8 py-3.5 text-base ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function GhostButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`relative overflow-hidden rounded-full font-medium transition-all duration-300 ease-out
        bg-foreground/5 text-foreground hover:bg-foreground/10 backdrop-blur-xl border border-foreground/10 hover:border-foreground/20
        px-8 py-3.5 text-base ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { root: el.closest("[data-scroll-container]"), threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({
  children,
  from = "left",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from?: "left" | "right" | "up" | "down";
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const hidden = {
    left: "-translate-x-12 opacity-0",
    right: "translate-x-12 opacity-0",
    up: "translate-y-12 opacity-0",
    down: "-translate-y-12 opacity-0",
  }[from];
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${shown ? "translate-x-0 translate-y-0 opacity-100" : hidden} ${className}`}
    >
      {children}
    </div>
  );
}

export function StudioLanding() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Convert vertical wheel to horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />

      {/* Noise */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.08] noise-overlay" />

      {/* Animated WebGL shader background */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground />
      </div>

      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 backdrop-blur-md border border-foreground/15">
            <span className="font-mono text-sm text-foreground/90">S</span>
          </div>
          <span className="text-sm text-foreground/90">Студия разработки</span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((n, i) => (
            <a
              key={n}
              href="#"
              className={`text-sm transition-colors ${i === 0 ? "text-foreground border-b border-foreground/80 pb-0.5" : "text-foreground/70 hover:text-foreground"}`}
            >
              {n}
            </a>
          ))}
        </nav>
        <button className="rounded-full bg-foreground/10 backdrop-blur-md border border-foreground/15 px-5 py-2 text-sm text-foreground hover:bg-foreground/15 transition">
          Начать
        </button>
      </header>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        data-scroll-container="true"
        className="scroll-container relative z-10 flex h-screen overflow-x-auto overflow-y-hidden"
      >
        {/* Section 1 — Hero */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24">
          <div className="max-w-3xl">
            <div className="anim-fade-up mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
              <p className="font-mono text-xs text-foreground/90">Веб-разработка & Дизайн</p>
            </div>
            <h1 className="anim-fade-up mb-6 text-6xl font-light leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl" style={{ animationDelay: "100ms" }}>
              <span className="text-balance">Разрабатываем<br />продукты,<br />которые работают</span>
            </h1>
            <p className="anim-fade-up mb-8 max-w-xl text-lg leading-relaxed text-foreground/90 md:text-xl" style={{ animationDelay: "250ms" }}>
              Создаём сайты, веб-приложения и сервисы под ключ — от идеи до запуска. Быстро, надёжно, с заботой о деталях.
            </p>
            <div className="anim-fade-up flex flex-col gap-4 sm:flex-row sm:items-center" style={{ animationDelay: "400ms" }}>
              <PrimaryButton>Обсудить проект</PrimaryButton>
              <GhostButton>Наши услуги</GhostButton>
            </div>
          </div>
          <div className="anim-fade absolute bottom-8 left-1/2 -translate-x-1/2" style={{ animationDelay: "600ms" }}>
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Листайте вправо</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — Projects */}
        <section className="flex h-screen w-screen shrink-0 items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal from="left" className="mb-12 md:mb-16">
              <h2 className="mb-2 text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">Проекты</h2>
              <p className="font-mono text-sm text-foreground/60 md:text-base">/ Избранные работы</p>
            </Reveal>
            <div className="space-y-6 md:space-y-8">
              {[
                { n: "01", t: "CRM для строительной компании", s: "Веб-приложение / React + Python", y: "2024", side: "left" as const, w: "85%" },
                { n: "02", t: "Маркетплейс запчастей", s: "Fullstack-платформа / Next.js", y: "2024", side: "right" as const, w: "90%" },
                { n: "03", t: "Личный кабинет клиники", s: "SPA / Интеграция с МИС", y: "2023", side: "left" as const, w: "85%" },
              ].map((p, i) => (
                <Reveal key={p.n} from={p.side} delay={i * 150}>
                  <div
                    className="group flex items-center justify-between border-b border-foreground/10 py-6 transition-colors hover:border-foreground/20 md:py-8"
                    style={{ marginLeft: p.side === "right" ? "auto" : 0, maxWidth: p.w }}
                  >
                    <div className="flex items-baseline gap-4 md:gap-8">
                      <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">{p.n}</span>
                      <div>
                        <h3 className="mb-1 text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">{p.t}</h3>
                        <p className="font-mono text-xs text-foreground/50 md:text-sm">{p.s}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-foreground/30 md:text-sm">{p.y}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 — Services */}
        <section className="flex h-screen w-screen shrink-0 items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal from="down" className="mb-12 md:mb-16">
              <h2 className="mb-2 text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">Услуги</h2>
              <p className="font-mono text-sm text-foreground/60 md:text-base">/ Наши компетенции</p>
            </Reveal>
            <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
              {[
                { n: "01", t: "Веб-разработка", d: "Сайты и веб-приложения любой сложности — от лендингов до корпоративных платформ", from: "down" as const },
                { n: "02", t: "UI/UX Дизайн", d: "Интерфейсы, которыми удобно пользоваться: прототипы, дизайн-системы, адаптив", from: "right" as const },
                { n: "03", t: "Бэкенд и API", d: "Разработка серверной части, интеграции, базы данных и облачная инфраструктура", from: "left" as const },
                { n: "04", t: "Поддержка и развитие", d: "Техническое сопровождение проектов, новые функции и мониторинг 24/7", from: "up" as const },
              ].map((s, i) => (
                <Reveal key={s.n} from={s.from} delay={i * 150}>
                  <div className="group">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
                      <span className="font-mono text-xs text-foreground/60">{s.n}</span>
                    </div>
                    <h3 className="mb-2 text-2xl font-light text-foreground md:text-3xl">{s.t}</h3>
                    <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 — About */}
        <section className="flex h-screen w-screen shrink-0 items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
              <div>
                <Reveal from="down" className="mb-6 md:mb-12">
                  <h2 className="mb-3 text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                    Пишем код.<br />Решаем<br /><span className="text-foreground/40">бизнес-задачи</span>
                  </h2>
                </Reveal>
                <Reveal from="up" delay={200} className="space-y-3 md:space-y-4">
                  <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                    Мы — команда разработчиков и дизайнеров, которая превращает идеи в работающие продукты. Без воды и лишних слов.
                  </p>
                  <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                    Берём проекты под ключ и остаёмся на связи после запуска — потому что хороший продукт развивается постоянно.
                  </p>
                </Reveal>
              </div>
              <div className="flex flex-col justify-center space-y-6 md:space-y-12">
                {[
                  { v: "80+", t: "Проектов", s: "Запущено и работает", from: "right" as const, ml: "0", mw: "100%" },
                  { v: "5", t: "Лет", s: "На рынке разработки", from: "left" as const, ml: "auto", mw: "85%" },
                  { v: "98%", t: "Клиентов", s: "Возвращаются снова", from: "right" as const, ml: "0", mw: "100%" },
                ].map((s, i) => (
                  <Reveal key={s.t} from={s.from} delay={300 + i * 150}>
                    <div className="flex items-baseline gap-4 border-l border-foreground/30 pl-4 md:gap-8 md:pl-8" style={{ marginLeft: s.ml, maxWidth: s.mw }}>
                      <div className="text-3xl font-light text-foreground md:text-6xl lg:text-7xl">{s.v}</div>
                      <div>
                        <div className="text-base font-light text-foreground md:text-xl">{s.t}</div>
                        <div className="font-mono text-xs text-foreground/60">{s.s}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal from="up" delay={750} className="mt-8 flex flex-wrap gap-3 md:mt-16 md:gap-4">
              <PrimaryButton>Начать проект</PrimaryButton>
              <GhostButton>Смотреть работы</GhostButton>
            </Reveal>
          </div>
        </section>

        {/* Section 5 — Contact */}
        <section className="flex h-screen w-screen shrink-0 items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
              <div className="flex flex-col justify-center">
                <Reveal from="left" className="mb-6 md:mb-12">
                  <h2 className="mb-2 text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
                    Давайте<br />поговорим
                  </h2>
                  <p className="font-mono text-xs text-foreground/60 md:text-base">/ Свяжитесь с нами</p>
                </Reveal>
                <div className="space-y-4 md:space-y-8">
                  <Reveal from="left" delay={200}>
                    <a href="mailto:hello@studio.dev" className="group block">
                      <div className="mb-1 flex items-center gap-2">
                        <Mail size={12} className="text-foreground/60" />
                        <span className="font-mono text-xs text-foreground/60">Email</span>
                      </div>
                      <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">hello@studio.dev</p>
                    </a>
                  </Reveal>
                  <Reveal from="up" delay={350}>
                    <div className="mb-1 flex items-center gap-2">
                      <MapPin size={12} className="text-foreground/60" />
                      <span className="font-mono text-xs text-foreground/60">Локация</span>
                    </div>
                    <p className="text-base text-foreground md:text-2xl">Москва, Россия</p>
                  </Reveal>
                  <Reveal from="left" delay={500}>
                    <div className="flex gap-2 pt-2 md:pt-4">
                      {["Telegram", "VK", "LinkedIn", "GitHub"].map((s) => (
                        <a key={s} href="#" className="border-b border-transparent font-mono text-xs text-foreground/60 transition-all hover:border-foreground/60 hover:text-foreground/90">
                          {s}
                        </a>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {[
                    { label: "Имя", type: "text", placeholder: "Ваше имя", delay: 200 },
                    { label: "Email", type: "email", placeholder: "your@email.com", delay: 350 },
                  ].map((f) => (
                    <Reveal key={f.label} from="right" delay={f.delay}>
                      <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">{f.label}</label>
                      <input
                        type={f.type}
                        required
                        placeholder={f.placeholder}
                        className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                      />
                    </Reveal>
                  ))}
                  <Reveal from="right" delay={500}>
                    <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">Сообщение</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Расскажите о вашем проекте..."
                      className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                    />
                  </Reveal>
                  <Reveal from="up" delay={650}>
                    <PrimaryButton className="w-full">Отправить</PrimaryButton>
                  </Reveal>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
