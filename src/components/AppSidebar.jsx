"use client"

import { useLocation, useNavigate } from "react-router-dom"

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
    {
      title: "Login",
      url: "/login",
      icon: "🔑",
    },
    {
      title: "Sign Up",
      url: "/signup",
      icon: "👤",
    },
  ]

  const handleNavigation = (url) => {
    navigate(url)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
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
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={location.pathname === item.url}>
                    <button
                      onClick={() => handleNavigation(item.url)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        color: "inherit",
                        fontSize: "inherit",
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                      <span>{item.title}</span>
                    </button>
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
                  <SidebarMenuButton isActive={location.pathname === item.url}>
                    <button
                      onClick={() => handleNavigation(item.url)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        color: "inherit",
                        fontSize: "inherit",
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
