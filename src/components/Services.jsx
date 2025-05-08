import React from "react";

const Services = () => {
  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "40px 20px",
      fontFamily: "'Open Sans', sans-serif",
      color: "#333"
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
          Our Services
          <span style={{
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
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
          Sustainable e-waste solutions that protect both your data and our planet
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "30px",
        marginBottom: "60px"
      }}>
        {[
          {
            title: "RAM Recycling",
            description: "Extraction and refurbishment of functional memory modules from outdated systems.",
            icon: "🧠"
          },
          {
            title: "Hard Drive Recycling",
            description: "Safe data wiping and material recovery from hard drives, ensuring both security and sustainability.",
            icon: "💾"
          },
          {
            title: "Motherboard Components Recycling",
            description: "Recovery and repurposing of valuable components from motherboards, minimizing environmental harm.",
            icon: "🔌"
          }
        ].map((service, index) => (
          <div key={index} style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            borderTop: "4px solid #3498db",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            ":hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
            }
          }}>
            <div style={{
              fontSize: "2.5rem",
              marginBottom: "20px"
            }}>
              {service.icon}
            </div>
            <h3 style={{
              color: "#2c3e50",
              fontSize: "1.5rem",
              marginBottom: "15px"
            }}>
              {service.title}
            </h3>
            <p style={{
              color: "#555",
              lineHeight: "1.6",
              fontSize: "1.1rem"
            }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: "#f8f9fa",
        padding: "40px",
        borderRadius: "8px",
        marginBottom: "40px"
      }}>
        <h2 style={{
          color: "#2c3e50",
          fontSize: "2rem",
          marginBottom: "25px",
          textAlign: "center"
        }}>
          Why Choose Us?
        </h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center"
        }}>
          {[
            "Sustainable recycling practices",
            "Certified data destruction",
            "International quality standards",
            "Trusted by businesses & individuals",
            "Regional market expertise",
            "Environmental responsibility"
          ].map((item, index) => (
            <div key={index} style={{
              backgroundColor: "#fff",
              padding: "15px 25px",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
              minWidth: "250px",
              flex: "1"
            }}>
              <span style={{
                color: "#3498db",
                marginRight: "10px",
                fontSize: "1.2rem"
              }}>✓</span>
              <span style={{ fontSize: "1.1rem" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "40px",
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <h3 style={{
          fontSize: "1.8rem",
          marginBottom: "20px"
        }}>
          Ready to recycle your electronics responsibly?
        </h3>
        <p style={{
          fontSize: "1.1rem",
          maxWidth: "700px",
          margin: "0 auto 25px"
        }}>
          Contact us today to learn how we can help you dispose of your e-waste securely and sustainably.
        </p>
      </div>
    </div>
  );
};

export default Services;