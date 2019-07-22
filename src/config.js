// @flow

if (!process.env.REACT_APP_API_BASE_URL) {
  throw new Error('Missing env: "REACT_APP_API_BASE_URL"');
}

export const sentryDsn: string = process.env.SENTRY_DSN;
export const apiBaseUrl: string = process.env.REACT_APP_API_BASE_URL;
