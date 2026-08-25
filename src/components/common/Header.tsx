import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Phone } from 'lucide-react';

interface HeaderProps {
  minimal?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ minimal = false }) => {
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm group-hover:bg-sky-700 transition-colors">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center">
              Benefit<span className="text-sky-600">Path</span>
            </span>
            <span className="hidden sm:block text-[11px] font-medium tracking-wide uppercase text-slate-500">
              Eligibility & Qualification Guide
            </span>
          </div>
        </Link>

        {/* Trust Badges */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL</span>
          </div>

          {!minimal && (
            <a
              href="tel:18005550199"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>Questions? Call Free</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
