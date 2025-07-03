import React from "react";
import { Link } from "react-router-dom";

const CardPizza = ({
  name,
  price,
  ingredients,
  img,
  pizzaId,
  onAddToCart,
  onViewDetails,
}) => {
  const handleAddToCart = () => {
    onAddToCart({ name, price, ingredients, id: pizzaId, img });
  };

  return (
    <div className="card">
      <div className="card-img-container">
        <img
          src={img}
          className="card-img-top"
          alt={name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/500x300?text=Pizza+Image";
          }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        <div className="ingredients-list">
          <p className="ingredients-title">Ingredientes:</p>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="price">${price.toLocaleString()}</div>

        <div className="btn-container">
          <Link to={`/pizza/${pizzaId}`} className="btn btn-outline">
            Ver Detalles
          </Link>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
