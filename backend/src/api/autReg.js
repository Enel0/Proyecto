import axios from "axios";

export const regRequest = async (data) => {
  try {
    // Endpoint corregido para la API de registro
    const response = await axios.post(
      "http://localhost:5000/api/auth/registro",
      data
    );
    return response;
  } catch (error) {
    // Manejo detallado de errores
    if (error.response) {
      // Errores del servidor (status 4xx o 5xx)
      console.error("Error en la solicitud (Backend):", error.response.data);
    } else if (error.request) {
      // No hubo respuesta del servidor
      console.error("Sin respuesta del servidor:", error.request);
    } else {
      // Errores en la configuración de la solicitud
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw new Error("Error al registrar usuario");
  }
};
