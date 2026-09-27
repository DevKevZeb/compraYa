import { supabase } from '../../lib/supabase';
import { createSessionFromUrl, parseAuthParams } from '../auth';

jest.mock('../../lib/supabase', () => ({
  supabase: { auth: { setSession: jest.fn() } },
}));

const RECOVERY_URL =
  'exp://192.168.0.10:8081/--/reset-password#access_token=at&refresh_token=rt&type=recovery';

describe('auth redirect handling', () => {
  beforeEach(() => {
    supabase.auth.setSession.mockReset();
  });

  it('reads params from both the query string and the fragment', () => {
    const params = parseAuthParams('compraya://reset-password?foo=1#access_token=at');
    expect(params.get('foo')).toBe('1');
    expect(params.get('access_token')).toBe('at');
  });

  it('creates a session from a recovery link', async () => {
    supabase.auth.setSession.mockResolvedValue({ error: null });

    await expect(createSessionFromUrl(RECOVERY_URL)).resolves.toBe('recovery');
    expect(supabase.auth.setSession).toHaveBeenCalledWith({
      access_token: 'at',
      refresh_token: 'rt',
    });
  });

  it('ignores links without tokens', async () => {
    await expect(createSessionFromUrl('compraya://reset-password')).resolves.toBeNull();
    expect(supabase.auth.setSession).not.toHaveBeenCalled();
  });

  it('surfaces errors returned in the link', async () => {
    const url = 'compraya://reset-password#error=access_denied&error_description=Link+expired';
    await expect(createSessionFromUrl(url)).rejects.toThrow('Link expired');
  });

  it('propagates session errors', async () => {
    supabase.auth.setSession.mockResolvedValue({ error: new Error('Invalid token') });
    await expect(createSessionFromUrl(RECOVERY_URL)).rejects.toThrow('Invalid token');
  });
});
