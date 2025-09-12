"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, ExternalLink, FileText } from "lucide-react"

export function CertificationsSection() {
  const certifications = [
    {
      title: "Data Structures and Algorithms Specialization",
      issuer: "UC San Diego",
      credentialId: "S2KXRO21TUZO",
      hasCredential: true,
      link: "https://www.coursera.org/account/accomplishments/specialization/S2KXRO21TUZO",
      titleLink: "https://www.coursera.org/account/accomplishments/specialization/S2KXRO21TUZO",
    },
    {
      title: "Certificate in Data Science",
      issuer: "Department of Statistics, University of Illinois Urbana-Champaign",
      hasAttachment: true,
      attachmentName: "Rosie Xu - DSC.pdf",
      link: "/Rosie Xu - DSC.pdf",
      titleLink: "/Rosie Xu - DSC.pdf",
    },
    {
      title: "Certificate of Completion - ATLAS Internship Program",
      issuer: "University of Illinois Urbana-Champaign",
      hasAttachment: true,
      attachmentName: "Certificate_Xu_Rosie.pdf",
      link: "/Certificate_Xu_Rosie.pdf",
      titleLink: "/Certificate_Xu_Rosie.pdf",
    },
    {
      title: "Data Science DISCOVERY",
      issuer: "University of Illinois Urbana-Champaign",
      credentialId: "Fall 2023",
      skills: ["Data Analytics", "Data Science"],
      hasCredential: true,
      link: "https://d7.cs.illinois.edu/badges/stat107-fa23-3PmVpukXfYWfX6udeJCt1GTSDWmCo5/",
      titleLink: "https://d7.cs.illinois.edu/badges/stat107-fa23-3PmVpukXfYWfX6udeJCt1GTSDWmCo5/",
    },
    {
      title: "Statistics (STAT 100)",
      issuer: "University of Illinois Urbana-Champaign",
      credentialId: "Spring 2023",
      hasCredential: true,
      link: "https://d7.cs.illinois.edu/badges/stat100-sp23-NIUxqjVlekPd0c4gKczrt7tBNN9RNx/",
      titleLink: "https://d7.cs.illinois.edu/badges/stat100-sp23-NIUxqjVlekPd0c4gKczrt7tBNN9RNx/",
    },
    {
      title: "Computer Vision",
      issuer: "Kaggle",
      hasAttachment: true,
      attachmentName: "Rosie Xu - Computer Vision.png",
      link: "/Rosie Xu - Computer Vision.png",
      titleLink: "/Rosie Xu - Computer Vision.png",
    },
  ]

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Licenses & Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Professional certifications and continuous learning achievements that validate my expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
                  <a
                    href={cert.titleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group-hover:text-primary transition-colors hover:underline"
                  >
                    {cert.title}
                  </a>
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
              <CardContent>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group/btn hover:bg-primary hover:text-primary-foreground bg-transparent"
                  onClick={() => window.open(cert.link, "_blank")}
                >
                  {cert.hasCredential ? "Show credential" : cert.hasAttachment ? "View attachment" : "View Certificate"}
                  {cert.hasAttachment ? (
                    <FileText className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                  ) : (
                    <ExternalLink className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
