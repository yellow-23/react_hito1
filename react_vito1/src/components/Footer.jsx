import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div>
            <div className="footer-logo">Mamma Mía!</div>
            <p>Las mejores pizzas de la ciudad</p>
          </div>

          <ul className="footer-links">
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Menú</a>
            </li>
            <li>
              <a href="#">Sobre Nosotros</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Pizzería Mamma Mía. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
