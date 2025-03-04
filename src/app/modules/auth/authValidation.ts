import { z } from 'zod';

export const userRoleEnum = z.enum(['student', 'tutor', 'admin']);
export const shiftEnum = z.enum(['Morning', 'Afternoon', 'Evening', 'Night']);
export const phoneNumberRegex = /^\+?[0-9]{10,15}$/;
export const dayEnum = z.enum([
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]);

// Validation for Creating a User
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').trim(),
    email: z.string().email('Invalid email format').trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .trim(),
    role: userRoleEnum.default('student'),
    bio: z.string().optional(),
    phoneNumber: z
      .string()
      .regex(phoneNumberRegex, 'Invalid phone number')
      .optional(),

    subjects: z.array(z.string()).optional(),
    gradeLevel: z.string().optional(),
    hourlyRate: z.number().optional(),
    ratings: z.array(z.number()).optional(),
    category: z.string().optional(),
    profileImage: z.string().optional(),
    availability: z
      .array(
        z.object({
          day: z.string().min(1, 'Day is required'),
          time: z.string().min(1, 'Time is required'),
        }),
      )
      .optional(),
    shift: z.array(z.string()).optional(),
    day: z.array(z.string()).optional(),
    rating: z.number().min(0).max(5).optional(),
  }),
});

const loginValidationschema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Password is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const authValidation = {
  createUserValidationSchema,
  loginValidationschema,
};
