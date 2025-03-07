
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
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#17ffd3] to-[#d3fc71] p-8 flex items-center justify-center relative">
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
        <div className="max-w-md mx-auto">
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
