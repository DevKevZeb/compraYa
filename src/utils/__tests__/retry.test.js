import { withRetry } from '../retry';

describe('withRetry', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const run = async (promise) => {
    await jest.runAllTimersAsync();
    return promise;
  };

  it('returns the first successful result without retrying', async () => {
    const request = jest.fn().mockResolvedValue({ data: 1, error: null });
    await expect(run(withRetry(request))).resolves.toEqual({ data: 1, error: null });
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('retries failed requests until one succeeds', async () => {
    const request = jest
      .fn()
      .mockResolvedValueOnce({ data: null, error: { message: 'JWT issued at future' } })
      .mockResolvedValueOnce({ data: 2, error: null });
    await expect(run(withRetry(request))).resolves.toEqual({ data: 2, error: null });
    expect(request).toHaveBeenCalledTimes(2);
  });

  it('gives up after the configured attempts', async () => {
    const request = jest.fn().mockResolvedValue({ data: null, error: { message: 'offline' } });
    await expect(run(withRetry(request, { attempts: 2 }))).resolves.toMatchObject({
      error: { message: 'offline' },
    });
    expect(request).toHaveBeenCalledTimes(2);
  });
});
