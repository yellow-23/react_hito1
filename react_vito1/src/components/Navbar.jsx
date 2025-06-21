import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({ cartTotal = 0, isLoggedIn = false, onLogout, cartItems = 0 }) => {
  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#">
          Mamma Mía!
        </a>

        <div className="navbar-nav d-flex align-items-center flex-grow-1">
          {isLoggedIn && (
            <>
              <a className="nav-link" href="#">
                Inicio
              </a>
              <a className="nav-link" href="#">
                Menú
              </a>
              <a className="nav-link" href="#">
                Contacto
              </a>                
              <a className="nav-link cart-link shoppingkart" href="#" style={{
              }}>
                <FaShoppingCart /> Carrito: ${cartTotal.toLocaleString()}
              </a>
              <button
                className="nav-link ms-auto"
                onClick={onLogout}
                style={{ background: "none", border: "none" }}
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
