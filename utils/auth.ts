import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { users, accounts, sessions, verification } from "@/server/db/schema";
import { db } from "@/server/db"; // your drizzle instance
import { env } from "@/utils/env";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      account: accounts,
      session: sessions,
      verification: verification,
    },
  }),
  socialProviders: {
    google: {
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.picture,
        };
      },
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
});

export const authenticate = async () => {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user || !session?.user?.email) {
    return {
      message: "Invalid Authentication",
      auth: 401,
    };
  }
  return {
    uid: session.user.id,
    user: session.user,
    message: null,
    auth: 200,
  };
};

export const getServerAuthSession = async () => {
  return await auth.api.getSession({ headers: headers() });
};
