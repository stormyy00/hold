"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Notfound = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20">
      <div className="text-center bg-white/95 backdrop-blur-md border border-red-200/50 rounded-xl shadow-lg shadow-red-100/30 p-8">
        <div className="font-bold text-3xl">404</div>
        <div className="text-lg font-semibold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
          Page Not Found
        </div>
        <div className="text-gray-600 mt-2">
          The page you are looking for does not exist.
        </div>
        <div className="mt-4">
          <Button
            variant={"outline"}
            onClick={() => router.back()}
            className="text-red-600 hover:bg-red-50 border-red-200/60 hover:border-red-300/70"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
