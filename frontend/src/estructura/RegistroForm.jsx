import React from "react";
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

    fetch("http://localhost:5000/api/auth/registro", {
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
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("firstName", { required: "El nombre es obligatorio" })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Apellido</label>
            <input
              type="text"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("lastName", { required: "El apellido es obligatorio" })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>

          {/* RUT */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">RUT</label>
            <input
              type="text"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("rut", {
                required: "El RUT es obligatorio",
                pattern: {
                  value: /^\d{7,8}(-)?[0-9kK]{1}$/,
                  message: "El RUT debe ser válido y terminar con un dígito o 'K'",
                },
              })}
            />
            {errors.rut && (
              <p className="text-red-500 text-sm mt-1">{errors.rut.message}</p>
            )}
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Fecha de Nacimiento</label>
            <input
              type="date"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("birthDate", {
                required: "La fecha de nacimiento es obligatoria",
              })}
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>
            )}
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Correo Electrónico</label>
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

          {/* Dirección */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Dirección</label>
            <input
              type="text"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("address", { required: "La dirección es obligatoria" })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Región */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Región</label>
            <input
              type="text"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("region", { required: "La región es obligatoria" })}
            />
            {errors.region && (
              <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>
            )}
          </div>

          {/* Comuna */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Comuna</label>
            <input
              type="text"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("comuna", { required: "La comuna es obligatoria" })}
            />
            {errors.comuna && (
              <p className="text-red-500 text-sm mt-1">{errors.comuna.message}</p>
            )}
          </div>

          {/* Género */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Género</label>
            <select
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("gender", { required: "El género es obligatorio" })}
            >
              <option value="">Seleccionar...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Teléfono</label>
            <input
              type="tel"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("phone", {
                required: "El teléfono es obligatorio",
                pattern: {
                  value: /^[0-9]{9}$/,
                  message: "Debe ser un número de 9 dígitos",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Confirmar Contraseña</label>
            <input
              type="password"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("confirmPassword", {
                required: "La confirmación de contraseña es obligatoria",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

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
