import React from 'react';
import type { QuestionConfig } from '../../types/funnel';
import { OptionButton } from './OptionButton';
import { Button } from '../common/Button';
import { useFunnel } from '../../hooks/useFunnel';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface QuestionRendererProps {
  question: QuestionConfig;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question }) => {
  const { answers, setAnswer, nextStep } = useFunnel();
  const currentVal = answers[question.id];

  const handleSelectOption = (value: string) => {
    if (question.type === 'multiple_choice') {
      const currentList = Array.isArray(currentVal) ? [...currentVal] : [];
      const exists = currentList.includes(value);
      const updated = exists
        ? currentList.filter((v) => v !== value)
        : [...currentList, value];
      setAnswer(question.id, updated, false);
    } else {
      // Single choice or Yes/No
      const autoAdvance = question.autoAdvance ?? true;
      setAnswer(question.id, value, autoAdvance);
    }
  };

  const isOptionSelected = (optionValue: string): boolean => {
    if (question.type === 'multiple_choice') {
      return Array.isArray(currentVal) && currentVal.includes(optionValue);
    }
    return currentVal === optionValue;
  };

  const hasAnswer =
    question.type === 'multiple_choice'
      ? Array.isArray(currentVal) && currentVal.length > 0
      : Boolean(currentVal);

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up" key={question.id}>
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 md:p-10">
        {/* Question Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
            {question.title}
          </h1>
          {question.description && (
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              {question.description}
            </p>
          )}
        </div>

        {/* Question Options */}
        {question.options && question.options.length > 0 && (
          <div className="space-y-3 sm:space-y-3.5" role="radiogroup" aria-label={question.title}>
            {question.options.map((option) => (
              <OptionButton
                key={option.value}
                id={`opt_${question.id}_${option.value}`}
                value={option.value}
                label={option.label}
                sublabel={option.sublabel}
                isSelected={isOptionSelected(option.value)}
                onClick={handleSelectOption}
                isMultiSelect={question.type === 'multiple_choice'}
              />
            ))}
          </div>
        )}

        {/* Text / Number Input Fallback */}
        {(question.type === 'text' || question.type === 'number') && (
          <div className="mt-4 space-y-4">
            <input
              type={question.type === 'number' ? 'number' : 'text'}
              id={`input_${question.id}`}
              value={(currentVal as string | number) || ''}
              placeholder={question.placeholder || 'Enter your response...'}
              onChange={(e) => setAnswer(question.id, e.target.value, false)}
              className="w-full px-4 py-3.5 text-lg rounded-xl border-2 border-slate-200 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20 bg-white"
            />
          </div>
        )}

        {/* Optional Manual Continue Button (Shown when auto-advance is disabled, multiple choice, or inputs) */}
        {(question.type === 'multiple_choice' || question.autoAdvance === false || question.type === 'text' || question.type === 'number') && (
          <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
            <Button
              onClick={nextStep}
              disabled={!hasAnswer}
              size="lg"
              fullWidth
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Privacy Note */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500 text-center">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>Your answers are private, secure, and used solely for eligibility evaluation.</span>
        </div>
      </div>
    </div>
  );
};
