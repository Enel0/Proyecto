import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../Imagenes/logo.png';
import trashIcon from '../Imagenes/trash-icon.png';

const Pcarrito = () => {
  const { cart, setCart } = useContext(CartContext);
  const { darkMode } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const updateQuantity = (id, change) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? { ...item, cantidad: Math.max(1, item.cantidad + change) }
          : item
      )
      .filter((item) => item.cantidad > 0);

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const formatearPesos = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  const handleIrAPagar = () => {
    navigate('/Pago');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <header className="bg-[#0D0A4F] flex items-center justify-between p-4">
        <img src={logo} alt="Logo" className="h-12" />
        <h1 className="text-2xl font-bold text-white">Carrito</h1>
        <button
          className="bg-[#FF540C] hover:bg-[#FF6A00] text-white py-2 px-4 rounded"
          onClick={() => navigate('/Catalogo')}
        >
          Menú
        </button>
      </header>

      <div className="p-6 flex flex-col lg:flex-row justify-between">
        <div className="flex-1 bg-white dark:bg-gray-800 text-black dark:text-white shadow-md rounded-lg p-6">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">El carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-4 mb-4"
              >
                <div>
                  <h3 className="text-xl font-bold">{item.nombre}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {formatearPesos(item.precio)} x {item.cantidad}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      className="bg-[#FF540C] text-white px-3 py-1 hover:bg-[#FF6A00]"
                      onClick={() => updateQuantity(item._id, -1)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.cantidad}</span>
                    <button
                      className="bg-[#FF540C] text-white px-3 py-1 hover:bg-[#FF6A00]"
                      onClick={() => updateQuantity(item._id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => removeItem(item._id)}>
                    <img
                      src={trashIcon}
                      alt="Eliminar"
                      className="w-6 h-6 hover:scale-110 transition-transform"
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-full lg:w-1/3 mt-6 lg:mt-0 lg:ml-6 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-md p-6">
          <h4 className="text-xl font-bold mb-4">Total de Pedido</h4>
          <div className="mb-4">
            <h5 className="text-lg">Subtotal: {formatearPesos(calcularTotal())}</h5>
            <p className="text-gray-600 dark:text-gray-300">Delivery: {formatearPesos(3000)}</p>
            <h4 className="text-xl font-bold">
              Total: {formatearPesos(calcularTotal() + 3000)}
            </h4>
          </div>
          <button
            className="w-full bg-[#FF540C] hover:bg-[#FF6A00] text-white py-2 px-4 rounded"
            onClick={handleIrAPagar}
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pcarrito;
