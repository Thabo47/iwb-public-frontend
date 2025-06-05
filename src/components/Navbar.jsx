"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const styles = {
    navbar: {
      background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
      padding: "1rem 0",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: "0",
      zIndex: "1000",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "1.8rem",
      fontWeight: "800",
      letterSpacing: "1px",
      background: "linear-gradient(135deg, #3498db, #2ecc71)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    navLinks: {
      display: "flex",
      gap: "2.5rem",
      alignItems: "center",
    },
    navLink: {
      color: "#ecf0f1",
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: "500",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      position: "relative",
      transition: "all 0.3s ease",
      textTransform: "capitalize",
    },
    navLinkHover: {
      color: "#3498db",
      backgroundColor: "rgba(52, 152, 219, 0.1)",
    },
    authButtons: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
    },
    loginBtn: {
      color: "#ecf0f1",
      textDecoration: "none",
      padding: "0.5rem 1.5rem",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      fontWeight: "500",
    },
    signupBtn: {
      background: "linear-gradient(135deg, #3498db, #2ecc71)",
      color: "#ffffff",
      textDecoration: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "25px",
      transition: "all 0.3s ease",
      fontWeight: "600",
      boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)",
    },
    signupBtnHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(52, 152, 219, 0.4)",
    },
    mobileMenuBtn: {
      display: "none",
      background: "none",
      border: "none",
      color: "#ecf0f1",
      fontSize: "1.5rem",
      cursor: "pointer",
      padding: "0.5rem",
    },
    mobileMenu: {
      position: "absolute",
      top: "100%",
      left: "0",
      right: "0",
      background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
      padding: "1rem 0",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      display: isMenuOpen ? "block" : "none",
    },
    mobileNavLinks: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      padding: "0 2rem",
    },
    mobileNavLink: {
      color: "#ecf0f1",
      textDecoration: "none",
      padding: "0.75rem 1rem",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      textAlign: "center",
    },
  }

  // Media query simulation for mobile menu
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          IWB ♻️
        </Link>

        {/* Desktop Navigation */}
        <div style={{ ...styles.navLinks, display: window.innerWidth <= 768 ? "none" : "flex" }}>
          {["Home", "About", "Services", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              style={styles.navLink}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.navLinkHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.navLink)}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div style={{ ...styles.authButtons, display: window.innerWidth <= 768 ? "none" : "flex" }}>
          <Link
            to="/login"
            style={styles.loginBtn}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.navLinkHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.loginBtn)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={styles.signupBtn}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.signupBtnHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.signupBtn)}
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          style={{ ...styles.mobileMenuBtn, display: window.innerWidth <= 768 ? "block" : "none" }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div style={styles.mobileMenu}>
        <div style={styles.mobileNavLinks}>
          {["Home", "About", "Services", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              style={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link to="/login" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
          <Link to="/signup" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
