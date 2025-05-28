import React, { useState, useEffect } from 'react';
import LogoImage from '../Imagenes/logo.png'; // Asegúrate de que la ruta sea correcta

const ActualizarProducto = () => {
  const [productos, setProductos] = useState([]); // Lista de productos
  const [productoSeleccionado, setProductoSeleccionado] = useState(''); // Producto seleccionado
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');
  const [foto, setFoto] = useState(null);

  // Cargar la lista de productos al inicio
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productos'); // URL del backend
        if (response.ok) {
          const data = await response.json();
          setProductos(data); // Guarda la lista de productos
        } else {
          console.error('Error al obtener los productos');
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      }
    };

    fetchProductos();
  }, []);

  // Cargar los datos del producto seleccionado
  useEffect(() => {
    if (productoSeleccionado) {
      const fetchProducto = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/productos/${productoSeleccionado}`);
          if (response.ok) {
            const producto = await response.json();
            setNombre(producto.nombre);
            setDescripcion(producto.descripcion);
            setPrecio(producto.precio);
            setStock(producto.stock);
            setCategoria(producto.categoria);
            setFoto(producto.imagen); // Ruta de la imagen
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

      const response = await fetch(`http://localhost:5000/api/productos/${productoSeleccionado}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Producto actualizado con éxito');
        window.location.reload(); // Recargar la página
      } else {
        console.error('Error al actualizar el producto');
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
      const response = await fetch(`http://localhost:5000/api/productos/${productoSeleccionado}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Producto eliminado con éxito');
        window.location.reload(); // Recargar la página
      } else {
        console.error('Error al eliminar el producto');
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
    <div className="flex flex-col min-h-screen bg-gray-100 justify-center items-center">
      {/* Logo */}
      <img src={LogoImage} alt="Logo Fukusuke" className="w-48 mb-6" />
      <h1 className="text-2xl font-bold mb-4">Actualizar Producto</h1>

      {/* Selección de producto */}
      <select
        value={productoSeleccionado}
        onChange={(e) => setProductoSeleccionado(e.target.value)}
        className="p-2 rounded border border-gray-300 mb-4 w-1/2"
      >
        <option value="">Selecciona un producto</option>
        {productos.map((producto) => (
          <option key={producto._id} value={producto._id}>
            {producto.nombre}
          </option>
        ))}
      </select>

      {/* Formulario de edición */}
      {productoSeleccionado && (
        <div className="w-full max-w-md bg-white p-4 rounded shadow">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="p-2 rounded border border-gray-300 mb-4 w-full"
            placeholder="Nombre"
          />
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="p-2 rounded border border-gray-300 mb-4 w-full"
            placeholder="Descripción"
          />
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="p-2 rounded border border-gray-300 mb-4 w-full"
            placeholder="Precio"
          />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="p-2 rounded border border-gray-300 mb-4 w-full"
            placeholder="Stock"
          />
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="p-2 rounded border border-gray-300 mb-4 w-full"
            placeholder="Categoría"
          />
          <input type="file" onChange={handleFileChange} className="mb-4" accept="image/*" />
          {foto && typeof foto === 'string' && (
            <img src={`http://localhost:5000${foto}`} alt="Imagen actual" className="w-32 h-32 object-cover mb-4" />
          )}
          {foto && typeof foto !== 'string' && (
            <img src={URL.createObjectURL(foto)} alt="Vista previa" className="w-32 h-32 object-cover mb-4" />
          )}
          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Actualizar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
