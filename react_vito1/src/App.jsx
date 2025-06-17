import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("login"); // login, register, home
  const [successMessage, setSuccessMessage] = useState("");

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
    setTotal(total + pizza.price);
    alert(`${pizza.name} agregada al carrito`);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("home");
    setSuccessMessage("¡Sesión iniciada correctamente!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
    setSuccessMessage("¡Sesión cerrada correctamente!");
  };

  const handleRegisterSuccess = () => {
    setCurrentPage("login");
  };

  const renderPage = () => {
    if (isLoggedIn) {
      return <Home addToCart={addToCart} />;
    } else {
      if (currentPage === "register") {
        return <RegisterPage onRegisterSuccess={handleRegisterSuccess} />;
      } else {
        return <LoginPage onLoginSuccess={handleLogin} />;
      }
    }
  };

  return (
    <>
      <Navbar cartTotal={total} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
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
      
      {!isLoggedIn && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px 0 10px 0"
        }}>
          <button 
            onClick={() => setCurrentPage("login")} 
            style={{
              background: currentPage === "login" ? "linear-gradient(135deg, #ff6b6b, #ff9f1c)" : "transparent",
              color: currentPage === "login" ? "white" : "#ff6b6b",
              border: "2px solid #ff6b6b",
              padding: "8px 20px",
              borderRadius: "25px",
              marginRight: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
              transition: "all 0.3s"
            }}
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => setCurrentPage("register")} 
            style={{
              background: currentPage === "register" ? "linear-gradient(135deg, #ff6b6b, #ff9f1c)" : "transparent",
              color: currentPage === "register" ? "white" : "#ff6b6b",
              border: "2px solid #ff6b6b",
              padding: "8px 20px",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
              transition: "all 0.3s"
            }}
          >
            Registro
          </button>
        </div>
      )}
      
      {renderPage()}
      
      <Footer />
    </>
  );
}

export default App;
