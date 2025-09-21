import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="floating-tech top-10 left-16">
        <div className="floating-dot" style={{ animationDelay: "0.5s" }}></div>
      </div>
      <div className="floating-tech top-32 right-24">
        <div className="floating-circuit" style={{ animationDelay: "1.5s" }}></div>
      </div>
      <div className="floating-tech bottom-20 left-32">
        <div className="floating-hexagon" style={{ animationDelay: "2.5s" }}></div>
      </div>
      <div className="floating-tech top-48 right-16">
        <div className="floating-line" style={{ animationDelay: "3.5s" }}></div>
      </div>
      <div className="floating-tech bottom-40 right-40">
        <div className="floating-grid" style={{ animationDelay: "4.5s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 font-heading">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            {
              "Passionate about applying AI techniques to real-world problems, and I'm always eager to learn new methods, collaborate on innovative projects, and push my technical skill set further."
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <Card className="futuristic-card p-6 bg-white/80 backdrop-blur-sm border-2 border-transparent">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/%E6%88%AA%E5%B1%8F2025-09-12%2015.15.42%281%29%281%29-vZJhcZjfducDZf2df7Xky50i46Nyip.png"
                      alt="UIUC Logo"
                      className="h-6 w-6"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Educational Background</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      University of Illinois Urbana-Champaign
                      <br />
                      Bachelor's degree, Information Sciences
                      <br />
                      minor in Computer Science & Statistics
                      <br />
                      Aug 2022 - May 2026
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="futuristic-card p-6 bg-white/80 backdrop-blur-sm border-2 border-transparent">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-4">Core Values</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Innovation through continuous learning</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Collaborative problem-solving approach</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Ethical AI and responsible development</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
