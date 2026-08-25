export type QuestionType =
  | 'yes_no'
  | 'single_choice'
  | 'multiple_choice'
  | 'text'
  | 'number'
  | 'date';

export interface QuestionOption {
  value: string;
  label: string;
  sublabel?: string;
  icon?: string;
}

export interface QuestionConfig {
  id: string;
  title: string;
  description?: string;
  helperText?: string;
  type: QuestionType;
  options?: QuestionOption[];
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  autoAdvance?: boolean;
}

export type FunnelAnswers = Record<string, string | string[] | number>;

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  consent: boolean;
}

export interface AttributionData {
  fbclid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  landingPage?: string;
  referrer?: string;
}

export interface TrackingData {
  fbp?: string;
  fbc?: string;
  userAgent?: string;
  timestamp?: string;
  eventId?: string;
}

export interface LeadSubmissionPayload {
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zipCode: string;
  };
  answers: FunnelAnswers;
  attribution: AttributionData;
  tracking: TrackingData;
}

export type FunnelStepType =
  | 'landing'
  | 'question'
  | 'contact'
  | 'review'
  | 'submitting'
  | 'thank_you'
  | 'error';
