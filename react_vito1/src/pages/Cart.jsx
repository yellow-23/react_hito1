import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Cart = () => {
  const { cart, total, incrementQuantity, decrementQuantity, removeFromCart } = useCart();
  const { token } = useUser();

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
      
      <div className="row" style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-start', gap: '2rem' }}>
        <div className="col-lg-8 mb-4" style={{ flex: '2 1 0%', minWidth: 0 }}>
          {cart.map((item, index) => {
            const uniqueKey = item.id || `item-${index}`;
            return (
              <div
                key={uniqueKey}
                className="card mb-4"
                style={{
                  border: 'none',
                  borderRadius: '18px',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
                  overflow: 'hidden',
                  display: 'flex',
                  minHeight: '180px',
                  background: '#fff'
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  minHeight: '180px'
                }}>
                  {/* Imagen */}
                  <div style={{
                    flex: '0 0 180px',
                    width: '180px',
                    height: '180px',
                    background: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={item.img || 'https://via.placeholder.com/300x200?text=Pizza'}
                      alt={item.name || 'Pizza'}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '18px 0 0 18px'
                      }}
                      onError={e => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Pizza';
                      }}
                    />
                  </div>
                  {/* Contenido */}
                  <div style={{
                    flex: 1,
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <h5 style={{
                        fontWeight: 700,
                        color: '#292f36',
                        fontSize: '1.25rem',
                        marginBottom: '0.5rem',
                        textTransform: 'capitalize'
                      }}>
                        {item.name || 'Pizza sin nombre'}
                      </h5>
                      <div style={{
                        color: '#6c757d',
                        fontSize: '1rem',
                        marginBottom: '0.7rem'
                      }}>
                        Precio unitario:{' '}
                        <span style={{ fontWeight: 600, color: '#ff6b6b' }}>
                          ${(item.price || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      {/* Controles de cantidad */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                        <button
                          className="btn btn-sm"
                          onClick={() => decrementQuantity(item.id)}
                          style={{
                            background: '#f44336',
                            border: 'none',
                            color: 'white',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >-</button>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          color: '#292f36',
                          minWidth: '40px',
                          textAlign: 'center'
                        }}>
                          {item.quantity || 1}
                        </span>
                        <button
                          className="btn btn-sm"
                          onClick={() => incrementQuantity(item.id)}
                          style={{
                            background: '#43a047',
                            border: 'none',
                            color: 'white',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >+</button>
                      </div>
                      {/* Precio total y eliminar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '1.15rem',
                          color: '#ff6b6b'
                        }}>
                          ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                        </span>
                        <button
                          className="btn btn-sm"
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: '#ff9f1c',
                            border: 'none',
                            color: 'white',
                            padding: '7px 13px',
                            borderRadius: '16px',
                            fontWeight: 600,
                            fontSize: '0.9rem'
                          }}
                        >🗑️</button>
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
              {/* Botón de pagar deshabilitado si no hay token */}
              <button
                className="btn w-100"
                disabled={!token}
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
                  transition: 'all 0.3s ease',
                  opacity: !token ? 0.5 : 1,
                  cursor: !token ? 'not-allowed' : 'pointer'
                }}
                onMouseOver={(e) => {
                  if (token) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 25px rgba(40, 167, 69, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (token) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 20px rgba(40, 167, 69, 0.3)';
                  }
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
