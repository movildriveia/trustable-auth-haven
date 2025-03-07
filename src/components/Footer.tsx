
import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
