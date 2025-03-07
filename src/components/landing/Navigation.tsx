
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ProductsDropdown from "@/components/ProductsDropdown";

const Navigation = () => {
  const navigate = useNavigate();
  
  return (
    <header className="py-4 px-6 sticky top-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white flex items-center gap-3">
          <span>Nexus FinLabs</span>
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8 mr-8">
            <a href="#" className="text-white hover:text-[#17ffd3] transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] after:transition-all">Home</a>
            <ProductsDropdown className="text-white" />
            <a href="#services" className="text-white hover:text-[#17ffd3] transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] after:transition-all">Services</a>
            <a href="#contact" className="text-white hover:text-[#17ffd3] transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] after:transition-all">Contact</a>
          </nav>
          <div className="flex gap-3">
            <Button 
              className="bg-white text-custom-dark border border-gray-300 hover:bg-white hover:text-custom-dark hover:border-gray-400 min-w-[100px] justify-center text-xs py-1.5"
              size="xs"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] text-custom-dark border border-transparent hover:shadow-md min-w-[100px] justify-center text-xs py-1.5"
              size="xs"
              onClick={() => navigate("/register")}
            >
              Sign-Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
