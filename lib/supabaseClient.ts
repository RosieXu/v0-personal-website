import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (_client) return _client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const isValidUrl = (str: string) => {
    try {
      const urlObj = new URL(str)
      return urlObj.protocol === "https:" || urlObj.protocol === "http:"
    } catch {
      return false
    }
  }

  const isValidJWT = (str: string) => {
    return str && str.startsWith("eyJ") && str.split(".").length === 3
  }

  if (!url || !anon) {
    console.log("[v0] Missing Supabase environment variables:", {
      url: !!url,
      anon: !!anon,
    })
    throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }

  if (!isValidUrl(url)) {
    console.error("[v0] Invalid URL format:", url)
    throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.")
  }

  if (!isValidJWT(anon)) {
    console.error("[v0] Invalid anon key format:", anon?.substring(0, 20) + "...")
    throw new Error("Invalid anon key: Must be a valid JWT token.")
  }

  console.log("[v0] Creating Supabase client with URL:", url)
  _client = createClient(url, anon)
  return _client
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const isValidUrl = (str: string) => {
    try {
      const urlObj = new URL(str)
      return urlObj.protocol === "https:" || urlObj.protocol === "http:"
    } catch {
      return false
    }
  }

  const isValidJWT = (str: string) => {
    return str && str.startsWith("eyJ") && str.split(".").length === 3
  }

  return !!(url && anon && isValidUrl(url) && isValidJWT(anon))
}
