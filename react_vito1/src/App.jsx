import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser, UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const [successMessage, setSuccessMessage] = useState("");
  const { token, setToken } = useUser();
  const isLoggedIn = !!token && token !== 'false';

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setSuccessMessage("¡Sesión iniciada correctamente!");
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Error al iniciar sesión' };
      }
    } catch {
      return { success: false, error: 'Error de conexión' };
    }
  };


  const handleRegister = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("¡Usuario registrado correctamente! Ahora puedes iniciar sesión.");
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Error al registrar usuario' };
      }
    } catch {
      return { success: false, error: 'Error de conexión' };
    }
  };

  return (
    <>
      <Navbar />
      {successMessage && (
        <div 
          style={{
            position: "fixed",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "12px 24px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: "1000",
            textAlign: "center",
            maxWidth: "90%",
            minWidth: "300px",
            animation: "fadeInOut 3s forwards"
          }}
        >
          {successMessage}
        </div>
      )}
      <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterPage onRegister={handleRegister} />
            )
          } 
        />
        <Route 
          path="/cart" 
          element={
            isLoggedIn ? (
              <Cart />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/pizza/:id" 
          element={
            isLoggedIn ? (
              <Pizza />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />

    </>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
