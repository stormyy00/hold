"use client";

import { type ErrorContext } from "@better-fetch/fetch";
import { authClient } from "@/utils/client";

export const signIn = async () => {
  await authClient.signIn.social(
    {
      provider: "google",
      callbackURL: "/dashboard",
    },
    {
      onSuccess: async () => {
        //   router.refresh();
      },
      onError: (ctx: ErrorContext) => {
        alert({
          title: "Something went wrong",
          description: ctx.error.message ?? "Something went wrong.",
          variant: "destructive",
        });
      },
    },
  );
};
