// @flow

if (!process.env.REACT_APP_API_BASE_URL) {
  throw new Error('Missing env: "REACT_APP_API_BASE_URL"');
}

export const revision: string = process.env.REACT_APP_REVISION;
export const sentryDsn: string = process.env.REACT_APP_SENTRY_DSN;
export const apiBaseUrl: string = process.env.REACT_APP_API_BASE_URL;
