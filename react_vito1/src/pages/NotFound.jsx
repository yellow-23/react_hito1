import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div 
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ff9f1c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '8rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}
          >
            404
          </div>
          
          <h1 className="mb-4">¡Oops! Página no encontrada</h1>
          
          <div className="mb-4" style={{ fontSize: '3rem' }}>
            🍕😵
          </div>
          
          <p className="lead mb-4">
            Parece que esta página se perdió como una pizza en el horno... 
            ¡No pudimos encontrar lo que buscabas!
          </p>
          
          <p className="text-muted mb-5">
            La página que intentas visitar no existe o ha sido movida.
          </p>
          
          <Link 
            to="/"
            className="btn btn-lg"
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ff9f1c)',
              border: 'none',
              color: 'white',
              padding: '15px 40px',
              borderRadius: '25px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            🏠 Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
