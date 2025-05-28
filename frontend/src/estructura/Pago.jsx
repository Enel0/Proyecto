import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext"; // Contexto del carrito
import { UserContext } from "../context/UserContext"; // Contexto del usuario
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import logo from "../Imagenes/logo.png";

const Pago = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext); // Obtener el usuario del contexto
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const costoDelivery = 3000; // Precio del delivery en CLP

  useEffect(() => {
    // Si no hay usuario autenticado, redirigir al login
    if (!user) {
      alert("Debes iniciar sesión para realizar el pago.");
      navigate("/login");
    }
  }, [user, navigate]);

  // Calcular el subtotal del carrito
  const calcularSubtotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  // Calcular el total con delivery
  const calcularTotalConDelivery = () => {
    return calcularSubtotal() + costoDelivery;
  };

  // Formatear precios como pesos chilenos
  const formatearPesos = (valor) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(valor);
  };

  // Generar PDF
  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Configurar logo
    const imgWidth = 50;
    const imgHeight = 50;
    doc.addImage(logo, "PNG", 80, 10, imgWidth, imgHeight);

    // Título
    doc.setFontSize(20);
    doc.text("Resumen de Compra", 20, 70);

    // Detalle del pedido
    doc.setFontSize(14);
    doc.text("Detalle del Pedido:", 20, 90);
    cart.forEach((item, index) => {
      doc.text(
        `- ${item.nombre}: ${formatearPesos(item.precio)} x ${item.cantidad}`,
        20,
        100 + index * 10
      );
    });

    // Subtotal
    const ySubtotal = 100 + cart.length * 10;
    doc.setFontSize(12);
    doc.text(`Subtotal: ${formatearPesos(calcularSubtotal())}`, 20, ySubtotal);

    // Delivery
    const yDelivery = ySubtotal + 10;
    doc.text(`Costo Delivery: ${formatearPesos(costoDelivery)}`, 20, yDelivery);

    // Total
    const yTotal = yDelivery + 10;
    doc.setFontSize(16);
    doc.text(`Total: ${formatearPesos(calcularTotalConDelivery())}`, 20, yTotal);

    // Guardar el PDF
    doc.save("resumen_compra.pdf");
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const total = calcularTotalConDelivery();

    try {
      const response = await fetch("http://localhost:5000/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: user,
          carrito: cart,
          total,
          direccion,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el pedido.");
      }

      alert("¡Pago realizado con éxito!");
      handleGeneratePDF(); // Genera el PDF después del pago
      clearCart(); // Vaciar el carrito
      navigate("/estado-pedido"); // Redirigir a la página de estado de pedido
    } catch (error) {
      console.error(error.message);
      alert("Hubo un problema al realizar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-[#0D0A4F] w-full p-4 text-white text-center text-2xl font-bold">
        Detalles de Pago
      </header>

      <div className="flex flex-wrap justify-center items-start gap-8 mt-8 w-full px-4">
        {/* Resumen del pedido */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">El carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2 mb-2"
              >
                <div>
                  <h3 className="text-lg font-bold">{item.nombre}</h3>
                  <p className="text-gray-600">
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
            <p className="text-gray-600">Costo Delivery: {formatearPesos(costoDelivery)}</p>
            <h3 className="text-lg font-bold">Total: {formatearPesos(calcularTotalConDelivery())}</h3>
          </div>
        </div>

        {/* Formulario de pago */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">Información de Pago y Envío</h2>
          {/* Inputs de formulario */}
          {/* ... */}
        </form>
      </div>
    </div>
  );
};

export default Pago;
