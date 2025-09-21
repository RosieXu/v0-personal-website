"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, Github, Linkedin, Star } from "lucide-react"
import { getSupabase } from "@/lib/supabaseClient"

interface FeedbackItem {
  id: string
  name: string | null
  message: string
  rating: number | null
  created_at: string
}

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
  const [error, setError] = useState<string>("")

  const [recentFeedback, setRecentFeedback] = useState<FeedbackItem[]>([])
  const [feedbackLoading, setFeedbackLoading] = useState(true)
  const [feedbackError, setFeedbackError] = useState<string>("")

  const fetchRecentFeedback = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        setFeedbackError("Database configuration is missing")
        setFeedbackLoading(false)
        return
      }

      if (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://")) {
        setFeedbackError("Database configuration is invalid")
        setFeedbackLoading(false)
        return
      }

      const supabase = getSupabase()
      const { data, error } = await supabase
        .from("feedback")
        .select("id, name, message, rating, created_at")
        .order("created_at", { ascending: false })
        .limit(20)

      if (error) {
        console.error("[v0] Error fetching feedback:", error)
        setFeedbackError("Failed to load recent feedback")
        return
      }

      setRecentFeedback(data || [])
      setFeedbackError("")
    } catch (err) {
      console.error("[v0] Error fetching feedback:", err)
      setFeedbackError("Database service unavailable")
    } finally {
      setFeedbackLoading(false)
    }
  }

  useEffect(() => {
    fetchRecentFeedback()

    // Only set up realtime subscription if environment variables are valid
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey || (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://"))) {
      console.log("[v0] Skipping realtime subscription due to missing/invalid environment variables")
      return
    }

    try {
      const supabase = getSupabase()
      const subscription = supabase
        .channel("feedback_changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "feedback",
          },
          (payload) => {
            console.log("[v0] New feedback received:", payload)
            const newFeedback = payload.new as FeedbackItem
            setRecentFeedback((prev) => [newFeedback, ...prev.slice(0, 19)])
          },
        )
        .subscribe()

      return () => {
        subscription.unsubscribe()
      }
    } catch (err) {
      console.error("[v0] Error setting up realtime subscription:", err)
    }
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.message.trim()) return

    setLoading(true)
    setError("")

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Database configuration is missing. Please contact the site administrator.")
      }

      if (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://")) {
        throw new Error("Database URL is invalid. Please contact the site administrator.")
      }

      console.log("[v0] Environment check passed:", {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
        urlStart: supabaseUrl.substring(0, 20),
      })

      const supabase = getSupabase()

      // Insert feedback into Supabase
      const { data, error: insertError } = await supabase
        .from("feedback")
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim() || null,
            message: formData.message.trim(),
            rating: rating,
          },
        ])
        .select()

      if (insertError) {
        console.error("[v0] Supabase insert error:", insertError)
        throw insertError
      }

      if (data && data[0]) {
        const newFeedback = data[0] as FeedbackItem
        setRecentFeedback((prev) => [newFeedback, ...prev.slice(0, 19)])
      }

      // Success - reset form
      setFormData({ name: "", email: "", message: "" })
      setRating(5)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error("[v0] Error submitting feedback:", err)
      let errorMessage = "Failed to send message"

      if (err instanceof Error) {
        if (err.message.includes("Database configuration is missing")) {
          errorMessage =
            "Service temporarily unavailable. Please try again later or contact me directly at rosiexu7@outlook.com"
        } else if (err.message.includes("Database URL is invalid")) {
          errorMessage = "Service configuration error. Please contact me directly at rosiexu7@outlook.com"
        } else {
          errorMessage = `Failed to send message: ${err.message}`
        }
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
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

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-300 text-red-800">{error}</div>
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

        <div className="mt-16 max-w-6xl mx-auto">
          <Card className="futuristic-card bg-white/80 backdrop-blur-sm border-2 border-transparent">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {feedbackLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading recent feedback...</div>
              ) : feedbackError ? (
                <div className="text-center py-8">
                  <p className="text-red-600 mb-2">{feedbackError}</p>
                  <p className="text-sm text-muted-foreground">
                    Please contact me directly at{" "}
                    <a href="mailto:rosiexu7@outlook.com" className="text-primary hover:underline">
                      rosiexu7@outlook.com
                    </a>
                  </p>
                </div>
              ) : recentFeedback.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No feedback yet.</div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {recentFeedback.map((feedback) => (
                    <Card key={feedback.id} className="bg-white/60 border border-green-200 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-primary">{feedback.name?.trim() || "Anonymous"}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            {feedback.rating && (
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1">{feedback.rating}</span>
                              </div>
                            )}
                            <span>{formatDate(feedback.created_at)}</span>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{feedback.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
