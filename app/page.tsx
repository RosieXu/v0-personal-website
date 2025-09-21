import { Feedback } from '@/components/Feedback'
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { CertificationsSection } from "@/components/certifications-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <section id="feedback" className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Feedback</h2>
          <Feedback />
        </section>

        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
