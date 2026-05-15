import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { Instagram, Github, Linkedin, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"

type FormState = {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

const empty: FormState = { name: "", email: "", subject: "", message: "", website: "" }

const socialLinks = [
  { name: "Instagram", Icon: Instagram, href: "https://instagram.com" },
  { name: "GitHub", Icon: Github, href: "https://github.com" },
  { name: "LinkedIn", Icon: Linkedin, href: "https://linkedin.com" },
]

export function EmailSignup() {
  const [formData, setFormData] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [shouldPlay, setShouldPlay] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          setShouldPlay(true)
          io.disconnect()
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next: Partial<FormState> = {}
    if (!formData.name.trim()) next.name = "Name is required"
    if (!formData.email.trim()) next.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = "Please enter a valid email"
    if (!formData.subject.trim()) next.subject = "Subject is required"
    if (!formData.message.trim() || formData.message.trim().length < 10) next.message = "Message must be at least 10 characters"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus("submitting")
    setErrorMessage("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const body = (await res.json()) as { ok: boolean; error?: string }
      if (!res.ok || !body.ok) {
        setStatus("error")
        setErrorMessage(body.error ?? "Something went wrong. Please try again.")
        return
      }
      setStatus("success")
      setFormData(empty)
    } catch {
      setStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    }
  }

  return (
    <div className="w-full" ref={sectionRef}>
      <div className="relative h-[100vh] max-h-[800px]">
        <div className="absolute left-0 right-0 top-0 bottom-0">
          {shouldPlay ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/modern-saas-dashboard-with-dark-blue-and-orange-ge.jpg"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.7)" }}
            >
              <source src="/background-video.mp4" type="video/mp4" />
            </video>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600" aria-hidden />
          )}
          <div className="absolute inset-0 bg-white/70 dark:bg-black/25" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg space-y-8">
              <div className="glass-card rounded-2xl p-8 shadow-2xl text-gray-900 dark:text-white">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Get In Touch</h2>
                  <p className="text-gray-800 dark:text-white/80 text-lg">Let’s create something amazing together</p>
                </div>

                {status === "success" ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30">
                      <Mail className="w-10 h-10 text-gray-900 dark:text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Message Sent!</h3>
                    <p className="text-gray-800 dark:text-white/80 mb-8 text-lg">
                      Thank you for reaching out. We’ll get back to you soon.
                    </p>
                    <Button onClick={() => setStatus("idle")} className="glass-button text-gray-900 dark:text-white font-semibold px-8 py-3 rounded-xl">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden="true">
                      <Input name="website" value={formData.website} onChange={handleChange("website")} tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="es-name" className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Name</label>
                        <Input id="es-name" type="text" placeholder="Your full name" value={formData.name} onChange={handleChange("name")} className={`glass-input rounded-xl py-3 ${errors.name ? "border-red-400" : ""}`} />
                        {errors.name && <p className="text-sm text-red-600 dark:text-red-300">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="es-email" className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Email</label>
                        <Input id="es-email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleChange("email")} className={`glass-input rounded-xl py-3 ${errors.email ? "border-red-400" : ""}`} />
                        {errors.email && <p className="text-sm text-red-600 dark:text-red-300">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="es-subject" className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Subject</label>
                      <Input id="es-subject" type="text" placeholder="What’s this about?" value={formData.subject} onChange={handleChange("subject")} className={`glass-input rounded-xl py-3 ${errors.subject ? "border-red-400" : ""}`} />
                      {errors.subject && <p className="text-sm text-red-600 dark:text-red-300">{errors.subject}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="es-message" className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">Message</label>
                      <Textarea id="es-message" placeholder="Tell us more about your project..." rows={5} value={formData.message} onChange={handleChange("message")} className={`glass-input rounded-xl resize-none ${errors.message ? "border-red-400" : ""}`} />
                      {errors.message && <p className="text-sm text-red-600 dark:text-red-300">{errors.message}</p>}
                    </div>

                    {status === "error" && <p className="text-sm text-red-600 dark:text-red-300" role="alert">{errorMessage}</p>}

                    <Button type="submit" disabled={status === "submitting"} className="w-full glass-button text-gray-900 dark:text-white font-bold py-4 text-lg rounded-xl flex items-center justify-center gap-3 mt-8">
                      {status === "submitting" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 dark:border-white/30 dark:border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              <div className="flex items-center justify-center space-x-4">
                {socialLinks.map(({ name, Icon, href }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="glass-card p-4 rounded-xl text-gray-900 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:bg-white/20" aria-label={name}>
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
