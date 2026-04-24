import { useRef, useEffect, useState } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import { translations, type Lang } from "@/lib/translations"

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { root: el.closest("[data-scroll-container]"), threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, shown }
}

function Reveal({
  children,
  from = "left",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  from?: "left" | "right" | "up" | "down"
  delay?: number
  className?: string
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  const hidden = {
    left: "-translate-x-12 opacity-0",
    right: "translate-x-12 opacity-0",
    up: "translate-y-12 opacity-0",
    down: "-translate-y-12 opacity-0",
  }[from]
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${shown ? "translate-x-0 translate-y-0 opacity-100" : hidden} ${className}`}
    >
      {children}
    </div>
  )
}

interface AboutSectionProps {
  scrollToSection: (index: number) => void
  lang: Lang
}

export function AboutSection({ scrollToSection, lang }: AboutSectionProps) {
  const t = translations[lang]
  const stats = [
    { v: t.about.stats.projects.value, t: t.about.stats.projects.label, s: t.about.stats.projects.sublabel, from: "right" as const, ml: "0", mw: "100%" },
    { v: t.about.stats.experience.value, t: t.about.stats.experience.label, s: t.about.stats.experience.sublabel, from: "left" as const, ml: "auto", mw: "85%" },
    { v: t.about.stats.clients.value, t: t.about.stats.clients.label, s: t.about.stats.clients.sublabel, from: "right" as const, ml: "0", mw: "100%" },
  ]

  return (
    <section className="flex h-screen w-screen shrink-0 items-center px-4 pt-6 md:px-12 md:pt-0 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-4 md:grid-cols-2 md:gap-12 lg:gap-20">
          <div>
            <Reveal from="down" className="mb-3 md:mb-8">
              <h2 className="mb-2 text-xl font-light leading-[1.1] tracking-tight text-foreground md:mb-3 md:text-5xl lg:text-6xl">
                {lang === 'ru' ? (
                  <>
                    Пишу код.<br />Решаю<br />бизнес-задачи
                  </>
                ) : (
                  <>
                    I write code.<br />I solve<br />business problems
                  </>
                )}
              </h2>
            </Reveal>
            <Reveal from="up" delay={200} className="space-y-2 md:space-y-3">
              <p className="max-w-md text-[11px] leading-relaxed text-foreground/90 md:text-xs md:text-base">
                {t.about.description1}
              </p>
              <p className="max-w-md text-[11px] leading-relaxed text-foreground/90 md:text-xs md:text-base">
                {t.about.description2}
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col justify-center space-y-3 md:space-y-8">
            {stats.map((s, i) => (
              <Reveal key={s.t} from={s.from} delay={300 + i * 150}>
                <div className="flex items-baseline gap-2 border-l border-foreground/30 pl-2 md:gap-6 md:pl-6" style={{ marginLeft: s.ml, maxWidth: s.mw }}>
                  <div className="text-xl font-light text-foreground md:text-5xl lg:text-6xl">{s.v}</div>
                  <div>
                    <div className="text-xs font-light text-foreground md:text-sm md:text-lg">{s.t}</div>
                    <div className="font-mono text-[9px] text-foreground/60 md:text-[10px]">{s.s}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal from="up" delay={750} className="mt-4 flex flex-wrap gap-2 md:mt-12 md:gap-3">
          <MagneticButton size="md" variant="primary" onClick={() => scrollToSection(4)} className="md:size-lg">{t.about.ctaProject}</MagneticButton>
          <MagneticButton size="md" variant="secondary" onClick={() => scrollToSection(1)} className="md:size-lg">{t.about.ctaWork}</MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
