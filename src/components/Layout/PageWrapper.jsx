const PageWrapper = ({ children, title, subtitle, className = "" }) => {
  const styles = {
    wrapper: {
      minHeight: "100vh",
      padding: "2rem",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    header: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#ffffff",
      padding: "2rem",
      textAlign: "center",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "0.5rem",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    subtitle: {
      fontSize: "1.1rem",
      opacity: 0.9,
      fontWeight: "400",
    },
    content: {
      padding: "2rem",
    },
  }

  return (
    <div style={styles.wrapper} className={className}>
      <div style={styles.container}>
        {(title || subtitle) && (
          <div style={styles.header}>
            {title && <h1 style={styles.title}>{title}</h1>}
            {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
          </div>
        )}
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  )
}

export default PageWrapper
