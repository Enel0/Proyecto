import React, { useState } from 'react';
import LogoImage from '../Imagenes/logo.png'; // Asegúrate de que la ruta sea correcta

const AgregarProducto = () => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState(''); // Agregado para el stock
  const [categoria, setCategoria] = useState('');
  const [foto, setFoto] = useState(null);

  // Función para manejar el cambio de archivo (imagen)
  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  // Función para manejar el registro del producto
  const handleRegister = async () => {
    // Validación básica
    if (!nombre || !descripcion || !precio || !categoria || !foto) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      // Crear un FormData para enviar los datos y la imagen
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('precio', precio);
      formData.append('stock', stock || 0); // Si no se llena, usar 0 por defecto
      formData.append('categoria', categoria);
      formData.append('imagen', foto);

      // Hacer la solicitud al backend
      const response = await fetch('http://localhost:5000/api/productos', {
        method: 'POST',
        body: formData,
      });

      // Manejar la respuesta
      if (response.ok) {
        const data = await response.json();
        alert('Producto agregado con éxito');
        // Limpiar el formulario
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setStock('');
        setCategoria('');
        setFoto(null);
      } else {
        const errorData = await response.json();
        console.error('Error al agregar producto:', errorData);
        alert('Error al agregar producto');
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0A4F] justify-center items-center">
      <img src={LogoImage} alt="Logo" className="w-48 mb-6" />
      <h1 className="text-white text-3xl font-bold mb-4">Agregar Producto</h1>
      <div className="flex flex-col gap-4 mb-6 w-full max-w-md">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="p-2 rounded border border-gray-300"
          placeholder="Nombre"
        />
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="p-2 rounded border border-gray-300"
          placeholder="Descripción"
        />
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="p-2 rounded border border-gray-300"
          placeholder="Precio"
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="p-2 rounded border border-gray-300"
          placeholder="Stock (opcional, por defecto 0)"
        />
        <input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="p-2 rounded border border-gray-300"
          placeholder="Categoría"
        />
        <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded cursor-pointer">
          <span className="text-gray-500">Selecciona una imagen</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleRegister}
          className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-4 rounded"
        >
          Agregar
        </button>
        <button
          onClick={() => window.history.back()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Atrás
        </button>
      </div>
    </div>
  );
};

export default AgregarProducto;
