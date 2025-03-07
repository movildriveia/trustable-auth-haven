
import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section hero" data-background="" style={{ backgroundImage: "url(images/hero-area/banner-bg.png)" }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 text-center text-lg-left mb-5 mb-lg-0">
            <h1 className="mb-3">FinTech Observatory</h1>
            <p className="mb-4">
              Your financial playground. Powered by data, built for you.
              Discover the future of financial technology with our cutting-edge platform.
            </p>
            <div className="d-flex flex-column flex-sm-row">
              <a href="#pricing" className="btn btn-secondary btn-lg mr-3 mb-3 mb-sm-0">Explore Services</a>
              <a href="#about" className="btn btn-outline-primary btn-lg">Learn More</a>
            </div>
          </div>
          <div className="col-lg-7">
            <img className="img-fluid w-100" src="images/hero-area/banner-img.png" alt="banner-img" />
          </div>
        </div>
      </div>

      {/* Background shapes */}
      <div id="scene">
        <img className="img-fluid hero-bg-1 up-down-animation" src="images/background-shape/feature-bg-2.png" alt="" />
        <img className="img-fluid hero-bg-2 left-right-animation" src="images/background-shape/seo-ball-1.png" alt="" />
        <img className="img-fluid hero-bg-3 left-right-animation" src="images/background-shape/seo-half-cycle.png" alt="" />
        <img className="img-fluid hero-bg-4 up-down-animation" src="images/background-shape/green-dot.png" alt="" />
        <img className="img-fluid hero-bg-5 left-right-animation" src="images/background-shape/blue-half-cycle.png" alt="" />
        <img className="img-fluid hero-bg-6 up-down-animation" src="images/background-shape/seo-ball-1.png" alt="" />
        <img className="img-fluid hero-bg-7 left-right-animation" src="images/background-shape/yellow-triangle.png" alt="" />
        <img className="img-fluid hero-bg-8 up-down-animation" src="images/background-shape/service-half-cycle.png" alt="" />
        <img className="img-fluid hero-bg-9 up-down-animation" src="images/background-shape/team-bg-triangle.png" alt="" />
      </div>
    </section>
  );
};

export default HeroSection;
