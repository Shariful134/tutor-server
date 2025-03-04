import { z } from 'zod';

const bookingValidationSchema = z.object({
  body: z.object({
    student: z.string(),
    tutor: z.string(),
    duration: z.number(),
    dateTime: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      })
      .transform((val) => new Date(val)),
    status: z.enum(['pending', 'paid', 'canceled']).default('pending'),
    totalPrice: z.number(),
  }),
});

const bookingUpadateValidationSchema = z.object({
  body: z.object({
    student: z.string().optional(),
    tutor: z.string().optional(),
    duration: z.number().optional(),
    dateTime: z.string().optional(),
    status: z
      .enum(['pending', 'paid', 'canceled'])
      .default('pending')
      .optional(),
    totalPrice: z.number().optional(),
  }),
});

export const bookingValidation = {
  bookingUpadateValidationSchema,
  bookingValidationSchema,
};
