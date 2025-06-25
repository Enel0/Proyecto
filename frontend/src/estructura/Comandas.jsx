import React, { useEffect, useState } from "react";

const Comandas = () => {
  const [comandas, setComandas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener comandas
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pedidos/comandas`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudieron cargar las comandas.");
        }
        return res.json();
      })
      .then((data) => {
        setComandas(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Actualizar estado de una comanda
  const actualizarEstado = (id, nuevoEstado) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pedidos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al actualizar el estado de la comanda.");
        }
        return res.json();
      })
      .then((data) => {
        alert("Estado actualizado correctamente.");
        // Actualizar estado local
        setComandas((prev) =>
          prev.map((comanda) =>
            comanda._id === id ? { ...comanda, estado: nuevoEstado } : comanda
          )
        );
      })
      .catch((err) => alert(err.message));
  };

  // Mostrar cargando
  if (loading) {
    return <p className="text-center text-blue-500">Cargando comandas...</p>;
  }

  // Mostrar error
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Mostrar comandas
  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#0D0A4F]">
        Comandas Pendientes
      </h2>
      {comandas.length === 0 ? (
        <p className="text-gray-500 text-center">No hay comandas pendientes.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Pedido</th>
              <th className="border border-gray-300 px-4 py-2">Cliente</th>
              <th className="border border-gray-300 px-4 py-2">Dirección</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
              <th className="border border-gray-300 px-4 py-2">Estado</th>
              <th className="border border-gray-300 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {comandas.map((comanda) => (
              <tr key={comanda._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  #{comanda._id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {comanda.usuario.nombre}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {comanda.direccion || "Sin dirección"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${comanda.total}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {comanda.estado}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={comanda.estado}
                    onChange={(e) =>
                      actualizarEstado(comanda._id, e.target.value)
                    }
                    className="border border-gray-300 p-2 rounded"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en preparación">En preparación</option>
                    <option value="listo">Listo</option>
                    <option value="entregado">Entregado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Comandas;
