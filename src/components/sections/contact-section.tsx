import { useRef, useEffect, useState } from "react"
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react"
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

interface ContactSectionProps {
  lang: Lang
}

export function ContactSection({ lang }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const t = translations[lang]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error('Telegram bot token or chat ID not configured')
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }

    const message = `
📨 Новая заявка с сайта!

👤 Имя: ${formData.name}
📱 Контакты: ${formData.contact}
💬 Сообщение:
${formData.message}
    `.trim()

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
          }),
        }
      )

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', contact: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="flex h-screen w-screen shrink-0 items-center px-4 pt-6 md:px-12 md:pt-0 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-4 md:grid-cols-[1.2fr_1fr] md:gap-12 lg:gap-20">
          <div className="flex flex-col justify-center">
            <Reveal from="left" className="mb-3 md:mb-8">
              <h2 className="mb-2 text-2xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-6xl lg:text-7xl">
                {t.contact.title}
              </h2>
              <p className="font-mono text-[10px] text-foreground/60 md:text-sm">{t.contact.subtitle}</p>
            </Reveal>
            <div className="space-y-2 md:space-y-6">
              <Reveal from="left" delay={200}>
                <a href="mailto:hello@studio.dev" className="group block">
                  <div className="mb-1 flex items-center gap-2">
                    <Mail size={10} className="text-foreground/60 md:size-12" />
                    <span className="font-mono text-[10px] text-foreground/60 md:text-xs">{t.contact.email}</span>
                  </div>
                  <p className="text-xs text-foreground transition-colors group-hover:text-foreground/70 md:text-sm md:text-xl">ignitione1@mail.ru</p>
                </a>
              </Reveal>
              <Reveal from="up" delay={350}>
                <div className="mb-1 flex items-center gap-2">
                  <MapPin size={10} className="text-foreground/60 md:size-12" />
                  <span className="font-mono text-[10px] text-foreground/60 md:text-xs">{t.contact.location}</span>
                </div>
                <p className="text-xs text-foreground md:text-sm md:text-xl">{t.contact.locationValue}</p>
              </Reveal>
              <Reveal from="left" delay={500}>
                <div className="flex flex-wrap gap-3 pt-2 md:pt-4 md:gap-4">
                  <a href="https://t.me/vitaly_revyakin" target="_blank" rel="noopener noreferrer" className="border-b border-foreground/30 font-mono text-[10px] text-foreground/80 transition-all hover:border-foreground hover:text-foreground md:text-xs md:text-sm">
                    Telegram
                  </a>
                  <a href="https://vk.ru/nothing____personal" target="_blank" rel="noopener noreferrer" className="border-b border-foreground/30 font-mono text-[10px] text-foreground/80 transition-all hover:border-foreground hover:text-foreground md:text-xs md:text-sm">
                    VK
                  </a>
                  <a href="https://www.instagram.com/revyakin.tech/" target="_blank" rel="noopener noreferrer" className="border-b border-foreground/30 font-mono text-[10px] text-foreground/80 transition-all hover:border-foreground hover:text-foreground md:text-xs md:text-sm">
                    Instagram
                  </a>
                  <a href="https://www.linkedin.com/in/vitaly-revyakin-929b86378/" target="_blank" rel="noopener noreferrer" className="border-b border-foreground/30 font-mono text-[10px] text-foreground/80 transition-all hover:border-foreground hover:text-foreground md:text-xs md:text-sm">
                    LinkedIn
                  </a>
                  <a href="https://github.com/ignitione1" target="_blank" rel="noopener noreferrer" className="border-b border-foreground/30 font-mono text-[10px] text-foreground/80 transition-all hover:border-foreground hover:text-foreground md:text-xs md:text-sm">
                    GitHub
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <form className="space-y-2 md:space-y-5" onSubmit={handleSubmit}>
              {[
                { label: t.contact.form.name, type: "text", placeholder: t.contact.form.namePlaceholder, delay: 200, key: 'name' },
                { label: t.contact.form.contact, type: "text", placeholder: t.contact.form.contactPlaceholder, delay: 350, key: 'contact' },
              ].map((f) => (
                <Reveal key={f.label} from="right" delay={f.delay}>
                  <label className="mb-1 block font-mono text-[9px] text-foreground/60 md:mb-2 md:text-[10px]">{f.label}</label>
                  <input
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={formData[f.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full border-b border-foreground/30 bg-transparent py-1 text-[11px] text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none disabled:opacity-50 md:py-1.5 md:text-xs md:text-sm"
                  />
                </Reveal>
              ))}
              <Reveal from="right" delay={500}>
                <label className="mb-1 block font-mono text-[9px] text-foreground/60 md:mb-2 md:text-[10px]">{t.contact.form.message}</label>
                <textarea
                  rows={2}
                  required
                  placeholder={t.contact.form.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full border-b border-foreground/30 bg-transparent py-1 text-[11px] text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none disabled:opacity-50 md:py-1.5 md:text-xs md:text-sm"
                />
              </Reveal>
              <Reveal from="up" delay={650}>
                <MagneticButton
                  size="md"
                  variant="primary"
                  className={`w-full md:size-lg ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Send className="h-3 w-3 md:h-4 md:w-4 animate-pulse" />
                      {t.contact.form.submitting}
                    </span>
                  ) : submitStatus === 'success' ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4" />
                      {t.contact.form.success}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-3 w-3 md:h-4 md:w-4" />
                      {t.contact.form.submit}
                    </span>
                  )}
                </MagneticButton>
                {submitStatus === 'error' && (
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-destructive md:text-xs">
                    <AlertCircle className="h-2.5 w-2.5 md:h-3 md:w-3" />
                    {t.contact.form.error}
                  </div>
                )}
              </Reveal>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
