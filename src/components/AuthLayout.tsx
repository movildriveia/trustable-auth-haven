
import React from "react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  illustration?: React.ReactNode;
  className?: string;
}

const AuthLayout = ({ children, illustration, className }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-poppins">
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#17ffd3] to-[#d3fc71] p-8 flex items-center justify-center relative overflow-hidden">
        {/* Animated shapes */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          {/* Blue circle */}
          <div className="absolute top-[15%] left-[10%] w-3 h-3 bg-blue-600 rounded-full animate-pulse-slow opacity-80"></div>
          
          {/* Blue arc */}
          <div className="absolute top-[25%] right-[15%] opacity-80">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M10 30 Q 30 5, 50 30" stroke="#0099ff" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
          
          {/* Teal dots pattern */}
          <div className="absolute bottom-[5%] left-[5%] opacity-60">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <pattern id="tealDotPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="2" fill="#20e3b2" />
              </pattern>
              <rect x="0" y="0" width="120" height="120" fill="url(#tealDotPattern)" />
            </svg>
          </div>
          
          {/* Purple triangle */}
          <div className="absolute top-[60%] right-[20%] opacity-70 animate-float">
            <svg width="30" height="30" viewBox="0 0 30 30">
              <polygon points="15,0 30,30 0,30" fill="#9c27b0" />
            </svg>
          </div>
          
          {/* Green circle */}
          <div className="absolute top-[45%] left-[20%] w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full opacity-80 animate-float"></div>
          
          {/* Teal arc */}
          <div className="absolute bottom-[25%] left-[10%] opacity-70 rotate-180">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <path d="M10 25 Q 25 5, 40 25" stroke="#1de9b6" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>
          
          {/* Gradient circle */}
          <div className="absolute bottom-[30%] right-[30%] w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-80 animate-float"></div>
          
          {/* Large green circle */}
          <div className="absolute top-[70%] left-[30%] w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-lime-500 opacity-80 animate-pulse-slow"></div>
          
          {/* Another curved line */}
          <div className="absolute top-[85%] right-[10%] opacity-70">
            <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
              <path d="M5 25 Q 20 0, 40 25" stroke="#00e5ff" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="hero-bg-1 animate-left-right absolute left-10 top-20">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10.5" cy="10.5" r="10.5" fill="#091337" fillOpacity="0.1"/>
          </svg>
        </div>
        <div className="hero-bg-2 animate-up-down absolute right-10 top-40">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7.5" cy="7.5" r="7.5" fill="#091337" fillOpacity="0.1"/>
          </svg>
        </div>
        <div className="max-w-md mx-auto relative z-10">
          {illustration || (
            <div className="text-custom-dark text-center">
              <h1 className="text-4xl font-bold mb-4">Bienvenido a nuestra plataforma</h1>
              <p className="text-lg opacity-80">Un sistema seguro y robusto para gestionar tus datos</p>
            </div>
          )}
        </div>
      </div>
      <div className={cn("w-full md:w-1/2 p-8 flex items-center justify-center", className)}>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
