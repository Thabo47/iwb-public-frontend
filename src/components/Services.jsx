"use client"

const Services = () => {
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "80px 20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    wrapper: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "80px",
    },
    title: {
      color: "#2c3e50",
      fontSize: "3.5rem",
      fontWeight: "800",
      marginBottom: "20px",
      position: "relative",
      display: "inline-block",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    titleUnderline: {
      position: "absolute",
      bottom: "-15px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "120px",
      height: "4px",
      background: "linear-gradient(90deg, #3498db, #2ecc71)",
      borderRadius: "2px",
    },
    subtitle: {
      color: "#7f8c8d",
      fontSize: "1.3rem",
      maxWidth: "700px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    servicesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
      gap: "40px",
      marginBottom: "80px",
    },
    serviceCard: {
      backgroundColor: "#ffffff",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
      border: "1px solid rgba(255,255,255,0.2)",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    serviceCardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    },
    serviceIcon: {
      fontSize: "3.5rem",
      marginBottom: "25px",
      display: "block",
    },
    serviceTitle: {
      color: "#2c3e50",
      fontSize: "1.6rem",
      marginBottom: "20px",
      fontWeight: "700",
    },
    serviceDescription: {
      color: "#555",
      lineHeight: "1.7",
      fontSize: "1.1rem",
    },
    whyChooseSection: {
      backgroundColor: "#ffffff",
      padding: "60px 40px",
      borderRadius: "20px",
      marginBottom: "60px",
      boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    },
    whyChooseTitle: {
      color: "#2c3e50",
      fontSize: "2.5rem",
      marginBottom: "40px",
      textAlign: "center",
      fontWeight: "700",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "25px",
    },
    featureItem: {
      backgroundColor: "#f8f9fa",
      padding: "25px 30px",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
      transition: "all 0.3s ease",
      border: "2px solid transparent",
    },
    featureItemHover: {
      backgroundColor: "#ffffff",
      borderColor: "#3498db",
      transform: "translateY(-3px)",
    },
    featureIcon: {
      color: "#3498db",
      marginRight: "15px",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    featureText: {
      fontSize: "1.1rem",
      fontWeight: "500",
      color: "#2c3e50",
    },
    ctaSection: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "60px 40px",
      borderRadius: "20px",
      textAlign: "center",
      boxShadow: "0 15px 35px rgba(102,126,234,0.3)",
    },
    ctaTitle: {
      fontSize: "2.2rem",
      marginBottom: "20px",
      fontWeight: "700",
    },
    ctaDescription: {
      fontSize: "1.2rem",
      maxWidth: "700px",
      margin: "0 auto 35px",
      lineHeight: "1.6",
      opacity: "0.95",
    },
    ctaButton: {
      background: "rgba(255,255,255,0.2)",
      color: "white",
      border: "2px solid rgba(255,255,255,0.3)",
      padding: "15px 40px",
      borderRadius: "50px",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none",
      display: "inline-block",
    },
    ctaButtonHover: {
      backgroundColor: "rgba(255,255,255,0.3)",
      borderColor: "rgba(255,255,255,0.5)",
      transform: "translateY(-2px)",
    },
  }

  const services = [
    {
      title: "RAM Recycling",
      description:
        "Professional extraction and refurbishment of functional memory modules from outdated systems, ensuring maximum value recovery.",
      icon: "🧠",
    },
    {
      title: "Hard Drive Processing",
      description:
        "Secure data wiping and material recovery from hard drives, guaranteeing both data security and environmental sustainability.",
      icon: "💾",
    },
    {
      title: "Motherboard Recovery",
      description:
        "Advanced recovery and repurposing of valuable components from motherboards, minimizing environmental impact while maximizing resource utilization.",
      icon: "🔌",
    },
  ]

  const features = [
    "Certified sustainable recycling practices",
    "Military-grade data destruction",
    "ISO 14001 environmental standards",
    "Trusted by 500+ businesses",
    "Regional market leadership",
    "Zero-waste-to-landfill policy",
  ]

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            Our Services
            <span style={styles.titleUnderline}></span>
          </h1>
          <p style={styles.subtitle}>
            Comprehensive e-waste solutions that protect your data, recover valuable resources, and safeguard our planet
            for future generations.
          </p>
        </div>

        <div style={styles.servicesGrid}>
          {services.map((service, index) => (
            <div
              key={index}
              style={styles.serviceCard}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.serviceCardHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.serviceCard)}
            >
              <span style={styles.serviceIcon}>{service.icon}</span>
              <h3 style={styles.serviceTitle}>{service.title}</h3>
              <p style={styles.serviceDescription}>{service.description}</p>
            </div>
          ))}
        </div>

        <div style={styles.whyChooseSection}>
          <h2 style={styles.whyChooseTitle}>Why Choose IWB?</h2>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={styles.featureItem}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.featureItemHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.featureItem)}
              >
                <span style={styles.featureIcon}>✓</span>
                <span style={styles.featureText}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.ctaSection}>
          <h3 style={styles.ctaTitle}>Ready to Recycle Responsibly?</h3>
          <p style={styles.ctaDescription}>
            Join hundreds of businesses and individuals who trust IWB for secure, sustainable e-waste recycling. Contact
            us today to learn how we can help you dispose of your electronics responsibly.
          </p>
          <a
            href="/contact"
            style={styles.ctaButton}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.ctaButtonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.ctaButton)}
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  )
}

export default Services
