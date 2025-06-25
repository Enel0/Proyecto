import React, { useState, useEffect } from 'react';
import LogoImage from '../Imagenes/logo.png';
import { API_BASE } from '../config';

const ActualizarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
<<<<<<< codex/configure-api_base-and-update-fetch-calls
        const response = await fetch(`${API_BASE}/api/productos`);
=======
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`);
>>>>>>> main
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        } else {
          console.error('Error al obtener los productos');
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    if (productoSeleccionado) {
      const fetchProducto = async () => {
        try {
<<<<<<< codex/configure-api_base-and-update-fetch-calls
          const response = await fetch(`${API_BASE}/api/productos/${productoSeleccionado}`);
=======
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos/${productoSeleccionado}`);
>>>>>>> main
          if (response.ok) {
            const producto = await response.json();
            setNombre(producto.nombre);
            setDescripcion(producto.descripcion);
            setPrecio(producto.precio);
            setStock(producto.stock);
            setCategoria(producto.categoria);
            setFoto(producto.imagen);
          } else {
            console.error('Error al cargar el producto');
          }
        } catch (error) {
          console.error('Error al conectar con el servidor:', error);
        }
      };

      fetchProducto();
    }
  }, [productoSeleccionado]);

  const handleUpdate = async () => {
    if (!nombre || !descripcion || !precio || !stock || !categoria) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('precio', precio);
      formData.append('stock', stock);
      formData.append('categoria', categoria);
      if (foto && typeof foto !== 'string') formData.append('imagen', foto);

<<<<<<< codex/configure-api_base-and-update-fetch-calls
      const response = await fetch(`${API_BASE}/api/productos/${productoSeleccionado}`, {
=======
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos/${productoSeleccionado}`, {
>>>>>>> main
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Producto actualizado con éxito');
        window.location.reload();
      } else {
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este producto?');
    if (!confirmDelete) return;

    try {
<<<<<<< codex/configure-api_base-and-update-fetch-calls
      const response = await fetch(`${API_BASE}/api/productos/${productoSeleccionado}`, {
=======
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos/${productoSeleccionado}`, {
>>>>>>> main
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Producto eliminado con éxito');
        window.location.reload();
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-[#0D0A4F] text-white flex flex-col items-center py-10 px-4">
      <img src={LogoImage} alt="Logo Fukusuke" className="w-48 mb-6" />
      <h1 className="text-3xl font-bold mb-6">Actualizar Producto</h1>

      <select
        value={productoSeleccionado}
        onChange={(e) => setProductoSeleccionado(e.target.value)}
        className="p-2 rounded border border-gray-300 mb-6 text-black w-full max-w-md"
      >
        <option value="">Selecciona un producto</option>
        {productos.map((producto) => (
          <option key={producto._id} value={producto._id}>
            {producto.nombre}
          </option>
        ))}
      </select>

      {productoSeleccionado && (
        <div className="w-full max-w-md bg-white text-black rounded-lg shadow-lg p-6">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Nombre"
          />
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Descripción"
          />
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Precio"
          />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Stock"
          />
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Categoría"
          />
          <input type="file" onChange={handleFileChange} className="mb-4" accept="image/*" />
          {foto && typeof foto === 'string' && (
<<<<<<< codex/configure-api_base-and-update-fetch-calls
            <img src={`${API_BASE}${foto}`} alt="Imagen actual" className="w-32 h-32 object-cover mb-4" />
=======
            <img src={`${import.meta.env.VITE_API_URL}${foto}`} alt="Imagen actual" className="w-32 h-32 object-cover mb-4" />
>>>>>>> main
          )}
          {foto && typeof foto !== 'string' && (
            <img src={URL.createObjectURL(foto)} alt="Vista previa" className="w-32 h-32 object-cover mb-4" />
          )}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Actualizar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActualizarProducto;
