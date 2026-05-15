import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contact - Studio Duo | Start Your Project",
  description:
    "Ready to bring your vision to life? Contact Studio Duo for a free consultation. We design and build web experiences, automations, and digital systems that drive results.",
  keywords: ["contact", "web design consultation", "development services", "project quote", "Studio Duo"],
  openGraph: {
    title: "Contact - Studio Duo",
    description: "Ready to bring your vision to life? Contact Studio Duo for a free consultation.",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-foreground">
            Let's Build Something <span className="text-standout">Amazing Together</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Ready to transform your ideas into reality? We're here to help you create exceptional digital experiences
            that drive results.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <ContactForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-section-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "How long does a typical project take?",
                body: "Project timelines vary based on complexity, but most websites take 4-8 weeks from start to launch.",
              },
              {
                title: "Do you work with international clients?",
                body: "We work with clients worldwide and are experienced in remote collaboration.",
              },
              {
                title: "What's included in your services?",
                body: "We provide end-to-end services including design, development, testing, and post-launch support.",
              },
              {
                title: "Do you offer ongoing maintenance?",
                body: "Yes, we offer maintenance packages to keep your website secure, updated, and performing optimally.",
              },
            ].map((item) => (
              <Card key={item.title} className="bg-card/90 border-border/80">
                <CardContent className="pt-0">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
