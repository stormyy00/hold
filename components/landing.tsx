import { ArrowRight } from "lucide-react";

import hold from "../public/holdinglink.png";
import Image from "next/image";

const Landing = () => {
  return (
    <div className="relative overflow-hidden pt-20 pb-32">
      <div className="absolute inset-0 w-1/3">
        <Image src={hold} alt="Holding Links" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className={`text-center transform transition-all duration-1000`}>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent hover:from-red-400 hover:via-red-500 hover:to-red-600 transition-all duration-300">
              Hold
            </span>
            <span className="text-gray-900 block text-5xl md:text-6xl mt-2">
              Your Digital Links
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 font-medium leading-relaxed">
            The most elegant way to save, organize, and access your important
            links. Transform your digital chaos into organized productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-xl border border-red-300/40 shadow-lg shadow-red-200/50 transition-all duration-300 hover:shadow-red-300/60 hover:scale-105 flex items-center gap-2 text-lg">
              Get Holding
              <ArrowRight className="w-5 h-5" />
            </button>
            {/* <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 font-semibold px-8 py-4 rounded-xl border border-red-200/60 shadow-lg shadow-red-100/30 transition-all duration-300 hover:shadow-red-200/50 hover:scale-105 flex items-center gap-2 text-lg">
                Watch Demo
                <ChevronRight className="w-5 h-5" />
              </button> */}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 bg-gradient-to-br from-red-200 to-red-300 rounded-full opacity-20"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed">
        <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-15"></div>
      </div>
    </div>
  );
};

export default Landing;
