import React from "react";

const Home = () => {
  return (
    <div style={{
      padding: "40px",
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
      lineHeight: "1.6"
    }}>
      <h1 style={{
        color: "#2c3e50",
        fontSize: "2.5rem",
        marginBottom: "30px",
        textAlign: "center",
        borderBottom: "2px solid #3498db",
        paddingBottom: "10px"
      }}>
        Welcome to IWB 🌍 ♻️
      </h1>
      
      <div style={{
        backgroundColor: "#f8f9fa",
        padding: "25px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "15px" }}>
          IWB is a leading company in the Southern African region, specializing in the recycling of electronic components. 
          We proudly recycle RAMs 💻, Hard Drives 💾, and various motherboard components to reduce electronic waste 🗑️ and promote sustainability 🌱.
        </p>
      </div>
      
      <div style={{
        backgroundColor: "#e8f4fc",
        padding: "25px",
        borderRadius: "8px",
        borderLeft: "4px solid #3498db"
      }}>
        <p style={{ fontSize: "1.1rem" }}>
          Founded in 2024 with a capital of M100,000 💵 by Kenneth, and later joined by Shadrack, IWB has rapidly grown into a pioneer 
          in the electronic recycling sector 🔄. We serve partners, investors, and clients across Lesotho 🇱🇸 and beyond 🌍.
        </p>
      </div>
      
      <div style={{
        marginTop: "40px",
        textAlign: "center",
        color: "#7f8c8d",
        fontSize: "0.9rem"
      }}>
        Committed to a greener future through technology recycling 🌿
      </div>
    </div>
  );
};

export default Home;
