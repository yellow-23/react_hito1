import React from 'react';

const Profile = ({ onLogout }) => {
  // Por ahora usamos datos estáticos como indica el requerimiento
  const userEmail = "usuario@ejemplo.com";

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <div 
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#ff6b6b',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    fontSize: '2rem',
                    color: 'white'
                  }}
                >
                  👤
                </div>
              </div>
              
              <h2 className="mb-3">Mi Perfil</h2>
              
              <div className="mb-4">
                <label className="form-label text-muted">Email:</label>
                <p className="fs-5">{userEmail}</p>
              </div>
              
              <button 
                className="btn btn-danger"
                onClick={onLogout}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #ff9f1c)',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
