"use client"
import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SidebarTrigger } from "./ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar"

const AppSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // State to track login status and user info
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  // On mount, read login status from localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
    if (loggedIn) {
      const storedUser = localStorage.getItem('user')
      setUser(storedUser ? JSON.parse(storedUser) : null)
    } else {
      setUser(null)
    }
  }, [])

  // Handle logout and update state
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUser(null)
    navigate('/login')
  }

  const handleNavigation = (url) => {
    if (url === '/logout') {
      handleLogout()
      return
    }
    navigate(url)
  }

  const navigationItems = [
    { title: "Home", url: "/home", icon: "🏠" },
    { title: "About", url: "/about", icon: "ℹ️" },
    { title: "Services", url: "/services", icon: "⚙️" },
    { title: "Contact", url: "/contact", icon: "📞" },
  ]

  const accountItems = !isLoggedIn ? [
    { title: "Login", url: "/login", icon: "🔑" },
    { title: "Sign Up", url: "/signup", icon: "👤" }
  ] : [
    { title: "Profile", url: "/profile", icon: "👤" },
    { title: "Logout", url: "/logout", icon: "🚪" }
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        {/* ... your existing header code ... */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              cursor: "pointer",
            }}
            onClick={() => handleNavigation("/home")}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "0.5rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "1rem",
              }}
            >
              ♻️
            </div>
            <div>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#1e293b",
                  margin: 0,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                IWB
              </h2>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  margin: 0,
                }}
              >
                E-Waste Solutions
              </p>
            </div>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    onClick={() => handleNavigation(item.url)}
                  >
                    <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    onClick={() => handleNavigation(item.url)}
                  >
                    <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {isLoggedIn && user && (
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    borderTop: '1px solid #e2e8f0',
                    marginTop: '0.5rem'
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      marginBottom: '0.25rem'
                    }}
                  >
                    Logged in as:
                  </p>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#1e293b',
                      margin: 0
                    }}
                  >
                    {user.name || user.email || 'User'}
                  </p>
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.75rem",
              color: "#64748b",
              margin: "0 0 0.25rem 0",
            }}
          >
            © 2025 IWB Solutions
          </p>
          <p
            style={{
              fontSize: "0.75rem",
              color: "#64748b",
              margin: 0,
            }}
          >
            Sustainable E-Waste
          </p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
