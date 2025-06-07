"use client"

import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  const styles = {
    footerContainer: {
      background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
      color: "#ecf0f1",
      padding: "40px 0 20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    footerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "30px",
    },
    footerSection: {
      marginBottom: "20px",
    },
    footerTitle: {
      fontSize: "1.2rem",
      fontWeight: "600",
      marginBottom: "15px",
      color: "#ffffff",
      position: "relative",
      paddingBottom: "8px",
    },
    titleUnderline: {
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "30px",
      height: "2px",
      background: "linear-gradient(90deg, #3498db, #2ecc71)",
      borderRadius: "2px",
    },
    aboutText: {
      lineHeight: "1.6",
      color: "#bdc3c7",
      fontSize: "0.9rem",
      marginBottom: "20px",
    },
    socialIcons: {
      display: "flex",
      gap: "12px",
    },
    socialIcon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "36px",
      height: "36px",
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: "50%",
      color: "#ecf0f1",
      textDecoration: "none",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    footerLinks: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    footerLinkItem: {
      marginBottom: "10px",
    },
    footerLink: {
      color: "#bdc3c7",
      textDecoration: "none",
      fontSize: "0.9rem",
      transition: "all 0.2s ease",
      display: "inline-block",
    },
    footerLinkHover: {
      color: "#3498db",
      transform: "translateX(5px)",
    },
    contactInfo: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "12px",
      color: "#bdc3c7",
      fontSize: "0.9rem",
    },
    contactIcon: {
      marginRight: "10px",
      color: "#3498db",
      fontSize: "1rem",
    },
    copyright: {
      borderTop: "1px solid rgba(255,255,255,0.1)",
      marginTop: "30px",
      paddingTop: "20px",
      textAlign: "center",
      color: "#95a5a6",
      fontSize: "0.85rem",
    },
  }

  // Helper function for hover effect on links
  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, styles.footerLinkHover)
  }
  const handleMouseLeave = (e) => {
    Object.assign(e.target.style, styles.footerLink)
  }

  const links = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <footer style={styles.footerContainer}>
      <div style={styles.footerContent}>
        {/* About Section */}
        <div style={styles.footerSection}>
          <h3 style={styles.footerTitle}>
            About IWB
            <span style={styles.titleUnderline}></span>
          </h3>
          <p style={styles.aboutText}>
            Leading the way in sustainable e-waste recycling across Southern Africa. We transform electronic waste into
            valuable resources while protecting our environment.
          </p>
          <div style={styles.socialIcons}>
            {['📘', '🐦', '📷'].map((icon, index) => (
              <a
                key={index}
                href="#"
                style={styles.socialIcon}
                onMouseEnter={(e) => (e.target.style.color = "#3498db")}
                onMouseLeave={(e) => (e.target.style.color = "#ecf0f1")}
                aria-label={icon === '📘' ? 'Facebook' : icon === '🐦' ? 'Twitter' : 'Instagram'}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Essential Links */}
        <div style={styles.footerSection}>
          <h3 style={styles.footerTitle}>
            Quick Links
            <span style={styles.titleUnderline}></span>
          </h3>
          <ul style={styles.footerLinks}>
            {links.map(({ name, path }) => (
              <li key={name} style={styles.footerLinkItem}>
                <Link
                  to={path}
                  style={styles.footerLink}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div style={styles.footerSection}>
          <h3 style={styles.footerTitle}>
            Contact Us
            <span style={styles.titleUnderline}></span>
          </h3>
          <div style={styles.contactInfo}>
            <span style={styles.contactIcon}>📍</span>
            <span>123 Eco Park, Maseru, Lesotho</span>
          </div>
          <div style={styles.contactInfo}>
            <span style={styles.contactIcon}>📞</span>
            <span>+266 57292688</span>
          </div>
          <div style={styles.contactInfo}>
            <span style={styles.contactIcon}>📧</span>
            <span>thabo4231@gmail.com</span>
          </div>
        </div>
      </div>

      <div style={styles.copyright}>
        &copy; {new Date().getFullYear()} IWB - Innovative Waste & Business Solutions. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
