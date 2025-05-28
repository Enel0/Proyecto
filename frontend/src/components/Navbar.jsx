import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Contexto para el usuario

function Navbar() {
  const { user, logout } = useContext(UserContext); // Acceso al contexto del usuario
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

      {/* Opciones según el estado del usuario */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {/* Mostrar el nombre del usuario y su rol */}
            <span className="font-medium">
              Hola, {user.nombre} ({user.rol})
            </span>

            {/* Enlaces según el rol */}
            {user.rol === "admin" && (
              <>
                <button
                  onClick={() => navigate("/asignarRoles")}
                  className="hover:underline"
                >
                  Asignar Roles
                </button>
                <button
                  onClick={() => navigate("/reporte-ventas")}
                  className="hover:underline"
                >
                  Reporte de Ventas
                </button>
                <button
                  onClick={() => navigate("/agregarProducto")}
                  className="hover:underline"
                >
                  Agregar Producto
                </button>
                <button
                  onClick={() => navigate("/actualizar-producto")}
                  className="hover:underline"
                >
                  Actualizar Producto
                </button>
                <button
                  onClick={() => navigate("/comandas")}
                  className="hover:underline"
                >
                  Comandas
                </button>
                <button
                  onClick={() => navigate("/estado-pedido")}
                  className="hover:underline"
                >
                  Mis Pedidos
                </button>
              </>
            )}

            {user.rol === "worker" && (
              <>
                <button
                  onClick={() => navigate("/agregarProducto")}
                  className="hover:underline"
                >
                  Agregar Producto
                </button>
                <button
                  onClick={() => navigate("/actualizar-producto")}
                  className="hover:underline"
                >
                  Actualizar Producto
                </button>
                <button
                  onClick={() => navigate("/comandas")}
                  className="hover:underline"
                >
                  Comandas
                </button>
                <button
                  onClick={() => navigate("/estado-pedido")}
                  className="hover:underline"
                >
                  Mis Pedidos
                </button>
              </>
            )}

            {user.rol === "client" && (
              <>
                <button
                  onClick={() => navigate("/estado-pedido")}
                  className="hover:underline"
                >
                  Mis Pedidos
                </button>
              </>
            )}

            {/* Botón para cerrar sesión */}
            <button
              onClick={() => {
                logout();
                navigate("/login"); // Redirigir al login después de cerrar sesión
              }}
              className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-4 rounded"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            {/* Botones para usuarios no autenticados */}
            <button
              onClick={() => navigate("/login")}
              className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-4 rounded"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => navigate("/registro")}
              className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-4 rounded"
            >
              Registrarse
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
