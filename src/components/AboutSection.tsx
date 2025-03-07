
import React from 'react';

const AboutSection = () => {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="section-title">About NexusFinLabs</h2>
            <p className="mb-5">
              We are a financial technology observatory dedicated to analyzing market trends, 
              providing advanced data analytics, and delivering strategic insights to help 
              businesses navigate the complex world of financial technology.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card border-0 shadow-sm rounded h-100">
              <div className="card-body text-center p-5">
                <i className="fas fa-chart-line mb-4" style={{ fontSize: '3rem', color: '#008dec' }}></i>
                <h4>Market Analysis</h4>
                <p>Comprehensive market analysis to identify trends and opportunities in the fintech space.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card border-0 shadow-sm rounded h-100">
              <div className="card-body text-center p-5">
                <i className="fas fa-laptop-code mb-4" style={{ fontSize: '3rem', color: '#008dec' }}></i>
                <h4>Technology Assessment</h4>
                <p>Evaluation of emerging technologies and their potential impact on financial services.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card border-0 shadow-sm rounded h-100">
              <div className="card-body text-center p-5">
                <i className="fas fa-lightbulb mb-4" style={{ fontSize: '3rem', color: '#008dec' }}></i>
                <h4>Strategic Consulting</h4>
                <p>Expert guidance on strategic initiatives to leverage fintech innovations effectively.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
