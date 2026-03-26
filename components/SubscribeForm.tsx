'use client';

import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

interface SubscribeFormProps {
  source?: string;
  className?: string;
}

export default function SubscribeForm({ source = 'website', className = '' }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from('subscribers').insert({
        email: email.toLowerCase().trim(),
        status: 'active',
        source,
      });

      if (error) {
        if (error.code === '23505') {
          setStatus('success');
          setMessage('You are already subscribed. Welcome back!');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setMessage('You are subscribed! Check your inbox weekly.');
        setEmail('');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={className}>
      {status === 'success' ? (
        <div className="rounded-md bg-green-50 border border-green-200 p-4">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="you@company.com"
            required
            className="flex-1 rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600">{message}</p>
      )}
    </div>
  );
}
