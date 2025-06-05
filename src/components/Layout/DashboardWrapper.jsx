const DashboardWrapper = ({ children, title, subtitle, actions }) => {
  const styles = {
    wrapper: {
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      padding: "2rem",
    },
    header: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "1.5rem 2rem",
      marginBottom: "2rem",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      border: "1px solid rgba(0, 0, 0, 0.05)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem",
    },
    titleSection: {
      flex: 1,
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "0.25rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#64748b",
      fontWeight: "400",
    },
    actions: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
    },
    content: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "2rem",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      border: "1px solid rgba(0, 0, 0, 0.05)",
      minHeight: "calc(100vh - 200px)",
    },
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div style={styles.titleSection}>
          {title && <h1 style={styles.title}>{title}</h1>}
          {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
        </div>
        {actions && <div style={styles.actions}>{actions}</div>}
      </div>
      <div style={styles.content}>{children}</div>
    </div>
  )
}

export default DashboardWrapper
