import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

// Layout Components
import { SidebarProvider } from "./components/ui/sidebar"
import AppSidebar from "./components/AppSidebar"
import { SidebarInset, SidebarTrigger } from "./components/ui/sidebar"
import Footer from "./components/Footer"

// Public Pages
import LandingPage from "./components/LandingPage"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Home from "./components/Home"
import About from "./components/About"
import Services from "./components/Services"
import Contact from "./components/Contact"

// Dashboard Pages
import ClientDashboard from "./components/ClientDashboard"
import InvestorDashboard from "./components/InvestorDashboard"
import FinanceDashboard from "./components/FinanceDashboard"
import DeveloperDashboard from "./components/DeveloperDashboard"
import PartnerDashboard from "./components/PartnerDashboard"
import SalesDashboard from "./components/SalesDashboard"

// Layout wrapper component
const AppLayout = ({ children }) => {
  const location = useLocation()

  // Routes that should not show sidebar (auth pages and landing)
  const noSidebarRoutes = ["/login", "/signup", "/"]
  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname)

  // Routes that should not show footer (dashboard pages)
  const noFooterRoutes = [
    "/client/dashboard",
    "/investor/dashboard",
    "/finance/dashboard",
    "/developer/dashboard",
    "/partner/dashboard",
    "/sales/dashboard",
  ]
  const shouldShowFooter = !noFooterRoutes.includes(location.pathname) && shouldShowSidebar

  const styles = {
    authPageWrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    landingPageWrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    },
    mainContent: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    contentArea: {
      flex: 1,
      padding: shouldShowSidebar ? "1rem" : "0",
      background: shouldShowSidebar ? "#f8fafc" : "transparent",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    pageTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#1e293b",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
  }

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname
    const titleMap = {
      "/home": "Home",
      "/about": "About Us",
      "/services": "Our Services",
      "/contact": "Contact Us",
      "/client/dashboard": "Client Dashboard",
      "/investor/dashboard": "Investor Dashboard",
      "/finance/dashboard": "Finance Dashboard",
      "/developer/dashboard": "Developer Dashboard",
      "/partner/dashboard": "Partner Dashboard",
      "/sales/dashboard": "Sales Dashboard",
    }
    return titleMap[path] || "IWB"
  }

  // Special layout for auth pages
  if (noSidebarRoutes.includes(location.pathname)) {
    if (location.pathname === "/") {
      return <div style={styles.landingPageWrapper}>{children}</div>
    }
    return <div style={styles.authPageWrapper}>{children}</div>
  }

  // Layout with sidebar for other pages
  return (
    <SidebarProvider>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <AppSidebar />
        <SidebarInset style={styles.mainContent}>
          <div style={styles.header}>
            <SidebarTrigger />
            <h1 style={styles.pageTitle}>{getPageTitle()}</h1>
          </div>
          <div style={styles.contentArea}>
            {children}
            {shouldShowFooter && <Footer />}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            {/* Dashboard Routes */}
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/investor/dashboard" element={<InvestorDashboard />} />
            <Route path="/finance/dashboard" element={<FinanceDashboard />} />
            <Route path="/developer/dashboard" element={<DeveloperDashboard />} />
            <Route path="/partner/dashboard" element={<PartnerDashboard />} />
            <Route path="/sales/dashboard" element={<SalesDashboard />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  )
}

export default App
