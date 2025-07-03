import React from 'react';

const Cart = ({ cart, total, onIncrement, onDecrement, onRemove }) => {
  if (cart.length === 0) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <h2>Tu carrito está vacío</h2>
          <p>¡Agrega algunas deliciosas pizzas!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Carrito de Compras</h2>
      
      <div className="row">
        <div className="col-md-8">
          {cart.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img 
                    src={item.img} 
                    alt={item.name}
                    className="img-fluid rounded-start"
                    style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Precio: ${item.price?.toLocaleString()}</p>
                    
                    <div className="d-flex align-items-center mb-3">
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onDecrement && onDecrement(item.id)}
                      >
                        -
                      </button>
                      <span className="mx-3">Cantidad: {item.quantity}</span>
                      <button 
                        className="btn btn-outline-success btn-sm"
                        onClick={() => onIncrement && onIncrement(item.id)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0">
                        <strong>Subtotal: ${(item.price * item.quantity)?.toLocaleString()}</strong>
                      </p>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => onRemove && onRemove(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resumen del pedido</h5>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Total:</span>
                <strong>${total?.toLocaleString()}</strong>
              </div>
              <hr />
              <button 
                className="btn btn-success w-100"
                style={{
                  background: 'linear-gradient(135deg, #28a745, #20c997)',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '25px',
                  fontWeight: '600'
                }}
              >
                Proceder al pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
