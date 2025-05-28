import React, { useEffect, useState } from "react";

function AsignarRoles() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar lista de usuarios
  useEffect(() => {
    fetch("http://localhost:5000/api/usuarios")
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar usuarios");
        setLoading(false);
      });
  }, []);

  // Función para actualizar el rol del usuario
  const actualizarRol = (id, nuevoRol) => {
    fetch(`http://localhost:5000/api/actualizar-rol/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rol: nuevoRol }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || "Error al actualizar el rol");
          });
        }
        return res.json();
      })
      .then((data) => {
        alert(data.message);
        // Actualizar el estado local con el nuevo rol
        setUsuarios((prev) =>
          prev.map((usuario) =>
            usuario._id === id ? { ...usuario, rol: nuevoRol } : usuario
          )
        );
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  if (loading) {
    return <p className="text-center mt-8 text-blue-500">Cargando usuarios...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#0D0A4F]">Asignar Roles</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Correo</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Rol Actual</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{usuario.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{usuario.email}</td>
              <td className="border border-gray-300 px-4 py-2">{usuario.rol}</td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={usuario.rol}
                  onChange={(e) => actualizarRol(usuario._id, e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                >
                  <option value="client">Cliente</option>
                  <option value="worker">Trabajador</option>
                  <option value="admin">Administrador</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AsignarRoles;
