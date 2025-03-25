import { z } from 'zod';
import { phoneNumberRegex } from '../auth/authValidation';

const bookingRequestValidationSchema = z.object({
  body: z.object({
    student: z.string(),
    tutor: z.string(),
    bookingRequest: z.boolean().optional(),
  }),
});

const bookingValidationSchema = z.object({
  body: z.object({
    student: z.string(),
    tutor: z.string(),
    bookingRequest: z.string().optional(),
    duration: z.number(),
    dateTime: z.string(),
    address: z.string(),
    phone: z.string().regex(phoneNumberRegex, 'Invalid phone number'),
    status: z.enum(['Pending', 'Paid', 'Cancelled']).default('Pending'),
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
    totalPrice: z.number(),
  }),
});
const bookingUpadateValidationSchema = z.object({
  body: z.object({
    student: z.string().optional(),
    tutor: z.string().optional(),
    bookingRequest: z.string().optional(),
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
  bookingRequestValidationSchema,
};
