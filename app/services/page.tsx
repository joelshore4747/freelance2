import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GetStartedButton } from "@/components/get-started-button"
import Link from "next/link"
import {
  Palette,
  Code,
  Smartphone,
  Zap,
  Database,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Award,
  TrendingUp,
  X,
  Target,
  Headphones,
  Calendar,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services - Studio Duo | Web Design & Development Services",
  description:
    "Comprehensive web design and development services including UI/UX design, full-stack development, mobile optimization, and ongoing support.",
  openGraph: {
    title: "Services - Studio Duo",
    description:
      "Comprehensive web design and development services including UI/UX design, full-stack development, mobile optimization, and ongoing support.",
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-standout">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Title and Key Points */}
            <div>
              <Badge variant="secondary" className="mb-6 font-serif bg-primary/10 text-primary border-primary/20">
                Premium Digital Services
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-sans mb-6 text-balance">
                Everything You Need to <span className="text-primary">Succeed Online</span>
              </h1>
              <p className="text-xl text-gray-600 font-serif mb-8 text-pretty">
                From initial concept to ongoing optimization, we provide comprehensive digital solutions that drive
                growth and deliver measurable results.
              </p>

              {/* Key Points */}
              <div className="space-y-4 mb-8">
                {[
                  "Custom web design & development tailored to your brand",
                  "Mobile-first approach ensuring perfect performance on all devices",
                  "SEO optimization and performance monitoring included",
                  "Ongoing support and maintenance for peace of mind",
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-serif">{point}</span>
                  </div>
                ))}
              </div>

              <GetStartedButton size="lg" className="font-serif font-semibold" />
            </div>

            {/* Right side - 2x2 Metrics Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <Target className="h-8 w-8" />,
                  number: "150+",
                  label: "Projects Delivered",
                  description: "Successfully completed",
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  number: "98%",
                  label: "Client Satisfaction",
                  description: "Happy clients rate",
                },
                {
                  icon: <Calendar className="h-8 w-8" />,
                  number: "5+",
                  label: "Years Experience",
                  description: "In web development",
                },
                {
                  icon: <Headphones className="h-8 w-8" />,
                  number: "24/7",
                  label: "Support",
                  description: "Always available",
                },
              ].map((metric, index) => (
                <Card
                  key={index}
                  className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 mx-auto">
                      {metric.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 font-sans mb-1">{metric.number}</div>
                    <div className="text-sm font-semibold text-gray-900 font-sans mb-1">{metric.label}</div>
                    <div className="text-xs text-gray-500 font-serif">{metric.description}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-sans mb-6 text-balance">Core Services</h2>
            <p className="text-xl text-gray-600 font-serif max-w-2xl mx-auto text-pretty">
              Our primary offerings designed to transform your digital presence and accelerate business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Palette className="h-8 w-8" />,
                title: "UI/UX Design",
                description: "Beautiful, intuitive interfaces that users love and convert visitors into customers.",
                features: ["User Research", "Wireframing", "Visual Design", "Prototyping"],
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "Web Development",
                description: "Fast, secure, and scalable websites built with modern technologies and best practices.",
                features: ["Custom Development", "CMS Integration", "API Development", "Database Design"],
              },
              {
                icon: <Smartphone className="h-8 w-8" />,
                title: "Mobile-First Design",
                description: "Responsive designs that work perfectly across all devices and screen sizes.",
                features: ["Responsive Design", "Mobile Optimization", "Touch Interfaces", "Cross-Browser Testing"],
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Performance Optimization",
                description: "Lightning-fast websites optimized for Core Web Vitals and search engine rankings.",
                features: ["Speed Optimization", "Image Compression", "Code Splitting", "CDN Setup"],
              },
              {
                icon: <Database className="h-8 w-8" />,
                title: "Full-Stack Development",
                description: "Complete web applications with robust backends and seamless user experiences.",
                features: ["Backend Development", "Database Architecture", "API Integration", "Cloud Deployment"],
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Security & Maintenance",
                description: "Ongoing support, security updates, and performance monitoring for peace of mind.",
                features: ["Security Audits", "Regular Updates", "Backup Systems", "24/7 Monitoring"],
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                    {service.icon}
                  </div>
                  <CardTitle className="font-sans text-gray-900">{service.title}</CardTitle>
                  <CardDescription className="font-serif text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-gray-600 font-serif text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-sans mb-6 text-balance">Why Choose Us</h2>
            <p className="text-xl text-gray-600 font-serif max-w-2xl mx-auto text-pretty">
              What sets us apart from other agencies and freelancers in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="h-8 w-8" />,
                title: "Award-Winning Design",
                description: "Recognized for excellence in web design and user experience.",
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Fast Delivery",
                description: "Most projects completed within 2-4 weeks without compromising quality.",
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Proven Results",
                description: "Average 150% increase in conversion rates for our clients.",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Personal Attention",
                description: "Direct access to the team, no account managers or middlemen.",
              },
            ].map((reason, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 mx-auto">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-sans mb-3">{reason.title}</h3>
                <p className="text-gray-600 font-serif text-pretty">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Stage Process Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-sans mb-6 text-balance">
              Our 4-Stage Process
            </h2>
            <p className="text-xl text-gray-600 font-serif max-w-2xl mx-auto text-pretty">
              A proven methodology that ensures your project is delivered on time, on budget, and exceeds expectations.
            </p>
          </div>

          <div className="relative">
            {/* Process line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Planning",
                  description:
                    "We start with a comprehensive discovery session to understand your goals, target audience, and project requirements.",
                },
                {
                  step: "02",
                  title: "Design & Strategy",
                  description:
                    "We create wireframes, mockups, and a detailed project strategy that aligns with your business objectives.",
                },
                {
                  step: "03",
                  title: "Development & Testing",
                  description:
                    "We build your project using modern technologies, with regular testing and quality assurance throughout.",
                },
                {
                  step: "04",
                  title: "Launch & Support",
                  description:
                    "We deploy your project and provide ongoing support, training, and optimization to ensure continued success.",
                },
              ].map((process, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-xl font-sans mb-4 mx-auto relative z-10 shadow-lg">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-sans mb-3">{process.title}</h3>
                  <p className="text-gray-600 font-serif text-pretty">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-sans mb-6 text-balance">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 font-serif max-w-2xl mx-auto text-pretty">
              Choose the package that best fits your needs. All packages include our signature attention to detail and
              ongoing support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$5,000",
                description: "Perfect for small businesses and startups",
                features: [
                  "5-page responsive website",
                  "Mobile-first design",
                  "Basic SEO optimization",
                  "Contact form integration",
                  "2 rounds of revisions",
                  "30 days support",
                ],
                notIncluded: ["E-commerce functionality", "Custom animations", "Advanced integrations"],
                popular: false,
              },
              {
                name: "Professional",
                price: "$12,000",
                description: "Ideal for growing businesses",
                features: [
                  "10-page responsive website",
                  "Custom UI/UX design",
                  "Advanced SEO optimization",
                  "CMS integration",
                  "E-commerce functionality",
                  "Performance optimization",
                  "Analytics setup",
                  "3 rounds of revisions",
                  "90 days support",
                ],
                notIncluded: ["Custom backend development", "Third-party integrations"],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$25,000+",
                description: "For complex projects and large organizations",
                features: [
                  "Unlimited pages",
                  "Custom web application",
                  "Full-stack development",
                  "Advanced integrations",
                  "Custom animations",
                  "Security implementation",
                  "Performance monitoring",
                  "Team training",
                  "Unlimited revisions",
                  "6 months support",
                ],
                notIncluded: [],
                popular: false,
              },
            ].map((tier, index) => (
              <Card
                key={index}
                className={`relative ${tier.popular ? "border-primary shadow-lg scale-105" : "border-gray-200"} bg-white`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground font-serif">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="font-sans text-2xl text-gray-900">{tier.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary font-sans">{tier.price}</div>
                  <CardDescription className="font-serif text-gray-600">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 font-sans mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-gray-600 font-serif text-sm">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tier.notIncluded.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 font-sans mb-3">Not Included:</h4>
                      <ul className="space-y-2">
                        {tier.notIncluded.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-gray-600 font-serif text-sm">
                            <X className="h-4 w-4 text-gray-600 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <GetStartedButton
                    variant={tier.popular ? "default" : "outline"}
                    className="w-full font-serif font-semibold"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Clients Say Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-sans mb-6 text-balance">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 font-serif max-w-2xl mx-auto text-pretty">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The team delivered exactly what we needed. Our new website has increased our lead generation by 200% and the design is absolutely stunning.",
                author: "Sarah Johnson",
                role: "CEO, TechStart Inc.",
                rating: 5,
              },
              {
                quote:
                  "Professional, responsive, and incredibly talented. They understood our vision perfectly and brought it to life better than we imagined.",
                author: "Michael Chen",
                role: "Founder, GrowthLab",
                rating: 5,
              },
              {
                quote:
                  "Outstanding work on our e-commerce platform. The attention to detail and user experience has significantly improved our conversion rates.",
                author: "Emily Rodriguez",
                role: "Marketing Director, RetailPro",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-gray-900 font-serif mb-4 text-pretty">"{testimonial.quote}"</blockquote>
                  <div>
                    <div className="font-semibold text-gray-900 font-sans">{testimonial.author}</div>
                    <div className="text-gray-600 font-serif text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-sans mb-6 text-balance">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 font-serif mb-8 text-pretty">
            Let's discuss your project and create a custom solution that drives results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GetStartedButton size="lg" className="font-serif font-semibold" />
            <Button asChild variant="outline" size="lg" className="font-serif font-semibold bg-transparent">
              <Link href="/portfolio">
                View Our Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <GetStartedButton variant="sticky" />
    </div>
  )
}
