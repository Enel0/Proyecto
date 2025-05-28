import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext"; // Importa el contexto de usuario
import Navbar from "./components/Navbar"; // Importa la Navbar
import Home from "./estructura/Home";
import Catalogo from "./estructura/Catalogo";
import ReporteVentas from "./estructura/ReporteVentas";
import AgregarProducto from "./estructura/AgregarProducto";
import ActualizarProducto from "./estructura/ActualizarProducto";
import EstadoPedido from "./estructura/EstadoPedido";
import Pcarrito from "./estructura/Pcarrito";
import Pago from "./estructura/Pago";
import LoginForm from "./estructura/LoginForm";
import RegistroForm from "./estructura/RegistroForm";
import AsignarRoles from "./estructura/AsignarRoles";
import Comandas from "./estructura/Comandas";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          {/* Navbar visible en todas las páginas */}
          <Navbar />

          {/* Rutas de la aplicación */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/pcarrito" element={<Pcarrito />} />
            <Route path="/pago" element={<Pago />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registro" element={<RegistroForm />} />
            <Route path="/estado-pedido" element={<EstadoPedido />} />

            {/* Rutas antes protegidas, ahora abiertas */}
            <Route path="/asignarRoles" element={<AsignarRoles />} />
            <Route path="/reporte-ventas" element={<ReporteVentas />} />
            <Route path="/agregarProducto" element={<AgregarProducto />} />
            <Route path="/actualizar-producto" element={<ActualizarProducto />} />
            <Route path="/comandas" element={<Comandas />} />

            {/* Ruta de página no encontrada */}
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
