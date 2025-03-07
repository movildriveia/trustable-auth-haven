
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';

const Index = () => {
  return (
    <div className="main-wrapper">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
