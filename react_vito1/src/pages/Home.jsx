import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { usePizza } from '../context/PizzaContext';
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';

const Home = () => {
  const { addToCart } = useCart();
  const { pizzas, loading, error } = usePizza();
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddToCart = (pizza) => {
    addToCart(pizza);
    setSuccessMessage(`${pizza.name} agregada al carrito`);
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };


  if (loading) {
    return (
      <div>
        <Header />
        <main className="container my-5">
          <div className="text-center">
            <p>Cargando pizzas...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <main className="container my-5">
          <div className="text-center">
            <p>Error: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
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
      
      <main className="container my-5">
        <h2 className="section-title text-center mb-5">🍕 Nuestras Deliciosas Pizzas</h2>
        <div className="row" style={{ marginTop: '3rem' }}>
          {pizzas.map((pizza) => (
            <div key={pizza.id} className="col-md-4 mb-4">
              <CardPizza
                name={pizza.name}
                price={pizza.price}
                ingredients={pizza.ingredients}
                img={pizza.img}
                pizzaId={pizza.id}
                onAddToCart={() => handleAddToCart(pizza)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
