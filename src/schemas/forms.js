import { z } from 'zod';

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'Email is required')
  .email('Enter a valid email address');

const password = z.string().min(6, 'Password must be at least 6 characters');

const passwordConfirmation = z.string().min(1, 'Please confirm your password');

const passwordsMatch = {
  check: (data) => data.password === data.confirmPassword,
  error: { message: 'Passwords do not match', path: ['confirmPassword'] },
};

const name = z.string().trim().min(1, 'Name is required');

export const SigInSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
});

export const RegisterSchema = z
  .object({
    name,
    email,
    password,
    confirmPassword: passwordConfirmation,
  })
  .refine(passwordsMatch.check, passwordsMatch.error);

export const ForgotSchema = z.object({
  email,
});

export const RecoverySchema = z
  .object({
    password,
    confirmPassword: passwordConfirmation,
  })
  .refine(passwordsMatch.check, passwordsMatch.error);

export const DataUserSchema = z.object({
  name,
  email,
});
