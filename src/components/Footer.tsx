
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section footer" style={{ backgroundImage: "url(images/backgrounds/footer-bg.png)" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            {/* Logo */}
            <a href="/">
              <img className="img-fluid" src="images/logo.png" alt="logo" />
            </a>
            <p className="mt-4 text-white-50">Your trusted partner in financial technology innovation and strategic insights.</p>
          </div>
          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h5 className="text-white mb-4">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h5 className="text-white mb-4">Services</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="#pricing">Market Analysis</a></li>
              <li><a href="#pricing">Technology Assessment</a></li>
              <li><a href="#pricing">Strategic Consulting</a></li>
              <li><a href="#pricing">Custom Solutions</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">Connect With Us</h5>
            <p className="text-white-50">Stay updated with our latest insights and developments</p>
            <div className="social-icons mt-4">
              <a href="#" className="me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="me-3"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 text-center">
            <p className="mb-0 text-white">&copy; 2023 NexusFinLabs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
