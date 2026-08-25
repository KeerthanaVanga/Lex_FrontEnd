import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadContactSchema, type LeadContactFormData } from '../../schemas/leadSchema';
import { useFunnel } from '../../hooks/useFunnel';
import { Button } from '../common/Button';
import { Lock, ShieldCheck, ArrowRight, User, Mail, Phone, MapPin, CheckSquare, Square, ChevronDown } from 'lucide-react';

interface CountryCodeOption {
  code: string;
  country: string;
  flag: string;
}

const COUNTRY_CODES: CountryCodeOption[] = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
];

const formatLocalNumber = (digits: string): string => {
  const clean = digits.replace(/\D/g, '').slice(0, 10);
  if (clean.length <= 5) return clean;
  return `${clean.slice(0, 5)} ${clean.slice(5, 10)}`;
};

const parseInitialPhone = (phoneStr?: string) => {
  if (!phoneStr) return { countryCode: '+91', localNumber: '' };
  
  // Check known country code prefixes
  for (const item of COUNTRY_CODES) {
    if (phoneStr.startsWith(item.code)) {
      const remainingDigits = phoneStr.slice(item.code.length).replace(/\D/g, '').slice(0, 10);
      return { countryCode: item.code, localNumber: formatLocalNumber(remainingDigits) };
    }
  }

  // Check generic + prefix
  const match = phoneStr.match(/^(\+\d{1,4})\s*(.*)$/);
  if (match) {
    const code = match[1];
    const remainingDigits = match[2].replace(/\D/g, '').slice(0, 10);
    return { countryCode: code, localNumber: formatLocalNumber(remainingDigits) };
  }

  const allDigits = phoneStr.replace(/\D/g, '');
  if (allDigits.length === 12 && allDigits.startsWith('91')) {
    return { countryCode: '+91', localNumber: formatLocalNumber(allDigits.slice(2)) };
  }
  if (allDigits.length === 11 && allDigits.startsWith('1')) {
    return { countryCode: '+1', localNumber: formatLocalNumber(allDigits.slice(1)) };
  }

  return { countryCode: '+91', localNumber: formatLocalNumber(allDigits.slice(0, 10)) };
};

