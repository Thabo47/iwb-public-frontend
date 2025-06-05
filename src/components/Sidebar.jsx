"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Home, Info, Settings, Mail, LogIn, UserPlus, Menu, X, Recycle } from "lucide-react"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const isActiveLink = (path) => {
    return window.location.pathname === path
  }

  const styles = {
    sidebar: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: isOpen ? "250px" : "0px",
      backgroundColor: "#1e293b",
      overflowX: "hidden",
      transition: "0.3s",
      paddingTop: "20px",
      zIndex: 1000,
    },
    openButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      fontSize: "24px",
      cursor: "pointer",
      color: "white",
      zIndex: 1001,
    },
    closeButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      fontSize: "24px",
      cursor: "pointer",
      color: "white",
    },
    menu: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      color: "#cbd5e1",
      textDecoration: "none",
      transition: "background-color 0.3s",
      fontSize: "16px",
    },
    menuItemHover: {
      backgroundColor: "#334155",
      color: "white",
    },
    menuItemActive: {
      backgroundColor: "#475569",
      color: "white",
    },
    icon: {
      marginRight: "10px",
      width: "20px",
      height: "20px",
    },
    section: {
      marginBottom: "20px",
    },
    sectionTitle: {
      color: "#94a3b8",
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  }

  return (
    <>
      <div style={styles.openButton} onClick={toggleSidebar}>
        <Menu />
      </div>
      <div style={styles.sidebar}>
        <div style={styles.closeButton} onClick={closeSidebar}>
          <X />
        </div>

        {/* Main Navigation */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Main</div>
          <Link
            to="/"
            style={{
              ...styles.menuItem,
              ...(isActiveLink("/") ? styles.menuItemActive : {}),
            }}
            onClick={closeSidebar}
            onMouseEnter={(e) => {
              if (!isActiveLink("/")) {
                Object.assign(e.target.style, {
                  ...styles.menuItem,
                  ...styles.menuItemHover,
                })
              }
            }}
            onMouseLeave={(e) => {
              if (!isActiveLink("/")) {
                Object.assign(e.target.style, styles.menuItem)
              }
            }}
          >
            <Home style={styles.icon} />
            <span>Home</span>
          </Link>
          <Link
            to="/about"
            style={{
              ...styles.menuItem,
              ...(isActiveLink("/about") ? styles.menuItemActive : {}),
            }}
            onClick={closeSidebar}
            onMouseEnter={(e) => {
              if (!isActiveLink("/about")) {
                Object.assign(e.target.style, {
                  ...styles.menuItem,
                  ...styles.menuItemHover,
                })
              }
            }}
            onMouseLeave={(e) => {
              if (!isActiveLink("/about")) {
                Object.assign(e.target.style, styles.menuItem)
              }
            }}
          >
            <Info style={styles.icon} />
            <span>About</span>
          </Link>
          <Link
            to="/services"
            style={{
              ...styles.menuItem,
              ...(isActiveLink("/services") ? styles.menuItemActive : {}),
            }}
            onClick={closeSidebar}
            onMouseEnter={(e) => {
              if (!isActiveLink("/services")) {
                Object.assign(e.target.style, {
                  ...styles.menuItem,
                  ...styles.menuItemHover,
                })
              }
            }}
            onMouseLeave={(e) => {
              if (!isActiveLink("/services")) {
                Object.assign(e.target.style, styles.menuItem)
              }
            }}
          >
            <Settings style={styles.icon} />
            <span>Services</span>
          </Link>
          <Link
            to="/contact"
            style={{
              ...styles.menuItem,
              ...(isActiveLink("/contact") ? styles.menuItemActive : {}),
            }}
            onClick={closeSidebar}
            onMouseEnter={(e) => {
              if (!isActiveLink("/contact")) {
                Object.assign(e.target.style, {
                  ...styles.menuItem,
                  ...styles.menuItemHover,
                })
              }
            }}
            onMouseLeave={(e) => {
              if (!isActiveLink("/contact")) {
                Object.assign(e.target.style, styles.menuItem)
              }
            }}
          >
            <Mail style={styles.icon} />
            <span>Contact</span>
          </Link>
        </div>

        {/* Authentication */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Authentication</div>
          <Link
            to="/login"
            style={{
              ...styles.menuItem,
              ...(isActiveLink("/login") ? styles.menuItemActive : {}),
            }}
            onClick={closeSidebar}
            onMouseEnter={(e) => {
              if (!isActiveLink("/login")) {
                Object.assign(e.target.style, {
                  ...styles.menuItem,
                  ...styles.menuItemHover,
                })
              }
            }}
            onMouseLeave={(e) => {
              if (!isActiveLink("/login")) {
                Object.assign(e.target.style, styles.menuItem)
              }
            }}
          >
            <LogIn style={styles.icon} />
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            style={{
              ...styles.menuItem,
              ...(isActiveLink("/register") ? styles.menuItemActive : {}),
            }}
            onClick={closeSidebar}
            onMouseEnter={(e) => {
              if (!isActiveLink("/register")) {
                Object.assign(e.target.style, {
                  ...styles.menuItem,
                  ...styles.menuItemHover,
                })
              }
            }}
            onMouseLeave={(e) => {
              if (!isActiveLink("/register")) {
                Object.assign(e.target.style, styles.menuItem)
              }
            }}
          >
            <UserPlus style={styles.icon} />
            <span>Register</span>
          </Link>
        </div>

        {/* Utilities */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Utilities</div>
          <Link
            to="/recycle"
            style={{
              ...styles.menuItem,
              ...(isActiveLink("/recycle") ? styles.menuItemActive : {}),
            }}
            onClick={closeSidebar}
            onMouseEnter={(e) => {
              if (!isActiveLink("/recycle")) {
                Object.assign(e.target.style, {
                  ...styles.menuItem,
                  ...styles.menuItemHover,
                })
              }
            }}
            onMouseLeave={(e) => {
              if (!isActiveLink("/recycle")) {
                Object.assign(e.target.style, styles.menuItem)
              }
            }}
          >
            <Recycle style={styles.icon} />
            <span>Recycle</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar
