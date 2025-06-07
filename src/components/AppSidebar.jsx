"use client"
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
  
  // Check if user is logged in (you'll need to replace this with your actual auth check)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' // Example check
  const user = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null // Example user data

  const navigationItems = [
    {
      title: "Home",
      url: "/home",
      icon: "🏠",
    },
    {
      title: "About",
      url: "/about",
      icon: "ℹ️",
    },
    {
      title: "Services",
      url: "/services",
      icon: "⚙️",
    },
    {
      title: "Contact",
      url: "/contact",
      icon: "📞",
    },
  ]

  const accountItems = [
    ...(!isLoggedIn ? [
      {
        title: "Login",
        url: "/login",
        icon: "🔑",
      },
      {
        title: "Sign Up",
        url: "/signup",
        icon: "👤",
      }
    ] : []),
    ...(isLoggedIn ? [
      {
        title: "Profile",
        url: "/profile",
        icon: "👤",
      },
      {
        title: "Logout",
        url: "/logout",
        icon: "🚪",
      }
    ] : [])
  ]

  const handleNavigation = (url) => {
    if (url === '/logout') {
      // Handle logout logic
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
      navigate('/login')
      return
    }
    navigate(url)
  }

  return (
    <Sidebar>
      <SidebarHeader>
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
                <div style={{ 
                  padding: '0.75rem 1rem',
                  borderTop: '1px solid #e2e8f0',
                  marginTop: '0.5rem'
                }}>
                  <p style={{ 
                    fontSize: '0.875rem',
                    color: '#64748b',
                    marginBottom: '0.25rem'
                  }}>
                    Logged in as:
                  </p>
                  <p style={{ 
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: 0
                  }}>
                    {user.name || user.email || 'User'}
                  </p>
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "#64748b",
              margin: "0 0 0.25rem 0",
            }}
          >
            © 2024 IWB Solutions
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