// @flow

const getEnvOptional = (variableName: string): string => {
  return process.env[variableName] || "";
};

const getEnvRequired = (variableName: string): string => {
  if (!process.env[variableName]) {
    throw new Error(
      `[config] Missing required environment variable: ${variableName}`
    );
  }
  return process.env[variableName];
};

export const apiBaseUrl = getEnvRequired("REACT_APP_API_BASE_URL");
export const googleStaticMapsKey = getEnvOptional(
  "REACT_APP_GOOGLE_STATIC_MAPS_KEY"
);
export const revision = getEnvOptional("REACT_APP_REVISION");
export const sentryDsn = getEnvOptional("REACT_APP_SENTRY_DSN");
