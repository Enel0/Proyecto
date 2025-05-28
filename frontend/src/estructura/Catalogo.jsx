import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Importa el contexto del carrito
import CarritoImage from '../Imagenes/carrito.png';

const Catalogo = () => {
  const { cart, setCart } = useContext(CartContext); // Accede al carrito desde el contexto
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate(); // Para redirección

  // Cargar los productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productos'); // Ajusta la URL si es necesario
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  // Agregar un producto al carrito
  const handleAddProduct = (producto) => {
    setCart((prevCart) => {
      const productoEnCarrito = prevCart.find((item) => item._id === producto._id);
      if (productoEnCarrito) {
        return prevCart.map((item) =>
          item._id === producto._id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { ...producto, cantidad: 1 }];
    });
  };

  // Eliminar un producto del carrito
  const handleRemoveProduct = (productoId) => {
    setCart((prevCart) => {
      const productoEnCarrito = prevCart.find((item) => item._id === productoId);
      if (productoEnCarrito.cantidad > 1) {
        return prevCart.map((item) =>
          item._id === productoId ? { ...item, cantidad: item.cantidad - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item._id !== productoId);
      }
    });
  };

  // Redirigir a la página de Pcarrito
  const handleIrAPagar = () => {
    navigate('/Pcarrito'); // Redirige a la ruta Pcarrito
  };

  // Redirigir al inicio (Home)
  const handleIrInicio = () => {
    navigate('/'); // Redirige al inicio (Home)
  };

  // Formatear precios como pesos chilenos
  const formatearPesos = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  return (
    <div className="flex flex-row min-h-screen">
      {/* Columna izquierda: Catálogo */}
      <div className="flex-1">
        <div className="w-full h-12 bg-[#0D0A4F] flex justify-between items-center px-4">
          <button
            onClick={handleIrInicio}
            className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-4 rounded"
          >
            Menú
          </button>
          <div className="flex items-center">
            <img src={CarritoImage} alt="Carrito" className="w-8 h-8 mr-2 rounded-full" />
            <span className="text-white">Carrito: {cart.reduce((acc, item) => acc + item.cantidad, 0)} productos</span>
          </div>
        </div>

        <h1 className="text-center text-4xl font-bold text-[#000000] mt-6 mb-6">
          Catálogo
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-8 p-8 bg-gray-100">
          {productos.map((producto) => (
            <div key={producto._id} className="bg-white p-4 rounded-lg shadow-md text-center">
              <img
                src={`http://localhost:5000${producto.imagen}`} // Ajusta la URL si es necesario
                alt={producto.nombre}
                className="w-48 h-auto mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-[#0D0A4F]">{producto.nombre}</h3>
              <p className="text-sm text-gray-700">{producto.descripcion}</p>
              <p className="text-lg font-bold text-[#FF540C]">{formatearPesos(producto.precio)}</p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleAddProduct(producto)}
                  className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-4 rounded"
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Columna derecha: Lista del carrito */}
      {cart.length > 0 && (
        <div className="w-60 bg-gray-200 p-2 shadow-inner fixed right-0 top-16">
          <h2 className="text-xl font-bold text-[#0D0A4F] mb-2 text-center">Carrito</h2>
          <ul className="space-y-2">
            {cart.map((producto) => (
              <li key={producto._id} className="bg-white p-2 rounded shadow text-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{producto.nombre}</h3>
                    <p className="text-gray-700">
                      {formatearPesos(producto.precio)} x{producto.cantidad}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                      onClick={() => handleRemoveProduct(producto._id)}
                    >
                      -
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                      onClick={() => handleAddProduct(producto)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-300 mt-2 pt-2">
            <p className="text-center font-bold text-lg">
              Total: {formatearPesos(cart.reduce((total, producto) => total + producto.precio * producto.cantidad, 0))}
            </p>
          </div>
          <button
            onClick={handleIrAPagar}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
          >
            Ir a Pagar
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalogo;
