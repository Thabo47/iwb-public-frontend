"use client"

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react"

// Simple utility function to combine class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

// Hook to detect mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

// Sidebar Context
const SidebarContext = createContext(null)

const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

// SidebarProvider Component
const SidebarProvider = ({ defaultOpen = true, children, ...props }) => {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = useState(false)
  const [open, setOpen] = useState(defaultOpen)

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev)
    } else {
      setOpen((prev) => !prev)
    }
  }, [isMobile])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, isMobile, openMobile, toggleSidebar],
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        style={{
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "3rem",
        }}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

// Sidebar Component
const Sidebar = ({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }) => {
  const { isMobile, state, open, openMobile, setOpenMobile, toggleSidebar } = useSidebar()

  const sidebarStyles = {
    base: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "16rem",
      backgroundColor: "#ffffff",
      borderRight: "1px solid #e2e8f0",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      zIndex: 50,
      transition: "transform 0.3s ease-in-out",
      display: "flex",
      flexDirection: "column",
    },
    mobile: {
      transform: openMobile ? "translateX(0)" : "translateX(-100%)",
    },
    desktop: {
      transform: open ? "translateX(0)" : "translateX(-100%)",
    },
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 40,
      display: openMobile ? "block" : "none",
    },
  }

  return (
    <>
      {isMobile && (
        <div 
          style={sidebarStyles.overlay} 
          onClick={() => setOpenMobile(false)} 
        />
      )}
      <div 
        style={{ 
          ...sidebarStyles.base, 
          ...(isMobile ? sidebarStyles.mobile : sidebarStyles.desktop) 
        }} 
        {...props}
      >
        {children}
      </div>
    </>
  )
}

// SidebarTrigger Component
const SidebarTrigger = ({ className, onClick, ...props }) => {
  const { toggleSidebar } = useSidebar()

  const triggerStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem",
    borderRadius: "0.375rem",
    border: "none",
    backgroundColor: "transparent",
    color: "#6b7280",
    cursor: "pointer",
    transition: "all 0.2s ease",
  }

  return (
    <button
      style={triggerStyles}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#f3f4f6"
        e.target.style.color = "#374151"
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent"
        e.target.style.color = "#6b7280"
      }}
      {...props}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="15" />
        <line x1="15" y1="9" x2="9" y2="15" />
      </svg>
      <span style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }}>Toggle Sidebar</span>
    </button>
  )
}

// SidebarInset Component
const SidebarInset = ({ className, style, ...props }) => {
  const { open } = useSidebar()
  
  const insetStyles = {
    position: "relative",
    display: "flex",
    minHeight: "100vh",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f8fafc",
    marginLeft: open ? "16rem" : "0",
    transition: "margin-left 0.3s ease-in-out",
    ...style,
  }

  return <main style={insetStyles} {...props} />
}

// SidebarHeader Component
const SidebarHeader = ({ className, ...props }) => {
  const headerStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "1rem",
    borderBottom: "1px solid #e2e8f0",
  }

  return <div style={headerStyles} {...props} />
}

// SidebarFooter Component
const SidebarFooter = ({ className, ...props }) => {
  const footerStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "1rem",
    borderTop: "1px solid #e2e8f0",
    marginTop: "auto",
  }

  return <div style={footerStyles} {...props} />
}

// SidebarContent Component
const SidebarContent = ({ className, ...props }) => {
  const contentStyles = {
    display: "flex",
    minHeight: 0,
    flex: 1,
    flexDirection: "column",
    gap: "0.5rem",
    overflow: "auto",
    padding: "1rem",
  }

  return <div style={contentStyles} {...props} />
}

// SidebarGroup Component
const SidebarGroup = ({ className, ...props }) => {
  const groupStyles = {
    position: "relative",
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    marginBottom: "1rem",
  }

  return <div style={groupStyles} {...props} />
}

// SidebarGroupLabel Component
const SidebarGroupLabel = ({ className, ...props }) => {
  const labelStyles = {
    display: "flex",
    height: "2rem",
    alignItems: "center",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "0.5rem",
  }

  return <div style={labelStyles} {...props} />
}

// SidebarGroupContent Component
const SidebarGroupContent = ({ className, ...props }) => {
  const contentStyles = {
    width: "100%",
    fontSize: "0.875rem",
  }

  return <div style={contentStyles} {...props} />
}

// SidebarMenu Component
const SidebarMenu = ({ className, ...props }) => {
  const menuStyles = {
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    gap: "0.25rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  }

  return <ul style={menuStyles} {...props} />
}

// SidebarMenuItem Component
const SidebarMenuItem = ({ className, ...props }) => {
  const itemStyles = {
    position: "relative",
  }

  return <li style={itemStyles} {...props} />
}

// SidebarMenuButton Component
const SidebarMenuButton = ({ asChild = false, isActive = false, children, ...props }) => {
  const buttonStyles = {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: "0.75rem",
    overflow: "hidden",
    borderRadius: "0.5rem",
    padding: "0.75rem",
    textAlign: "left",
    fontSize: "0.875rem",
    border: "none",
    backgroundColor: isActive ? "#eff6ff" : "transparent",
    color: isActive ? "#2563eb" : "#374151",
    cursor: "pointer",
    transition: "all 0.2s ease",
    outline: "none",
  }

  const handleMouseEnter = (e) => {
    if (!isActive) {
      e.target.style.backgroundColor = "#f3f4f6"
    }
  }

  const handleMouseLeave = (e) => {
    if (!isActive) {
      e.target.style.backgroundColor = "transparent"
    }
  }

  if (asChild) {
    return React.cloneElement(children, {
      style: { ...buttonStyles, ...children.props.style },
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      ...props,
    })
  }

  return (
    <button style={buttonStyles} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
      {children}
    </button>
  )
}

// SidebarRail Component
const SidebarRail = ({ className, ...props }) => {
  return null
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
}