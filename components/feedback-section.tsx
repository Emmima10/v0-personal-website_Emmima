"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, MessageSquare, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Feedback {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

export function FeedbackSection() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 5,
  })
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  // Fetch existing feedback
  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) throw error
      setFeedbacks(data || [])
    } catch (error) {
      console.error("Error fetching feedback:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFeedback()

    // Set up real-time subscription
    const channel = supabase
      .channel("feedback_changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "feedback" }, (payload) => {
        setFeedbacks((prev) => [payload.new as Feedback, ...prev.slice(0, 9)])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("feedback").insert([
        {
          name: formData.name,
          message: formData.message,
          rating: formData.rating,
        },
      ])

      if (error) throw error

      // Reset form
      setFormData({ name: "", message: "", rating: 5 })
      alert("Thank you for your feedback!")
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert("Sorry, there was an error submitting your feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRatingChange = (rating: number) => {
    setFormData({
      ...formData,
      rating,
    })
  }

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        } ${interactive ? "cursor-pointer hover:text-yellow-400 transition-colors" : ""}`}
        onClick={interactive ? () => handleRatingChange(i + 1) : undefined}
      />
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <section id="feedback" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Share Your Feedback</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            I'd love to hear your thoughts! Share your feedback and see what others are saying.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Feedback Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                Submit Feedback
              </CardTitle>
              <CardDescription>Share your thoughts and rate your experience.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-card-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-card-foreground">Rating</Label>
                  <div className="flex gap-1">{renderStars(formData.rating, true)}</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-card-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Share your thoughts, suggestions, or experience..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Feedback Display */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold text-foreground">Recent Feedback</h3>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }, (_, i) => (
                  <Card key={i} className="border-border animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-full mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : feedbacks.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {feedbacks.map((feedback) => (
                  <Card key={feedback.id} className="border-border hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-card-foreground">{feedback.name}</h4>
                        <div className="flex gap-1">{renderStars(feedback.rating)}</div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{feedback.message}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(feedback.created_at)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border">
                <CardContent className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No feedback yet. Be the first to share your thoughts!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
