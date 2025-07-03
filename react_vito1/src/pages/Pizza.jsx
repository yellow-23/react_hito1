import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Pizza = ({ onAddToCart }) => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        if (!response.ok) {
          throw new Error('Error al cargar la pizza');
        }
        const data = await response.json();
        setPizza(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id]);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(pizza);
    } else {
      alert(`${pizza.name} agregada al carrito`);
    }
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
