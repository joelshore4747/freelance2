"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Instagram, Github, Linkedin, MoreHorizontal, Mail, ExternalLink, Send } from "lucide-react"

interface ContactFormProps {
    className?: string
    onSubmit?: (data: FormData) => void | Promise<void>
}

interface FormData {
    name: string
    email: string
    subject: string
    message: string
}

export function EmailSignup({ className = "", onSubmit }: ContactFormProps) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState<Partial<FormData>>({})

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required"
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            if (onSubmit) {
                await onSubmit(formData)
            }
            setIsSubmitted(true)
            setFormData({ name: "", email: "", subject: "", message: "" })
        } catch (error) {
            console.error("Form submission error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const socialLinks = [
        {
            name: "Instagram",
            icon: Instagram,
            href: "https://instagram.com",
            color: "hover:text-pink-500",
        },
        {
            name: "GitHub",
            icon: Github,
            href: "https://github.com",
            color: "hover:text-gray-800",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: "https://linkedin.com",
            color: "hover:text-blue-600",
        },
    ]

    const additionalLinks = [
        { name: "Twitter", href: "https://twitter.com" },
        { name: "YouTube", href: "https://youtube.com" },
        { name: "Discord", href: "https://discord.com" },
        { name: "Telegram", href: "https://telegram.org" },
    ]

    return (
        <div className={`w-full ${className}`}>
            {/* Video Background */}
            <div className="relative h-[100vh] max-h-[800px]">
                <div className="absolute left-0 right-0 top-0 bottom-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.7)" }}
                    >
                        <source src="/background-video.mp4" type="video/mp4" />
                        {/* Fallback gradient background if video fails to load */}
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 -z-10" />
                    </video>

                    {/* Optional overlay for better text contrast */}
                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="w-full max-w-lg space-y-8">
                            <div className="glass-card rounded-2xl p-8 shadow-2xl">
                                <div className="text-center mb-8">
                                    <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Get In Touch</h2>
                                    <p className="text-white/80 text-lg">{"Let's create something amazing together"}</p>
                                </div>

                                {isSubmitted ? (
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30">
                                            <Mail className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-semibold text-white mb-3">Message Sent!</h3>
                                        <p className="text-white/80 mb-8 text-lg">
                                            Thank you for reaching out. We'll get back to you soon.
                                        </p>
                                        <Button
                                            onClick={() => setIsSubmitted(false)}
                                            className="glass-button text-white font-semibold px-8 py-3 rounded-xl"
                                        >
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-semibold text-white uppercase tracking-wide">
                                                    Name
                                                </label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Your full name"
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                                    className={`glass-input text-white placeholder:text-white/60 focus:border-primary/50 rounded-xl py-3 ${errors.name ? "border-red-400" : ""}`}
                                                />
                                                {errors.name && <p className="text-sm text-red-300">{errors.name}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-semibold text-white uppercase tracking-wide">
                                                    Email
                                                </label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="your.email@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    className={`glass-input text-white placeholder:text-white/60 focus:border-primary/50 rounded-xl py-3 ${errors.email ? "border-red-400" : ""}`}
                                                />
                                                {errors.email && <p className="text-sm text-red-300">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-semibold text-white uppercase tracking-wide">
                                                Subject
                                            </label>
                                            <Input
                                                id="subject"
                                                type="text"
                                                placeholder="What's this about?"
                                                value={formData.subject}
                                                onChange={(e) => handleInputChange("subject", e.target.value)}
                                                className={`glass-input text-white placeholder:text-white/60 focus:border-primary/50 rounded-xl py-3 ${errors.subject ? "border-red-400" : ""}`}
                                            />
                                            {errors.subject && <p className="text-sm text-red-300">{errors.subject}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-semibold text-white uppercase tracking-wide">
                                                Message
                                            </label>
                                            <Textarea
                                                id="message"
                                                placeholder="Tell us more about your project..."
                                                rows={5}
                                                value={formData.message}
                                                onChange={(e) => handleInputChange("message", e.target.value)}
                                                className={`glass-input text-white placeholder:text-white/60 focus:border-primary/50 rounded-xl resize-none ${errors.message ? "border-red-400" : ""}`}
                                            />
                                            {errors.message && <p className="text-sm text-red-300">{errors.message}</p>}
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full glass-button text-white font-bold py-4 text-lg rounded-xl flex items-center justify-center gap-3 mt-8"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                                {socialLinks.map((social) => {
                                    const Icon = social.icon
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="glass-card p-4 rounded-xl text-white/80 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-white/20"
                                            aria-label={social.name}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </a>
                                    )
                                })}

                                {/* More Links Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className="glass-card p-4 rounded-xl text-white/80 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-white/20"
                                            aria-label="More social links"
                                        >
                                            <MoreHorizontal className="w-6 h-6" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center" className="w-48 glass-dropdown border-white/20">
                                        {additionalLinks.map((link) => (
                                            <DropdownMenuItem key={link.name} asChild>
                                                <a
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between w-full text-white hover:text-white/80"
                                                >
                                                    {link.name}
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
