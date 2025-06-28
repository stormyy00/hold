import { Heart } from "lucide-react";
import React from "react";
import { Card } from "./ui/card";

const About = () => {
  return (
    <div className="relative py-0 bg-gradient-to-br from-red-50/50 to-white overflow-hidden pb-[15vh]">
      <div className="absolute top-10 left-10 animate-float">
        <div className="w-24 h-24 bg-gradient-to-br from-red-200 to-red-300 rounded-full opacity-20" />
      </div>
      <div className="absolute bottom-20 right-16 animate-float-delayed">
        <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-15" />
      </div>

      <Card className="relative max-w-6xl mx-auto px-6 p-4 md:p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-red-200/50 shadow-lg shadow-red-100/30">
        <div className="text-center mb-16">
          <div className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
              About Hold
            </span>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Born from the frustration of scattered bookmarks and lost links
            across countless browsers and devices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-red-200/50 shadow-lg shadow-red-100/30">
              <div className="text-2xl font-bold text-gray-900 mb-4">
                <span className="text-red-600">Why</span> Hold?
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                We{"'"}ve all been there - that perfect article you saved
                somewhere, the tutorial you bookmarked last month, or the
                resource link shared in a meeting that{"'"}s now buried in your
                chat history.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Hold transforms this chaos into organized clarity, giving you a
                beautiful, searchable home for all your digital references.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 rounded-2xl text-white shadow-lg shadow-red-200/50">
              <div className="text-2xl font-bold mb-4">Our Mission</div>
              <p className="leading-relaxed mb-4">
                To create the most intuitive and elegant link management
                experience that seamlessly fits into your workflow.
              </p>
              <p className="leading-relaxed opacity-90">
                Every feature is designed with simplicity and productivity in
                mind, because your time should be spent consuming great content,
                not hunting for it.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-200/50">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="text-xl font-semibold text-gray-900 mb-2">
              Built with Care
            </div>
            <p className="text-gray-600">
              Every pixel crafted for the perfect user experience
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-200/50">
              <span className="text-white font-bold text-2xl">∞</span>
            </div>
            <div className="text-xl font-semibold text-gray-900 mb-2">
              Limitless Storage
            </div>
            <p className="text-gray-600">
              Save as many links as you need, organized your way
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-200/50">
              <span className="text-white font-bold text-xl">⚡</span>
            </div>
            <div className="text-xl font-semibold text-gray-900 mb-2">
              Lightning Fast
            </div>
            <p className="text-gray-600">
              Find what you need in seconds, not minutes
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;
