"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, MessageCircle } from "lucide-react"
import Link from "next/link"

interface FAQItem {
    question: string
    answer: string
}

interface FAQSectionProps {
    faqs?: FAQItem[]
    title?: string
    subtitle?: string
    ctaTitle?: string
    ctaDescription?: string
    scheduleCallUrl?: string
    sendMessageUrl?: string
}

const defaultFAQs: FAQItem[] = [
    {
        question: "How long does a typical project take?",
        answer:
            "Project timelines vary depending on scope and complexity. A simple website typically takes 2-4 weeks, while complex web applications can take 8-16 weeks. We'll provide a detailed timeline during our initial consultation.",
    },
    {
        question: "Do you provide ongoing maintenance and support?",
        answer:
            "Yes, we offer comprehensive maintenance packages including security updates, performance optimization, content updates, and technical support. Our support plans are tailored to your specific needs and budget.",
    },
    {
        question: "What if I'm not satisfied with the final result?",
        answer:
            "Client satisfaction is our top priority. We include multiple revision rounds in our process and maintain open communication throughout. If you're not completely satisfied, we'll work with you until we achieve your vision.",
    },
    {
        question: "Can you work with our existing brand guidelines?",
        answer:
            "We're experienced in working within established brand guidelines and can seamlessly integrate your existing brand identity into our designs while enhancing the overall user experience.",
    },
    {
        question: "Do you handle e-commerce projects?",
        answer:
            "Yes, we specialize in e-commerce solutions using platforms like Shopify, WooCommerce, and custom solutions. We focus on conversion optimization and creating seamless shopping experiences.",
    },
    {
        question: "What makes Studio Dust different from other agencies?",
        answer:
            "Our unique combination of strategic thinking, cutting-edge design, and technical expertise sets us apart. We focus on measurable results and long-term partnerships rather than just delivering projects.",
    },
    {
        question: "Do you provide training on how to manage our website?",
        answer:
            "Yes, we provide comprehensive training sessions and documentation to ensure your team can confidently manage and update your website. We also offer ongoing support as needed.",
    },
    {
        question: "What's included in your SEO optimization?",
        answer:
            "Our SEO services include technical optimization, content strategy, keyword research, on-page optimization, performance improvements, and ongoing monitoring to ensure your site ranks well in search results.",
    },
]

export default function FAQSection({
                                       faqs = defaultFAQs,
                                       title = "Frequently Asked Questions",
                                       subtitle = "Everything you need to know about working with Studio Dust. Can't find what you're looking for? Get in touch with our team.",
                                       ctaTitle = "Still Have Questions?",
                                       ctaDescription = "Our team is here to help. Schedule a free consultation to discuss your project and get all your questions answered.",
                                       scheduleCallUrl = "#",
                                       sendMessageUrl = "#",
                                   }: FAQSectionProps) {
    return (
        <section className="py-32 lg:py-48 bg-section-secondary text-section-secondary-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="scroll-animate text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-sans mb-6 text-balance opacity-0 translate-y-8">
                        {title.split(" ").map((word, index) => (
                            <span key={index}>
                {word === "Questions" ? <span style={{ color: "var(--tech-accent-2)" }}>{word}</span> : word}{" "}
              </span>
                        ))}
                    </h2>
                    <p className="scroll-animate text-lg md:text-xl text-muted-foreground font-serif mb-12 max-w-3xl mx-auto text-pretty leading-relaxed opacity-0 translate-y-8 animation-delay-300">
                        {subtitle}
                    </p>
                </div>

                <div className="space-y-4 mb-20">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="faq-item group"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animation: "fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                                opacity: "0",
                            }}
                        >
                            <details className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/50 transition-colors duration-200">
                                    <h3
                                        className="text-lg font-semibold text-card-foreground pr-4"
                                        style={{
                                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
                                            fontWeight: "600",
                                            letterSpacing: "-0.01em",
                                        }}
                                    >
                                        {faq.question}
                                    </h3>
                                    <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <div className="px-6 pb-6">
                                    <p
                                        className="text-muted-foreground leading-relaxed"
                                        style={{
                                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        {faq.answer}
                                    </p>
                                </div>
                            </details>
                        </div>
                    ))}
                </div>

                {/* Still Have Questions CTA */}
                <div className="text-center">
                    <div
                        className="bg-card border border-border rounded-3xl p-12 shadow-lg"
                        style={{
                            background: "color-mix(in oklch, var(--color-card) 95%, var(--color-primary) 5%)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <div className="mb-6">
                            <div
                                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                                style={{
                                    background: "color-mix(in oklch, var(--color-standout) 15%, transparent)",
                                }}
                            >
                                <MessageCircle
                                    className="w-8 h-8"
                                    style={{
                                        color: "var(--color-standout)",
                                    }}
                                />
                            </div>
                            <h3
                                className="text-2xl font-bold text-card-foreground mb-3"
                                style={{
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
                                    fontWeight: "600",
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                {ctaTitle}
                            </h3>
                            <p
                                className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto"
                                style={{
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                    lineHeight: "1.6",
                                }}
                            >
                                {ctaDescription}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                asChild
                                className="h-12 px-8 rounded-full font-medium transition-all duration-300 hover:scale-105"
                                style={{
                                    background: "color-mix(in oklch, var(--color-standout) 80%, var(--color-muted))",
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                }}
                            >
                                <Link href={scheduleCallUrl}>Schedule Free Call</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="h-12 px-8 rounded-full border-2 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm bg-transparent"
                                style={{
                                    borderColor: "color-mix(in oklch, var(--color-primary) 30%, transparent)",
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                                }}
                            >
                                <Link href={sendMessageUrl}>Send Message</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
