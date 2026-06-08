import { useRef, useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { translations, type Lang } from "@/lib/translations"

const PER_PAGE = 3

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
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(t.work.projects.length / PER_PAGE)
  const goPrev = () => setPage((p) => (p - 1 + totalPages) % totalPages)
  const goNext = () => setPage((p) => (p + 1) % totalPages)

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

  const projects = t.work.projects
    .slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
    .map((p, i) => {
      const globalIndex = page * PER_PAGE + i
      return {
        ...p,
        n: String(globalIndex + 1).padStart(2, "0"),
        side: i % 2 === 0 ? ("left" as const) : ("right" as const),
        w: i === 1 || i === 3 ? "90%" : "85%",
      }
    })

  return (
    <section className="flex h-screen w-screen shrink-0 items-center px-4 pt-6 md:px-12 md:pt-0 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-4 mt-12 flex flex-col gap-3 md:mb-10 md:mt-20 md:flex-row md:items-end md:justify-between">
          <Reveal from="left">
            <h2 className="mb-2 text-3xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">{t.work.title}</h2>
            <p className="font-mono text-[10px] text-foreground/60 md:text-sm">{t.work.subtitle}</p>
          </Reveal>
          {totalPages > 1 && (
            <div className="flex items-center gap-1 self-start rounded-full border border-foreground/20 bg-foreground/10 p-1 backdrop-blur-md md:self-auto">
              <button
                type="button"
                onClick={goPrev}
                aria-label={lang === "ru" ? "Предыдущие проекты" : "Previous projects"}
                className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-all hover:bg-foreground/15 hover:text-foreground active:scale-90 md:h-10 md:w-10"
              >
                <ArrowLeft className="h-4 w-4 md:h-[18px] md:w-[18px]" />
              </button>
              <span className="min-w-[3.25rem] text-center font-mono text-xs tabular-nums text-foreground/80 md:min-w-[3.75rem] md:text-sm">
                {String(page + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={goNext}
                aria-label={lang === "ru" ? "Следующие проекты" : "Next projects"}
                className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-all hover:bg-foreground/15 hover:text-foreground active:scale-90 md:h-10 md:w-10"
              >
                <ArrowRight className="h-4 w-4 md:h-[18px] md:w-[18px]" />
              </button>
            </div>
          )}
        </div>
        <div className="space-y-3 md:space-y-7">
          {projects.map((p, i) => (
            <Reveal key={`${page}-${p.n}`} from={p.side} delay={i * 150}>
              <div
                onClick={() => openModal(p)}
                className="group flex cursor-pointer items-center justify-between border-b border-foreground/10 py-3 transition-colors hover:border-foreground/20 md:py-7"
                style={{ marginLeft: p.side === "right" ? "auto" : 0, maxWidth: p.w }}
              >
                <div className="flex items-baseline gap-2 md:gap-6">
                  <span className="font-mono text-xs text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-sm md:text-base">{p.n}</span>
                  <div>
                    <h3 className="mb-0.5 text-lg font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:mb-1.5 md:text-2xl lg:text-3xl">{p.t}</h3>
                    <p className="font-mono text-[10px] text-foreground/50 md:text-xs lg:text-sm">{p.s}</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-foreground/30 md:text-xs md:text-sm">{p.y}</span>
              </div>
            </Reveal>
          ))}
          {/* невидимые заглушки — держат высоту списка постоянной, чтобы контролл не прыгал */}
          {Array.from({ length: PER_PAGE - projects.length }).map((_, i) => (
            <div key={`placeholder-${i}`} aria-hidden className="invisible flex items-center justify-between border-b border-transparent py-3 md:py-7">
              <div className="flex items-baseline gap-2 md:gap-6">
                <span className="font-mono text-xs md:text-sm md:text-base">00</span>
                <div>
                  <h3 className="mb-0.5 text-lg font-light md:mb-1.5 md:text-2xl lg:text-3xl">&nbsp;</h3>
                  <p className="font-mono text-[10px] md:text-xs lg:text-sm">&nbsp;</p>
                </div>
              </div>
              <span className="font-mono text-[10px] md:text-xs md:text-sm">0000</span>
            </div>
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
              {(selectedProject.liveLink || selectedProject.githubLink) && (
                <div className="mt-4 flex flex-wrap items-center gap-4 md:mt-6">
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-foreground/70 transition-colors hover:text-foreground md:text-sm md:text-base"
                    >
                      {t.work.liveLink}
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-foreground/70 transition-colors hover:text-foreground md:text-sm md:text-base"
                    >
                      {t.work.githubLink}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
