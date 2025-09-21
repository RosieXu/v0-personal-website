"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"

export function CertificationsSection() {
  const certifications = [
    {
      title: "Data Structures and Algorithms Specialization",
      issuer: "UC San Diego",
      credentialId: "S2KXRO21TUZO",
    },
    {
      title: "Data Science DISCOVERY",
      issuer: "University of Illinois Urbana-Champaign",
      credentialId: "Fall 2023",
      skills: ["Data Analytics", "Data Science"],
    },
    {
      title: "Statistics (STAT 100)",
      issuer: "University of Illinois Urbana-Champaign",
      credentialId: "Spring 2023",
    },
    {
      title: "Dean's List recognition",
      issuer: "University of Illinois Urbana-Champaign",
      credentialId: "Spring 2023",
    },
    {
      title: "Certificate of Completion - ATLAS Internship Program",
      issuer: "University of Illinois Urbana-Champaign",
    },
    {
      title: "Certificate in Data Science",
      issuer: "Department of Statistics, University of Illinois Urbana-Champaign",
    },
    {
      title: "Computer Vision",
      issuer: "Kaggle",
    },
  ]

  return (
    <section id="certifications" className="py-20 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4">Honors & Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Academic honors and professional certifications that validate my expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="futuristic-card group bg-white/80 backdrop-blur-sm border-2 border-transparent"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  {cert.credentialId && (
                    <Badge variant="secondary" className="text-xs">
                      ID: {cert.credentialId}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">
                  <span>{cert.title}</span>
                </CardTitle>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{cert.issuer}</p>
                  {cert.skills && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
