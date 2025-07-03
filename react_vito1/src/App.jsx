import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Check if user is logged in on app start
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
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

  const incrementQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decrementQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

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
        setSuccessMessage("¡Usuario registrado correctamente! Ahora puedes iniciar sesión.");
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Error al registrar usuario' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
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
      
      <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn ? (
              <Home addToCart={addToCart} />
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
              <Cart 
                cart={cart}
                total={total}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
                onRemove={removeFromCart}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/pizza/:id" 
          element={
            isLoggedIn ? (
              <Pizza onAddToCart={addToCart} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/profile" 
          element={
            isLoggedIn ? (
              <Profile onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
