import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import logo from "../Imagenes/logo.png";

const Pago = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user, darkMode } = useContext(UserContext);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const costoDelivery = 3000;

  useEffect(() => {
    if (!user) {
      alert("Debes iniciar sesión para realizar el pago.");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const calcularSubtotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const calcularTotalConDelivery = () => {
    return calcularSubtotal() + costoDelivery;
  };

  const formatearPesos = (valor) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(valor);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const imgWidth = 30;
    const imgHeight = 30;
    doc.addImage(logo, "PNG", 85, 15, imgWidth, imgHeight);
    doc.setFontSize(20);
    doc.setTextColor(13, 10, 79);
    doc.text("Resumen de Compra", 105, 50, { align: "center" });
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Cliente: ${user?.nombre || nombre}`, 20, 70);
    doc.text(`Dirección: ${direccion}`, 20, 80);
    doc.text(`Teléfono: ${user?.telefono || "No especificado"}`, 20, 90);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 100, 190, 100);
    doc.setFontSize(14);
    doc.setTextColor(13, 10, 79);
    doc.text("Detalle del Pedido:", 20, 110);
    let yPosition = 120;
    cart.forEach((item) => {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`- ${item.nombre}`, 20, yPosition);
      doc.text(`${formatearPesos(item.precio)} x ${item.cantidad}`, 160, yPosition, { align: "right" });
      yPosition += 10;
    });
    doc.line(20, yPosition + 5, 190, yPosition + 5);
    doc.setFontSize(12);
    doc.text(`Subtotal:`, 20, yPosition + 15);
    doc.text(`${formatearPesos(calcularSubtotal())}`, 160, yPosition + 15, { align: "right" });
    doc.text(`Costo Delivery:`, 20, yPosition + 25);
    doc.text(`${formatearPesos(costoDelivery)}`, 160, yPosition + 25, { align: "right" });
    doc.setFontSize(16);
    doc.setTextColor(13, 10, 79);
    doc.text(`Total:`, 20, yPosition + 40);
    doc.text(`${formatearPesos(calcularTotalConDelivery())}`, 160, yPosition + 40, { align: "right" });
    const today = new Date();
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Fecha de compra: ${today.toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
      20,
      yPosition + 60
    );
    doc.save(`resumen_compra_${today.getTime()}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const total = calcularTotalConDelivery();
    try {
      const response = await fetch("http://localhost:5000/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: user, carrito: cart, total, direccion }),
      });
      if (!response.ok) throw new Error("Error al guardar el pedido.");
      alert("¡Pago realizado con éxito!");
      handleGeneratePDF();
      clearCart();
      navigate("/estado-pedido");
    } catch (error) {
      console.error(error.message);
      alert("Hubo un problema al realizar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white flex flex-col items-center">
      <header className="bg-[#0D0A4F] w-full p-4 text-white text-center text-2xl font-bold">
        Detalles de Pago
      </header>

      <div className="flex flex-wrap justify-center items-start gap-8 mt-8 w-full px-4">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">El carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b pb-2 mb-2">
                <div>
                  <h3 className="text-lg font-bold">{item.nombre}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.cantidad} x {formatearPesos(item.precio)}
                  </p>
                </div>
                <p className="text-lg font-bold">
                  {formatearPesos(item.cantidad * item.precio)}
                </p>
              </div>
            ))
          )}
          <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-300">Costo Delivery: {formatearPesos(costoDelivery)}</p>
            <h3 className="text-lg font-bold">Total: {formatearPesos(calcularTotalConDelivery())}</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Información de Pago y Envío</h2>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="nombre">Nombre Completo</label>
            <input type="text" id="nombre" className="w-full p-2 border rounded" value={user?.nombre || nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="direccion">Dirección de Envío</label>
            <input type="text" id="direccion" className="w-full p-2 border rounded" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="tarjeta">Número de Tarjeta</label>
            <input type="text" id="tarjeta" className="w-full p-2 border rounded" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} placeholder="1234 5678 9012 3456" required />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="fecha">Fecha Expiración</label>
              <input type="text" id="fecha" className="w-full p-2 border rounded" value={fechaExpiracion} onChange={(e) => setFechaExpiracion(e.target.value)} placeholder="MM/AA" required />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" className="w-full p-2 border rounded" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" required />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#0D0A4F] text-white py-3 rounded-lg font-bold hover:bg-[#1a1668] transition-colors" disabled={loading || cart.length === 0}>
            {loading ? "Procesando..." : "Realizar Pago"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pago;
