
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ServicesSection = () => {
  const navigate = useNavigate();
  
  return (
    <section id="services" className="py-20 bg-white z-10 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-custom-dark">Ready to Start?</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kickstart your journey with Nexus FinLabs by filling out a quick form to get to know you better!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-8 border border-gray-100 hover:border-blue-100 group text-center">
            <h3 className="text-xl font-semibold mb-3 text-custom-dark">Data Analysis</h3>
            <p className="text-gray-600">Access advanced financial data analysis with intuitive visualizations.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-8 border border-gray-100 hover:border-blue-100 group text-center">
            <h3 className="text-xl font-semibold mb-3 text-custom-dark">Smart Insights</h3>
            <p className="text-gray-600">AI-powered recommendations tailored to your financial goals.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-8 border border-gray-100 hover:border-blue-100 group text-center">
            <h3 className="text-xl font-semibold mb-3 text-custom-dark">M&A Valuations</h3>
            <p className="text-gray-600">Expert analysis and valuation for mergers and acquisitions.</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            className="bg-gradient-to-r from-[#17ffd3] to-[#d3fc71] text-custom-dark font-semibold hover:shadow-lg hover:scale-[1.03] hover:brightness-[1.05] min-w-[180px] justify-center px-10 py-6 text-base"
            size="xl"
            onClick={() => navigate("/register")}
          >
            Start Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
