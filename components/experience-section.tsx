import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ExperienceSection() {
  const experiences = [
    {
      company: "University of Illinois Urbana-Champaign",
      position: "Undergraduate Research Assistant (Part-time)",
      duration: "Jan 2025 - Present",
      description:
        "Conducting medical-related research focused on predicting symptoms of Multiple Sclerosis (MS) using machine learning techniques and data analysis methods.",
      technologies: ["Python (Programming Language)", "Machine Learning", "Data Analysis"],
    },
    {
      company: "IDXExchange",
      position: "Data Scientist\n(Internship)",
      duration: "May 2025 - Aug 2025",
      description:
        "Applied machine learning models to predict factors influencing California real estate prices, analyzing market trends and property data to derive actionable insights.",
      technologies: ["Data Science", "Data Analysis", "Machine Learning"],
    },
    {
      company: "Deloitte",
      position: "Project Intern\n(Internship)",
      duration: "May 2025 - Jun 2025",
      description:
        "Contributed to project management and business analysis initiatives while designing user interfaces and experiences.",
      technologies: [
        "Figma (Software)",
        "Project Management",
        "IT Business Analysis",
        "User Interface Design",
        "User Experience (UX)",
      ],
    },
    {
      company: "Keysight Technologies",
      position: "Software Engineer Intern (Internship)",
      duration: "Jun 2024 - Aug 2024",
      description:
        "Developed chatbot solutions to support internal work processes, enhancing workflow efficiency and employee productivity through automated assistance systems.",
      technologies: ["Software Engineering", "Development", "Technology"],
    },
    {
      company: "Teacher Care Now",
      position: "Website Developer (Internship)",
      duration: "May 2024 - Aug 2024",
      description:
        "Developed web solutions to support teacher rights and advocacy initiatives, creating platforms that enhance communication and resource accessibility for educators.",
      technologies: ["Web Development", "Frontend Development", "UI/UX Design"],
    },
  ]

  const getCompanyLogo = (company: string) => {
    switch (company) {
      case "University of Illinois Urbana-Champaign":
        return <img src="/uiuc-core-values-logo.png" alt="UIUC Logo" className="h-6 w-6 object-contain" />
      case "IDXExchange":
        return <img src="/idx-logo.png" alt="IDXExchange Logo" className="h-6 w-6 object-contain" />
      case "Keysight Technologies":
        return <img src="/keysight-logo.png" alt="Keysight Logo" className="h-6 w-6 object-contain" />
      case "Deloitte":
        return <img src="/deloitte-logo.png" alt="Deloitte Logo" className="h-6 w-6 object-contain" />
      case "Teacher Care Now":
        return <img src="/teacher-care-logo.jpg" alt="Teacher Care Now Logo" className="h-6 w-6 object-contain" />
      default:
        return <div className="h-6 w-6 bg-primary/20 rounded" />
    }
  }

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="floating-tech top-16 left-20">
        <div className="floating-hexagon" style={{ animationDelay: "1s" }}></div>
      </div>
      <div className="floating-tech top-40 right-32">
        <div className="floating-dot" style={{ animationDelay: "2s" }}></div>
      </div>
      <div className="floating-tech bottom-32 left-16">
        <div className="floating-line" style={{ animationDelay: "3s" }}></div>
      </div>
      <div className="floating-tech top-64 right-20">
        <div className="floating-circuit" style={{ animationDelay: "4s" }}></div>
      </div>
      <div className="floating-tech bottom-16 right-48">
        <div className="floating-grid" style={{ animationDelay: "5s" }}></div>
      </div>
      <div className="floating-tech top-80 left-40">
        <div className="floating-dot" style={{ animationDelay: "6s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 font-heading">My Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            A journey through various roles and projects that have shaped my expertise in software development and
            machine learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="futuristic-card group bg-white/80 backdrop-blur-sm border-2 border-transparent hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg flex items-center justify-center">
                    {getCompanyLogo(exp.company)}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {exp.duration}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors whitespace-pre-line">
                  {exp.position}
                </CardTitle>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-1">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
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
