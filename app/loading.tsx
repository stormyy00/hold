import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20">
      <div className="text-center bg-white/95 backdrop-blur-md border border-red-200/50 rounded-xl shadow-lg shadow-red-100/30 p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4" />
        <div className="text-lg font-semibold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;
