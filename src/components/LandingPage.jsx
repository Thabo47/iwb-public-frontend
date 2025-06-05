"use client"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Button, useTheme, useMediaQuery, Container } from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}15 0%, 
    ${theme.palette.secondary.main}15 50%, 
    ${theme.palette.primary.main}15 100%)`,
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: theme.spacing(8, 4),
  margin: theme.spacing(4, 0),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, 
      ${theme.palette.primary.main}08, 
      ${theme.palette.secondary.main}08)`,
    zIndex: -1,
  },
  animation: `${fadeInUp} 1s ease-out`,
}))

const FeatureCard = styled(Box)(({ theme }) => ({
  background: `linear-gradient(145deg, 
    ${theme.palette.background.paper} 0%, 
    ${theme.palette.grey[50]} 100%)`,
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, 
      transparent, 
      ${theme.palette.primary.main}20, 
      transparent)`,
    transition: "left 0.5s",
  },
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
    "&::before": {
      left: "100%",
    },
  },
  animation: `${fadeInUp} 0.8s ease-out`,
}))

const CTASection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%, 
    ${theme.palette.secondary.main} 50%, 
    ${theme.palette.primary.dark} 100%)`,
  borderRadius: "20px",
  padding: theme.spacing(6),
  textAlign: "center",
  margin: theme.spacing(8, 0),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: `radial-gradient(circle, 
      ${theme.palette.common.white}10 0%, 
      transparent 70%)`,
    animation: `${float} 6s ease-in-out infinite`,
  },
}))

const GradientButton = styled(Button)(({ theme, variant }) => ({
  background:
    variant === "primary"
      ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
      : `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
  border: 0,
  borderRadius: "50px",
  color: "white",
  padding: theme.spacing(1.5, 4),
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, 
      transparent, 
      ${theme.palette.common.white}30, 
      transparent)`,
    transition: "left 0.5s",
  },
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 10px 30px ${theme.palette.primary.main}40`,
    "&::before": {
      left: "100%",
    },
  },
  "&:active": {
    transform: "translateY(0)",
  },
}))

const FloatingIcon = styled(Box)({
  display: "inline-block",
  animation: `${float} 3s ease-in-out infinite`,
  fontSize: "2rem",
})

const PulsingIcon = styled(Box)({
  display: "inline-block",
  animation: `${pulse} 2s ease-in-out infinite`,
  fontSize: "1.5rem",
})

const LandingPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }

  const features = [
    {
      title: "📖 About Us",
      description:
        "Discover our mission to revolutionize e-waste recycling and create a sustainable future for technology",
      path: "/about",
      icon: "🌱",
    },
    {
      title: "🛠️ Our Services",
      description:
        "Explore our comprehensive e-waste recycling solutions for RAM, hard drives, and motherboard components",
      path: "/services",
      icon: "♻️",
    },
    {
      title: "💼 Get Started",
      description: "Join our platform and start making a difference in electronic waste management today",
      path: "/signup",
      icon: "🚀",
    },
  ]

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, 
        ${theme.palette.background.default} 0%, 
        ${theme.palette.grey[50]} 50%, 
        ${theme.palette.background.default} 100%)`,
      }}
    >
      <Container component="main" sx={{ py: 4 }}>
        {/* Hero Section */}
        <HeroSection>
          <FloatingIcon sx={{ mb: 2 }}>🌍</FloatingIcon>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
            Welcome to IWB Platform
          </Typography>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            color="text.secondary"
            paragraph
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 4,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            <PulsingIcon sx={{ mr: 1 }}>🌟</PulsingIcon>
            Leading the future of sustainable e-waste recycling in Southern Africa. Transform your electronic waste into
            valuable resources while protecting our planet.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
              mt: 4,
            }}
          >
            <GradientButton
              variant="primary"
              size="large"
              onClick={() => handleNavigation("/signup")}
              sx={{ minWidth: isMobile ? "200px" : "auto" }}
            >
              ✨ Get Started Today
            </GradientButton>
            <GradientButton
              variant="secondary"
              size="large"
              onClick={() => handleNavigation("/login")}
              sx={{ minWidth: isMobile ? "200px" : "auto" }}
            >
              🔑 Login to Dashboard
            </GradientButton>
          </Box>
        </HeroSection>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              🔍 Explore Our Platform
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "600px", mx: "auto" }}>
              Discover comprehensive solutions for sustainable e-waste management
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 4,
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                onClick={() => handleNavigation(feature.path)}
                sx={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <Box sx={{ fontSize: "3rem", mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    mb: 3,
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "25px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    "&:hover": {
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
                      borderColor: theme.palette.secondary.main,
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNavigation(feature.path)
                  }}
                >
                  Learn More →
                </Button>
              </FeatureCard>
            ))}
          </Box>
        </Box>

        {/* Statistics Section */}
        <Box
          sx={{
            py: 8,
            textAlign: "center",
            background: `linear-gradient(135deg, 
            ${theme.palette.primary.main}05 0%, 
            ${theme.palette.secondary.main}05 100%)`,
            borderRadius: "20px",
            mb: 8,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
            🏆 Our Impact
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: 4,
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            {[
              { number: "10K+", label: "Components Recycled", icon: "♻️" },
              { number: "500+", label: "Happy Clients", icon: "😊" },
              { number: "99%", label: "Satisfaction Rate", icon: "⭐" },
            ].map((stat, index) => (
              <Box key={index} sx={{ p: 3 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                >
                  {stat.icon} {stat.number}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Call to Action */}
        <CTASection>
          <FloatingIcon sx={{ mb: 2 }}>🚀</FloatingIcon>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "white",
              mb: 2,
            }}
          >
            Ready to Make a Difference?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Join thousands of environmentally conscious businesses and individuals. Start your sustainable e-waste
            journey today! 🌍
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => handleNavigation("/home")}
              sx={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: "50px",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1.1rem",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.3)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              🌐 Explore Platform
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleNavigation("/contact")}
              sx={{
                borderColor: "rgba(255, 255, 255, 0.5)",
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: "50px",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1.1rem",
                "&:hover": {
                  borderColor: "white",
                  background: "rgba(255, 255, 255, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              💬 Contact Us
            </Button>
          </Box>
        </CTASection>
      </Container>
    </Box>
  )
}

export default LandingPage
