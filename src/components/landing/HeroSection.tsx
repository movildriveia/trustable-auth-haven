
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "./FeatureCard";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="flex-grow flex items-center py-20 relative overflow-hidden z-10">
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-6xl md:text-7xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              FinTech<br/>
              Observatory
            </h1>
            <p className="text-xl text-blue-100 mb-8 font-light">
              Your financial playground.<br/>
              Powered by data, built for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] text-custom-dark min-w-[120px] justify-center hover:shadow-md group"
                variant="registerBtn"
              >
                Sign-Up
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                onClick={() => navigate("/login")}
                className="bg-white text-custom-dark border border-gray-300 min-w-[120px] justify-center hover:bg-white hover:text-custom-dark hover:border-gray-400"
                variant="loginBtn"
              >
                Login
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="glass-card p-8 rounded-lg border border-white/20 shadow-xl relative">
              <h3 className="text-white text-xl font-semibold mb-6 text-center">Financial Features</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {/* First Row */}
                <div className="col-span-1">
                  <FeatureCard label="Real-time market analysis" />
                </div>
                
                <div className="col-span-1">
                  <FeatureCard label="M&A deal flow tracking" />
                </div>
                
                {/* Second Row */}
                <div className="col-span-1">
                  <FeatureCard label="Personalized portfolios" />
                </div>
                
                <div className="col-span-1">
                  <FeatureCard label="Private Equity performance metrics" />
                </div>
                
                {/* Third Row */}
                <div className="col-span-1">
                  <FeatureCard label="AI-powered predictions" />
                </div>
                
                <div className="col-span-1">
                  <FeatureCard label="Due diligence framework & checklists" />
                </div>
                
                {/* Fourth Row */}
                <div className="col-span-1">
                  <FeatureCard label="Risk management tools" />
                </div>
                
                <div className="col-span-1">
                  <FeatureCard label="Valuation model templates" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
