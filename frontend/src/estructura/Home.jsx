import React from "react";
import { useNavigate } from "react-router-dom"; // Hook para la navegación entre páginas
import Logo from "../Imagenes/logo.png"; // Importar el logo
import MainImage from "../Imagenes/sushi.png"; // Imagen principal grande
import Producto1 from "../Imagenes/producto1.jpg"; // Producto 1
import Producto2 from "../Imagenes/producto2.jpg"; // Producto 2
import Producto3 from "../Imagenes/producto3.jpg"; // Producto 3
import Producto4 from "../Imagenes/producto4.jpg"; // Producto 4
import Producto5 from "../Imagenes/producto5.jpg"; // Producto 5

const HomePage = () => {
  const navigate = useNavigate(); // Función para navegar a otras páginas

  return (
    <div className="flex flex-col min-h-screen">
      {/* Imagen principal grande con el logo acoplado */}
      <div className="relative w-full">
        <img src={MainImage} alt="Imagen principal" className="w-full h-auto object-cover" />
        {/* Logo dentro de la imagen grande en la esquina superior izquierda */}
        <img
          src={Logo}
          alt="Logo Fukusuke"
          className="absolute top-4 left-4 h-32 w-32 object-contain"
        />
        {/* Botón "Ver Catálogo" centrado en la parte inferior de la imagen */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => navigate("/catalogo")} // Navega al catálogo al hacer clic
            className="bg-[#FF540C] hover:bg-[#FF6A00] text-white font-bold py-2 px-6 rounded"
          >
            Ver Catálogo
          </button>
        </div>
      </div>

      {/* Sección de imágenes pequeñas con fondo negro */}
      <div className="bg-black p-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {/* Producto 1 - Más vendido */}
          <div className="relative bg-black">
            <img src={Producto1} alt="Producto 1" className="w-full h-auto rounded-lg shadow-md" />
            <span className="absolute top-2 left-2 bg-[#FF540C] text-white text-sm font-bold py-1 px-2 rounded">
              Más vendido
            </span>
          </div>

          {/* Producto 2 - Nuevo */}
          <div className="relative bg-black">
            <img src={Producto2} alt="Producto 2" className="w-full h-auto rounded-lg shadow-md" />
            <span className="absolute top-2 left-2 bg-green-600 text-white text-sm font-bold py-1 px-2 rounded">
              Nuevo
            </span>
          </div>

          {/* Producto 3 - Promoción */}
          <div className="relative bg-black">
            <img src={Producto3} alt="Producto 3" className="w-full h-auto rounded-lg shadow-md" />
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-sm font-bold py-1 px-2 rounded">
              Promoción
            </span>
          </div>

          {/* Producto 4 - Clásico */}
          <div className="relative bg-black">
            <img src={Producto4} alt="Producto 4" className="w-full h-auto rounded-lg shadow-md" />
            <span className="absolute top-2 left-2 bg-[#FF540C] text-white text-sm font-bold py-1 px-2 rounded">
              Clásico
            </span>
          </div>

          {/* Producto 5 - Party */}
          <div className="relative bg-black">
            <img src={Producto5} alt="Producto 5" className="w-full h-auto rounded-lg shadow-md" />
            <span className="absolute top-2 left-2 bg-green-600 text-white text-sm font-bold py-1 px-2 rounded">
              Party
            </span>
          </div>
        </div>
      </div>

      {/* Barra de contacto en la parte inferior */}
      <div className="bg-[#0D0A4F] text-white py-4 text-center">
        <p>Teléfono: (56) 9 456-7890 | Instagram: @Fukusuke</p>
        <p>Horario de atención: Lunes a sábado de 12:00 a 17:00 y de 18:00 a 23:30 hrs.</p>
      </div>
    </div>
  );
};

export default HomePage;
