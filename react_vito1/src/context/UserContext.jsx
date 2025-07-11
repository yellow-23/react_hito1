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
  const [token, setToken] = useState(true); // token simulado

  const logout = () => setToken(false);

  const value = { token, logout, setToken };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

