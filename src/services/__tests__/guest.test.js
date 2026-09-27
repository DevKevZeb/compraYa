jest.mock('../../lib/supabase', () => ({
  supabase: { auth: { signInWithPassword: jest.fn() } },
}));

// The demo account is read from the environment when the module loads.
const loadAuth = (env) => {
  let modules;
  jest.isolateModules(() => {
    Object.assign(process.env, env);
    modules = {
      auth: require('../auth'),
      supabase: require('../../lib/supabase').supabase,
    };
  });
  return modules;
};

describe('guest demo account', () => {
  afterEach(() => {
    delete process.env.EXPO_PUBLIC_DEMO_EMAIL;
    delete process.env.EXPO_PUBLIC_DEMO_PASSWORD;
  });

  it('is disabled when no credentials are configured', async () => {
    const { auth, supabase } = loadAuth({});

    expect(auth.DEMO_ACCOUNT).toBeNull();
    expect(auth.isDemoAccount('demo@compraya.dev')).toBe(false);
    await expect(auth.signInAsGuest()).resolves.toEqual({ error: expect.any(Error) });
    expect(supabase.auth.signInWithPassword).not.toHaveBeenCalled();
  });

  it('signs in with the configured demo credentials', async () => {
    const { auth, supabase } = loadAuth({
      EXPO_PUBLIC_DEMO_EMAIL: 'demo@compraya.dev',
      EXPO_PUBLIC_DEMO_PASSWORD: 'secret1',
    });
    supabase.auth.signInWithPassword.mockResolvedValue({ error: null });

    await auth.signInAsGuest();

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'demo@compraya.dev',
      password: 'secret1',
    });
    expect(auth.isDemoAccount('Demo@CompraYa.dev')).toBe(true);
    expect(auth.isDemoAccount('someone@example.com')).toBe(false);
  });
});
