// import { env } from "./env.js";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  //   baseURL: env.BETTER_AUTH_URL as string,
});

export const { useSession, signOut } = authClient;
