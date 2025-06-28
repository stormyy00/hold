import React from "react";
import { Globe, Shield, Users, Zap } from "lucide-react";

const benefits = [
  {
    icon: <Zap className="w-6 h-6" />,
    text: "Lightning-fast search and retrieval",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    text: "Secure cloud synchronization",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    text: "Access from anywhere, any device",
  },
  {
    icon: <Users className="w-6 h-6" />,
    text: "Team collaboration features",
  },
];
const Features = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Why Choose Hold?
              </span>
            </h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="text-red-500 group-hover:text-red-600 transition-colors duration-300">
                    {benefit.icon}
                  </div>
                  <span className="text-lg text-gray-700 font-medium">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="/images/landing-illustration.png"
              alt="Landing Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
