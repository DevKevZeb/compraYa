import { DataUserSchema, RecoverySchema, RegisterSchema, SigInSchema } from '../forms';

describe('form schemas', () => {
  it('accepts any valid email domain and normalizes it', () => {
    const result = SigInSchema.safeParse({ email: '  Kevin@UMSS.edu.bo ', password: 'secret1' });
    expect(result.success).toBe(true);
    expect(result.data.email).toBe('kevin@umss.edu.bo');
  });

  it('rejects invalid emails and short passwords', () => {
    const result = SigInSchema.safeParse({ email: 'not-an-email', password: '123' });
    expect(result.success).toBe(false);
    expect(result.error.issues.map((issue) => issue.path[0])).toEqual(['email', 'password']);
  });

  it('requires matching passwords on sign up', () => {
    const result = RegisterSchema.safeParse({
      name: 'Kevin',
      email: 'kevin@example.com',
      password: 'secret1',
      confirmPassword: 'secret2',
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0]).toMatchObject({
      path: ['confirmPassword'],
      message: 'Las contraseñas son diferentes',
    });
  });

  it('accepts a matching new password on reset', () => {
    expect(
      RecoverySchema.safeParse({ password: 'secret1', confirmPassword: 'secret1' }).success
    ).toBe(true);
  });

  it('requires a non-blank name on profile updates', () => {
    expect(DataUserSchema.safeParse({ name: '   ', email: 'kevin@example.com' }).success).toBe(
      false
    );
  });
});
