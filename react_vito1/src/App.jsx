import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Pizza from "./components/Pizza";

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("login"); // login, register, home, pizza
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Check if user is logged in on app start
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      setCurrentPage("home");
    }
  }, [token]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Calculate cart total
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  const addToCart = (pizza) => {
    const existingItem = cart.find(item => item.id === pizza.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === pizza.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
    
    setSuccessMessage(`${pizza.name} agregada al carrito`);
  };
//coneccion al backend para login y registro
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
        setIsLoggedIn(true);
        setCurrentPage("home");
        setSuccessMessage("¡Sesión iniciada correctamente!");
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Error al iniciar sesión' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
    setCurrentPage("login");
    setCart([]);
    setTotal(0);
    setSuccessMessage("¡Sesión cerrada correctamente!");
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
        setCurrentPage("login");
        setSuccessMessage("¡Usuario registrado correctamente! Ahora puedes iniciar sesión.");
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Error al registrar usuario' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const renderPage = () => {
    if (isLoggedIn) {
      if (currentPage === "pizza") {
        return <Pizza pizzaId="p001" onAddToCart={addToCart} />;
      }
      return <Home addToCart={addToCart} />;
    } else {
      if (currentPage === "register") {
        return <RegisterPage onRegister={handleRegister} />;
      } else {
        return <LoginPage onLogin={handleLogin} />;
      }
    }
  };

  return (
    <>
      <Navbar 
        cartTotal={total} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout}
        cartItems={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />
      
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
