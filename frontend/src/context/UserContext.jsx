import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Cargar usuario desde localStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } catch (error) {
      console.error("Error al cargar el usuario desde localStorage:", error.message);
      localStorage.removeItem("user");
    }
  }, []);

  // Cargar modo oscuro desde localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
  }, []);

  // Aplicar clase `dark` al <html> según el estado
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Guardar usuario en localStorage
  const login = (userData) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error al guardar el usuario en localStorage:", error.message);
    }
  };

  // Cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, darkMode, setDarkMode }}>
      {children}
    </UserContext.Provider>
  );
};
