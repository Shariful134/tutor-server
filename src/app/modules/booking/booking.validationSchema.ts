import { z } from 'zod';
import { phoneNumberRegex } from '../auth/authValidation';

const bookingValidationSchema = z.object({
  body: z.object({
    student: z.string(),
    tutor: z.string(),
    duration: z.number().optional(),
    address: z.string().optional(),
    phone: z
      .string()
      .regex(phoneNumberRegex, 'Invalid phone number')
      .optional(),
    dateTime: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      })
      .transform((val) => new Date(val))
      .optional(),
    transaction: z
      .object({
        id: z.string(),
        transactionStatus: z.string(),
        date_time: z.string(),
        method: z.string(),
        sp_message: z.string(),
        sp_code: z.string(),
        bank_status: z.string(),
      })
      .optional(),
    status: z.enum(['Pending', 'Paid', 'Cancelled']).default('Pending'),
    totalPrice: z.number(),
  }),
});

const bookingUpadateValidationSchema = z.object({
  body: z.object({
    student: z.string().optional(),
    tutor: z.string().optional(),
    duration: z.number().optional(),
    dateTime: z.string().optional(),
    address: z.string().optional(),
    phone: z
      .string()
      .regex(phoneNumberRegex, 'Invalid phone number')
      .optional(),
    status: z
      .enum(['Pending', 'Paid', 'Cancelled'])
      .default('Pending')
      .optional(),
    transaction: z
      .object({
        id: z.string(),
        transactionStatus: z.string(),
        date_time: z.string(),
        method: z.string(),
        sp_message: z.string(),
        sp_code: z.string(),
        bank_status: z.string(),
      })
      .optional(),
    totalPrice: z.number().optional(),
  }),
});

export const bookingValidation = {
  bookingUpadateValidationSchema,
  bookingValidationSchema,
};
