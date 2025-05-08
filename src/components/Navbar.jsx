import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: "#2c3e50",
      padding: "1rem 2rem",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "sticky",
      top: "0",
      zIndex: "100"
    }}>
      <div style={{
        display: "flex",
        maxWidth: "1200px",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Link 
          to="/" 
          style={{
            color: "#ecf0f1",
            textDecoration: "none",
            fontSize: "1.5rem",
            fontWeight: "bold",
            fontFamily: "'Segoe UI', sans-serif",
            letterSpacing: "1px"
          }}
        >
          IWB
        </Link>
        
        <div style={{
          display: "flex",
          gap: "2rem"
        }}>
          {['Home', 'About', 'Services', 'Contact'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              style={{
                color: "#ecf0f1",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: "500",
                padding: "0.5rem 0",
                position: "relative",
                transition: "color 0.3s ease",
                fontFamily: "'Segoe UI', sans-serif",
                ':hover': {
                  color: "#3498db"
                }
              }}
              activeStyle={{
                color: "#3498db",
                '::after': {
                  content: '""',
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#3498db"
                }
              }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;