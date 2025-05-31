import React from "react";

const Navbar = ({ cartTotal = 0 }) => {
  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#">
          Mamma Mía!
        </a>

        <div className="navbar-nav">
          <a className="nav-link" href="#">
            Inicio
          </a>
          <a className="nav-link" href="#">
            Menú
          </a>
          <a className="nav-link" href="#">
            Contacto
          </a>
          <a className="nav-link cart-link" href="#">
            Carrito: ${cartTotal.toLocaleString()}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
