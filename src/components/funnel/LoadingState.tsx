import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Shield } from 'lucide-react';

const LOADING_STEPS = [
  'Encrypting and validating submitted answers...',
  'Evaluating qualification criteria against benefit guidelines...',
  'Checking regional specialist availability...',
  'Finalizing your eligibility assessment report...',
];

export const LoadingState: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto text-center py-12 px-4 animate-fade-in-up">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-10">
        {/* Animated Icon */}
        <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-sky-100 animate-ping opacity-30" />
          <div className="w-16 h-16 rounded-2xl bg-sky-50 border-2 border-sky-500/30 flex items-center justify-center text-sky-600 shadow-sm">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>

        {/* Headings */}
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Processing Your Evaluation
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Please wait while our system analyzes your qualification profile.
        </p>

        {/* Step Progress Checklist */}
        <div className="mt-8 space-y-3 text-left max-w-sm mx-auto">
          {LOADING_STEPS.map((step, index) => {
            const isFinished = index < activeStepIndex;
            const isCurrent = index === activeStepIndex;

            return (
              <div
                key={step}
                className={`flex items-center gap-3 text-xs sm:text-sm transition-all duration-300 ${
                  isFinished
                    ? 'text-emerald-700 font-medium'
                    : isCurrent
                    ? 'text-sky-700 font-semibold scale-[1.02]'
                    : 'text-slate-400 opacity-60'
                }`}
              >
                {isFinished ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-sky-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span>{step}</span>
              </div>
            );
          })}
        </div>

        {/* Trust Footnote */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Shield className="w-3.5 h-3.5 text-sky-500" />
          <span>Your data is protected under 256-Bit SSL encryption.</span>
        </div>
      </div>
    </div>
  );
};
