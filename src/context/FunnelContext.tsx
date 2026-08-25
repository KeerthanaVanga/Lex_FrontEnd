import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { QUALIFICATION_QUESTIONS, TOTAL_QUALIFICATION_QUESTIONS } from '../data/questions';
import type { FunnelAnswers, ContactInfo, LeadSubmissionPayload } from '../types/funnel';
import type { LeadSubmissionState } from '../types/lead';
import { captureAndStoreAttribution, getStoredAttribution, getTrackingData, generateEventId } from '../utils/attribution';
import { analytics } from '../analytics/analytics';
import { submitLead } from '../services/leadApi';

export type FunnelStage =
  | { type: 'question'; index: number }
  | { type: 'contact' }
  | { type: 'review' }
  | { type: 'submitting' }
  | { type: 'error' };

interface FunnelContextType {
  currentStage: FunnelStage;
  currentQuestionIndex: number;
  totalQuestions: number;
  progressPercentage: number;
  answers: FunnelAnswers;
  contactInfo: Partial<ContactInfo>;
  submissionState: LeadSubmissionState;
  leadId: string | null;
  setAnswer: (questionId: string, value: string | string[] | number, autoAdvance?: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToQuestion: (index: number) => void;
  goToContact: () => void;
  goToReview: () => void;
  saveContactAndProceed: (data: ContactInfo) => void;
  submitFunnelLead: () => Promise<boolean>;
  retrySubmission: () => Promise<boolean>;
  resetFunnel: () => void;
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

const ANSWERS_STORAGE_KEY = 'lux_funnel_answers';
const CONTACT_STORAGE_KEY = 'lux_funnel_contact';

export const FunnelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Capture attribution parameters on mount
  useEffect(() => {
    captureAndStoreAttribution();
  }, []);

  // Restore answers if present in sessionStorage
  const [answers, setAnswers] = useState<FunnelAnswers>(() => {
    try {
      const saved = sessionStorage.getItem(ANSWERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [contactInfo, setContactInfo] = useState<Partial<ContactInfo>>(() => {
    try {
      const saved = sessionStorage.getItem(CONTACT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [currentStage, setCurrentStage] = useState<FunnelStage>({ type: 'question', index: 0 });
  const [submissionState, setSubmissionState] = useState<LeadSubmissionState>({ status: 'idle' });
  const [leadId, setLeadId] = useState<string | null>(null);

  // Sync answers to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // Ignore quota errors
    }
  }, [answers]);

  // Sync contact info to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contactInfo));
    } catch {
      // Ignore quota errors
    }
  }, [contactInfo]);

  const currentQuestionIndex = currentStage.type === 'question' ? currentStage.index : 0;
  const totalQuestions = TOTAL_QUALIFICATION_QUESTIONS;

  // Calculate overall progress percentage
  // Total steps = totalQuestions + Contact (1) + Review (1) = totalQuestions + 2
  const totalFunnelSteps = totalQuestions + 2;
  let currentStepNumber = 1;
  if (currentStage.type === 'question') {
    currentStepNumber = currentStage.index + 1;
  } else if (currentStage.type === 'contact') {
    currentStepNumber = totalQuestions + 1;
  } else if (currentStage.type === 'review' || currentStage.type === 'submitting' || currentStage.type === 'error') {
    currentStepNumber = totalFunnelSteps;
  }

  const progressPercentage = Math.min(
    100,
    Math.round(((currentStepNumber - 1) / totalFunnelSteps) * 100)
  );

  // Track funnel step analytics
  useEffect(() => {
    if (currentStage.type === 'question') {
      const q = QUALIFICATION_QUESTIONS[currentStage.index];
      analytics.trackFunnelStep(currentStage.index + 1, q?.title || `Question ${currentStage.index + 1}`);
    } else if (currentStage.type === 'contact') {
      analytics.trackFunnelStep(totalQuestions + 1, 'Contact Information');
    } else if (currentStage.type === 'review') {
      analytics.trackFunnelStep(totalQuestions + 2, 'Review Answers');
    }
  }, [currentStage, totalQuestions]);

  const setAnswer = useCallback((questionId: string, value: string | string[] | number, autoAdvance = false) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    if (autoAdvance) {
      setTimeout(() => {
        setCurrentStage((prevStage) => {
          if (prevStage.type === 'question') {
            if (prevStage.index < TOTAL_QUALIFICATION_QUESTIONS - 1) {
              return { type: 'question', index: prevStage.index + 1 };
            } else {
              return { type: 'contact' };
            }
          }
          return prevStage;
        });
      }, 280);
    }
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStage((prevStage) => {
      if (prevStage.type === 'question') {
        if (prevStage.index < TOTAL_QUALIFICATION_QUESTIONS - 1) {
          return { type: 'question', index: prevStage.index + 1 };
        } else {
          return { type: 'contact' };
        }
      } else if (prevStage.type === 'contact') {
        return { type: 'review' };
      }
      return prevStage;
    });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStage((prevStage) => {
      if (prevStage.type === 'question') {
        if (prevStage.index > 0) {
          return { type: 'question', index: prevStage.index - 1 };
        }
      } else if (prevStage.type === 'contact') {
        return { type: 'question', index: TOTAL_QUALIFICATION_QUESTIONS - 1 };
      } else if (prevStage.type === 'review') {
        return { type: 'contact' };
      } else if (prevStage.type === 'error') {
        return { type: 'review' };
      }
      return prevStage;
    });
  }, []);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < TOTAL_QUALIFICATION_QUESTIONS) {
      setCurrentStage({ type: 'question', index });
    }
  }, []);

  const goToContact = useCallback(() => {
    setCurrentStage({ type: 'contact' });
  }, []);

  const goToReview = useCallback(() => {
    setCurrentStage({ type: 'review' });
  }, []);

  const saveContactAndProceed = useCallback((data: ContactInfo) => {
    setContactInfo(data);
    setCurrentStage({ type: 'review' });
  }, []);

  const executeLeadSubmission = useCallback(async (): Promise<boolean> => {
    if (!contactInfo.firstName || !contactInfo.email || !contactInfo.phone) {
      setCurrentStage({ type: 'contact' });
      return false;
    }

    setSubmissionState({ status: 'submitting' });
    setCurrentStage({ type: 'submitting' });

    const eventId = generateEventId();
    const attribution = getStoredAttribution();
    const tracking = getTrackingData(eventId);

    const payload: LeadSubmissionPayload = {
      contact: {
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName || '',
        email: contactInfo.email,
        phone: contactInfo.phone,
        zipCode: contactInfo.zipCode || '',
      },
      answers,
      attribution,
      tracking,
    };

    try {
      const response = await submitLead(payload);

      if (response.success) {
        const confirmedId = response.leadId || 'REF-' + Math.random().toString(36).substring(2, 9).toUpperCase();
        setLeadId(confirmedId);
        setSubmissionState({ status: 'success', leadId: confirmedId });

        // Fire pixel lead conversion with deduplication event_id
        analytics.trackLead({
          eventId,
          leadId: confirmedId,
        });

        return true;
      } else {
        const errorMsg = response.message || 'We could not process your submission. Please try again.';
        setSubmissionState({ status: 'error', errorMessage: errorMsg, canRetry: true });
        setCurrentStage({ type: 'error' });
        return false;
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setSubmissionState({ status: 'error', errorMessage, canRetry: true });
      setCurrentStage({ type: 'error' });
      return false;
    }
  }, [contactInfo, answers]);

  const submitFunnelLead = useCallback(async (): Promise<boolean> => {
    return await executeLeadSubmission();
  }, [executeLeadSubmission]);

  const retrySubmission = useCallback(async (): Promise<boolean> => {
    return await executeLeadSubmission();
  }, [executeLeadSubmission]);

  const resetFunnel = useCallback(() => {
    try {
      sessionStorage.removeItem(ANSWERS_STORAGE_KEY);
      sessionStorage.removeItem(CONTACT_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setAnswers({});
    setContactInfo({});
    setCurrentStage({ type: 'question', index: 0 });
    setSubmissionState({ status: 'idle' });
    setLeadId(null);
  }, []);

  return (
    <FunnelContext.Provider
      value={{
        currentStage,
        currentQuestionIndex,
        totalQuestions,
        progressPercentage,
        answers,
        contactInfo,
        submissionState,
        leadId,
        setAnswer,
        nextStep,
        prevStep,
        goToQuestion,
        goToContact,
        goToReview,
        saveContactAndProceed,
        submitFunnelLead,
        retrySubmission,
        resetFunnel,
      }}
    >
      {children}
    </FunnelContext.Provider>
  );
};

export const useFunnel = () => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnel must be used within a FunnelProvider');
  }
  return context;
};
