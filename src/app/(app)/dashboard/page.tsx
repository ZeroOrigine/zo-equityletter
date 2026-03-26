'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Card from '@/components/ui/Card';
import type { User } from '@supabase/supabase-js';
import { equityTerms } from '@/data/equity-terms';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace('/auth/login');
        return;
      }

      setUser(user);
      setLoading(false);
    }

    loadUser();
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome back, {user?.email ?? 'there'}!
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/terms" className="group">
          <Card title="Equity Terms" description="Learn equity compensation in plain English.">
            <p className="text-2xl font-bold text-gray-900">{equityTerms.length}</p>
            <p className="text-sm text-gray-600">terms available</p>
            <span className="mt-3 inline-block text-sm font-medium text-gray-900 group-hover:underline">
              Browse terms &rarr;
            </span>
          </Card>
        </Link>

        <Link href="/compare" className="group">
          <Card title="Compare Offers" description="Side-by-side offer comparison tool.">
            <p className="text-sm text-gray-600">
              Enter two job offers and see total comp across growth scenarios, risk, and tax implications.
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-gray-900 group-hover:underline">
              Compare now &rarr;
            </span>
          </Card>
        </Link>

        <Link href="/archive" className="group">
          <Card title="Newsletter Archive" description="Weekly equity education, free.">
            <p className="text-sm text-gray-600">
              One equity concept per week, explained with real examples and common mistakes to avoid.
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-gray-900 group-hover:underline">
              Read archive &rarr;
            </span>
          </Card>
        </Link>

        <Card title="Your Subscription" description="Manage your plan.">
          <p className="text-sm text-gray-600">
            You are on the <span className="font-semibold">Free</span> plan.
          </p>
          <dl className="mt-3 space-y-1 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Email</dt>
              <dd className="text-gray-900">{user?.email}</dd>
            </div>
          </dl>
          <Link
            href="/pricing"
            className="mt-3 inline-block text-sm font-medium text-gray-900 hover:underline"
          >
            Upgrade to Pro &rarr;
          </Link>
        </Card>
      </div>
    </div>
  );
}
