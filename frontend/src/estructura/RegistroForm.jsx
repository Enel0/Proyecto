import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../imagenes/logoSushi.jpg";

function RegistroForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const email = watch("email");

  const [codigoGenerado, setCodigoGenerado] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);

  const enviarCodigo = () => {
    if (!email) {
      alert("Primero ingresa tu correo electrónico");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/enviar-codigo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.codigo) {
          setCodigoGenerado(data.codigo);
          setCodigoEnviado(true);
          alert("Código enviado a tu correo");
        } else {
          alert("No se pudo enviar el código: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error al enviar código:", error);
        alert("Hubo un problema al enviar el correo");
      });
  };

  const onSubmit = (data) => {
    const jsonData = {
      nombre: data.firstName,
      apellido: data.lastName,
      rut: data.rut,
      fechaNacimiento: data.birthDate,
      email: data.email,
      direccion: data.address,
      region: data.region,
      comuna: data.comuna,
      sexo: data.gender,
      telefono: data.phone,
      password: data.password,
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || `Error HTTP: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.create) {
          alert(data.message);
          navigate("/login");
        } else {
          alert("Error al registrar: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert("Hubo un problema al registrar el usuario: " + error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Logo Sushi"
            className="w-24 h-24 mx-auto mb-4 rounded-full"
          />
          <h2 className="text-2xl font-bold text-gray-800">Registro de Usuario</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Nombre</label>
            <input
              type="text"
              {...register("firstName", { required: "El nombre es obligatorio" })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Apellido</label>
            <input
              type="text"
              {...register("lastName", { required: "El apellido es obligatorio" })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
          </div>

          {/* RUT */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">RUT</label>
            <input
              type="text"
              {...register("rut", {
                required: "El RUT es obligatorio",
                pattern: {
                  value: /^\d{7,8}(-)?[0-9kK]{1}$/,
                  message: "El RUT debe ser válido y terminar con un dígito o 'K'",
                },
              })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.rut && <p className="text-red-500 text-sm mt-1">{errors.rut.message}</p>}
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Fecha de Nacimiento</label>
            <input
              type="date"
              {...register("birthDate", { required: "La fecha de nacimiento es obligatoria" })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Correo Electrónico</label>
            <input
              type="email"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Formato de correo inválido",
                },
              })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Dirección</label>
            <input
              type="text"
              {...register("address", { required: "La dirección es obligatoria" })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* Región */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Región</label>
            <input
              type="text"
              {...register("region", { required: "La región es obligatoria" })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>}
          </div>

          {/* Comuna */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Comuna</label>
            <input
              type="text"
              {...register("comuna", { required: "La comuna es obligatoria" })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.comuna && <p className="text-red-500 text-sm mt-1">{errors.comuna.message}</p>}
          </div>

          {/* Género */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Género</label>
            <select
              {...register("gender", { required: "El género es obligatorio" })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Seleccionar...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Teléfono</label>
            <input
              type="tel"
              {...register("phone", {
                required: "El teléfono es obligatorio",
                pattern: {
                  value: /^[0-9]{9}$/,
                  message: "Debe tener 9 dígitos",
                },
              })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Contraseña</label>
            <input
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message:
                    "Debe tener al menos 8 caracteres, una mayúscula y un símbolo",
                },
              })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Confirmar Contraseña</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Debes confirmar la contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Botón para enviar código */}
          <div className="col-span-full">
            <button
              type="button"
              onClick={enviarCodigo}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Enviar Código de Verificación
            </button>
          </div>

          {/* Campo para ingresar código */}
          {codigoEnviado && (
            <div className="col-span-full">
              <label className="block text-gray-700 font-bold mb-1">Código de Verificación</label>
              <input
                type="text"
                {...register("codigoVerificacion", {
                  required: "Debes ingresar el código enviado a tu correo",
                  validate: (value) =>
                    value === codigoGenerado || "El código ingresado no es válido",
                })}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.codigoVerificacion && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.codigoVerificacion.message}
                </p>
              )}
            </div>
          )}

          {/* Botones */}
          <div className="col-span-full flex justify-between mt-4">
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Registrarse
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              onClick={() => navigate("/login")}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroForm;
