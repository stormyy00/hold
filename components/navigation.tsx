"use client";
import { type ErrorContext } from "@better-fetch/fetch";
import { authClient } from "@/utils/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navigation = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  console.log("Session data:", session);

  const signIn = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/dashboard",
      },
      {
        onSuccess: async () => {
          router.refresh();
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
    <div className="sticky left-0 right-0 top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-red-200/50 py-5 shadow-lg shadow-red-100/30">
      <div className="mx-auto flex items-center justify-between px-6 max-w-7xl">
        <Link href={"/"} className="flex items-center gap-2">
          <span className="text-3xl font-extrabold tracking-wide drop-shadow-sm">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent hover:from-red-400 hover:via-red-500 hover:to-red-600 transition-all duration-300">
              Hold
            </span>
          </span>
        </Link>

        {session ? (
          <div className="flex items-center gap-4">
            {session.user?.name && (
              <div className="text-gray-700 font-medium bg-gradient-to-r from-red-50 to-red-100 px-4 py-2 rounded-lg border border-red-200/60 backdrop-blur-sm">
                Hello,{" "}
                <span className="text-red-600 font-semibold">
                  {session.user?.name.split(" ")[0]}
                </span>
              </div>
            )}
            <Button
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-xl border border-red-300/40 shadow-lg shadow-red-200/50 transition-all duration-300 hover:shadow-red-300/60 hover:scale-105"
              onClick={() => authClient.signOut()}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-xl border border-red-300/40 shadow-lg shadow-red-200/50 transition-all duration-300 hover:shadow-red-300/60 hover:scale-105 hover:shadow-xl"
            onClick={signIn}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
