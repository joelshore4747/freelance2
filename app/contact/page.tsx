import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import {Navigation} from "@/components/navigation";
import {EmailSignup} from "@/components/email-signup";

export const metadata: Metadata = {
  title: "Contact Us - Design Studio | Get Your Project Started",
  description:
    "Ready to bring your vision to life? Contact our design and development team for a free consultation. We specialize in web design, development, and digital solutions.",
  keywords: ["contact", "web design consultation", "development services", "project quote", "design studio"],
  openGraph: {
    title: "Contact Us - Design Studio",
    description: "Ready to bring your vision to life? Contact our design and development team for a free consultation.",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Let's Build Something <span className="text-primary">Amazing Together</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Ready to transform your ideas into reality? We're here to help you create exceptional digital experiences
            that drive results.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ContactForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">How long does a typical project take?</h3>
              <p className="text-muted-foreground">
                Project timelines vary based on complexity, but most websites take 4-8 weeks from start to launch.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you work with international clients?</h3>
              <p className="text-muted-foreground">
                We work with clients worldwide and are experienced in remote collaboration.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What's included in your services?</h3>
              <p className="text-muted-foreground">
                We provide end-to-end services including design, development, testing, and post-launch support.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer ongoing maintenance?</h3>
              <p className="text-muted-foreground">
                Yes, we offer maintenance packages to keep your website secure, updated, and performing optimally.
              </p>
            </div>
          </div>
        </div>

      </section>
    </main>
  )
}
