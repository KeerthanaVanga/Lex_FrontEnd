import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface OptionButtonProps {
  id?: string;
  value: string;
  label: string;
  sublabel?: string;
  isSelected: boolean;
  onClick: (value: string) => void;
  disabled?: boolean;
  isMultiSelect?: boolean;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  id,
  value,
  label,
  sublabel,
  isSelected,
  onClick,
  disabled = false,
  isMultiSelect = false,
}) => {
  return (
    <button
      id={id}
      type="button"
      role={isMultiSelect ? 'checkbox' : 'radio'}
      aria-checked={isSelected}
      disabled={disabled}
      onClick={() => onClick(value)}
      className={`group w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-150 flex items-start gap-3.5 sm:gap-4 cursor-pointer focus:outline-none focus-visible:ring-3 focus-visible:ring-sky-500 focus-visible:ring-offset-1 select-none active:scale-[0.99] ${
        isSelected
          ? 'border-sky-600 bg-sky-50/70 shadow-xs ring-2 ring-sky-500/20'
          : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50/70 shadow-2xs'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {/* Selection Indicator */}
      <div className="shrink-0 mt-0.5">
        {isSelected ? (
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 fill-sky-100" />
        ) : (
          <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-slate-400 transition-colors" />
        )}
      </div>

      {/* Label and Sublabel */}
      <div className="flex-1 min-w-0">
        <div
          className={`text-base sm:text-lg font-medium leading-snug ${
            isSelected ? 'text-sky-950 font-semibold' : 'text-slate-900'
          }`}
        >
          {label}
        </div>
        {sublabel && (
          <div
            className={`text-xs sm:text-sm mt-1 leading-relaxed ${
              isSelected ? 'text-sky-800 font-normal' : 'text-slate-500'
            }`}
          >
            {sublabel}
          </div>
        )}
      </div>
    </button>
  );
};
