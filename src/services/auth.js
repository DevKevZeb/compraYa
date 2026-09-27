import { supabase } from '../lib/supabase';

export const PASSWORD_RESET_PATH = 'reset-password';

// Supabase auth redirects carry the result in the URL fragment
// (…#access_token=…&refresh_token=…&type=recovery) or, on failure, as error params.
export const parseAuthParams = (url) => {
  const [, fragment = ''] = url.split('#');
  const [, query = ''] = url.split('#')[0].split('?');
  return new URLSearchParams(`${query}&${fragment}`);
};

/**
 * Turns an auth redirect URL into a Supabase session.
 * Returns the auth event type (e.g. "recovery"), or null if the URL is not an auth redirect.
 */
export const createSessionFromUrl = async (url) => {
  const params = parseAuthParams(url);

  const errorDescription = params.get('error_description');
  if (errorDescription) {
    throw new Error(errorDescription);
  }

  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  if (!accessToken || !refreshToken) {
    return null;
  }

  const { error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  if (error) {
    throw error;
  }

  return params.get('type');
};
