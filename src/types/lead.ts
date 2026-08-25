import type { LeadSubmissionPayload } from './funnel';

export interface LeadApiResponse {
  success: boolean;
  message?: string;
  leadId?: string;
  timestamp?: string;
  errors?: Record<string, string>;
}

export type LeadSubmissionState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; leadId?: string }
  | { status: 'error'; errorMessage: string; canRetry: boolean };

export type { LeadSubmissionPayload };
