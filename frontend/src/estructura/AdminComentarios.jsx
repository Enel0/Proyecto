import React, { useEffect, useState } from 'react';

const AdminComentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todos');

  const obtenerComentarios = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comentarios`);
      const data = await res.json();
      setComentarios(data);
    } catch (err) {
      console.error('Error al obtener comentarios:', err);
    } finally {
      setLoading(false);
    }
  };

  const aprobarComentario = async (id, aprobado) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comentarios/${id}/aprobar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aprobado }),
      });
      if (res.ok) {
        alert(`Comentario ${aprobado ? 'aprobado' : 'rechazado'}`);
        obtenerComentarios();
      }
    } catch (err) {
      console.error('Error al actualizar el comentario:', err);
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, []);

  const comentariosFiltrados = comentarios.filter((comentario) => {
    const coincideBusqueda = comentario.usuarioEmail.toLowerCase().includes(busqueda.toLowerCase()) ||
      comentario.texto.toLowerCase().includes(busqueda.toLowerCase());
    const coincideFiltro =
      filtro === 'todos' ||
      (filtro === 'aprobado' && comentario.aprobado) ||
      (filtro === 'pendiente' && !comentario.aprobado);
    return coincideBusqueda && coincideFiltro;
  });

  if (loading) return <div className="text-center mt-6">Cargando comentarios...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Administrar Comentarios</h2>

      {/* Barra de búsqueda y filtro */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por correo o comentario"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border rounded shadow"
        />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border rounded shadow"
        >
          <option value="todos">Todos</option>
          <option value="aprobado">Aprobados</option>
          <option value="pendiente">Pendientes</option>
        </select>
      </div>

      {comentariosFiltrados.length === 0 ? (
        <p>No hay comentarios para mostrar.</p>
      ) : (
        <div className="space-y-4">
          {comentariosFiltrados.map((comentario) => (
            <div key={comentario._id} className="border p-4 rounded shadow">
              <p><strong>Correo:</strong> {comentario.usuarioEmail}</p>
              <p><strong>Comentario:</strong> {comentario.texto}</p>
              <p><strong>Estrellas:</strong> {comentario.estrellas}</p>
              <p><strong>Pedido:</strong> {comentario.pedidoId}</p>
              <p><strong>Estado:</strong> {comentario.aprobado ? 'Aprobado' : 'Pendiente'}</p>
              <div className="mt-2 space-x-2">
                <button onClick={() => aprobarComentario(comentario._id, true)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Aprobar</button>
                <button onClick={() => aprobarComentario(comentario._id, false)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Rechazar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminComentarios;
