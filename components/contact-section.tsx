"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, Github, Linkedin } from "lucide-react"

export function ContactSection() {
  // 表单数据
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  // 评分与状态
  const [rating, setRating] = useState<number>(5)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // 表单提交：模拟提交而不使用数据库
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.message.trim()) return

    setLoading(true)

    console.log("Contact form submitted:", { ...formData, rating })

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)

    // 重置表单
    setFormData({ name: "", email: "", message: "" })
    setRating(5)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  // 表单输入联动
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 font-heading">Contact Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            I'd love to hear from you! Whether you have a project in mind or just want to connect
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* 左侧：发送消息 */}
          <Card className="futuristic-card bg-white/80 backdrop-blur-sm border-2 border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5 text-primary" />
                <span>Send Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {success && (
                <div className="mb-6 p-4 rounded-lg bg-green-100 border border-green-300 text-green-800">
                  Thanks for your message! I'll get back to you soon.
                </div>
              )}

              {/* 表单 */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full resize-none"
                  />
                </div>

                {/* 评分：1-5（必填） */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Rating (1–5)</label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                    className="w-24"
                  />
                </div>

                <Button type="submit" disabled={loading} className="futuristic-button w-full group">
                  {loading ? "Sending…" : "Send Message"}
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* 右侧：联系方式/社交 */}
          <div className="space-y-8">
            <Card className="futuristic-card bg-white/80 backdrop-blur-sm border-2 border-transparent">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">rosiexu7@outlook.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="futuristic-card bg-white/80 backdrop-blur-sm border-2 border-transparent">
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="futuristic-button hover:bg-primary hover:text-primary-foreground bg-transparent"
                    asChild
                  >
                    <a href="https://github.com/RosieXu" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="futuristic-button hover:bg-primary hover:text-primary-foreground bg-transparent"
                    asChild
                  >
                    <a
                      href="https://www.linkedin.com/in/kaihan-xu-b19516250/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="futuristic-card bg-white/80 backdrop-blur-sm p-6 rounded-lg border-2 border-transparent">
              <h3 className="font-semibold mb-4">Let's Collaborate</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm always interested in discussing new opportunities, innovative projects, and ways to apply AI and
                machine learning to solve real-world problems. Feel free to reach out!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
