import React from 'react';
import { QUALIFICATION_QUESTIONS } from '../../data/questions';
import { useFunnel } from '../../hooks/useFunnel';
import { Button } from '../common/Button';
import { ShieldCheck, Edit2, Lock, ArrowRight, User, Phone, Mail, MapPin } from 'lucide-react';

interface ReviewSummaryProps {
  onSuccess?: () => void;
}

export const ReviewSummary: React.FC<ReviewSummaryProps> = ({ onSuccess }) => {
  const {
    answers,
    contactInfo,
    goToQuestion,
    goToContact,
    submitFunnelLead,
    submissionState,
  } = useFunnel();

  const isSubmitting = submissionState.status === 'submitting';

  const getOptionLabel = (questionId: string, val: string | string[] | number | undefined): string => {
    if (!val) return 'Not answered';
    const q = QUALIFICATION_QUESTIONS.find((item) => item.id === questionId);
    if (!q || !q.options) return String(val);

    if (Array.isArray(val)) {
      return val
        .map((v) => q.options?.find((opt) => opt.value === v)?.label || v)
        .join(', ');
    }

    const matched = q.options.find((opt) => opt.value === val);
    return matched ? matched.label : String(val);
  };

  const handleSubmit = async () => {
    const success = await submitFunnelLead();
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="text-center sm:text-left mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ready for Final Review</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Review Your Information
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Please verify that your answers and contact details are accurate before submitting.
          </p>
        </div>

        {/* Section 1: Qualification Answers */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Qualification Criteria
            </h2>
            <span className="text-xs text-slate-500 font-medium">6 Questions</span>
          </div>

          <div className="divide-y divide-slate-200/70">
            {QUALIFICATION_QUESTIONS.map((q, index) => {
              const answerVal = answers[q.id];
              const displayLabel = getOptionLabel(q.id, answerVal);

              return (
                <div
                  key={q.id}
                  className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white transition-colors"
                >
                  <div className="flex-1 pr-3">
                    <div className="text-xs text-slate-500 font-medium">
                      Q{index + 1}: {q.title}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 mt-0.5">
                      {displayLabel}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToQuestion(index)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 p-1 rounded hover:bg-sky-50 transition-colors self-start sm:self-center cursor-pointer"
                    aria-label={`Edit answer for question ${index + 1}`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Contact Details */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Contact Details
            </h2>
            <button
              type="button"
              onClick={goToContact}
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 p-1 rounded hover:bg-sky-50 transition-colors cursor-pointer"
              aria-label="Edit contact details"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Contact</span>
            </button>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-500">Full Name</div>
                <div className="font-semibold text-slate-900">
                  {contactInfo.firstName} {contactInfo.lastName}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-500">Email Address</div>
                <div className="font-semibold text-slate-900 break-all">
                  {contactInfo.email}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-500">Phone Number</div>
                <div className="font-semibold text-slate-900">
                  {contactInfo.phone}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-500">ZIP Code</div>
                <div className="font-semibold text-slate-900">
                  {contactInfo.zipCode}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="space-y-4">
          <Button
            onClick={handleSubmit}
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            disabled={isSubmitting}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Submit Qualification Check
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Secure 256-Bit SSL Submission. By clicking submit you agree to be contacted.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
