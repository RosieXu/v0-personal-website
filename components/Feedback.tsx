"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { getSupabase } from "@/lib/supabaseClient"

type Row = { id: string; name: string | null; message: string | null; rating: number | null; created_at: string }

export default function Feedback() {
  const supabase = getSupabase()

  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(5)
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from("feedback").select("*").order("created_at", { ascending: false })
      if (!error && data) setRows(data as Row[])
      setLoading(false)
    }
    load()

    const ch = supabase
      .channel("feedback-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "feedback" }, (payload) => {
        setRows((prev) => [payload.new as Row, ...prev])
      })
      .subscribe()
    return () => {
      supabase.removeChannel(ch)
    }
  }, [supabase])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    const { error } = await supabase.from("feedback").insert([{ name, message, rating }])
    if (!error) {
      setName("")
      setMessage("")
      setRating(5)
    } else {
      alert(error.message)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="grid gap-4 p-4 rounded-xl border bg-white/70">
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
        <textarea
          placeholder="Your Feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border rounded-lg px-3 py-2 min-h-[100px]"
        />
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Rating</label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-20 border rounded-lg px-3 py-2"
          />
          <button
            type="submit"
            className="ml-auto px-4 py-2 rounded-lg bg-green-700 text-white hover:scale-105 transition"
          >
            Submit
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-sm text-gray-500">Loading…</div>
      ) : (
        <div className="grid gap-4">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border p-4 bg-white/70 hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <div className="font-semibold">{r.name || "Anonymous"}</div>
                <div className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</div>
              </div>
              <div className="mt-2 text-gray-800">{r.message}</div>
              <div className="mt-2 text-sm">⭐ {r.rating}/5</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
