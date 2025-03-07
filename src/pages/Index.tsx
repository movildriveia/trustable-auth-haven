import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronRight, BarChart3, LightbulbIcon, GanttChartSquare } from "lucide-react";
import ProductsDropdown from "@/components/ProductsDropdown";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-poppins overflow-x-hidden">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm py-4 px-6 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-custom-dark flex items-center gap-3">
            <img 
              src="/lovable-uploads/cef7b659-e171-45b6-ab88-91595b5a7ffd.png" 
              alt="Nexus FinLabs" 
              className="h-10"
            />
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8 mr-8">
              <a href="#" className="text-custom-dark hover:text-primary-custom transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] after:transition-all">Home</a>
              <ProductsDropdown />
              <a href="#services" className="text-custom-dark hover:text-primary-custom transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] after:transition-all">Services</a>
              <a href="#contact" className="text-custom-dark hover:text-primary-custom transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] after:transition-all">Contact</a>
            </nav>
            <div className="flex gap-3">
              <Button 
                variant="loginBtn"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button 
                variant="registerBtn"
                size="sm"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/lovable-uploads/483b237a-7371-4738-8d3b-f4c377e50673.png"
            alt="Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-slate-900/60"></div>
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <img 
                src="/lovable-uploads/82ddc0b6-d4e5-4a0a-a102-0eda212f379c.png" 
                alt="Nexus FinLabs Logo" 
                className="h-20 mb-6"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
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
                  className="bg-gradient-to-r from-[#17ffd3] to-[#d3fc71] text-custom-dark min-w-[120px] justify-center hover:bg-white hover:text-custom-dark border hover:border-[#17ffd3] group"
                >
                  Get Started
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  onClick={() => navigate("/login")}
                  className="bg-transparent border-white/30 text-white min-w-[120px] justify-center hover:bg-[#17ffd3] hover:border-transparent hover:text-custom-dark"
                  variant="outline"
                >
                  Login
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="glass-card p-8 rounded-lg border border-white/20 shadow-xl relative">
                {/* Remove the white box above Financial Features */}
                <h3 className="text-white text-xl font-semibold mb-4 text-center">Financial Features</h3>
                <ul className="text-blue-100 space-y-4">
                  <li className="flex items-start">
                    <div className="bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] rounded-full p-1 mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Real-time market analysis
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] rounded-full p-1 mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Personalized portfolios
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] rounded-full p-1 mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    AI-powered predictions
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] rounded-full p-1 mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Risk management tools
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Section */}
      <section id="services" className="py-20 bg-white">
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
              <div className="mx-auto w-16 h-16 mb-6 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] transition-all">
                <BarChart3 className="h-8 w-8 text-blue-500 group-hover:text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-custom-dark">Data Analysis</h3>
              <p className="text-gray-600">Access advanced financial data analysis with intuitive visualizations.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-8 border border-gray-100 hover:border-blue-100 group text-center">
              <div className="mx-auto w-16 h-16 mb-6 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] transition-all">
                <LightbulbIcon className="h-8 w-8 text-blue-500 group-hover:text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-custom-dark">Smart Insights</h3>
              <p className="text-gray-600">AI-powered recommendations tailored to your financial goals.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-8 border border-gray-100 hover:border-blue-100 group text-center">
              <div className="mx-auto w-16 h-16 mb-6 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] transition-all">
                <GanttChartSquare className="h-8 w-8 text-blue-500 group-hover:text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-custom-dark">M&A Valuations</h3>
              <p className="text-gray-600">Expert analysis and valuation for mergers and acquisitions.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              variant="registerBtn"
              size="lg"
              onClick={() => navigate("/register")}
              className="px-10"
            >
              Start Now
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-custom-dark">Contact Us</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#17ffd3] to-[#23e3ee] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about Nexus FinLabs? Our team is ready to assist you.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center border border-gray-100 hover:border-blue-100">
              <div className="w-14 h-14 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-custom-dark">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us an email with your questions or requirements.</p>
              <Button variant="turquoise" size="sm" className="group">
                Email
                <ExternalLink className="ml-1 h-3.5 w-3.5 opacity-70" />
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center border border-gray-100 hover:border-blue-100">
              <div className="w-14 h-14 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-custom-dark">Call Us</h3>
              <p className="text-gray-600 mb-4">Schedule a call to discuss your project.</p>
              <Button variant="gradient" size="sm" className="group">
                Schedule
                <ExternalLink className="ml-1 h-3.5 w-3.5 opacity-70" />
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center border border-gray-100 hover:border-blue-100">
              <div className="w-14 h-14 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-custom-dark">Visit Us</h3>
              <p className="text-gray-600 mb-4">Our offices are open Monday to Friday.</p>
              <Button variant="blue" size="sm" className="group">
                Directions
                <ExternalLink className="ml-1 h-3.5 w-3.5 opacity-70" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex justify-center mb-6 md:mb-0">
              <img 
                src="/lovable-uploads/25877594-b9f1-47b1-9b83-99aed8b6cfc7.png" 
                alt="Nexus FinLabs" 
                className="h-10"
              />
            </div>
            <div className="flex gap-8 mb-6 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a>
              <a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Nexus FinLabs - Observatory. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
