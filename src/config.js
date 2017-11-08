/* @flow */

if (!process.env.REACT_APP_API_BASE_URL) {
  throw new Error('Missing env: "REACT_APP_API_BASE_URL"');
}
export const apiBaseUrl: string = process.env.REACT_APP_API_BASE_URL;
