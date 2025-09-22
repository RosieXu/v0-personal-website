"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MessageSquare } from "lucide-react"
import { getSupabase, isSupabaseConfigured } from "@/lib/supabaseClient"

interface FeedbackItem {
  id: string
  name: string | null
  message: string
  rating: number | null
  created_at: string
}

export function RecentFeedbackSection() {
  const [recentFeedback, setRecentFeedback] = useState<FeedbackItem[]>([])
  const [feedbackLoading, setFeedbackLoading] = useState(true)
  const [feedbackError, setFeedbackError] = useState<string>("")

  const fetchRecentFeedback = async () => {
    try {
      if (!isSupabaseConfigured()) {
        console.log("[v0] Supabase not configured, skipping feedback fetch")
        setFeedbackError("")
        setRecentFeedback([])
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

      console.log("[v0] Successfully fetched feedback:", data?.length || 0, "items")
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

    if (!isSupabaseConfigured()) {
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <section id="recent-feedback" className="py-20 bg-gradient-to-br from-green-50/50 to-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 font-heading">Recent Feedback</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            See what others are saying about their experience working with me
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="futuristic-card bg-white/80 backdrop-blur-sm border-2 border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Community Feedback</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {feedbackLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading recent feedback...</p>
                </div>
              ) : feedbackError ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-red-600 mb-2">{feedbackError}</p>
                  <p className="text-sm text-muted-foreground">
                    Please contact me directly at{" "}
                    <a href="mailto:rosiexu7@outlook.com" className="text-primary hover:underline">
                      rosiexu7@outlook.com
                    </a>
                  </p>
                </div>
              ) : recentFeedback.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Be the first to leave feedback!</p>
                  <p className="text-sm text-muted-foreground">
                    Your message will help me improve and connect with others.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {recentFeedback.map((feedback) => (
                    <Card
                      key={feedback.id}
                      className="futuristic-card bg-white/60 border border-green-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold text-primary text-lg">{feedback.name?.trim() || "Anonymous"}</h4>
                          <div className="text-xs text-muted-foreground">{formatDate(feedback.created_at)}</div>
                        </div>

                        {feedback.rating && (
                          <div className="flex items-center mb-3">
                            <div className="flex space-x-1">{renderStars(feedback.rating)}</div>
                            <span className="ml-2 text-sm font-medium text-muted-foreground">{feedback.rating}/5</span>
                          </div>
                        )}

                        <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                          {feedback.message}
                        </p>
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
