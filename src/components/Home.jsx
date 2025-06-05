"use client"

const Home = () => {
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "0",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    heroSection: {
      padding: "120px 20px 80px",
      textAlign: "center",
      color: "white",
    },
    heroTitle: {
      fontSize: "4rem",
      fontWeight: "800",
      marginBottom: "25px",
      textShadow: "0 4px 20px rgba(0,0,0,0.3)",
      letterSpacing: "-0.02em",
      lineHeight: "1.1",
    },
    heroSubtitle: {
      fontSize: "1.4rem",
      marginBottom: "40px",
      opacity: "0.95",
      maxWidth: "800px",
      margin: "0 auto 40px",
      lineHeight: "1.6",
    },
    heroButtons: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: "80px",
    },
    primaryButton: {
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
      backdropFilter: "blur(10px)",
    },
    primaryButtonHover: {
      backgroundColor: "rgba(255,255,255,0.3)",
      borderColor: "rgba(255,255,255,0.5)",
      transform: "translateY(-2px)",
    },
    secondaryButton: {
      background: "transparent",
      color: "white",
      border: "2px solid rgba(255,255,255,0.5)",
      padding: "15px 40px",
      borderRadius: "50px",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none",
    },
    contentSection: {
      backgroundColor: "#ffffff",
      padding: "80px 20px",
      margin: "0",
    },
    contentWrapper: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    sectionTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "50px",
      color: "#2c3e50",
    },
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "40px",
      marginBottom: "60px",
    },
    card: {
      backgroundColor: "#f8f9fa",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
      border: "1px solid rgba(0,0,0,0.05)",
    },
    cardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    },
    cardIcon: {
      fontSize: "3rem",
      marginBottom: "20px",
      display: "block",
    },
    cardTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      marginBottom: "15px",
      color: "#2c3e50",
    },
    cardText: {
      fontSize: "1.1rem",
      lineHeight: "1.6",
      color: "#555",
    },
    statsSection: {
      background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
      padding: "80px 20px",
      color: "white",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "40px",
      maxWidth: "1000px",
      margin: "0 auto",
      textAlign: "center",
    },
    statItem: {
      padding: "20px",
    },
    statNumber: {
      fontSize: "3rem",
      fontWeight: "800",
      marginBottom: "10px",
      background: "linear-gradient(135deg, #3498db, #2ecc71)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    statLabel: {
      fontSize: "1.1rem",
      opacity: "0.9",
    },
    finalCta: {
      backgroundColor: "#ffffff",
      padding: "80px 20px",
      textAlign: "center",
    },
    ctaTitle: {
      fontSize: "2.2rem",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#2c3e50",
    },
    ctaText: {
      fontSize: "1.2rem",
      color: "#7f8c8d",
      maxWidth: "600px",
      margin: "0 auto 40px",
      lineHeight: "1.6",
    },
  }

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Welcome to IWB ♻️</h1>
        <p style={styles.heroSubtitle}>
          Leading Southern Africa's sustainable e-waste revolution. We transform electronic waste into valuable
          resources while protecting our planet for future generations.
        </p>
        <div style={styles.heroButtons}>
          <a
            href="/services"
            style={styles.primaryButton}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.primaryButtonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.primaryButton)}
          >
            Our Services
          </a>
          <a
            href="/contact"
            style={styles.secondaryButton}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.primaryButtonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.secondaryButton)}
          >
            Get Started
          </a>
        </div>
      </div>

      {/* About Section */}
      <div style={styles.contentSection}>
        <div style={styles.contentWrapper}>
          <h2 style={styles.sectionTitle}>About IWB</h2>
          <div style={styles.cardsGrid}>
            <div
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.cardHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.card)}
            >
              <span style={styles.cardIcon}>🌍</span>
              <h3 style={styles.cardTitle}>Our Mission</h3>
              <p style={styles.cardText}>
                IWB is dedicated to revolutionizing e-waste management across Southern Africa. We specialize in
                recycling RAMs, Hard Drives, and motherboard components to create a sustainable future.
              </p>
            </div>

            <div
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.cardHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.card)}
            >
              <span style={styles.cardIcon}>🚀</span>
              <h3 style={styles.cardTitle}>Our Journey</h3>
              <p style={styles.cardText}>
                Founded in 2024 with M100,000 capital by Kenneth and later joined by Shadrack, IWB has rapidly grown
                into a pioneer in the electronic recycling sector.
              </p>
            </div>

            <div
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.cardHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.card)}
            >
              <span style={styles.cardIcon}>🤝</span>
              <h3 style={styles.cardTitle}>Our Network</h3>
              <p style={styles.cardText}>
                We proudly serve partners, investors, and clients across Lesotho and beyond, building a comprehensive
                network of sustainable technology solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsSection}>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>M100K</div>
            <div style={styles.statLabel}>Initial Capital</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>2024</div>
            <div style={styles.statLabel}>Year Founded</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>500+</div>
            <div style={styles.statLabel}>Devices Recycled</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>100%</div>
            <div style={styles.statLabel}>Sustainable Process</div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div style={styles.finalCta}>
        <h2 style={styles.ctaTitle}>Ready to Make a Difference?</h2>
        <p style={styles.ctaText}>
          Join us in creating a sustainable future through responsible e-waste recycling. Together, we can protect our
          environment while recovering valuable resources.
        </p>
        <a
          href="/contact"
          style={styles.primaryButton}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.primaryButtonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.primaryButton)}
        >
          Contact Us Today
        </a>
      </div>
    </div>
  )
}

export default Home
