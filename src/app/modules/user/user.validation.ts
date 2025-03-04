import { z } from 'zod';
import {
  dayEnum,
  phoneNumberRegex,
  shiftEnum,
  userRoleEnum,
} from '../auth/authValidation';

// Validation for Updating a User
const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    email: z.string().email('Invalid email format').trim().optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .trim()
      .optional(),
    role: userRoleEnum.optional(),
    bio: z.string().trim().optional(),
    phoneNumber: z
      .string()
      .regex(phoneNumberRegex, 'Invalid phone number')
      .trim()
      .optional(),
    subjects: z.array(z.string()).optional(),
    shift: shiftEnum.optional(),
    day: dayEnum.optional(),
    rating: z.number().min(0).max(5).optional(),
  }),
});

export const userValidation = {
  updateUserValidationSchema,
};
