declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CTA_API_KEY: string;
      GOOGLE_MAPS_STATIC_API_KEY: string;
    }
  }
}

export {};
