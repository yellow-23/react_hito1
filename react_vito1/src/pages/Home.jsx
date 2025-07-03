import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';

const Home = ({ addToCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pizzas');
        if (!response.ok) {
          throw new Error('Error al cargar las pizzas');
        }
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);
  const handleAddToCart = (pizza) => {
    addToCart(pizza);
  };

  const handleViewDetails = (pizzaId) => {
    // La navegación ahora se maneja con Link en CardPizza
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
      <main className="container my-5">
        <h2 className="section-title text-center mb-4">Nuestras Pizzas</h2>
        <div className="row">
          {pizzas.map((pizza) => (
            <div key={pizza.id} className="col-md-4 mb-4">
              <CardPizza
                name={pizza.name}
                price={pizza.price}
                ingredients={pizza.ingredients}
                img={pizza.img}
                pizzaId={pizza.id}
                onAddToCart={() => handleAddToCart(pizza)}
                onViewDetails={() => handleViewDetails(pizza.id)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
