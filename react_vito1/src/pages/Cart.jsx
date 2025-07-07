import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, total, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  console.log('Cart data:', cart); // Debug log

  if (cart.length === 0) {
    return (
      <div className="container my-5" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍕😔</div>
          <h2 style={{ color: '#292f36', marginBottom: '1rem' }}>Tu carrito está vacío</h2>
          <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>¡Agrega algunas deliciosas pizzas!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 style={{ 
        color: '#292f36', 
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>🛒 Carrito de Compras</h2>
      
      <div className="row">
        <div className="col-lg-8 mb-4">
          {cart.map((item, index) => {
            // Asegurar que tenemos un ID único
            const uniqueKey = item.id || `item-${index}`;
            console.log(`Cart item ${index}:`, item);
            console.log(`Using key: ${uniqueKey}, item.id: ${item.id}`);
            
            return (
              <div key={uniqueKey} className="card mb-4" style={{
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden'
              }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <img 
                        src={item.img || 'https://via.placeholder.com/300x200?text=Pizza'} 
                        alt={item.name || 'Pizza'}
                        className="img-fluid"
                        style={{ 
                          height: '100%', 
                          width: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Pizza';
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body h-100 d-flex flex-column justify-content-between" style={{ padding: '1.5rem' }}>
                      <div>
                        <h5 className="card-title" style={{ 
                          fontWeight: '700', 
                          color: '#292f36',
                          fontSize: '1.3rem',
                          marginBottom: '0.8rem',
                          textTransform: 'capitalize'
                        }}>{item.name || 'Pizza sin nombre'}</h5>
                        <p className="card-text" style={{ 
                          color: '#6c757d',
                          fontSize: '1rem',
                          marginBottom: '1rem'
                        }}>
                          Precio unitario: 
                          <span style={{ fontWeight: '600', color: '#ff6b6b' }}>
                            ${(item.price || 0).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center" style={{ gap: '1rem' }}>
                          <button 
                            className="btn btn-sm"
                            onClick={() => {
                              console.log('Decrement clicked for:', item.id);
                              decrementQuantity(item.id);
                            }}
                            style={{
                              background: 'linear-gradient(135deg, #dc3545, #c82333)',
                              border: 'none',
                              color: 'white',
                              width: '35px',
                              height: '35px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              boxShadow: '0 2px 8px rgba(220, 53, 69, 0.3)'
                            }}
                          >
                            -
                          </button>
                          <span style={{ 
                            fontWeight: '700', 
                            fontSize: '1.1rem',
                            color: '#292f36',
                            minWidth: '80px',
                            textAlign: 'center'
                          }}>
                            Cant: {item.quantity || 1}
                          </span>
                          <button 
                            className="btn btn-sm"
                            onClick={() => {
                              console.log('Increment clicked for:', item.id);
                              incrementQuantity(item.id);
                            }}
                            style={{
                              background: 'linear-gradient(135deg, #28a745, #20c997)',
                              border: 'none',
                              color: 'white',
                              width: '35px',
                              height: '35px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
                            }}
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="d-flex align-items-center" style={{ gap: '1rem' }}>
                          <div className="text-end">
                            <p className="mb-0" style={{ 
                              fontWeight: '700',
                              fontSize: '1.2rem',
                              color: '#ff6b6b'
                            }}>
                              ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                            </p>
                          </div>
                          <button 
                            className="btn btn-sm"
                            onClick={() => {
                              console.log('Remove clicked for:', item.id);
                              removeFromCart(item.id);
                            }}
                            style={{
                              background: 'linear-gradient(135deg, #ff6b6b, #ff9f1c)',
                              border: 'none',
                              color: 'white',
                              padding: '8px 15px',
                              borderRadius: '20px',
                              fontWeight: '600',
                              fontSize: '0.85rem',
                              boxShadow: '0 3px 10px rgba(255, 107, 107, 0.3)'
                            }}
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="col-lg-4">
          <div className="card sticky-top" style={{
            border: 'none',
            borderRadius: '16px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            top: '100px'
          }}>
            <div className="card-body" style={{ padding: '2rem' }}>
              <h5 className="card-title" style={{ 
                fontWeight: '700',
                color: '#292f36',
                marginBottom: '1.5rem',
                fontSize: '1.3rem',
                textAlign: 'center'
              }}>📋 Resumen del pedido</h5>
              
              <hr style={{ margin: '1.5rem 0', border: '1px solid #e9ecef' }} />
              
              <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#6c757d' }}>
                  Total ({cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} items):
                </span>
                <strong style={{ 
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #ff6b6b, #ff9f1c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  ${(total || 0).toLocaleString()}
                </strong>
              </div>
              
              <hr style={{ margin: '1.5rem 0', border: '1px solid #e9ecef' }} />
              
              <button 
                className="btn w-100"
                style={{
                  background: 'linear-gradient(135deg, #28a745, #20c997)',
                  border: 'none',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '50px',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: '0 8px 20px rgba(40, 167, 69, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 25px rgba(40, 167, 69, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(40, 167, 69, 0.3)';
                }}
              >
                💳 Proceder al pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
