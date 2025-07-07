import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const PizzaContext = createContext();

// Hook personalizado para usar el contexto
export const usePizza = () => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error('usePizza debe ser usado dentro de un PizzaProvider');
  }
  return context;
};

// Provider del contexto
export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar todas las pizzas
  const fetchPizzas = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/pizzas');
      if (!response.ok) {
        throw new Error('Error al cargar las pizzas');
      }
      const data = await response.json();
      setPizzas(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener una pizza específica por ID
  const getPizzaById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
      if (!response.ok) {
        throw new Error('Error al cargar la pizza');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Cargar pizzas al montar el componente
  useEffect(() => {
    fetchPizzas();
  }, []);

  const value = {
    pizzas,
    loading,
    error,
    fetchPizzas,
    getPizzaById
  };

  return (
    <PizzaContext.Provider value={value}>
      {children}
    </PizzaContext.Provider>
  );
};
