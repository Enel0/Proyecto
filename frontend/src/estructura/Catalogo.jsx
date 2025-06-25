import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import CarritoImage from '../Imagenes/carrito.png';
import { API_BASE } from '../config';

const Catalogo = () => {
  const { cart, setCart } = useContext(CartContext);
  const { darkMode } = useContext(UserContext);
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
<<<<<<< codex/configure-api_base-and-update-fetch-calls
        const response = await fetch(`${API_BASE}/api/productos`);
=======
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`);
>>>>>>> main
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

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

  const handleIrAPagar = () => {
    navigate('/Pcarrito');
  };

  const handleIrInicio = () => {
    navigate('/');
  };

  const formatearPesos = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const coincideCategoria = categoriaSeleccionada ? producto.categoria === categoriaSeleccionada : true;
    return coincideBusqueda && coincideCategoria;
  });

  const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Barra superior */}
      <div className="w-full h-12 bg-[#0D0A4F] flex justify-between items-center px-4">
        <button
          onClick={handleIrInicio}
          className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-4 rounded"
        >
          Menú
        </button>
        <div className="flex items-center space-x-4">
          <img src={CarritoImage} alt="Carrito" className="w-8 h-8 mr-2 rounded-full" />
          <span className="text-white">
            Carrito: {cart.reduce((acc, item) => acc + item.cantidad, 0)} productos
          </span>
        </div>
      </div>

      <h1 className="text-center text-4xl font-bold text-[#0D0A4F] dark:text-white mt-6 mb-4">
        Catálogo
      </h1>

      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 px-6">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="p-2 border rounded w-full sm:w-60 dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded w-full sm:w-60 dark:bg-gray-700 dark:text-white"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categoriasUnicas.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Productos */}
      <div className="flex flex-wrap justify-center items-center gap-8 p-8 bg-gray-100 dark:bg-gray-900">
        {productosFiltrados.map((producto) => (
          <div
            key={producto._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center text-black dark:text-white"
          >
            <img
<<<<<<< codex/configure-api_base-and-update-fetch-calls
              src={`${API_BASE}${producto.imagen}`}
=======
              src={`${import.meta.env.VITE_API_URL}${producto.imagen}`}
>>>>>>> main
              alt={producto.nombre}
              className="w-48 h-auto mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-[#0D0A4F] dark:text-white">{producto.nombre}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{producto.descripcion}</p>
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

      {/* Carrito lateral */}
      {cart.length > 0 && (
        <div className="w-60 bg-gray-200 dark:bg-gray-800 p-2 shadow-inner fixed right-0 top-16">
          <h2 className="text-xl font-bold text-[#0D0A4F] dark:text-white mb-2 text-center">Carrito</h2>
          <ul className="space-y-2">
            {cart.map((producto) => (
              <li
                key={producto._id}
                className="bg-white dark:bg-gray-700 p-2 rounded shadow text-sm text-black dark:text-white"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{producto.nombre}</h3>
                    <p className="text-gray-700 dark:text-gray-300">
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
              Total: {formatearPesos(cart.reduce((total, p) => total + p.precio * p.cantidad, 0))}
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
