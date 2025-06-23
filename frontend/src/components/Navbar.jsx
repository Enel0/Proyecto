import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Sun, Moon } from "lucide-react";

function Navbar() {
  const { user, logout, darkMode, setDarkMode } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-[#0D0A4F] text-white py-4 px-6 flex justify-between items-center shadow-md">
      {/* Logo de la aplicación */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Fukusuke Sushi
      </h1>

      <div className="flex items-center space-x-4">
        {/* Botón modo oscuro/claro */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-1 text-sm font-medium 
                     bg-[#0D0A4F] hover:bg-[#1a1668] text-white 
                     px-3 py-1 rounded-full border border-white"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {darkMode ? "Claro" : "Oscuro"}
        </button>

        {user ? (
          <>
            <span className="font-medium">
              Hola, {user.nombre} ({user.rol})
            </span>

            {user.rol === "admin" && (
              <>
                <button onClick={() => navigate("/asignarRoles")} className="hover:underline">Asignar Roles</button>
                <button onClick={() => navigate("/reporte-ventas")} className="hover:underline">Reporte de Ventas</button>
                <button onClick={() => navigate("/agregarProducto")} className="hover:underline">Agregar Producto</button>
                <button onClick={() => navigate("/actualizar-producto")} className="hover:underline">Actualizar Producto</button>
                <button onClick={() => navigate("/comandas")} className="hover:underline">Comandas</button>
                <button onClick={() => navigate("/estado-pedido")} className="hover:underline">Mis Pedidos</button>
              </>
            )}

            {user.rol === "worker" && (
              <>
                <button onClick={() => navigate("/agregarProducto")} className="hover:underline">Agregar Producto</button>
                <button onClick={() => navigate("/actualizar-producto")} className="hover:underline">Actualizar Producto</button>
                <button onClick={() => navigate("/comandas")} className="hover:underline">Comandas</button>
                <button onClick={() => navigate("/estado-pedido")} className="hover:underline">Mis Pedidos</button>
              </>
            )}

            {user.rol === "client" && (
              <button onClick={() => navigate("/estado-pedido")} className="hover:underline">Mis Pedidos</button>
            )}

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-4 rounded"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-4 rounded">Iniciar Sesión</button>
            <button onClick={() => navigate("/registro")} className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-4 rounded">Registrarse</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
