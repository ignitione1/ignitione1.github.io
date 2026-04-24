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

interface WorkSectionProps {
  onModalChange?: (isOpen: boolean) => void
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
  lang: Lang
}

export function WorkSection({ onModalChange, scrollContainerRef, lang }: WorkSectionProps) {
  const t = translations[lang]
  const [selectedProject, setSelectedProject] = useState<typeof t.work.projects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: typeof t.work.projects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    onModalChange?.(true)
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.style.overflow = 'hidden'
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    onModalChange?.(false)
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.style.overflow = ''
    }
    setTimeout(() => setSelectedProject(null), 500)
  }

  const projects = t.work.projects.map((p, index) => ({
    ...p,
    side: index % 2 === 0 ? ("left" as const) : ("right" as const),
    w: index === 1 || index === 3 ? "90%" : "85%",
  }))

  return (
    <section className="flex h-screen w-screen shrink-0 items-center px-4 pt-6 md:px-12 md:pt-0 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal from="left" className="mb-4 mt-12 md:mb-10 md:mt-20">
          <h2 className="mb-2 text-3xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">{t.work.title}</h2>
          <p className="font-mono text-[10px] text-foreground/60 md:text-sm">{t.work.subtitle}</p>
        </Reveal>
        <div className="space-y-2 md:space-y-5">
          {projects.map((p, i) => (
            <Reveal key={p.n} from={p.side} delay={i * 150}>
              <div
                onClick={() => openModal(p)}
                className="group flex cursor-pointer items-center justify-between border-b border-foreground/10 py-2 transition-colors hover:border-foreground/20 md:py-4"
                style={{ marginLeft: p.side === "right" ? "auto" : 0, maxWidth: p.w }}
              >
                <div className="flex items-baseline gap-2 md:gap-6">
                  <span className="font-mono text-[10px] text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-xs md:text-sm">{p.n}</span>
                  <div>
                    <h3 className="mb-0.5 text-base font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:mb-1 md:text-xl lg:text-2xl">{p.t}</h3>
                    <p className="font-mono text-[9px] text-foreground/50 md:text-[10px] md:text-xs">{p.s}</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] text-foreground/30 md:text-[10px] md:text-xs">{p.y}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeModal}
          >
            <div
              className={`relative max-w-4xl max-h-[85vh] w-full rounded-2xl bg-foreground/5 border border-foreground/10 p-4 shadow-2xl overflow-y-auto modal-scroll md:p-7`}
              style={{
                animation: isModalOpen
                  ? "modalSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
                  : "modalSlideOut 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
              }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute right-3 top-3 text-foreground/50 transition-colors hover:text-foreground md:right-4 md:top-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div
                className="text-xs leading-relaxed text-foreground/90 whitespace-pre-line md:text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: selectedProject.description }}
              />
              {selectedProject.githubLink && (
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs text-foreground/70 transition-colors hover:text-foreground md:mt-6 md:mt-8 md:text-sm md:text-base"
                >
                  {t.work.githubLink}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
