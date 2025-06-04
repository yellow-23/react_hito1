import React, { useState } from 'react';

const RegisterPage = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato de email no es válido';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmar contraseña es obligatorio';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (validateForm()) {
      // If validation passes, show success message
      setSuccessMessage('¡Registro exitoso! Ya puedes iniciar sesión.');
      // Reset form
      setFormData({
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Optional: call onRegisterSuccess after a delay
      setTimeout(() => {
        if (onRegisterSuccess) {
          onRegisterSuccess();
        }
      }, 2000);
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
          Crea tu cuenta para continuar
        </p>
        
        {successMessage && (
          <div style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #c3e6cb"
          }}>
            {successMessage}
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
              placeholder="ejemplo@mail.com"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: errors.email ? "1px solid #ff6b6b" : "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                backgroundColor: "#f8f9fa",
                outline: "none",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => !errors.email && (e.target.style.borderColor = "#ff6b6b")}
              onBlur={(e) => !errors.email && (e.target.style.borderColor = "#ddd")}
            />
            {errors.email && (
              <div style={{
                color: "#ff6b6b",
                fontSize: "0.85rem",
                marginTop: "5px"
              }}>
                {errors.email}
              </div>
            )}
          </div>
          
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="password" style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#292f36",
              fontSize: "0.9rem"
            }}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: errors.password ? "1px solid #ff6b6b" : "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                backgroundColor: "#f8f9fa",
                outline: "none",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => !errors.password && (e.target.style.borderColor = "#ff6b6b")}
              onBlur={(e) => !errors.password && (e.target.style.borderColor = "#ddd")}
            />
            {errors.password && (
              <div style={{
                color: "#ff6b6b",
                fontSize: "0.85rem",
                marginTop: "5px"
              }}>
                {errors.password}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label htmlFor="confirmPassword" style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#292f36",
              fontSize: "0.9rem"
            }}>
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: errors.confirmPassword ? "1px solid #ff6b6b" : "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                backgroundColor: "#f8f9fa",
                outline: "none",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => !errors.confirmPassword && (e.target.style.borderColor = "#ff6b6b")}
              onBlur={(e) => !errors.confirmPassword && (e.target.style.borderColor = "#ddd")}
            />
            {errors.confirmPassword && (
              <div style={{
                color: "#ff6b6b",
                fontSize: "0.85rem",
                marginTop: "5px"
              }}>
                {errors.confirmPassword}
              </div>
            )}
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
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
