import { optional, z } from 'zod';

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

// Validation for Student
const registerStudentValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').trim(),
    email: z.string().email('Invalid email format').trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .trim(),
    role: userRoleEnum.default('student'),
  }),
});

//Validation for tutor
const registerTutorValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').trim(),
    email: z.string().email('Invalid email format').trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .trim(),
    role: userRoleEnum.default('student'),
    bio: z.string(),
    phoneNumber: z.string().regex(phoneNumberRegex, 'Invalid phone number'),
    subjects: z.array(z.string()),
    gradeLevel: z.string(),
    hourlyRate: z.number(),

    category: z.string(),
    profileImage: z.string().optional(),
    availability: z.array(
      z.object({
        day: z.string().min(1, 'Day is required'),
        time: z.string().min(1, 'Time is required'),
      }),
    ),
    ratings: z.array(z.number().min(1).max(5)),
  }),
});
//Validation for tutor
const updateTutorValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').trim().optional(),
    email: z.string().email('Invalid email format').trim().optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .trim()
      .optional(),
    role: userRoleEnum.default('student').optional(),
    bio: z.string().optional(),
    phoneNumber: z
      .string()
      .regex(phoneNumberRegex, 'Invalid phone number')
      .optional(),

    subjects: z.array(z.string()).optional(),
    gradeLevel: z.string().optional(),
    hourlyRate: z.number().optional(),

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

    ratings: z.array(z.number().min(1).max(5)).optional(),
  }),
});

const loginValidationschema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Password is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const authValidation = {
  registerTutorValidationSchema,
  registerStudentValidationSchema,
  loginValidationschema,
  updateTutorValidationSchema,
};
