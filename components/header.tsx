"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glassmorphism shadow-lg transform scale-95" : "glassmorphism"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="text-xl font-bold text-white font-heading"
            style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)" }}
          >
            Kaihan (Rosie) Xu
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("about")} className="nav-link font-medium">
              About
            </button>
            <button onClick={() => scrollToSection("experience")} className="nav-link font-medium">
              Experience
            </button>
            <button onClick={() => scrollToSection("skills")} className="nav-link font-medium">
              Skills
            </button>
            <button onClick={() => scrollToSection("certifications")} className="nav-link font-medium">
              Honors & Certifications
            </button>
            <button onClick={() => scrollToSection("contact")} className="nav-link font-medium">
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20"
            style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)" }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection("about")} className="text-left nav-link font-medium">
                About
              </button>
              <button onClick={() => scrollToSection("experience")} className="text-left nav-link font-medium">
                Experience
              </button>
              <button onClick={() => scrollToSection("skills")} className="text-left nav-link font-medium">
                Skills
              </button>
              <button onClick={() => scrollToSection("certifications")} className="text-left nav-link font-medium">
                Honors & Certifications
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-left nav-link font-medium">
                Contact
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
