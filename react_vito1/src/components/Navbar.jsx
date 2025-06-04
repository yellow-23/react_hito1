import React from "react";

const Navbar = ({ cartTotal = 0, isLoggedIn = false, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#">
          Mamma Mía!
        </a>

        <div className="navbar-nav">
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
              <a className="nav-link cart-link" href="#">
                Carrito: ${cartTotal.toLocaleString()}
              </a>
              <button
                className="nav-link"
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
