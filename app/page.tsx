import { redirect } from 'next/navigation'
import MarketingPage from './(marketing)/page'

async function getUser() {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch {
    return null
  }
}

// Root page: if authenticated, go to dashboard. Otherwise, render marketing page.
// The marketing page is in app/(marketing)/page.tsx via route group.
// This file acts as the canonical root — it checks auth and delegates.
export default async function RootPage() {
  const user = await getUser()

  if (user) {
    redirect('/dashboard')
  }

  return <MarketingPage />
}
