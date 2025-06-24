import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode, user } = useContext(UserContext);
  const [comentarios, setComentarios] = useState({});

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pedidos/usuario/${user.email}`);
        const data = await res.json();
        setPedidos(data);
      } catch (err) {
        setPedidos([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchPedidos();
  }, [user?.email]);

  const handleComentarioChange = (id, field, value) => {
    setComentarios(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const enviarComentario = async (pedidoId) => {
    const comentario = comentarios[pedidoId];

    if (!user?.email) {
      console.error("Error: user.email no está definido. El usuario no está correctamente autenticado.");
      alert("No se puede enviar el comentario porque no estás autenticado correctamente.");
      return;
    }

    if (!comentario || comentario.estrellas === 0 || !comentario.texto) {
      return alert("Completa las estrellas y el comentario.");
    }

    const payload = {
      pedidoId,
      usuarioEmail: user.email, // usamos el correo en lugar del ID
      estrellas: comentario.estrellas,
      texto: comentario.texto,
      aprobado: false
    };

    console.log("Enviando comentario:", payload);

    try {
      const res = await fetch(`http://localhost:5000/api/comentarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Comentario enviado para aprobación");
        setComentarios(prev => ({ ...prev, [pedidoId]: { estrellas: 0, texto: "" } }));
      } else {
        const errorData = await res.json();
        console.error("Error en respuesta del servidor:", errorData);
        throw new Error("Error al enviar comentario");
      }
    } catch (err) {
      console.error("Error en envío de comentario:", err);
      alert("Error al enviar comentario");
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "pendiente": return "text-yellow-500";
      case "preparando": return "text-blue-500";
      case "en camino": return "text-orange-500";
      case "entregado": return "text-green-500";
      case "cancelado": return "text-red-500";
      default: return "text-gray-700";
    }
  };

  const renderEstrellas = (pedidoId) => {
    const valor = comentarios[pedidoId]?.estrellas || 0;
    return (
      <div className="flex space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map(num => (
          <span
            key={num}
            className={`cursor-pointer text-2xl ${num <= valor ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => handleComentarioChange(pedidoId, "estrellas", num)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) return <div className="text-center mt-8 text-blue-500">Cargando pedidos...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
      <h2 className="text-3xl font-bold text-center text-[#0D0A4F] dark:text-white mb-6">Mis Pedidos</h2>

      {pedidos.length === 0 ? (
        <p className="text-center text-gray-500">No tienes pedidos registrados.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {pedidos.map((pedido) => (
            <div key={pedido._id} className="border rounded-lg p-4 shadow-md dark:bg-gray-800">
              <p><strong>Fecha:</strong> {new Date(pedido.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${pedido.total}</p>
              <p><strong>Estado:</strong> <span className={getEstadoColor(pedido.estado)}>{pedido.estado}</span></p>
              <p><strong>Detalles:</strong> {pedido.descripcion}</p>

              {pedido.estado === "entregado" && (
                <div className="mt-4">
                  <label className="block mb-2 font-medium">Califica tu experiencia:</label>
                  {renderEstrellas(pedido._id)}
                  <textarea
                    value={comentarios[pedido._id]?.texto || ""}
                    onChange={(e) => handleComentarioChange(pedido._id, "texto", e.target.value)}
                    placeholder="Escribe tu comentario"
                    className="w-full p-2 rounded mb-2"
                  />
                  <button
                    onClick={() => enviarComentario(pedido._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Enviar Comentario
                  </button>
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
