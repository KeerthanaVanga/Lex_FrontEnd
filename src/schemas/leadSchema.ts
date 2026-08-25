import { z } from 'zod';

export const leadContactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name cannot exceed 50 characters' })
    .regex(/^[a-zA-Z\s'-]+$/, { message: 'First name contains invalid characters' }),
  
  lastName: z
    .string()
    .trim()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name cannot exceed 50 characters' })
    .regex(/^[a-zA-Z\s'-]+$/, { message: 'Last name contains invalid characters' }),
  
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address (e.g. name@example.com)' }),
  
  phone: z
    .string()
    .trim()
    .min(1, { message: 'Phone number is required' })
    .refine((val) => {
      // Strips non-digits and checks for 10-digit number with country code (typically 12 digits total with 2-digit country code like +91)
      const digitsOnly = val.replace(/\D/g, '');
      return digitsOnly.length >= 10 && digitsOnly.length <= 14;
    }, {
      message: 'Please enter a valid 10-digit phone number with country code (12 digits total)',
    }),

  zipCode: z
    .string()
    .trim()
    .min(1, { message: 'Zip code is required' })
    .regex(/^\d{5}$/, { message: 'Please enter a valid 5-digit US ZIP code' }),

  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must agree to the terms and authorize contact to proceed',
    }),
});

export type LeadContactFormData = z.infer<typeof leadContactSchema>;
