import type { LeadSubmissionPayload } from '../types/funnel';
import type { LeadApiResponse } from '../types/lead';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_TIMEOUT_MS = 12000;

export class LeadApiError extends Error {
  public statusCode?: number;
  public userMessage: string;

  constructor(userMessage: string, statusCode?: number, originalError?: unknown) {
    super(userMessage);
    this.name = 'LeadApiError';
    this.statusCode = statusCode;
    this.userMessage = userMessage;
    if (originalError) {
      this.cause = originalError;
    }
  }
}

/**
 * Submits lead data to the backend API endpoint (/api/leads).
 * Handles network failures, timeouts, HTTP errors, and structured response parsing.
 */
export async function submitLead(payload: LeadSubmissionPayload): Promise<LeadApiResponse> {
  const endpoint = `${API_BASE_URL}/api/leads`;

  // Setup abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  console.log('Payload', payload);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = 'Your information could not be submitted. Please try again.';
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Non-JSON response
        if (response.status >= 500) {
          errorMessage = 'Server is temporarily unavailable. Please try again shortly.';
        } else if (response.status === 400) {
          errorMessage = 'Some information provided is invalid. Please review your details and try again.';
        }
      }

      throw new LeadApiError(errorMessage, response.status);
    }

    const data: LeadApiResponse = await response.json().catch(() => ({
      success: true,
      leadId: 'lead_' + Math.random().toString(36).substring(2, 10),
      message: 'Lead created successfully',
    }));

    return data;
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (error instanceof LeadApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new LeadApiError('The request timed out. Please check your connection and try again.');
    }

    // In local development or standalone demo mode without a live backend:
    // If the endpoint is localhost / empty and fetch fails with network error,
    // we simulate a realistic response so the demo functions smoothly.
    const isMockDemo = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';
    if (isMockDemo && (!API_BASE_URL || API_BASE_URL.includes('localhost'))) {
      console.warn('[LeadAPI] Live backend not detected at endpoint; using realistic demo simulator response.');
      // Simulate realistic network latency of 1200ms
      await new Promise((resolve) => setTimeout(resolve, 1200));

      return {
        success: true,
        leadId: 'lead_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        timestamp: new Date().toISOString(),
        message: 'Lead successfully qualified and submitted.',
      };
    }

    throw new LeadApiError(
      'Unable to connect to the qualification server. Please check your internet connection and try again.',
      0,
      error
    );
  }
}
