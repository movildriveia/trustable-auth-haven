
import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="section bg-light" id="features">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="section-title">Our Key Features</h2>
            <p className="mb-5">Discover how our platform can transform your financial strategy</p>
          </div>
        </div>
        
        <div className="row align-items-center">
          <div className="col-md-6 order-2 order-md-1">
            <div className="features-content pe-md-5">
              <div className="d-flex mb-4">
                <div className="me-4">
                  <span className="icon-bg p-3 rounded-circle text-white d-inline-flex align-items-center justify-content-center" style={{ backgroundColor: '#008dec' }}>
                    <i className="fas fa-database"></i>
                  </span>
                </div>
                <div>
                  <h4>Data-Driven Insights</h4>
                  <p>Access comprehensive financial data analysis to make informed decisions quickly and effectively.</p>
                </div>
              </div>
              
              <div className="d-flex mb-4">
                <div className="me-4">
                  <span className="icon-bg p-3 rounded-circle text-white d-inline-flex align-items-center justify-content-center" style={{ backgroundColor: '#008dec' }}>
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
                <div>
                  <h4>Enhanced Security</h4>
                  <p>State-of-the-art security measures to protect your financial data and transactions.</p>
                </div>
              </div>
              
              <div className="d-flex mb-4">
                <div className="me-4">
                  <span className="icon-bg p-3 rounded-circle text-white d-inline-flex align-items-center justify-content-center" style={{ backgroundColor: '#008dec' }}>
                    <i className="fas fa-cogs"></i>
                  </span>
                </div>
                <div>
                  <h4>Customizable Solutions</h4>
                  <p>Tailor our platform to meet your specific business needs with flexible and adaptable tools.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 order-1 order-md-2 mb-5 mb-md-0">
            <img src="images/features-img.png" alt="Features" className="img-fluid rounded shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
