"use client"

const Footer = () => {
  const styles = {
    footerContainer: {
      background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
      color: "#ecf0f1",
      padding: "60px 0 20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    footerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "40px",
    },
    footerSection: {
      marginBottom: "30px",
    },
    footerTitle: {
      fontSize: "1.4rem",
      fontWeight: "700",
      marginBottom: "25px",
      color: "#ffffff",
      position: "relative",
      paddingBottom: "10px",
    },
    titleUnderline: {
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "40px",
      height: "3px",
      background: "linear-gradient(90deg, #3498db, #2ecc71)",
      borderRadius: "2px",
    },
    aboutText: {
      lineHeight: "1.7",
      color: "#bdc3c7",
      fontSize: "1rem",
      marginBottom: "25px",
    },
    socialIcons: {
      display: "flex",
      gap: "15px",
    },
    socialIcon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "45px",
      height: "45px",
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: "50%",
      color: "#ecf0f1",
      textDecoration: "none",
      fontSize: "1.2rem",
      transition: "all 0.3s ease",
      border: "2px solid transparent",
    },
    socialIconHover: {
      backgroundColor: "#3498db",
      transform: "translateY(-3px)",
      boxShadow: "0 8px 20px rgba(52,152,219,0.3)",
    },
    footerLinks: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    footerLinkItem: {
      marginBottom: "12px",
    },
    footerLink: {
      color: "#bdc3c7",
      textDecoration: "none",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      display: "inline-block",
      position: "relative",
    },
    footerLinkHover: {
      color: "#3498db",
      paddingLeft: "10px",
    },
    contactInfo: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "15px",
      color: "#bdc3c7",
    },
    contactIcon: {
      marginRight: "12px",
      marginTop: "2px",
      color: "#3498db",
      fontSize: "1.1rem",
    },
    copyright: {
      borderTop: "1px solid rgba(255,255,255,0.1)",
      marginTop: "40px",
      paddingTop: "25px",
      textAlign: "center",
      color: "#95a5a6",
      fontSize: "0.95rem",
    },
  }

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
            <a
              href="#"
              style={styles.socialIcon}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.socialIconHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.socialIcon)}
            >
              📘
            </a>
            <a
              href="#"
              style={styles.socialIcon}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.socialIconHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.socialIcon)}
            >
              🐦
            </a>
            <a
              href="#"
              style={styles.socialIcon}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.socialIconHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.socialIcon)}
            >
              📷
            </a>
            <a
              href="#"
              style={styles.socialIcon}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.socialIconHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.socialIcon)}
            >
              💼
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={styles.footerSection}>
          <h3 style={styles.footerTitle}>
            Quick Links
            <span style={styles.titleUnderline}></span>
          </h3>
          <ul style={styles.footerLinks}>
            {["Home", "About", "Services", "Contact", "Investor Dashboard"].map((item) => (
              <li key={item} style={styles.footerLinkItem}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  style={styles.footerLink}
                  onMouseEnter={(e) => Object.assign(e.target.style, styles.footerLinkHover)}
                  onMouseLeave={(e) => Object.assign(e.target.style, styles.footerLink)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div style={styles.footerSection}>
          <h3 style={styles.footerTitle}>
            Our Services
            <span style={styles.titleUnderline}></span>
          </h3>
          <ul style={styles.footerLinks}>
            {[
              "RAM Recycling",
              "Hard Drive Processing",
              "Motherboard Recovery",
              "Data Destruction",
              "Component Refurbishment",
            ].map((service) => (
              <li key={service} style={styles.footerLinkItem}>
                <a
                  href="#"
                  style={styles.footerLink}
                  onMouseEnter={(e) => Object.assign(e.target.style, styles.footerLinkHover)}
                  onMouseLeave={(e) => Object.assign(e.target.style, styles.footerLink)}
                >
                  {service}
                </a>
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
            <span>
              123 Eco Park, Suite 400
              <br />
              Maseru, Lesotho
            </span>
          </div>
          <div style={styles.contactInfo}>
            <span style={styles.contactIcon}>📞</span>
            <span>+266 1234 5678</span>
          </div>
          <div style={styles.contactInfo}>
            <span style={styles.contactIcon}>📧</span>
            <span>info@iwb.co.ls</span>
          </div>
          <div style={styles.contactInfo}>
            <span style={styles.contactIcon}>🌐</span>
            <span>www.iwb.co.ls</span>
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
