import { z } from 'zod';

export const SigInSchema = z.object({
	email: z.string().email('Correo Invalido').min(1, 'El correo es obligatorio'),
	password: z
		.string()
		.min(6, 'La contraseña debe de tener al menos 6 caracteres'),
});
export const RegisterSchema = z
	.object({
		name: z.string().min(1, 'El nombre es obligatorio'),
		email: z
			.string()
			.email('Correo inválido')
			.min(1, 'El correo es obligatorio'),
		password: z
			.string()
			.min(6, 'La contraseña debe de tener al menos 6 caracteres'),
		confirmPassword: z
			.string()
			.min(6, 'La confirmación debe tener al menos 6 caracteres'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Las contraseñas son diferentes',
		path: ['confirmPassword'],
	});

export const ForgotSchema = z.object({
	email: z
		.string()
		.email('Correo Invalido')
		.min(1, 'El correo es obligatorio')
		.regex(
			/^(?!.*@((?!gmail\.com|hotmail\.com|outlook\.com).)*$).*$/,
			'El correo debe ser de Gmail, Hotmail o Outlook'
		),
});

export const RecoverySchema = z.object({
	email: z
		.string()
		.email('Correo Invalido')
		.min(1, 'El correo es obligatorio')
		.regex(
			/^(?!.*@((?!gmail\.com|hotmail\.com|outlook\.com).)*$).*$/,
			'El correo debe ser de Gmail, Hotmail o Outlook'
		),
	password: z
		.string()
		.min(6, 'La contraseña debe de tener al menos 6 caracteres'),
});

export const DataUserSchema = z.object({
	name: z.string().min(1, 'El nombre es obligatorio'),
	email: z
		.string()
		.email('Correo Invalido')
		.min(1, 'El correo es obligatorio')
		.regex(
			/^(?!.*@((?!gmail\.com|hotmail\.com|outlook\.com).)*$).*$/,
			'El correo debe ser de Gmail, Hotmail o Outlook'
		),
});
