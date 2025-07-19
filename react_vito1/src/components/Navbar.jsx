import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { total } = useCart();
  const { token, logout } = useUser();
  const isLoggedIn = !!token && token !== 'false';

  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
          Mamma Mía!
        </Link>

        <div className="navbar-nav d-flex align-items-center flex-grow-1">
          {/* Home y Total siempre visibles */}
          <Link className="nav-link navbar-orange" to="/">
            <span>🍕</span> Home
          </Link>
          <Link className="nav-link cart-link shoppingkart navbar-orange" to="/cart">
            <FaShoppingCart /> Total: ${total.toLocaleString()}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: '0.5rem' }}>
            {isLoggedIn ? (
              <>
                <Link className="nav-link navbar-orange" to="/profile">
                  <span>🔒</span> Profile
                </Link>
                <button
                  onClick={logout}
                  className="navbar-orange"
                  style={{
                    background: "none",
                    border: "none",
                    fontWeight: 600,
                    fontSize: '1rem',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'color 0.2s',
                  }}
                >
                  <span>🔓</span> Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link navbar-orange" to="/login">
                  <span>🔐</span> Login
                </Link>
                <Link className="nav-link navbar-orange" to="/register">
                  <span>🔐</span> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