export const ContactForm: React.FC = () => {
  const { contactInfo, saveContactAndProceed } = useFunnel();

  const initialParsed = parseInitialPhone(contactInfo.phone);
  const [selectedCountryCode, setSelectedCountryCode] = React.useState<string>(initialParsed.countryCode);
  const [localPhone, setLocalPhone] = React.useState<string>(initialParsed.localNumber);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initialFullPhone = initialParsed.localNumber 
    ? `${initialParsed.countryCode} ${initialParsed.localNumber}` 
    : (contactInfo.phone || '');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadContactFormData>({
    resolver: zodResolver(leadContactSchema),
    defaultValues: {
      firstName: contactInfo.firstName || '',
      lastName: contactInfo.lastName || '',
      email: contactInfo.email || '',
      phone: initialFullPhone,
      zipCode: contactInfo.zipCode || '',
      consent: contactInfo.consent ?? true,
    },
    mode: 'onTouched',
  });

  const consentChecked = watch('consent');

  // Format phone number live as user enters 10 digits
  const handleLocalPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Handle full pasted strings starting with +
    if (val.startsWith('+')) {
      const parsed = parseInitialPhone(val);
      setSelectedCountryCode(parsed.countryCode);
      setLocalPhone(parsed.localNumber);
      const combined = parsed.localNumber ? `${parsed.countryCode} ${parsed.localNumber}` : '';
      setValue('phone', combined, { shouldValidate: true });
      return;
    }

    const rawDigits = val.replace(/\D/g, '');

    // Handle pasted 12-digit Indian number without +
    if (rawDigits.length === 12 && rawDigits.startsWith('91')) {
      setSelectedCountryCode('+91');
      const formatted = formatLocalNumber(rawDigits.slice(2));
      setLocalPhone(formatted);
      setValue('phone', `+91 ${formatted}`, { shouldValidate: true });
      return;
    }

    const formatted = formatLocalNumber(rawDigits);
    setLocalPhone(formatted);

    const combined = formatted ? `${selectedCountryCode} ${formatted}` : '';
    setValue('phone', combined, { shouldValidate: true });
  };

  const handleSelectCountry = (code: string) => {
    setSelectedCountryCode(code);
    setIsDropdownOpen(false);
    const combined = localPhone ? `${code} ${localPhone}` : '';
    setValue('phone', combined, { shouldValidate: true });
  };

  const currentCountry = COUNTRY_CODES.find((c) => c.code === selectedCountryCode) || COUNTRY_CODES[0];

  const onSubmit = (data: LeadContactFormData) => {
    saveContactAndProceed(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="text-center sm:text-left mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Preliminary Qualification Assessment Complete</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Where Should We Send Your Results?
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Please enter your accurate contact information to receive your qualification breakdown and speak with a specialist.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-1.5">
                First Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="firstName"
                  type="text"
                  placeholder="e.g. John"
                  autoComplete="given-name"
                  {...register('firstName')}
                  className={`w-full pl-10 pr-4 py-3 text-base rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/20 bg-white ${
                    errors.firstName
                      ? 'border-rose-300 bg-rose-50/30 focus:border-rose-500'
                      : 'border-slate-200 focus:border-sky-600'
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Last Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="lastName"
                  type="text"
                  placeholder="e.g. Smith"
                  autoComplete="family-name"
                  {...register('lastName')}
                  className={`w-full pl-10 pr-4 py-3 text-base rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/20 bg-white ${
                    errors.lastName
                      ? 'border-rose-300 bg-rose-50/30 focus:border-rose-500'
                      : 'border-slate-200 focus:border-sky-600'
                  }`}
                />
              </div>
              {errors.lastName && (
                <p className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                {...register('email')}
                className={`w-full pl-10 pr-4 py-3 text-base rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/20 bg-white ${
                  errors.email
                    ? 'border-rose-300 bg-rose-50/30 focus:border-rose-500'
                    : 'border-slate-200 focus:border-sky-600'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number & Zip Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="localPhone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              
              {/* Hidden field registered for form submission */}
              <input type="hidden" {...register('phone')} />

              <div className={`relative flex items-stretch rounded-xl border-2 transition-colors bg-white ${
                errors.phone
                  ? 'border-rose-300 bg-rose-50/30 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20'
                  : 'border-slate-200 focus-within:border-sky-600 focus-within:ring-2 focus-within:ring-sky-500/20'
              }`}>
                {/* Custom Country Code Dropdown Trigger */}
                <div ref={dropdownRef} className="relative flex items-center">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="h-full flex items-center gap-1.5 bg-slate-50/90 hover:bg-slate-100/90 border-r border-slate-200 px-3 py-2.5 rounded-l-[10px] text-slate-800 text-sm font-semibold transition-colors cursor-pointer focus:outline-none"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <span>{currentCountry.flag}</span>
                    <span className="tracking-tight">{selectedCountryCode}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-sky-600' : ''}`} />
                  </button>

                  {/* Custom Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-64 max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-1.5 space-y-0.5 animate-fade-in-up">
                      <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Select Country Code
                      </div>
                      {COUNTRY_CODES.map((c) => {
                        const isSelected = selectedCountryCode === c.code;
                        return (
                          <button
                            type="button"
                            key={c.code + c.country}
                            onClick={() => handleSelectCountry(c.code)}
                            className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-xl transition-colors cursor-pointer text-left ${
                              isSelected
                                ? 'bg-sky-50 text-sky-900 font-bold border border-sky-200/60'
                                : 'text-slate-700 hover:bg-slate-50 font-medium'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-sm leading-none">{c.flag}</span>
                              <span className="truncate">{c.country}</span>
                            </span>
                            <span className={`font-semibold ml-2 shrink-0 ${isSelected ? 'text-sky-700' : 'text-slate-500'}`}>
                              {c.code}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 10-Digit Phone Input */}
                <div className="relative flex-1 flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="localPhone"
                    type="tel"
                    placeholder="98765 43210"
                    autoComplete="tel-national"
                    maxLength={11}
                    value={localPhone}
                    onChange={handleLocalPhoneChange}
                    className="w-full pl-9 pr-3 py-3 text-base font-medium text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Helper text / error message */}
              <div className="flex items-center justify-between mt-1.5 px-0.5">
                {errors.phone ? (
                  <p className="text-xs font-medium text-rose-600" role="alert">
                    {errors.phone.message}
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500">
                    10 numbers + country code ({selectedCountryCode}) = 12 numbers total
                  </p>
                )}
                <span className={`text-[11px] font-mono shrink-0 ml-2 ${
                  localPhone.replace(/\D/g, '').length === 10 ? 'text-emerald-600 font-bold' : 'text-slate-400'
                }`}>
                  {localPhone.replace(/\D/g, '').length}/10 digits
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-semibold text-slate-700 mb-1.5">
                ZIP Code <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  id="zipCode"
                  type="text"
                  maxLength={5}
                  placeholder="90210"
                  autoComplete="postal-code"
                  {...register('zipCode')}
                  className={`w-full pl-10 pr-4 py-3 text-base rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/20 bg-white ${
                    errors.zipCode
                      ? 'border-rose-300 bg-rose-50/30 focus:border-rose-500'
                      : 'border-slate-200 focus:border-sky-600'
                  }`}
                />
              </div>
              {errors.zipCode && (
                <p className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
                  {errors.zipCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Consent / TCPA Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                id="consent"
                {...register('consent')}
                className="sr-only"
              />
              <div className="shrink-0 mt-0.5 text-sky-600">
                {consentChecked ? (
                  <CheckSquare className="w-5 h-5 fill-sky-100" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                )}
              </div>
              <span className="text-xs text-slate-500 leading-relaxed select-none">
                I agree to the <a href="#terms" className="underline hover:text-slate-700">Terms of Service</a> & <a href="#privacy" className="underline hover:text-slate-700">Privacy Policy</a> and provide written authorization for BenefitPath and its network of licensed specialists to contact me regarding my eligibility inquiry at the phone number provided via calls, automated dialing, and SMS.
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
                {errors.consent.message}
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Continue to Review
            </Button>
          </div>

          {/* Security Assurance */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted &bull; No Spam Guarantee</span>
          </div>
        </form>
      </div>
    </div>
  );
};
