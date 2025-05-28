import React, { useState } from "react";
import LogoImage from "../Imagenes/logo.png"; // Importa la imagen del logo

const ReporteVentas = () => {
  const [startDate, setStartDate] = useState(""); // Fecha de inicio
  const [endDate, setEndDate] = useState(""); // Fecha de fin
  const [ventas, setVentas] = useState([]); // Datos de ventas
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Mensaje de error

  const handleConsult = async () => {
    if (!startDate || !endDate) {
      setError("Por favor selecciona ambas fechas.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/pedidos/ventas?startDate=${startDate}&endDate=${endDate}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos de ventas.");
      }
      const data = await response.json();
      setVentas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calcular el total de todas las ventas
  const calcularTotalVentas = () => {
    return ventas.reduce((total, venta) => total + venta.total, 0);
  };

  return (
    <div className="min-h-screen bg-[#0D0A4F] flex flex-col items-center p-6">
      <img src={LogoImage} alt="Fukusuke Logo" className="w-48 mb-6" />

      <h1 className="text-white text-3xl font-bold mb-4">Reporte de Ventas</h1>
      <p className="text-gray-300 mb-8">Seleccione el rango de fechas para consultar</p>

      <div className="flex gap-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 rounded border border-gray-300"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 rounded border border-gray-300"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleConsult}
          className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-4 rounded"
        >
          Consultar
        </button>
        <button
          onClick={() => window.history.back()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Atrás
        </button>
      </div>

      <div className="mt-8 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        {loading && <p className="text-center text-blue-500">Cargando ventas...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && ventas.length === 0 && (
          <p className="text-center text-gray-500">No hay ventas en el rango seleccionado.</p>
        )}

        {!loading && ventas.length > 0 && (
          <>
            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID Venta</th>
                  <th className="border border-gray-300 px-4 py-2">Fecha</th>
                  <th className="border border-gray-300 px-4 py-2">Cliente</th>
                  <th className="border border-gray-300 px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((venta) => (
                  <tr key={venta._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{venta._id}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(venta.fecha).toLocaleDateString()}</td>
                    <td className="border border-gray-300 px-4 py-2">{venta.usuario.nombre}</td>
                    <td className="border border-gray-300 px-4 py-2">${venta.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-right">
              <h3 className="text-lg font-bold">
                Total de Ventas: ${calcularTotalVentas()}
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReporteVentas;
