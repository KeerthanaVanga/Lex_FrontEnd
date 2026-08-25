import React from 'react';
import { Shield, Lock, FileCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Trust Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8 mb-8 border-b border-slate-800 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200">100% Free Assessment</div>
              <div className="text-slate-400 text-[11px]">No fees or financial obligation</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200">Bank-Grade Privacy</div>
              <div className="text-slate-400 text-[11px]">256-Bit SSL data encryption</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200">Confidential Evaluation</div>
              <div className="text-slate-400 text-[11px]">Your information is strictly protected</div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimers */}
        <div className="space-y-3 leading-relaxed text-slate-400 text-[11px]">
          <p>
            <strong className="text-slate-300">Disclaimer:</strong> BenefitPath is an independent educational and qualification matching service and is NOT affiliated with, endorsed by, or part of the Social Security Administration (SSA) or any government entity. We do not provide legal or medical advice. Completion of this questionnaire does not guarantee eligibility or benefit approval.
          </p>
          <p>
            By submitting your information, you provide express written consent to be contacted by our network of licensed disability advocates, attorneys, or representatives at the telephone number and email provided, including through automated dialing systems, SMS text messages, and pre-recorded voice messages. Consent is not a condition of purchase.
          </p>
        </div>

        {/* Links & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex flex-wrap gap-4 text-slate-400">
            <a href="#privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-200 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#optout" className="hover:text-slate-200 transition-colors">Do Not Sell My Info</a>
            <span>•</span>
            <a href="#contact" className="hover:text-slate-200 transition-colors">Contact Support</a>
          </div>
          <div className="text-slate-400">
            &copy; {new Date().getFullYear()} BenefitPath. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
