import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // Inicializa el token y email desde localStorage
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem('token');
    return stored !== null ? stored : false;
  });

  const [email, setEmail] = useState(() => {
    const stored = localStorage.getItem('email');
    return stored || '';
  });

  // Método para hacer login
  const login = async (userEmail, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Error en el login' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  // Método para hacer register
  const register = async (userEmail, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Error en el registro' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  // Método para hacer logout
  const logout = () => {
    setToken(false);
    setEmail('');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  // Método para obtener el perfil del usuario autenticado
  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, user: data };
      } else {
        return { success: false, error: data.error || 'Error al obtener perfil' };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  // Si el token cambia y es string válido, lo guarda
  React.useEffect(() => {
    // Solo guarda el token si es un string válido (no false, no vacío)
    if (token && typeof token === 'string' && token !== 'false') {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const value = { 
    token, 
    email, 
    login, 
    register, 
    logout, 
    getProfile, 
    setToken 
  };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

