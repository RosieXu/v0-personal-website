import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            passionate about applying AI techniques to real-world problems, and I'm always eager to learn new methods,
            collaborate on innovative projects, and push my technical skill set further.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <img src="/uiuc-logo.png" alt="UIUC Logo" className="h-6 w-6" />
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
            <div className="bg-card p-6 rounded-lg border">
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
        </div>
      </div>
    </section>
  )
}
