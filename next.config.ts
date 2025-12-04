import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Expose required environment variables to the browser.
   *
   * We mirror svastha's config so that `process.env.NEXT_API_ENDPOINT`
   * (and friends) are available in client components like `apiClient.ts`.
   * Without this, auth calls will fall back to the current origin
   * (e.g. `http://localhost:3000/auth/login`).
   */
  env: {
    NEXT_ENV: process.env.NEXT_ENV,
    NEXT_ENDPOINT: process.env.NEXT_ENDPOINT,
    NEXT_API_ENDPOINT: process.env.NEXT_API_ENDPOINT,
    NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY:process.env.GOOGLE_CAPTCHA_SITE_KEY,
    TETHER_TOKEN: process.env.TETHER_TOKEN,
    PROJECT_UUID: process.env.PROJECT_UUID,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    SOCKET_SERVER_URL: process.env.SOCKET_SERVER_URL,
    IS_SOCKET: process.env.SOCKET_SERVER_URL,
    GA_EVENT_KEY: process.env.GA_EVENT_KEY,
    POSTHOG_HOST: process.env.POSTHOG_HOST,
    POSTHOG_KEY: process.env.POSTHOG_KEY,
    ZIPPY_KEY: process.env.ZIPPY_KEY,
  },
};

export default nextConfig;
