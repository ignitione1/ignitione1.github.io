import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "./CustomCursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import { translations, type Lang } from "@/lib/translations"

export function StudioLanding() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [lang, setLang] = useState<Lang>('ru')
  const t = translations[lang]
  const touchStartY = useRef<number | undefined>(undefined)
  const touchStartX = useRef<number | undefined>(undefined)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number | undefined>(undefined)
  const isAutoScrollingRef = useRef(false)
  const totalSections = 5

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }
    if (checkShaderReady()) return
    const intervalId = setInterval(() => {
      if (checkShaderReady()) clearInterval(intervalId)
    }, 100)
    const fallbackTimer = setTimeout(() => setIsLoaded(true), 1500)
    return () => { clearInterval(intervalId); clearTimeout(fallbackTimer) }
  }, [])

  // Scroll to top on page load
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: 'auto',
      })
      setCurrentSection(0)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.offsetWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  // Convert vertical wheel to horizontal scroll with auto-snap
  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    const snapThreshold = 0.2 // 20% of screen width triggers snap
    let wheelTimeout: number | undefined

    const smoothScrollTo = (targetX: number, duration: number = 1000) => {
      const startX = el.scrollLeft
      const distance = targetX - startX
      const startTime = performance.now()
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3)
        
        el.scrollLeft = startX + distance * ease
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          isAutoScrollingRef.current = false
        }
      }
      
      requestAnimationFrame(animate)
    }

    const onWheel = (e: WheelEvent) => {
      if (isAutoScrollingRef.current || isModalOpen) return
      
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY
        e.preventDefault()
        
        // Clear previous timeout
        if (wheelTimeout) clearTimeout(wheelTimeout)
        
        // Set new timeout to check scroll position after user stops scrolling
        wheelTimeout = window.setTimeout(() => {
          const scrollProgress = el.scrollLeft / el.offsetWidth
          const currentSectionIndex = Math.round(scrollProgress)
          const progressInSection = scrollProgress - currentSectionIndex
          
          // Only auto-scroll forward if threshold reached
          if (progressInSection > snapThreshold && currentSectionIndex < totalSections - 1) {
            isAutoScrollingRef.current = true
            const targetX = el.offsetWidth * (currentSectionIndex + 1)
            smoothScrollTo(targetX, 600)
            setCurrentSection(currentSectionIndex + 1)
          } else if (progressInSection < -snapThreshold && currentSectionIndex > 0) {
            isAutoScrollingRef.current = true
            const targetX = el.offsetWidth * (currentSectionIndex - 1)
            smoothScrollTo(targetX, 600)
            setCurrentSection(currentSectionIndex - 1)
          }
        }, 150)
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      el.removeEventListener("wheel", onWheel)
      if (wheelTimeout) clearTimeout(wheelTimeout)
    }
  }, [isModalOpen])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* WebGL фон */}
      <div ref={shaderContainerRef} className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} style={{ contain: "strict" }}>
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Nav */}
      <nav className={`fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-4 py-4 md:px-12 md:py-6 transition-all duration-300 ${isModalOpen ? 'pointer-events-none opacity-50' : ''}`}>
        <button onClick={() => scrollToSection(0)} className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Revyakin.tech" className="h-8 w-8 object-contain md:h-10 md:w-10" />
          <span className="font-sans text-base font-semibold tracking-tight text-foreground md:text-xl">Revyakin.tech</span>
        </button>
        <div className="hidden items-center gap-8 md:flex">
          {[t.nav.home, t.nav.work, t.nav.services, t.nav.about, t.nav.contact].map((item, index) => (
            <button key={item} onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"}`}>
              {item}
              <span className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${currentSection === index ? "w-full" : "w-0 group-hover:w-full"}`} />
            </button>
          ))}
        </div>
        <button
          onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          className="flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 px-2.5 py-1 backdrop-blur-md transition-all hover:border-foreground/40 hover:bg-foreground/15 md:px-3 md:py-1.5"
        >
          <span className={`font-mono text-[10px] font-medium transition-colors md:text-xs ${lang === 'ru' ? 'text-foreground' : 'text-foreground/50'}`}>RU</span>
          <span className="h-px w-2 bg-foreground/30 md:w-3" />
          <span className={`font-mono text-[10px] font-medium transition-colors md:text-xs ${lang === 'en' ? 'text-foreground' : 'text-foreground/50'}`}>EN</span>
        </button>
      </nav>

      {/* Горизонтальный скролл */}
      <div ref={scrollContainerRef} className="relative z-10 flex h-screen overflow-x-auto overflow-y-hidden scroll-container" style={{ scrollbarWidth: "none" }}>

        {/* Hero */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col justify-end px-4 pb-8 pt-6 md:px-12 md:pb-24 md:pt-24">
          <div className="max-w-3xl">
            <div className="mb-3 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-3 py-1 backdrop-blur-md md:mb-4 md:px-4 md:py-1.5">
              <p className="font-mono text-[10px] text-foreground/90 md:text-xs">{t.hero.badge}</p>
            </div>
            <h1 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-5xl lg:text-7xl">
              {lang === 'ru' ? (
                <>
                  Разрабатываю<br />продукты,<br />которые работают
                </>
              ) : (
                <>
                  I build<br />products<br />that work
                </>
              )}
            </h1>
            <p className="mb-4 max-w-xl text-sm leading-relaxed text-foreground/90 md:mb-6 md:text-base md:text-lg">
              {t.hero.description}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <MagneticButton size="md" variant="primary" onClick={() => scrollToSection(4)} className="md:size-lg">{t.hero.ctaProject}</MagneticButton>
              <MagneticButton size="md" variant="secondary" onClick={() => scrollToSection(2)} className="md:size-lg">{t.hero.ctaServices}</MagneticButton>
            </div>
          </div>

          {/* Swipe indicator for mobile/tablet */}
          {isLoaded && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 animate-fade-in lg:hidden" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
              <span className="font-mono text-xs text-foreground/40 md:text-sm md:text-foreground/50">
                {lang === 'ru' ? 'Свайп' : 'Swipe'}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/40 md:h-6 md:w-6 md:text-foreground/50 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </section>

        <WorkSection onModalChange={setIsModalOpen} scrollContainerRef={scrollContainerRef} lang={lang} />
        <ServicesSection lang={lang} />
        <AboutSection scrollToSection={scrollToSection} lang={lang} />
        <ContactSection lang={lang} />
      </div>
    </main>
  )
}
