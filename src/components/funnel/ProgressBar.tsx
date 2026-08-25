import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useFunnel } from '../../hooks/useFunnel';

interface ProgressBarProps {
  showBack?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ showBack = true }) => {
  const { currentStage, currentQuestionIndex, totalQuestions, progressPercentage, prevStep } = useFunnel();

  const isFirstQuestion = currentStage.type === 'question' && currentQuestionIndex === 0;

  // Generate clean step label
  let stepLabel = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
  if (currentStage.type === 'contact') {
    stepLabel = 'Final Step: Contact Information';
  } else if (currentStage.type === 'review') {
    stepLabel = 'Review Your Information';
  }

  return (
    <div className="w-full bg-white border-b border-slate-200 py-3 px-4 sm:px-6 shadow-2xs">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          {/* Back Button */}
          {showBack && !isFirstQuestion ? (
            <button
              onClick={prevStep}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1 px-2 -ml-2 rounded-md hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
              aria-label="Go to previous step"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div className="text-xs font-medium text-slate-400">Step 1 of {totalQuestions + 2}</div>
          )}

          {/* Current Step Title & Percentage */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600">{stepLabel}</span>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
              {progressPercentage}%
            </span>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div
          className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${progressPercentage}% complete`}
        >
          <div
            className="bg-sky-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
