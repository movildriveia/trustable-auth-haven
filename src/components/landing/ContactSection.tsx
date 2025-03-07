
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50 z-10 relative">
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
            <h3 className="text-xl font-semibold mb-2 text-custom-dark">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us an email with your questions or requirements.</p>
            <Button 
              variant="gradient" 
              size="lg" 
              className="group w-full justify-center"
              onClick={() => window.location.href = 'mailto:info@nexusfinlabs.com'}
            >
              Contact Us
              <ExternalLink className="ml-1 h-3.5 w-3.5 opacity-70" />
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center border border-gray-100 hover:border-blue-100">
            <h3 className="text-xl font-semibold mb-2 text-custom-dark">Call Us</h3>
            <p className="text-gray-600 mb-4">Schedule a call to discuss your project.</p>
            <Button 
              variant="blue" 
              size="lg" 
              className="group w-full justify-center"
              onClick={() => window.location.href = 'tel:+1234567890'}
            >
              Book Call
              <ExternalLink className="ml-1 h-3.5 w-3.5 opacity-70" />
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center border border-gray-100 hover:border-blue-100">
            <h3 className="text-xl font-semibold mb-2 text-custom-dark">Visit Us</h3>
            <p className="text-gray-600 mb-4">Our offices are open Monday to Friday.</p>
            <Button 
              variant="reverseGradient" 
              size="lg" 
              className="group w-full justify-center"
              onClick={() => window.open('https://maps.google.com', '_blank')}
            >
              Get Location
              <ExternalLink className="ml-1 h-3.5 w-3.5 opacity-70" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
