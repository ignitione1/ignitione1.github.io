import { useRef, useEffect, useState } from "react"
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

interface ServicesSectionProps {
  lang: Lang
}

export function ServicesSection({ lang }: ServicesSectionProps) {
  const t = translations[lang]
  const services = [
    { n: "01", t: t.services.items.web.title, d: t.services.items.web.description, from: "down" as const },
    { n: "02", t: t.services.items.mobile.title, d: t.services.items.mobile.description, from: "right" as const },
    { n: "03", t: t.services.items.backend.title, d: t.services.items.backend.description, from: "left" as const },
    { n: "04", t: t.services.items.design.title, d: t.services.items.design.description, from: "up" as const },
  ]

  return (
    <section className="flex h-screen w-screen shrink-0 items-center px-4 pt-6 md:px-12 md:pt-0 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal from="down" className="mb-4 mt-8 md:mb-12 md:mt-6">
          <h2 className="mb-2 text-2xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">{t.services.title}</h2>
          <p className="font-mono text-[10px] text-foreground/60 md:text-sm">{t.services.subtitle}</p>
        </Reveal>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:gap-x-20">
          {services.map((s, i) => (
            <Reveal key={s.n} from={s.from} delay={i * 150}>
              <div className="group">
                <div className="mb-1.5 flex items-center gap-2 md:mb-3 md:gap-3">
                  <div className="h-px w-5 bg-foreground/30 transition-all duration-300 group-hover:w-8 group-hover:bg-foreground/50 md:w-8 md:group-hover:w-12" />
                  <span className="font-mono text-[10px] text-foreground/60 md:text-xs">{s.n}</span>
                </div>
                <h3 className="mb-1 text-base font-light text-foreground md:mb-2 md:text-xl md:text-2xl">{s.t}</h3>
                <p className="max-w-sm text-[10px] leading-snug text-foreground/80 md:text-xs md:text-sm">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
