import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.css';
import { FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Logo and Description */}
        <div className="footer-section">
          <h3>CalcHub</h3>
          <p>Your trusted source for all calculation needs.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a onClick={() => handleNavigation('hero')} style={{ cursor: 'pointer' }}>Home</a>
            </li>
            <li>
              <a onClick={() => handleNavigation('calculators')} style={{ cursor: 'pointer' }}>About</a>
            </li>
            <li>
              <a onClick={() => handleNavigation('contact')} style={{ cursor: 'pointer' }}>Team</a>
            </li>
            {/* Contact Us Link */}
            <li>
              <a onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Team Members</h3>
          <ul className="contact-list">
            <li>
              Saad Shakeel:
              <a href="mailto:ultrasaad04@gmail.com" className="email-icon">
                <FaEnvelope />
              </a>
              <span className="email-text">ultrasaad04@gmail.com</span>
            </li>
            <li>
              Laiba Tauseef:
              <a href="mailto:laibatauseef7@gmail.com" className="email-icon">
                <FaEnvelope />
              </a>
              <span className="email-text">laibatauseef7@gmail.com</span>
            </li>
            <li>
              Ali Asghar:
              <a href="mailto:ali.asgharhere786@gmail.com" className="email-icon">
                <FaEnvelope />
              </a>
              <span className="email-text">ali.asgharhere786@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CalcHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
