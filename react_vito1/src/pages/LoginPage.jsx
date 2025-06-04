import React, { useState } from 'react';

const LoginPage = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  // Default credentials
  const DEFAULT_EMAIL = 'admin@admin.com';
  const DEFAULT_PASSWORD = 'admin123';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Check credentials
    if (formData.email === DEFAULT_EMAIL && formData.password === DEFAULT_PASSWORD) {
      // Login successful
      onLoginSuccess();
    } else {
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div style={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 160px)",
      width: "100%",
      padding: "20px",
      backgroundColor: "#f9f9f9"
    }}>
      <div style={{ 
        width: "100%", 
        maxWidth: "400px",
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{
          fontSize: "1.8rem",
          fontWeight: "700",
          marginBottom: "8px",
          background: "linear-gradient(135deg, #ff6b6b, #ff9f1c)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center"
        }}>
          Mamma Mía!
        </h2>
        
        <p style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "30px",
          fontSize: "0.9rem"
        }}>
          Inicia sesión para continuar
        </p>
        
        {error && (
          <div style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #f5c6cb"
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email" style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#292f36",
              fontSize: "0.9rem"
            }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@admin.com"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                backgroundColor: "#f8f9fa",
                outline: "none",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#ff6b6b"}
              onBlur={(e) => e.target.style.borderColor = "#ddd"}
            />
          </div>
          
          <div style={{ marginBottom: "30px" }}>
            <label htmlFor="password" style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#292f36",
              fontSize: "0.9rem"
            }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="admin123"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                backgroundColor: "#f8f9fa",
                outline: "none",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#ff6b6b"}
              onBlur={(e) => e.target.style.borderColor = "#ddd"}
            />
          </div>
          
          <button 
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #ff6b6b, #ff9f1c)",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "50px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 5px 15px rgba(255, 107, 107, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0px)";
              e.target.style.boxShadow = "none";
            }}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
