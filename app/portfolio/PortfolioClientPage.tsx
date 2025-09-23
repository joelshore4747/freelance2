"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ExternalLink, Github, ArrowRight, Users, Calendar, TrendingUp, CheckCircle, Star } from "lucide-react"

const featuredProjects = [
  {
    id: 1,
    title: "TechFlow SaaS Platform",
    category: "SaaS Platform",
    description:
      "Complete SaaS platform for project management with real-time collaboration, advanced analytics, and team management features.",
    image: "/modern-saas-dashboard-with-dark-blue-and-orange-ge.jpg",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    metrics: {
      users: "10k+",
      growth: "300%",
      duration: "12 weeks",
    },
    featured: true,
    size: "large",
  },
  {
    id: 2,
    title: "EcoShop E-commerce",
    category: "E-commerce",
    description:
      "Sustainable e-commerce platform with advanced product filtering, subscription management, and carbon footprint tracking.",
    image: "/placeholder-95zgk.png",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    metrics: {
      sales: "5k+",
      growth: "250%",
      duration: "6 weeks",
    },
    featured: true,
    size: "small",
  },
  {
    id: 3,
    title: "FinanceFlow Mobile App",
    category: "Mobile Apps",
    description:
      "Personal finance management app with AI-powered insights, budget tracking, and investment recommendations.",
    image: "/placeholder-49g40.png",
    technologies: ["React Native", "Firebase", "AI/ML", "Plaid"],
    metrics: {
      downloads: "25k+",
      rating: "4.8★",
      duration: "8 weeks",
    },
    featured: true,
    size: "small",
  },
  {
    id: 4,
    title: "CreativeStudio Landing",
    category: "Landing Pages",
    description:
      "High-converting landing page for creative agency with smooth animations and interactive portfolio showcase.",
    image: "/placeholder-ks40r.png",
    technologies: ["Next.js", "Framer Motion", "Tailwind", "Vercel"],
    metrics: {
      conversion: "45%",
      bounce: "-60%",
      duration: "3 weeks",
    },
    featured: true,
    size: "large",
  },
  {
    id: 5,
    title: "RetailPro Web App",
    category: "Web Apps",
    description:
      "Comprehensive retail management system with inventory tracking, sales analytics, and multi-location support.",
    image: "/placeholder-7fi4h.png",
    technologies: ["Vue.js", "Laravel", "MySQL", "AWS"],
    metrics: {
      efficiency: "+75%",
      errors: "-50%",
      duration: "10 weeks",
    },
    featured: true,
    size: "small",
  },
  {
    id: 6,
    title: "DataViz Analytics",
    category: "SaaS Projects",
    description:
      "Advanced data visualization platform for enterprise clients with real-time dashboards and custom reporting.",
    image: "/data-analytics-dashboard.png",
    technologies: ["React", "D3.js", "Python", "PostgreSQL"],
    metrics: {
      clients: "100+",
      accuracy: "99.9%",
      duration: "14 weeks",
    },
    featured: true,
    size: "small",
  },
]

const categories = ["All", "Web Apps", "E-commerce", "Mobile Apps", "Landing Pages", "SaaS Projects"]

export default function PortfolioClientPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects = featuredProjects.filter((project) => {
    return selectedCategory === "All" || project.category === selectedCategory
  })

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20">
              Our Portfolio
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
              Crafting Digital <span className="text-white/90">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto text-pretty mb-12">
              Discover our collection of successful projects that have transformed businesses and delivered exceptional
              results.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4 mx-auto">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-white/70">Happy Clients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4 mx-auto">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">5+</div>
                <div className="text-sm text-white/70">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4 mx-auto">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-white/70">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4 mx-auto">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">150+</div>
                <div className="text-sm text-white/70">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our most impactful work across different industries and technologies.
            </p>
          </div>

          <div className="space-y-8">
            {Array.from({ length: Math.ceil(filteredProjects.length / 2) }, (_, pairIndex) => {
              const project1 = filteredProjects[pairIndex * 2]
              const project2 = filteredProjects[pairIndex * 2 + 1]

              return (
                <div key={pairIndex} className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[500px]">
                  {/* Large Project Card */}
                  {project1 && (
                    <div className="lg:col-span-2">
                      <Card className="h-full bg-card border-border hover:shadow-lg transition-all duration-300 overflow-hidden group">
                        <div className="aspect-[2/1] lg:h-64 bg-muted overflow-hidden">
                          <img
                            src={project1.image || "/placeholder.svg"}
                            alt={project1.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-16rem)] lg:h-[calc(100%-16rem)]">
                          <div>
                            <Badge variant="secondary" className="mb-4">
                              {project1.category}
                            </Badge>
                            <h3 className="text-2xl font-bold text-foreground mb-3">{project1.title}</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">{project1.description}</p>

                            <div className="mb-6">
                              <div className="flex flex-wrap gap-2">
                                {project1.technologies.map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="bg-muted rounded-xl p-4 mb-6">
                              <div className="grid grid-cols-3 gap-4 text-center">
                                {Object.entries(project1.metrics).map(([key, value], metricIndex) => (
                                  <div key={metricIndex}>
                                    <div className="text-xl font-bold text-foreground">{value}</div>
                                    <div className="text-sm text-muted-foreground capitalize">{key}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <Button size="sm" className="flex-1">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Live
                              </Button>
                              <Button variant="outline" size="sm">
                                <Github className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Small Project Card */}
                  {project2 && (
                    <div className="lg:col-span-1">
                      <Card className="h-full bg-card border-border hover:shadow-lg transition-all duration-300 overflow-hidden group">
                        <div className="aspect-video lg:h-48 bg-muted overflow-hidden">
                          <img
                            src={project2.image || "/placeholder.svg"}
                            alt={project2.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-12rem)] lg:h-[calc(100%-12rem)]">
                          <div>
                            <Badge variant="secondary" className="mb-4">
                              {project2.category}
                            </Badge>
                            <h3 className="text-xl font-bold text-foreground mb-3">{project2.title}</h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                              {project2.description}
                            </p>

                            <div className="mb-4">
                              <div className="flex flex-wrap gap-1">
                                {project2.technologies.slice(0, 3).map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="bg-muted rounded-lg p-3 mb-4">
                              <div className="grid grid-cols-1 gap-2 text-center">
                                {Object.entries(project2.metrics)
                                  .slice(0, 2)
                                  .map(([key, value], metricIndex) => (
                                    <div key={metricIndex} className="flex justify-between">
                                      <span className="text-sm text-muted-foreground capitalize">{key}:</span>
                                      <span className="text-sm font-bold text-foreground">{value}</span>
                                    </div>
                                  ))}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 text-xs">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="px-2 bg-transparent">
                                <Github className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart",
                content:
                  "Studio Duo transformed our e-commerce platform completely. The results exceeded our expectations with a 150% increase in conversions.",
                rating: 5,
                avatar: "/professional-woman-portrait.png",
              },
              {
                name: "Michael Chen",
                role: "Founder, GrowthLab",
                content:
                  "The analytics dashboard they built for us is incredible. Our team can now make data-driven decisions faster than ever before.",
                rating: 5,
                avatar: "/professional-man-portrait.png",
              },
              {
                name: "Emily Rodriguez",
                role: "Product Manager, FitTrack",
                content:
                  "Working with Studio Duo was seamless. They delivered a beautiful, functional app that our users absolutely love.",
                rating: 5,
                avatar: "/professional-woman-portrait.png",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-card border-border p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Let's discuss your vision and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-standout hover:bg-destructive text-white font-semibold">
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-background bg-transparent"
            >
              <Link href="/services">
                View Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
