export const supabase = createClient(url as string, anon as string)

// lib/supabaseClient.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (client) return client

  // ✅ 构建/运行期都通过 process.env 读取
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // ✅ 没有 env 时不要让构建报错，返回 null
  if (!url || !anon) {
    if (typeof window !== 'undefined') {
      console.warn('Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }
    return null
  }

  client = createClient(url, anon)
  return client
}
