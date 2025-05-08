import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, useTheme, useMediaQuery, Container } from "@mui/material";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container component="main" sx={{ flex: 1, py: 8 }}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            px: isMobile ? 2 : 10,
          }}
        >
          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            🚀 Welcome to Our Platform
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            paragraph
            sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}
          >
            🌟 Discover amazing features and services tailored for your needs. Let's build success together!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleNavigation('/signup')}
              sx={{ mt: 2, px: 4, py: 1.5, minWidth: isMobile ? '100%' : 'auto' }}
            >
              ✨ Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleNavigation('/login')}
              sx={{ mt: 2, px: 4, py: 1.5, minWidth: isMobile ? '100%' : 'auto' }}
            >
              🔑 Login
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
            🔍 Our Features
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Ensures the grid is centered
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {[{
                title: "📖 About Us",
                description: "Learn more about our company and mission",
                path: "/about",
              },
              {
                title: "🛠️ Our Services",
                description: "Explore what we can do for you",
                path: "/services",
              }
            ].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  width: isMobile ? "100%" : "300px", // Ensures card width adjusts for mobile
                  "&:hover": {
                    transform: "translateY(-5px)",
                    transition: "transform 0.3s",
                  },
                }}
                onClick={() => handleNavigation(feature.path)}
              >
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
                <Button 
                  sx={{ mt: 2 }} 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation(feature.path);
                  }}
                >
                  Learn More
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            borderRadius: 2,
            p: 6,
            textAlign: "center",
            my: 8,
          }}
        >
          <Typography variant="h5" gutterBottom>
            🙌 Ready to get started?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Join thousands of satisfied users today. 🌍
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              align="center"
              color="secondary"
              size="large"
              onClick={() => handleNavigation("/home")}
              sx={{ px: 6 }}
            >
              🌐 Explore Now
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
