import React, { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      disabled,
      className = '',
      leftIcon,
      rightIcon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99] select-none';

    const sizeStyles = {
      sm: 'text-sm px-4 py-2 min-h-[40px]',
      md: 'text-base px-6 py-3.5 min-h-[48px]',
      lg: 'text-lg px-8 py-4 min-h-[56px]',
    };

    const variantStyles = {
      primary:
        'bg-sky-600 hover:bg-sky-700 text-white shadow-sm hover:shadow focus-visible:ring-sky-500 border border-transparent',
      secondary:
        'bg-slate-800 hover:bg-slate-900 text-white shadow-sm hover:shadow focus-visible:ring-slate-700 border border-transparent',
      outline:
        'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 focus-visible:ring-sky-500 shadow-xs',
      ghost:
        'bg-transparent hover:bg-slate-100 text-slate-700 focus-visible:ring-slate-400 border border-transparent',
      danger:
        'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus-visible:ring-rose-500 border border-transparent',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin text-current" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2.5 inline-flex items-center">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="ml-2.5 inline-flex items-center">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
