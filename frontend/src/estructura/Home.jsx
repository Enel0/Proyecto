import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Imagenes/logo.png";
import MainImage from "../Imagenes/sushi.png";
import Producto1 from "../Imagenes/producto1.jpg";
import Producto2 from "../Imagenes/producto2.jpg";
import Producto3 from "../Imagenes/producto3.jpg";
import Producto4 from "../Imagenes/producto4.jpg";
import Producto5 from "../Imagenes/producto5.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Imagen principal grande con el logo acoplado */}
      <div className="relative w-full">
        <img
          src={MainImage}
          alt="Imagen principal"
          className="w-full h-[50vh] md:h-[70vh] object-cover"
        />
        <img
          src={Logo}
          alt="Logo Fukusuke"
          className="absolute top-4 left-4 h-32 w-32 object-contain"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => navigate("/catalogo")}
            className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-6 rounded"
          >
            Ver Catálogo
          </button>
        </div>
      </div>

      {/* Sección de imágenes pequeñas */}
      <div className="bg-black p-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {[ 
            { src: Producto1, label: "Más vendido", color: "bg-[#FF540C]" },
            { src: Producto2, label: "Nuevo", color: "bg-green-600" },
            { src: Producto3, label: "Promoción", color: "bg-blue-600" },
            { src: Producto4, label: "Clásico", color: "bg-[#FF540C]" },
            { src: Producto5, label: "Party", color: "bg-green-600" },
          ].map((producto, i) => (
            <div key={i} className="relative">
              <img
                src={producto.src}
                alt={`Producto ${i + 1}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <span
                className={`absolute top-2 left-2 ${producto.color} text-white text-sm font-bold py-1 px-2 rounded`}
              >
                {producto.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Barra de contacto */}
      <div className="bg-[#0D0A4F] text-white py-4 text-center w-full">
        <p>Teléfono: (56) 9 456-7890 | Instagram: @Fukusuke</p>
        <p>Horario de atención: Lunes a sábado de 12:00 a 17:00 y de 18:00 a 23:30 hrs.</p>
      </div>
    </div>
  );
};

export default HomePage;
