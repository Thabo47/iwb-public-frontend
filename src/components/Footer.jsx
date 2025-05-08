import React from 'react';
import './Footer.css'; // We'll create this file next

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section">
          <h3 className="footer-title">About Us</h3>
          <p className="footer-about-text">
            We provide innovative solutions to help businesses grow in the digital era. 
            Our team of experts is dedicated to delivering exceptional results.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Home</a></li>
            <li><a href="#" className="footer-link">About</a></li>
            <li><a href="#" className="footer-link">Services</a></li>
            <li><a href="#" className="footer-link">Products</a></li>
            <li><a href="#" className="footer-link">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3 className="footer-title">Our Services</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Web Development</a></li>
            <li><a href="#" className="footer-link">Mobile Apps</a></li>
            <li><a href="#" className="footer-link">UI/UX Design</a></li>
            <li><a href="#" className="footer-link">Digital Marketing</a></li>
            <li><a href="#" className="footer-link">SEO Services</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <div className="contact-info">
            <i className="fas fa-map-marker-alt contact-icon"></i>
            <span>123 Business Ave, Suite 400<br />San Francisco, CA 94107</span>
          </div>
          <div className="contact-info">
            <i className="fas fa-phone contact-icon"></i>
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="contact-info">
            <i className="fas fa-envelope contact-icon"></i>
            <span>info@yourcompany.com</span>
          </div>
        </div>
      </div>

      <div className="copyright">
        &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;