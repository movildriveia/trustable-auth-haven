
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
