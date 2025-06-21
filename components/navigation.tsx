"use client";

import { type ErrorContext } from "@better-fetch/fetch";
import { authClient } from "@/utils/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  console.log("Session data:", session);

  const signIn = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onSuccess: async () => {
          router.refresh();
          // router.push("/");
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

  return (
    <div className="sticky left-0 right-0 top-0 z-50 transition-all duration-300 bg-transparent py-5 border-b border-gray-900 shadow-sm backdrop-blur-sm">
      <div className=" mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-extrabold tracking-wide">
            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Hold
            </span>
          </span>
        </div>
        {session ? (
          <div className="flex items-center gap-4">
            {session.user?.name && (
              <div className="text-black">
                Hello, {session.user?.name.split(" ")[0]}{" "}
              </div>
            )}
            <Button
              className="text-white rounded-xl"
              onClick={() => authClient.signOut()}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button className="text-white rounded-xl" onClick={signIn}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
