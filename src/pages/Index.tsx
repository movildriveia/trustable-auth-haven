
import React, { useEffect } from "react";
import BackgroundImage from "@/components/landing/BackgroundImage";
import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  useEffect(() => {
    console.log("Index page component mounted");
    
    // Check if any resources are failing to load
    const handleError = (event: Event) => {
      console.error("Resource failed to load:", event.target);
    };
    
    window.addEventListener('error', handleError, true);
    
    return () => {
      window.removeEventListener('error', handleError, true);
    };
  }, []);

  console.log("Rendering Index page");

  return (
    <div className="min-h-screen flex flex-col font-poppins overflow-x-hidden">
      {/* Background */}
      <BackgroundImage />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
