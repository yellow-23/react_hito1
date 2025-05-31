import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Pizzería Mamma Mía!</h1>
        <p>
          Las pizzas más deliciosas hechas con ingredientes frescos y de alta
          calidad
        </p>
        <button className="btn btn-primary">Ver Menú</button>
      </div>
    </header>
  );
};

export default Header;
