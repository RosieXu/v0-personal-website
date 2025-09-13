"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [showSubtext, setShowSubtext] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtext(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden pt-16 pb-8">
      <div className="floating-tech top-20 left-10">
        <div className="floating-dot" style={{ animationDelay: "0s" }}></div>
      </div>
      <div className="floating-tech top-40 right-20">
        <div className="floating-line" style={{ animationDelay: "1s" }}></div>
      </div>
      <div className="floating-tech bottom-40 left-20">
        <div className="floating-circuit" style={{ animationDelay: "2s" }}></div>
      </div>
      <div className="floating-tech top-60 right-40">
        <div className="floating-hexagon" style={{ animationDelay: "3s" }}></div>
      </div>
      <div className="floating-tech bottom-60 right-10">
        <div className="floating-grid" style={{ animationDelay: "4s" }}></div>
      </div>
      <div className="floating-tech top-32 left-1/3">
        <div className="floating-dot" style={{ animationDelay: "1.5s" }}></div>
      </div>
      <div className="floating-tech bottom-32 right-1/3">
        <div className="floating-line" style={{ animationDelay: "2.5s" }}></div>
      </div>
      <div className="floating-tech top-80 left-1/4">
        <div className="floating-hexagon" style={{ animationDelay: "3.5s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-4 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-balance typing-animation">
                Hello World, I'm <span className="text-primary">Kaihan (Rosie) Xu</span>
              </h1>

              <div className={`space-y-4 ${showSubtext ? "fade-in-delayed" : "opacity-0"}`}>
                <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
                  Information Science (minor in CS & STAT) @UIUC
                </h2>
                <p className="text-lg text-muted-foreground max-w-lg text-pretty">
                  My academic and project experience centers on Artificial Intelligence, Machine Learning, and Computer
                  Vision. I've also built applied projects in data analysis, backend development, and model evaluation,
                  combining both technical implementation and practical impact.
                </p>
              </div>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 ${showSubtext ? "fade-in-delayed" : "opacity-0"}`}>
              <Button size="lg" className="group futuristic-button" onClick={() => scrollToSection("experience")}>
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="futuristic-button bg-transparent"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end relative">
            <div className="floating-tech absolute top-1/4 left-1/4 z-0">
              <div className="floating-dot" style={{ animationDelay: "0.5s" }}></div>
            </div>
            <div className="floating-tech absolute bottom-1/4 right-1/4 z-0">
              <div className="floating-line" style={{ animationDelay: "1.8s" }}></div>
            </div>
            <div className="floating-tech absolute top-1/2 left-1/8 z-0">
              <div className="floating-circuit" style={{ animationDelay: "2.8s" }}></div>
            </div>

            <div className="relative z-10">
              <div className="w-88 h-88 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <img
                  src="/headshot.jpg"
                  alt="Kaihan (Rosie) Xu - Professional Photo"
                  className="w-80 h-80 rounded-full object-cover border-4 border-background shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
