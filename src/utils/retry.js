// Retries a Supabase-style request ({ data, error }) a few times.
// Requests made right after sign in can be rejected for a moment ("JWT issued
// at future") because of clock skew between Supabase services.
export const withRetry = async (request, { attempts = 3, delayMs = 1000 } = {}) => {
  let result = await request();
  for (let attempt = 1; result.error && attempt < attempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    result = await request();
  }
  return result;
};
