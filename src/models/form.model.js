import { z } from 'zod';

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'El correo es obligatorio')
  .email('Correo inválido');

const password = z.string().min(6, 'La contraseña debe de tener al menos 6 caracteres');

const passwordConfirmation = z.string().min(6, 'La confirmación debe tener al menos 6 caracteres');

const passwordsMatch = {
  check: (data) => data.password === data.confirmPassword,
  error: { message: 'Las contraseñas son diferentes', path: ['confirmPassword'] },
};

const name = z.string().trim().min(1, 'El nombre es obligatorio');

export const SigInSchema = z.object({
  email,
  password,
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
