import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePizza } from '../context/PizzaContext';

const Pizza = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { getPizzaById } = usePizza();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);
        const data = await getPizzaById(id);
        setPizza(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id, getPizzaById]);

  const handleAddToCart = () => {
    addToCart(pizza);
    setSuccessMessage(`${pizza.name} agregada al carrito`);
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  if (loading) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <p>Cargando pizza...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!pizza) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <p>Pizza no encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {successMessage && (
        <div 
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "12px 24px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: "1000",
            textAlign: "center"
          }}
        >
          {successMessage}
        </div>
      )}
      <div className="row justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="col-lg-5 mb-4">
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img 
              src={pizza.img} 
              alt={pizza.name}
              className="img-fluid rounded"
              style={{ width: '100%', maxWidth: '400px', height: '320px', objectFit: 'cover', marginBottom: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
            />
            <h2 style={{ fontWeight: 800, color: '#ff6b6b', marginBottom: '0.5rem', textAlign: 'center', textTransform: 'capitalize' }}>{pizza.name}</h2>
            <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '1.5rem', textAlign: 'center', background: '#fffbe6', borderRadius: '8px', padding: '0.7rem 1rem' }}>
              {pizza.desc}
            </p>
            <div style={{ marginBottom: '1.5rem', width: '100%' }}>
              <h4 style={{ fontWeight: 700, color: '#292f36', marginBottom: '0.7rem' }}>Ingredientes</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {pizza.ingredients && pizza.ingredients.map((ingredient, index) => {
                  const capitalized = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
                  return (
                    <li key={index} style={{ marginBottom: '0.5rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🍕</span> {capitalized}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              gap: '1rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontWeight: 800,
                fontSize: '1.5rem',
                color: '#ff6b6b',
                background: 'none',
                textAlign: 'center',
                marginBottom: '0.2rem',
                letterSpacing: '0.5px'
              }}>
                ${pizza.price?.toLocaleString()}
              </span>
              <button
                className="btn"
                onClick={handleAddToCart}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b)',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '25px',
                  fontWeight: '700',
                  color: 'white',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 16px rgba(255,107,107,0.10)',
                  transition: 'all 0.2s',
                  margin: 0
                }}
              >
                Añadir al carrito 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
