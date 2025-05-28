import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import logo from "../imagenes/logoSushi.jpg";

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error de autenticación");
      }

      const { token, user } = await response.json();

      // Guardar el "token" (JSON string) en el localStorage
      localStorage.setItem("token", token);

      // Actualizar el contexto del usuario
      login(user);

      // Redirigir al catálogo
      navigate("/catalogo");
    } catch (error) {
      setErrorMessage(error.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Logo Sushi"
            className="w-24 h-24 mx-auto mb-4 rounded-full"
          />
          <h2 className="text-2xl font-bold text-gray-800">Inicio de Sesión</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de Correo Electrónico */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("email", {
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Debe ser un correo válido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Mensaje de Error */}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          {/* Botón de Iniciar Sesión */}
          <button
            type="submit"
            className={`w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Redirección a Registro */}
        <div className="text-center mt-4">
          <button
            className="text-orange-500 hover:underline"
            onClick={() => navigate("/registro")}
          >
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
