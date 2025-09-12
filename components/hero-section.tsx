"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-card pt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                Hello World, I'm <span className="text-primary">Kaihan (Rosie) Xu</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
                Information Science (minor in CS & STAT) @UIUC
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg text-pretty">
                My academic and project experience centers on Artificial Intelligence, Machine Learning, and Computer
                Vision. I've also built applied projects in data analysis, backend development, and model evaluation,
                combining both technical implementation and practical impact.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" onClick={() => scrollToSection("experience")}>
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection("contact")}>
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <img
                  src="/headshot.jpg"
                  alt="Kaihan (Rosie) Xu - Professional Photo"
                  className="w-72 h-72 rounded-full object-cover border-4 border-background shadow-xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/10 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
