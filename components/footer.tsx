import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="relative bg-gradient-to-br text-white">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-red-600"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl font-extrabold tracking-wide">
              <span className="bg-gradient-to-r from-red-400 via-red-300 to-red-500 bg-clip-text text-transparent">
                Hold
              </span>
            </span>
          </Link>
          <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            The most elegant way to save, organize, and access your important
            links. Transform your digital chaos into organized productivity.
          </p>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Hold. All rights reserved. Made with{" "}
            <Heart className="w-4 h-4 inline text-red-500" /> for productivity
            enthusiasts.
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 left-10 opacity-5">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full"></div>
      </div>
      <div className="absolute top-8 right-20 opacity-5">
        <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Footer;
