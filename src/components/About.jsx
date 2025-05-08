import React from "react";

const About = () => {
  return (
    <div style={{
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "40px 20px",
      fontFamily: "'Open Sans', sans-serif",
      color: "#333",
      lineHeight: "1.7"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "50px"
      }}>
        <h1 style={{
          color: "#2c3e50",
          fontSize: "2.8rem",
          fontWeight: "700",
          marginBottom: "15px",
          position: "relative",
          display: "inline-block"
        }}>
          📘 About Us
          <span style={{
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "4px",
            backgroundColor: "#3498db",
            borderRadius: "2px"
          }}></span>
        </h1>
        <p style={{
          color: "#7f8c8d",
          fontSize: "1.2rem",
          maxWidth: "700px",
          margin: "0 auto"
        }}>
          🌱 Pioneering sustainable e-waste solutions in Southern Africa
        </p>
      </div>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
        marginBottom: "60px"
      }}>
        <div style={{
          flex: "1",
          minWidth: "300px",
          padding: "30px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
        }}>
          <h2 style={{
            color: "#2c3e50",
            fontSize: "1.8rem",
            marginBottom: "20px",
            paddingBottom: "10px",
            borderBottom: "2px solid #3498db"
          }}>
            📖 Our Story
          </h2>
          <p style={{ marginBottom: "20px", fontSize: "1.1rem" }}>
            Integrated Waste Busters (IWB) was founded in 2024 by Kenneth with a vision to tackle the growing challenge of electronic waste 
            in Lesotho and surrounding regions. 💡 With an initial capital of M100,000, the journey started small but was full of ambition. 🚀
          </p>
          <p style={{ fontSize: "1.1rem" }}>
            In pursuit of expansion, Kenneth partnered with Shadrack, who became the second CEO and helped steer the company into new markets. 
            🤝 Together, they built a foundation based on innovation, sustainability, and responsible recycling. 🌍
          </p>
        </div>

        <div style={{
          flex: "1",
          minWidth: "300px",
          padding: "30px",
          backgroundColor: "#e8f4fc",
          borderRadius: "8px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
        }}>
          <h2 style={{
            color: "#2c3e50",
            fontSize: "1.8rem",
            marginBottom: "20px",
            paddingBottom: "10px",
            borderBottom: "2px solid #3498db"
          }}>
            🎯 Our Mission
          </h2>
          <p style={{ fontSize: "1.1rem" }}>
            Our mission is to revolutionize e-waste management by recycling and refurbishing crucial computer parts 🖥️, 
            giving them a new life 🔄 and minimizing the environmental impact 🌿 of disposed electronics.
          </p>
          <div style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "6px",
            borderLeft: "4px solid #3498db"
          }}>
            <p style={{ 
              fontStyle: "italic",
              color: "#2c3e50",
              fontWeight: "500"
            }}>
              "💬 We don't just recycle electronics - we recover value, protect the environment, and create opportunities. 🌟"
            </p>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "30px",
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <h3 style={{
          fontSize: "1.5rem",
          marginBottom: "15px"
        }}>
          💡 Why Choose IWB?
        </h3>
        <p style={{
          maxWidth: "800px",
          margin: "0 auto",
          fontSize: "1.1rem"
        }}>
          We combine technical expertise 🛠️ with environmental responsibility ♻️ to deliver e-waste solutions that benefit both businesses 💼 and communities 🏘️.
        </p>
      </div>
    </div>
  );
};

export default About;
