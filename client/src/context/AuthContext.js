// client/src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const saveBookingInfo = (info) => {
    setBookingInfo(info);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        bookingInfo,
        login,
        logout,
        saveBookingInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);