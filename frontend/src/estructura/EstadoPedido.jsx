import React, { useEffect, useState } from "react";

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:5000/api/pedidos/usuario/${usuario.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPedidos(data);
        setLoading(false);
      })
      .catch(() => {
        setPedidos([]);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Cargando pedidos...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#0D0A4F]">
        Mis Pedidos
      </h2>
      {pedidos.length === 0 ? (
        <p className="text-center text-gray-500">No tienes pedidos registrados.</p>
      ) : (
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div
              key={pedido._id}
              className="bg-gray-100 shadow-md rounded-lg p-4 border border-gray-300"
            >
              <h3 className="text-lg font-semibold text-[#FF540C] mb-2">
                Pedido #{pedido._id}
              </h3>
              <p className="text-gray-700">
                <span className="font-bold">Total:</span> {pedido.total}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Estado:</span> {pedido.estado}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Dirección:</span> {pedido.direccion}
              </p>
              {pedido.productos && (
                <div className="mt-4">
                  <h4 className="text-sm font-bold mb-2">Productos:</h4>
                  <ul className="list-disc ml-5 text-gray-600">
                    {pedido.productos.map((producto, index) => (
                      <li key={index}>
                        {producto.nombre} - {producto.cantidad} x{" "}
                        {new Intl.NumberFormat("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        }).format(producto.precio)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPedidos;
