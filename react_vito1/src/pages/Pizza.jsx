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
      
      <div className="row">
        <div className="col-md-6">
          <img 
            src={pizza.img} 
            alt={pizza.name}
            className="img-fluid rounded"
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="mb-3">{pizza.name}</h1>
          <p className="text-muted mb-3">{pizza.desc}</p>
          
          <div className="mb-3">
            <h4>Ingredientes:</h4>
            <ul className="list-unstyled">
              {pizza.ingredients && pizza.ingredients.map((ingredient, index) => (
                <li key={index} className="mb-1">
                  🍕 {ingredient}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success mb-0">
              Precio: ${pizza.price?.toLocaleString()}
            </h3>
            <button 
              className="btn btn-danger"
              onClick={handleAddToCart}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ff9f1c)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '25px',
                fontWeight: '600'
              }}
            >
              Añadir al carrito 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
