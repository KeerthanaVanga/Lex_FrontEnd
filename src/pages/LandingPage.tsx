import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Button } from '../components/common/Button';
import { useFunnel } from '../hooks/useFunnel';
import {
  ShieldCheck,
  Clock,
  Lock,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Star,
  Sparkles,
} from 'lucide-react';

const FAQS = [
  {
    q: 'How long does this qualification check take?',
    a: 'The evaluation consists of 6 simple multiple-choice questions and typically takes under 2 minutes to complete on mobile or desktop.',
  },
  {
    q: 'Is there any cost or obligation to check eligibility?',
    a: 'No. The qualification assessment is 100% free with absolutely no hidden fees, subscriptions, or financial obligations.',
  },
  {
    q: 'What medical conditions might qualify?',
    a: 'Common eligible categories include musculoskeletal conditions (back/spine/joint), cardiovascular diseases, neurological conditions, mental health conditions, and respiratory illnesses that significantly impair your ability to work.',
  },
  {
    q: 'What happens after I submit my information?',
    a: 'Your answers are reviewed against current qualification guidelines. A licensed benefits advocate or specialist will contact you to review your eligibility and guide you through the next steps.',
  },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { resetFunnel } = useFunnel();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleStartFunnel = () => {
    resetFunnel();
    navigate('/qualify');
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Official 2026 Disability & Benefit Eligibility Checker</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-3xl mx-auto">
              Find Out If You May <span className="text-sky-600">Qualify</span> for Benefits
            </h1>

            {/* Sub-headline */}
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Answer a few simple questions to see whether you may meet the basic criteria. Fast, completely confidential, and 100% free.
            </p>

            {/* Key Value Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-medium text-slate-700">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <Clock className="w-4 h-4 text-sky-600" /> Under 2 Minutes
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Free Check
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <Lock className="w-4 h-4 text-sky-600" /> Confidential & Secure
              </span>
            </div>

            {/* Primary CTA */}
            <div className="mt-8 sm:mt-10 max-w-md mx-auto">
              <Button
                onClick={handleStartFunnel}
                size="lg"
                fullWidth
                className="text-lg py-4 sm:py-5 shadow-md hover:shadow-lg transition-all"
                rightIcon={<ArrowRight className="w-6 h-6" />}
              >
                Check Eligibility Now
              </Button>
              <div className="mt-3 text-xs text-slate-500">
                No credit card required &bull; No obligation &bull; Free guidance
              </div>
            </div>
          </div>
        </section>

        {/* 3 Simple Steps Section */}
        <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                How The Qualification Check Works
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                A straightforward 3-step process designed to give you clarity on your benefits eligibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative shadow-2xs hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center mb-4 text-lg">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Answer Quick Questions</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Provide basic details about your age, work history, and medical condition in our simple one-question-per-screen flow.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative shadow-2xs hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center mb-4 text-lg">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Evaluate Criteria</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our system checks your responses against standard qualification requirements to assess your eligibility strength.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative shadow-2xs hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center mb-4 text-lg">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Connect With An Advocate</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Receive personalized guidance from a knowledgeable specialist who can assist with paperwork and claim submission.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof & Trust Section */}
        <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                <div className="py-2 sm:py-0">
                  <div className="text-3xl sm:text-4xl font-extrabold text-sky-600">120,000+</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Assessments Completed</div>
                </div>
                <div className="py-2 sm:py-0">
                  <div className="text-3xl sm:text-4xl font-extrabold text-sky-600">4.8 / 5.0</div>
                  <div className="flex items-center justify-center gap-1 mt-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">User Satisfaction Rating</div>
                </div>
                <div className="py-2 sm:py-0">
                  <div className="text-3xl sm:text-4xl font-extrabold text-sky-600">&lt; 2 Min</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Average Completion Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
                <HelpCircle className="w-4 h-4" /> Got Questions?
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                        openFaq === idx ? 'rotate-180 text-sky-600' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom CTA Banner */}
            <div className="mt-12 bg-sky-50 rounded-3xl p-6 sm:p-8 border border-sky-200 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Ready to find out if you qualify?
              </h3>
              <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                Take the 2-minute confidential assessment today.
              </p>
              <div className="mt-6 max-w-xs mx-auto">
                <Button onClick={handleStartFunnel} size="lg" fullWidth rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start Free Assessment
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
