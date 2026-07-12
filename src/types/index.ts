/**
 * Shared TypeScript types for spendfreeli-web.
 *
 * Domain-specific types (form payloads, API responses, etc.) live here.
 * Component prop types belong next to the component they describe.
 */

export type ApiSuccess<TData = null> = {
  ok: true;
  data: TData;
};

export type ApiError = {
  ok: false;
  error: string;
};

export type ApiResponse<TData = null> = ApiSuccess<TData> | ApiError;

export type WaitlistSubmission = {
  email: string;
};

export type ContactSubject =
  | 'general'
  | 'feature'
  | 'bug'
  | 'partnership'
  | 'press'
  | 'other';

export type ContactSubmission = {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
};
