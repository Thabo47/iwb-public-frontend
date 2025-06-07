import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Update this URL to your Azure backend endpoint
      await axios.post("http://localhost:5000/api/queries", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting query", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "40px 20px",
      fontFamily: "'Open Sans', sans-serif"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "40px"
      }}>
        <h2 style={{
          color: "#2c3e50",
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "15px",
          position: "relative",
          display: "inline-block"
        }}>
          Contact Us 📞 ✉️
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
        </h2>
        <p style={{
          color: "#7f8c8d",
          fontSize: "1.1rem",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          Have questions about our recycling services? Get in touch with our team. 💬
        </p>
      </div>

      <div style={{
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
      }}>
        {success ? (
          <div style={{
            textAlign: "center",
            padding: "30px"
          }}>
            <div style={{
              fontSize: "4rem",
              color: "#2ecc71",
              marginBottom: "20px"
            }}>✅</div>
            <h3 style={{
              color: "#2c3e50",
              fontSize: "1.8rem",
              marginBottom: "15px"
            }}>Thank You! 🙏</h3>
            <p style={{
              color: "#555",
              fontSize: "1.1rem",
              marginBottom: "30px"
            }}>Your message has been sent successfully. We'll get back to you soon. 💌</p>
            <button 
              onClick={() => setSuccess(false)}
              style={{
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                padding: "12px 30px",
                fontSize: "1rem",
                borderRadius: "50px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s ease",
                ":hover": {
                  backgroundColor: "#2980b9"
                }
              }}
            >
              Send Another Message ✉️
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "25px" }}>
              <label style={{
                display: "block",
                color: "#2c3e50",
                marginBottom: "8px",
                fontWeight: "600"
              }}>Your Name 📝</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  transition: "border 0.3s ease",
                  ":focus": {
                    outline: "none",
                    borderColor: "#3498db",
                    boxShadow: "0 0 0 2px rgba(52,152,219,0.2)"
                  }
                }}
              />
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label style={{
                display: "block",
                color: "#2c3e50",
                marginBottom: "8px",
                fontWeight: "600"
              }}>Your Email 📧</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  transition: "border 0.3s ease",
                  ":focus": {
                    outline: "none",
                    borderColor: "#3498db",
                    boxShadow: "0 0 0 2px rgba(52,152,219,0.2)"
                  }
                }}
              />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={{
                display: "block",
                color: "#2c3e50",
                marginBottom: "8px",
                fontWeight: "600"
              }}>Your Message 💬</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  transition: "border 0.3s ease",
                  resize: "vertical",
                  ":focus": {
                    outline: "none",
                    borderColor: "#3498db",
                    boxShadow: "0 0 0 2px rgba(52,152,219,0.2)"
                  }
                }}
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? "#95a5a6" : "#3498db",
                color: "white",
                border: "none",
                padding: "14px 30px",
                fontSize: "1.1rem",
                borderRadius: "50px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s ease",
                width: "100%",
                ":hover": {
                  backgroundColor: isSubmitting ? "#95a5a6" : "#2980b9"
                }
              }}
            >
              {isSubmitting ? "Sending..." : "Send Message 📤"}
            </button>
          </form>
        )}
      </div>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "30px",
        marginTop: "40px",
        justifyContent: "center"
      }}>
        <div style={{
          flex: "1",
          minWidth: "250px",
          backgroundColor: "#f8f9fa",
          padding: "25px",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <h4 style={{
            color: "#2c3e50",
            fontSize: "1.3rem",
            marginBottom: "15px"
          }}>Email Us 📧</h4>
          <p style={{ color: "#3498db", fontWeight: "500" }}>thab4231@gmail.com</p>
        </div>

        <div style={{
          flex: "1",
          minWidth: "250px",
          backgroundColor: "#f8f9fa",
          padding: "25px",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <h4 style={{
            color: "#2c3e50",
            fontSize: "1.3rem",
            marginBottom: "15px"
          }}>Call Us 📞</h4>
          <p style={{ color: "#3498db", fontWeight: "500" }}>+266 57292688</p>
        </div>

        <div style={{
          flex: "1",
          minWidth: "250px",
          backgroundColor: "#f8f9fa",
          padding: "25px",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <h4 style={{
            color: "#2c3e50",
            fontSize: "1.3rem",
            marginBottom: "15px"
          }}>Visit Us 📍</h4>
          <p style={{ color: "#3498db", fontWeight: "500" }}>123 Eco Park, Maseru</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
