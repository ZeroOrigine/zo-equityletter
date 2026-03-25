import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

// Root page: if authenticated, go to dashboard. Otherwise, render marketing page.
// The marketing page is in app/(marketing)/page.tsx via route group.
// This file acts as the canonical root — it checks auth and delegates.

export default async function RootPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  // For unauthenticated users, we dynamically import and render the marketing page.
  // Alternatively, this could redirect to a /home route, but inline rendering avoids
  // an extra redirect hop.
  const { default: MarketingPage } = await import('./(marketing)/page');
  return <MarketingPage />;
}
