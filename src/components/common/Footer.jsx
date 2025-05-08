import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = ({ isAdmin = false }) => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: isAdmin ? "#2c3e50" : "#1976d2",
        color: "white",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", textAlign: "center" }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} IWB Application. All rights reserved.
        </Typography>
        <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 2 }}>
          <MuiLink component={Link} to="/about" color="inherit">
            About
          </MuiLink>
          <MuiLink component={Link} to="/privacy" color="inherit">
            Privacy Policy
          </MuiLink>
          <MuiLink component={Link} to="/terms" color="inherit">
            Terms of Service
          </MuiLink>
          <MuiLink component={Link} to="/contact" color="inherit">
            Contact
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;