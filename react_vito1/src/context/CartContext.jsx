import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const CartContext = createContext();

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// Provider del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Calcular el total cada vez que el carrito cambie
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  // Agregar producto al carrito
  const addToCart = (pizza) => {
    console.log('Adding to cart:', pizza);
    const existingItem = cart.find(item => item.id === pizza.id);
    console.log('Existing item:', existingItem);
    
    if (existingItem) {
      const newCart = cart.map(item => 
        item.id === pizza.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      console.log('Updated cart (increment):', newCart);
      setCart(newCart);
    } else {
      const newCart = [...cart, { ...pizza, quantity: 1 }];
      console.log('Updated cart (new item):', newCart);
      setCart(newCart);
    }
  };

  // Incrementar cantidad de un producto
  const incrementQuantity = (id) => {
    console.log('Incrementing quantity for id:', id);
    console.log('Current cart:', cart);
    const newCart = cart.map(item => 
      item.id === id 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    console.log('New cart after increment:', newCart);
    setCart(newCart);
  };

  // Decrementar cantidad de un producto
  const decrementQuantity = (id) => {
    console.log('Decrementing quantity for id:', id);
    console.log('Current cart:', cart);
    const newCart = cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    console.log('New cart after decrement:', newCart);
    setCart(newCart);
  };

  // Eliminar producto del carrito
  const removeFromCart = (id) => {
    console.log('Removing from cart id:', id);
    console.log('Current cart:', cart);
    const newCart = cart.filter(item => item.id !== id);
    console.log('New cart after removal:', newCart);
    setCart(newCart);
  };

  // Limpiar carrito
  const clearCart = () => {
    setCart([]);
  };

  // Obtener cantidad total de items
  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    cart,
    total,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
