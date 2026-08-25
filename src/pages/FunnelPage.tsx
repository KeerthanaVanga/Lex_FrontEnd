import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFunnel } from '../hooks/useFunnel';
import { QUALIFICATION_QUESTIONS } from '../data/questions';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { ProgressBar } from '../components/funnel/ProgressBar';
import { QuestionRenderer } from '../components/funnel/QuestionRenderer';
import { ContactForm } from '../components/funnel/ContactForm';
import { ReviewSummary } from '../components/funnel/ReviewSummary';
import { LoadingState } from '../components/funnel/LoadingState';
import { ErrorState } from '../components/funnel/ErrorState';

export const FunnelPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentStage, submissionState } = useFunnel();

  // If submission succeeds, navigate to thank you page
  useEffect(() => {
    if (submissionState.status === 'success') {
      navigate('/thank-you');
    }
  }, [submissionState.status, navigate]);

  const handleSubmissionSuccess = () => {
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header minimal />
      <ProgressBar />

      <main className="flex-1 flex flex-col justify-center py-6 sm:py-10 px-4 sm:px-6">
        {currentStage.type === 'question' && (
          <QuestionRenderer question={QUALIFICATION_QUESTIONS[currentStage.index]} />
        )}

        {currentStage.type === 'contact' && <ContactForm />}

        {currentStage.type === 'review' && (
          <ReviewSummary onSuccess={handleSubmissionSuccess} />
        )}

        {currentStage.type === 'submitting' && <LoadingState />}

        {currentStage.type === 'error' && (
          <ErrorState onSuccess={handleSubmissionSuccess} />
        )}
      </main>

      <Footer />
    </div>
  );
};
