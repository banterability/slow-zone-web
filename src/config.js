// @flow

//. Required enviromnet variables
if (!process.env.REACT_APP_API_BASE_URL) {
  throw new Error('Missing env: "REACT_APP_API_BASE_URL"');
}
export const apiBaseUrl: string = process.env.REACT_APP_API_BASE_URL;

//. Optional enviromnet variables
export const googleStaticMapsKey: string =
  process.env.REACT_APP_GOOGLE_STATIC_MAPS_KEY || "";
export const revision: string = process.env.REACT_APP_REVISION || "";
export const sentryDsn: string = process.env.REACT_APP_SENTRY_DSN || "";
