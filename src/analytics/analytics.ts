import { generateEventId } from '../utils/attribution';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

interface TrackLeadParams {
  eventId?: string;
  leadId?: string;
  estimatedValue?: number;
  currency?: string;
}

class AnalyticsService {
  private isDevelopment = import.meta.env.DEV;

  /**
   * Tracks a PageView event
   */
  public trackPageView(pagePath?: string): void {
    const path = pagePath || window.location.pathname;

    if (this.isDevelopment) {
      console.log(`[Analytics] PageView: ${path}`);
    }

    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
      }

      if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'page_view',
          page_path: path,
        });
      }
    } catch (err) {
      console.warn('[Analytics] Failed to track PageView', err);
    }
  }

  /**
   * Tracks progression through funnel steps
   */
  public trackFunnelStep(stepNumber: number, stepName: string): void {
    if (this.isDevelopment) {
      console.log(`[Analytics] Funnel Step ${stepNumber}: ${stepName}`);
    }

    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'FunnelStep', {
          step: stepNumber,
          step_name: stepName,
        });
      }

      if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'funnel_step',
          step_number: stepNumber,
          step_name: stepName,
        });
      }
    } catch (err) {
      console.warn('[Analytics] Failed to track FunnelStep', err);
    }
  }

  /**
   * Tracks lead submission with deduplication event_id support for Meta CAPI
   */
  public trackLead(params?: TrackLeadParams): string {
    const eventId = params?.eventId || generateEventId();

    if (this.isDevelopment) {
      console.log('[Analytics] Lead Conversion Tracked', { ...params, eventId });
    }

    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq(
          'track',
          'Lead',
          {
            content_name: 'Qualification Funnel Submission',
            status: 'submitted',
            ...(params?.estimatedValue && { value: params.estimatedValue }),
            currency: params?.currency || 'USD',
          },
          { eventID: eventId }
        );
      }

      if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'lead_submitted',
          event_id: eventId,
          lead_id: params?.leadId,
        });
      }
    } catch (err) {
      console.warn('[Analytics] Failed to track Lead', err);
    }

    return eventId;
  }
}

export const analytics = new AnalyticsService();
