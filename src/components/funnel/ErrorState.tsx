import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { useFunnel } from '../../hooks/useFunnel';
import { Button } from '../common/Button';

interface ErrorStateProps {
  onSuccess?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onSuccess }) => {
  const { submissionState, retrySubmission, goToReview } = useFunnel();

  const errorMessage =
    submissionState.status === 'error'
      ? submissionState.errorMessage
      : 'We were unable to complete your submission due to a temporary network issue.';

  const handleRetry = async () => {
    const success = await retrySubmission();
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto py-10 px-4 animate-fade-in-up">
      <div className="bg-white rounded-3xl border border-rose-200/90 shadow-sm p-6 sm:p-10 text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-rose-600 mx-auto mb-5 shadow-xs">
          <AlertCircle className="w-8 h-8" />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Something Went Wrong
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {errorMessage}
        </p>

        <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 font-medium">
          Don&apos;t worry &mdash; all your answers and contact information have been preserved.
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <Button
            onClick={handleRetry}
            size="lg"
            fullWidth
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Try Again
          </Button>

          <Button
            onClick={goToReview}
            variant="outline"
            size="md"
            fullWidth
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Review Your Information
          </Button>
        </div>
      </div>
    </div>
  );
};
