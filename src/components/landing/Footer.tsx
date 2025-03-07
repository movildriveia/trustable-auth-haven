
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-10 z-10 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex justify-center mb-6 md:mb-0">
            <span className="text-xl font-semibold text-white">Nexus FinLabs</span>
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
  );
};

export default Footer;
