
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // Función para redireccionar a la página de registro
  const handleSignUp = () => {
    navigate('/register');
  };

  // Función para redireccionar a la página de login
  const handleLogin = () => {
    navigate('/login');
  };

  // Código para manejar el formulario de typeform
  useEffect(() => {
    // Configurar listener para el botón Start Now
    const startNowBtn = document.getElementById('start-now-btn');
    const formContainer = document.getElementById('form-container');
    
    if (startNowBtn && formContainer) {
      startNowBtn.addEventListener('click', () => {
        formContainer.style.display = 'block';
      });
    }

    // Configurar listener para el botón de email (Ask)
    const setupEmailButton = () => {
      const askButton = document.getElementById('ask');
      if (askButton) {
        const part1 = ["%6e", "%65", "%78", "%75", "%73", "%66", "%69", "%6e", "%6c", "%61", "%62", "%73"];
        const part2 = ["%40"];
        const part3 = ["%6e", "%65", "%78", "%75", "%73", "%66", "%69", "%6e", "%6c", "%61", "%62", "%73", "%2e", "%63", "%6f", "%6d"];
        const actionParts = ["%6d", "%61", "%69", "%6c", "%74", "%6f", "%3a"];

        const action = decodeURIComponent(actionParts.join(""));
        const user = decodeURIComponent(part1.join(""));
        const domain = decodeURIComponent(part3.join(""));
        const separator = decodeURIComponent(part2.join(""));

        const fullAddress = action + user + separator + domain;

        askButton.addEventListener('click', () => {
          window.location.href = fullAddress;
        });
      }
    };

    setupEmailButton();

    // Limpieza de event listeners
    return () => {
      if (startNowBtn) {
        startNowBtn.removeEventListener('click', () => {});
      }
      if (document.getElementById('ask')) {
        document.getElementById('ask')?.removeEventListener('click', () => {});
      }
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <section className="fixed-top navigation">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="index.html"><img src="images/logo.png" alt="logo" /></a>
            <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* Navbar */}
            <div className="collapse navbar-collapse text-center" id="navbar">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="index.html">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link page-scroll" href="#pricing">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact.html">Contact</a>
                </li>
              </ul>
              <button onClick={handleSignUp} className="btn btn-primary primary-shadow mr-3">Sign up</button>
              <button onClick={handleLogin} className="btn btn-secondary primary-shadow">Login</button>
            </div>
          </nav>
        </div>
      </section>

      {/* Hero Area */}
      <section className="hero-section hero" data-background="" style={{ backgroundImage: "url(images/hero-area/banner-bg.png)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center zindex-1">
              <h1 className="mb-3"> FinTech<br />Observatory</h1>
              <p className="mb-4">
                Your financial playground.<br />
                Powered by data, built for you.</p>
              <a href="#pricing" className="btn btn-secondary btn-lg">Contact us</a>
              {/* Banner image */}
              <img className="img-fluid w-100 banner-image" src="images/hero-area/banner-img.png" alt="banner-img" />
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

      {/* Pricing */}
      <section className="section-lg pb-0 pricing" id="pricing">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">Collaboration</h2>
            </div>
            <div className="col-lg-10 mx-auto">
              <div className="row justify-content-center">

                {/* Pricing table */}
                <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
                  <div className="rounded text-center pricing-table table-1">
                    <h3>Write</h3>
                    <p>Drop us an email to know more about us.</p>
                    <a id="ask" className="btn btn-primary">Email Us</a>
                  </div>
                </div>

                {/* Pricing table */}
                <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
                  <div className="rounded text-center pricing-table table-2">
                    <h3>Call</h3>
                    <p>Schedule an online meeting with us to enable a comprehensive advisory session.</p>
                    <a className="btn btn-primary" href="https://calendly.com/nexusfinlabs/30-min-meeting">Book</a>
                  </div>
                </div>

                {/* Pricing table */}
                <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
                  <div className="rounded text-center pricing-table table-3">
                    <h3>Custom Analysis</h3>
                    <p>Request a custom strategic roadmap covering Market Research, Feasibility Study, and more.</p>
                    <a href="contact.html" className="btn btn-secondary">Contact</a>
                  </div>
                </div>
              </div>

              {/* Ready to Start Section */}
              <div className="row justify-content-center mt-5">
                <div className="col-lg-6">
                  <div className="rounded text-center pricing-table table-4">
                    <h3>Ready to Start?</h3>
                    <p>Kickstart your journey with us by filling out a quick form to get to know you better!</p>
                    <a id="start-now-btn" className="btn btn-primary ml-lg-3 primary-shadow">Start Now</a>
                    <div id="form-container" style={{ display: 'none', marginTop: '20px' }}>
                      <iframe src="https://form.typeform.com/to/m94ft0kb" width="100%" height="500px" style={{ border: 'none' }}></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background shapes */}
        <img className="pricing-bg-shape-1 up-down-animation" src="images/background-shape/seo-ball-1.png" alt="background-shape" />
        <img className="pricing-bg-shape-2 up-down-animation" src="images/background-shape/seo-half-cycle.png" alt="background-shape" />
        <img className="pricing-bg-shape-3 left-right-animation" src="images/background-shape/team-bg-triangle.png" alt="background-shape" />
      </section>

      {/* Footer */}
      <footer className="footer-section footer" style={{ backgroundImage: "url(images/backgrounds/footer-bg.png)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 text-center text-lg-left mb-4 mb-lg-0">
              {/* Logo */}
              <a href="index.html">
                <img className="img-fluid" src="images/logo.png" alt="logo" />
              </a>
            </div>
            <div className="col-lg-8 text-center text-lg-right">
              <p className="mb-0 text-white">&copy; 2023 NexusFinLabs. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
