import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as
    | 'signup'
    | 'recovery'
    | 'invite'
    | 'magiclink'
    | 'email_change'
    | null;
  const redirect = searchParams.get('redirect') || '/dashboard';
  const next = searchParams.get('next') || redirect;

  const redirectTo = new URL(request.url);
  redirectTo.pathname = next;
  redirectTo.searchParams.delete('token_hash');
  redirectTo.searchParams.delete('type');
  redirectTo.searchParams.delete('redirect');
  redirectTo.searchParams.delete('next');

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // For recovery, redirect to a password update page or dashboard
      if (type === 'recovery') {
        redirectTo.pathname = '/dashboard';
        redirectTo.searchParams.set('reset', 'true');
      }
      return NextResponse.redirect(redirectTo);
    }
  }

  // If there's a code param (OAuth flow), exchange it
  const code = searchParams.get('code');
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  // Auth error — redirect to login with error
  const errorUrl = new URL(request.url);
  errorUrl.pathname = '/login';
  errorUrl.searchParams.set('error', 'auth_failed');
  return NextResponse.redirect(errorUrl);
}
