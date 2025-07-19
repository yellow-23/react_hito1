import React from "react";
import { Link } from "react-router-dom";

const CardPizza = ({
  name,
  price,
  img,
  pizzaId,
  onAddToCart,
}) => {
  const handleAddToCart = () => {
    onAddToCart({ name, price, id: pizzaId, img });
  };

  return (
    <div
      className="card pizza-card"
      style={{
        margin: '6px',
        borderRadius: '24px',
        boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
        minWidth: 320,
        maxWidth: 370,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '1 1 340px'
      }}
    >
      <div
        className="card-img-container"
        style={{
          width: '100%',
          height: '210px',
          overflow: 'hidden',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px'
        }}
      >
        <img
          src={img}
          className="card-img-top"
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px'
          }}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/500x300?text=Pizza+Image";
          }}
        />
      </div>
      <div className="card-body" style={{ width: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
          <h5 className="card-title" style={{ fontWeight: 700, fontSize: '1.15rem', margin: 0, textAlign: 'left' }}>{name}</h5>
          <div className="price" style={{ color: '#ff6b6b', fontWeight: 700, fontSize: '1.15rem', marginLeft: '0px', textAlign: 'right' }}>
            ${price.toLocaleString()}
          </div>
        </div>
        <div className="btn-container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '0.4rem' }}>
          <Link to={`/pizza/${pizzaId}`} className="btn btn-outline" style={{ flex: 1 }}>
            Ver Detalles
          </Link>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAddToCart}>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
