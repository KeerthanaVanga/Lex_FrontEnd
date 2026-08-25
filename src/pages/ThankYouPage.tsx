import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFunnel } from '../hooks/useFunnel';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Button } from '../components/common/Button';
import {
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Mail,
} from 'lucide-react';

export const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const { leadId, contactInfo, resetFunnel } = useFunnel();

  // If user lands directly on thank-you without a lead ID, fallback to mock reference or allow review
  const displayRefId = leadId || 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleStartNew = () => {
    resetFunnel();
    navigate('/qualify');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-8 sm:py-14 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          {/* Main Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Thank You{contactInfo.firstName ? `, ${contactInfo.firstName}` : ''}!
            </h1>
            <p className="mt-2 text-base sm:text-lg text-slate-600">
              Your qualification inquiry has been successfully received.
            </p>

            {/* Reference Badge */}
            <div className="mt-5 inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-800">
              <span>Confirmation Ref:</span>
              <span className="font-mono text-sky-700 tracking-wider font-bold">
                {displayRefId}
              </span>
            </div>

            {/* Notification Notice */}
            {contactInfo.email && (
              <div className="mt-6 p-4 bg-sky-50 rounded-2xl border border-sky-200/80 text-left text-xs sm:text-sm text-sky-900 flex items-start gap-3">
                <Mail className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Confirmation summary sent to:</span>{' '}
                  <span className="underline font-medium">{contactInfo.email}</span>
                  <div className="mt-1 text-sky-800 text-xs">
                    Please check your inbox (and spam folder) for your qualification summary.
                  </div>
                </div>
              </div>
            )}

            {/* What Happens Next Timeline */}
            <div className="mt-8 text-left border-t border-slate-100 pt-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                What Happens Next
              </h2>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Step 1: Answers Recorded & Analyzed
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Your responses have been processed against basic eligibility guidelines.
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Step 2: Specialist File Review
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      A dedicated disability qualification specialist is reviewing your file and medical background.
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Step 3: Direct Phone Consultation
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Expect a free, confidential call or SMS at{' '}
                      <span className="font-semibold text-slate-800">
                        {contactInfo.phone || 'your phone number'}
                      </span>{' '}
                      within 24 business hours to discuss your next steps.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Callout */}
            <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Need Immediate Help?</div>
                  <div className="text-xs text-slate-500">Speak with an advocate toll-free</div>
                </div>
              </div>
              <a
                href="tel:18005550199"
                className="text-xs font-bold text-sky-600 hover:text-sky-700 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors"
              >
                1-800-555-0199
              </a>
            </div>

            {/* Start New CTA */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                size="md"
              >
                Return to Home
              </Button>
              <Button
                onClick={handleStartNew}
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start New Evaluation
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
