import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({ cartTotal = 0, isLoggedIn = false, onLogout, cartItems = 0 }) => {
  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
          Mamma Mía!
        </Link>

        <div className="navbar-nav d-flex align-items-center flex-grow-1">
          {isLoggedIn ? (
            <>
              <Link className="nav-link" to="/">
                🍕 Home
              </Link>
              <Link className="nav-link" to="/profile">
                🔒 Profile
              </Link>
              <Link className="nav-link cart-link shoppingkart" to="/cart">
                <FaShoppingCart /> Total: ${cartTotal.toLocaleString()}
              </Link>
              <button
                className="nav-link ms-auto"
                onClick={onLogout}
                style={{ background: "none", border: "none" }}
              >
                🔓 Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                🔐 Login
              </Link>
              <Link className="nav-link" to="/register">
                🔐 Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
