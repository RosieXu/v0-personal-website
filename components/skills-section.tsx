import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Palette, Brain, Wrench } from "lucide-react"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="h-5 w-5" />,
      skills: ["Java", "Python", "SQL", "C++"],
    },
    {
      title: "Machine Learning & AI",
      icon: <Brain className="h-5 w-5" />,
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "YOLO11", "Pandas"],
    },
    {
      title: "Tools & Platforms",
      icon: <Wrench className="h-5 w-5" />,
      skills: ["Git", "Docker", "GitHub", "WordPress", "REST APIs"],
    },
    {
      title: "Design & Productivity",
      icon: <Palette className="h-5 w-5" />,
      skills: ["Figma", "Xmind", "Canva"],
    },
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="floating-tech top-12 left-24">
        <div className="floating-circuit" style={{ animationDelay: "0.8s" }}></div>
      </div>
      <div className="floating-tech top-36 right-16">
        <div className="floating-hexagon" style={{ animationDelay: "1.8s" }}></div>
      </div>
      <div className="floating-tech bottom-24 left-40">
        <div className="floating-dot" style={{ animationDelay: "2.8s" }}></div>
      </div>
      <div className="floating-tech top-56 right-32">
        <div className="floating-line" style={{ animationDelay: "3.8s" }}></div>
      </div>
      <div className="floating-tech bottom-40 right-20">
        <div className="floating-grid" style={{ animationDelay: "4.8s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 font-heading">Skills & Technologies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            A comprehensive toolkit spanning programming, machine learning, and development tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="futuristic-card group bg-white/80 backdrop-blur-sm border-2 border-transparent"
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-lg">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {category.icon}
                  </div>
                  <span className="group-hover:text-primary transition-colors">{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="futuristic-button hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
