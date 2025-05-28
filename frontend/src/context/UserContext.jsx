import React, { createContext, useState, useEffect } from "react";

// Crear el contexto de usuario
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario

  // Función para cargar el usuario desde localStorage
  const loadUserFromLocalStorage = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Error al cargar el usuario desde localStorage:", error.message);
      localStorage.removeItem("user"); // Limpia datos corruptos
    }
  };

  // Función para guardar el usuario en localStorage y en el estado
  const login = (userData) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error al guardar el usuario en localStorage:", error.message);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    loadUserFromLocalStorage();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
