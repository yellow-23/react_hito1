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
  // Inicializa el token desde localStorage o true para pruebas
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem('token');
    return stored !== null ? stored : false;
  });

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
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

  const value = { token, logout, setToken };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

