import React from "react";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ isAdmin = false }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: isAdmin ? "#2c3e50" : "#1976d2" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {isAdmin ? "IWB Admin" : "My Application"}
        </Typography>
        
        {currentUser && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="subtitle1" component="span">
              {currentUser.email}
            </Typography>
            <Button 
              color="inherit" 
              onClick={handleLogout}
              sx={{ 
                backgroundColor: "#e74c3c",
                "&:hover": { backgroundColor: "#c0392b" }
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;