import React from 'react';

const Profile = ({ onLogout }) => {
  // Por ahora usamos datos estáticos como indica el requerimiento
  const userEmail = "usuario@ejemplo.com";

  return (
    <div className="container my-5" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="row justify-content-center w-100">
        <div className="col-md-5">
          <div className="card" style={{ 
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)', 
            border: 'none',
            borderRadius: '20px'
          }}>
            <div className="card-body text-center p-5">
              <div className="mb-4">
                <div 
                  style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #ff6b6b, #ff9f1c)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    fontSize: '2.5rem',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
                  }}
                >
                  👤
                </div>
              </div>
              
              <h2 className="mb-4" style={{ color: '#292f36', fontWeight: '700' }}>Mi Perfil</h2>
              
              <div className="mb-4">
                <label className="form-label text-muted" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Email:</label>
                <p className="fs-5" style={{ 
                  color: '#292f36', 
                  fontWeight: '600',
                  background: '#f8f9fa',
                  padding: '10px 15px',
                  borderRadius: '10px',
                  margin: '0.5rem 0'
                }}>{userEmail}</p>
              </div>
              
              <button 
                className="btn btn-danger"
                onClick={onLogout}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #ff9f1c)',
                  border: 'none',
                  padding: '15px 35px',
                  borderRadius: '50px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 25px rgba(255, 107, 107, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(255, 107, 107, 0.3)';
                }}
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
