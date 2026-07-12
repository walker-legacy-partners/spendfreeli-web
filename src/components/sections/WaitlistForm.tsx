'use client';

import { useState } from 'react';
import type { ApiResponse } from '@/types';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as ApiResponse;
      if (data.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(data.error);
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  }

  return (
    <section id="waitlist" className="bg-surface py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
          Get early access
        </h2>
        <p className="mt-4 text-lg text-text-secondary max-w-lg mx-auto">
          Join our launch list and be the first to know when new features drop.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            required
            className="h-12 w-full sm:w-80 rounded-full border border-border bg-background px-5 text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="h-12 rounded-full bg-primary px-8 text-base font-semibold text-white hover:bg-primary-dark disabled:opacity-60 transition-colors whitespace-nowrap"
          >
            {status === 'submitting' ? 'Joining...' : 'Join the List'}
          </button>
        </form>
        {status === 'success' && (
          <p className="mt-4 text-success font-medium">
            You&rsquo;re on the list! Check your email.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-error text-sm">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
}
