
import React, { useEffect } from 'react';

const PricingSection = () => {
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
  );
};

export default PricingSection;
