'use client';

import { useId, useState } from 'react';
import type { ApiResponse, ContactSubject } from '@/types';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const subjectOptions: readonly {
  value: ContactSubject;
  label: string;
}[] = [
  { value: 'general', label: 'General Question' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'bug', label: 'Bug Report' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'press', label: 'Press Inquiry' },
  { value: 'other', label: 'Other' },
];

const MESSAGE_MIN = 20;

const fieldClass =
  'h-12 w-full rounded-md border border-border bg-background px-4 text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60';
const textareaClass =
  'w-full rounded-md border border-border bg-background px-4 py-3 text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 resize-y';
const labelClass = 'block text-sm font-medium text-text-primary';

export function ContactForm() {
  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<ContactSubject>('general');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    if (
      name.trim() === '' ||
      email.trim() === '' ||
      message.trim().length < MESSAGE_MIN
    ) {
      setStatus('error');
      setErrorMessage(
        `Please fill in every field. Messages must be at least ${MESSAGE_MIN} characters.`,
      );
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = (await response.json()) as ApiResponse;
      if (data.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('general');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMessage(data.error);
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <p
          role="status"
          className="rounded-lg border border-success/40 bg-primary-light/40 px-6 py-6 text-text-primary"
        >
          Message sent! We&rsquo;ll be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-medium text-primary underline transition-colors hover:text-primary-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor={nameId} className={labelClass}>
          Name
        </label>
        <input
          id={nameId}
          type="text"
          autoComplete="name"
          required
          disabled={submitting}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={`${fieldClass} mt-2`}
        />
      </div>

      <div>
        <label htmlFor={emailId} className={labelClass}>
          Email
        </label>
        <input
          id={emailId}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          disabled={submitting}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={`${fieldClass} mt-2`}
        />
      </div>

      <div>
        <label htmlFor={subjectId} className={labelClass}>
          Subject
        </label>
        <select
          id={subjectId}
          required
          disabled={submitting}
          value={subject}
          onChange={(event) =>
            setSubject(event.target.value as ContactSubject)
          }
          className={`${fieldClass} mt-2 pr-10`}
        >
          {subjectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={messageId} className={labelClass}>
          Message
        </label>
        <textarea
          id={messageId}
          rows={6}
          required
          minLength={MESSAGE_MIN}
          disabled={submitting}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={`At least ${MESSAGE_MIN} characters…`}
          className={`${textareaClass} mt-2`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="h-12 w-full rounded-full bg-primary px-8 text-base font-semibold text-white hover:bg-primary-dark disabled:opacity-60 transition-colors"
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'error' && (
        <p role="alert" className="text-sm text-error">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
