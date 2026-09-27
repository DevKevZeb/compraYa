import { supabase } from '../../lib/supabase';
import { useUserStore } from '../user.store';

jest.mock('../../lib/supabase', () => ({
  supabase: { from: jest.fn() },
}));

// Mocks supabase.from('usuarios').select().eq().maybeSingle() with successive results.
const mockProfileQueries = (...results) => {
  const maybeSingle = jest.fn();
  results.forEach((result) => maybeSingle.mockResolvedValueOnce(result));
  supabase.from.mockReturnValue({
    select: () => ({ eq: () => ({ maybeSingle }) }),
  });
  return maybeSingle;
};

const authUser = { id: 'user-1', email: 'kevin@example.com' };

describe('user store profile loading', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useUserStore.setState({ user: null });
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('retries when the first request fails with a transient auth error', async () => {
    const query = mockProfileQueries(
      { data: null, error: { message: 'JWT issued at future' } },
      { data: { usuario_id: 'user-1', nombre_usuario: 'Kevin' }, error: null }
    );

    const loading = useUserStore.getState().loadProfile(authUser);
    await jest.runAllTimersAsync();
    await loading;

    expect(query).toHaveBeenCalledTimes(2);
    expect(useUserStore.getState().user).toEqual({
      userId: 'user-1',
      email: 'kevin@example.com',
      nombre_usuario: 'Kevin',
    });
    expect(console.error).not.toHaveBeenCalled();
  });

  it('gives up after three attempts and keeps the auth data', async () => {
    const failure = { data: null, error: { message: 'offline' } };
    const query = mockProfileQueries(failure, failure, failure);

    const loading = useUserStore.getState().loadProfile(authUser);
    await jest.runAllTimersAsync();
    await loading;

    expect(query).toHaveBeenCalledTimes(3);
    expect(useUserStore.getState().user).toMatchObject({ userId: 'user-1', nombre_usuario: '' });
    expect(console.error).toHaveBeenCalledWith('Error loading profile:', 'offline');
  });
});
