import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import logo from "../imagenes/logoSushi.jpg";

function LoginForm() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [step, setStep] = useState("login"); // "login", "sendCode", "verifyCode", "resetPassword"
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Para guardar email y código generados
  const [email, setEmail] = useState("");
  const [codigoGenerado, setCodigoGenerado] = useState("");
  const [codigoIngresado, setCodigoIngresado] = useState("");

  const password = watch("newPassword"); // para validar en reset password

  // ---- Paso login normal ----
  const onLogin = async (data) => {
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
      localStorage.setItem("token", token);
      login(user);
      navigate("/catalogo");
    } catch (error) {
      setErrorMessage(error.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Paso enviar código ----
  const enviarCodigo = async () => {
    setLoading(true);
    setErrorMessage("");
    if (!email) {
      setErrorMessage("Por favor ingresa tu correo primero");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/enviar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error enviando código");
      }
      if (!data.codigo) {
        throw new Error("No se recibió código del servidor");
      }
      setCodigoGenerado(data.codigo);
      alert("Código enviado a tu correo");
      setStep("verifyCode");
      reset(); // Limpia formulario
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  // ---- Paso verificar código ----
  const verificarCodigo = () => {
    setErrorMessage("");
    if (codigoIngresado === codigoGenerado) {
      setStep("resetPassword");
      reset();
    } else {
      setErrorMessage("El código ingresado no es válido");
    }
  };

  // ---- Paso cambiar contraseña ----
  const cambiarPassword = async (data) => {
    setLoading(true);
    setErrorMessage("");
    try {
      if (!data.newPassword) throw new Error("Ingresa una nueva contraseña");
      // Aquí haces fetch a la ruta backend que actualiza la contraseña
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          codigo: codigoIngresado,
          newPassword: data.newPassword,
        }),
      });
      const response = await res.json();
      if (!res.ok) {
        throw new Error(response.message || "Error al cambiar la contraseña");
      }
      alert("Contraseña cambiada correctamente. Ahora puedes iniciar sesión.");
      setStep("login");
      reset();
      setCodigoGenerado("");
      setCodigoIngresado("");
      setEmail("");
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Renderizado por paso ---
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <img src={logo} alt="Logo Sushi" className="w-24 h-24 mx-auto mb-4 rounded-full" />
        </div>

        {step === "login" && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Inicio de Sesión</h2>
            <form onSubmit={handleSubmit(onLogin)}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Correo Electrónico</label>
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
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Contraseña</label>
                <input
                  type="password"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  {...register("password", { required: "La contraseña es obligatoria" })}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

              <button
                type="submit"
                className={`w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </button>
            </form>

            <div className="text-center mt-4">
              <button
                className="text-orange-500 hover:underline"
                onClick={() => {
                  setStep("sendCode");
                  setErrorMessage("");
                  reset();
                }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </>
        )}

        {step === "sendCode" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Recuperar contraseña</h2>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              className="w-full p-3 border rounded mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
            <button
              className="w-full bg-orange-500 text-white py-2 rounded mb-2"
              onClick={enviarCodigo}
              disabled={loading || !email}
            >
              {loading ? "Enviando código..." : "Enviar código"}
            </button>
            <button
              className="w-full text-center text-gray-600 underline"
              onClick={() => {
                setStep("login");
                setErrorMessage("");
                reset();
              }}
            >
              Volver al inicio de sesión
            </button>
          </>
        )}

        {step === "verifyCode" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Ingresa el código recibido</h2>
            <input
              type="text"
              placeholder="Código"
              className="w-full p-3 border rounded mb-3"
              value={codigoIngresado}
              onChange={(e) => setCodigoIngresado(e.target.value)}
            />
            {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
            <button
              className="w-full bg-orange-500 text-white py-2 rounded mb-2"
              onClick={verificarCodigo}
              disabled={loading || !codigoIngresado}
            >
              Verificar código
            </button>
            <button
              className="w-full text-center text-gray-600 underline"
              onClick={() => {
                setStep("sendCode");
                setErrorMessage("");
                reset();
              }}
            >
              Volver
            </button>
          </>
        )}

        {step === "resetPassword" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Nueva contraseña</h2>
            <form onSubmit={handleSubmit(cambiarPassword)}>
              <input
                type="password"
                placeholder="Nueva contraseña"
                className="w-full p-3 border rounded mb-3"
                {...register("newPassword", { required: "La contraseña es obligatoria" })}
              />
              {errors.newPassword && <p className="text-red-500 mb-2">{errors.newPassword.message}</p>}
              {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded"
                disabled={loading}
              >
                {loading ? "Cambiando contraseña..." : "Cambiar contraseña"}
              </button>
            </form>
            <button
              className="w-full text-center text-gray-600 underline mt-2"
              onClick={() => {
                setStep("login");
                setErrorMessage("");
                reset();
                setCodigoGenerado("");
                setCodigoIngresado("");
                setEmail("");
              }}
            >
              Cancelar y volver al login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
