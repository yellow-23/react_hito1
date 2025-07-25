import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Validate form
    if (!formData.email || !formData.password) {
      setError('Por favor, completa todos los campos');
      setLoading(false);
      return;
    }

    // Call login function
    const result = await onLogin(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
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
        <div style={{
          textAlign: "center",
          marginBottom: "30px"
        }}>
          <h2 style={{
            color: "#333",
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "8px",
            background: "linear-gradient(135deg, #ff6b6b, #ff9f1c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Iniciar Sesión
          </h2>
          <p style={{
            color: "#666",
            fontSize: "0.95rem"
          }}>
            Accede a tu cuenta para continuar
          </p>
     
        </div>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
              fontSize: "0.9rem"
            }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu email"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e1e5e9",
                borderRadius: "8px",
                fontSize: "1rem",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                outline: "none",
                backgroundColor: "#fff",
                color: "#222"
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
              fontSize: "0.9rem"
            }}>
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e1e5e9",
                borderRadius: "8px",
                fontSize: "1rem",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                outline: "none",
                backgroundColor: "#fff",
                color: "#222"
              }}
            />
          </div>

          {error && (
            <div style={{
              color: "#dc3545",
              backgroundColor: "#f8d7da",
              border: "1px solid #f5c6cb",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "20px",
              fontSize: "0.9rem",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#ccc" : "linear-gradient(135deg, #ff6b6b, #ff9f1c)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease"
            }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
