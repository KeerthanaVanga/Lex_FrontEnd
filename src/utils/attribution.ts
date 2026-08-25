import type { AttributionData, TrackingData } from '../types/funnel';

const ATTRIBUTION_STORAGE_KEY = 'lux_funnel_attribution';

/**
 * Parses query params from URL on initial load and stores in sessionStorage.
 * Also captures document.referrer and current landing path.
 */
export function captureAndStoreAttribution(): AttributionData {
  try {
    const existing = getStoredAttribution();
    const urlParams = new URLSearchParams(window.location.search);

    const utmSource = urlParams.get('utm_source') || existing.utmSource;
    const utmMedium = urlParams.get('utm_medium') || existing.utmMedium;
    const utmCampaign = urlParams.get('utm_campaign') || existing.utmCampaign;
    const utmContent = urlParams.get('utm_content') || existing.utmContent;
    const utmTerm = urlParams.get('utm_term') || existing.utmTerm;
    const fbclid = urlParams.get('fbclid') || existing.fbclid;
    const gclid = urlParams.get('gclid') || existing.gclid;
    const landingPage = existing.landingPage || window.location.pathname;
    const referrer = existing.referrer || document.referrer || undefined;

    const attribution: AttributionData = {
      ...(utmSource && { utmSource }),
      ...(utmMedium && { utmMedium }),
      ...(utmCampaign && { utmCampaign }),
      ...(utmContent && { utmContent }),
      ...(utmTerm && { utmTerm }),
      ...(fbclid && { fbclid }),
      ...(gclid && { gclid }),
      landingPage,
      ...(referrer && { referrer }),
    };

    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return {};
  }
}

/**
 * Retrieves attribution data from sessionStorage.
 */
export function getStoredAttribution(): AttributionData {
  try {
    const stored = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Graceful fallback
  }
  return {};
}

/**
 * Extracts cookie value by name (e.g., _fbp or _fbc)
 */
export function getCookie(name: string): string | undefined {
  try {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return match ? decodeURIComponent(match[3]) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Collects client tracking data for Meta Pixel / Server-side deduplication.
 */
export function getTrackingData(eventId?: string): TrackingData {
  const fbp = getCookie('_fbp');
  const fbc = getCookie('_fbc');
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
  const timestamp = new Date().toISOString();

  return {
    ...(fbp && { fbp }),
    ...(fbc && { fbc }),
    userAgent,
    timestamp,
    eventId,
  };
}

/**
 * Generates an RFC4122-compliant UUID v4 for Meta event deduplication if needed
 */
export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'evt_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}
