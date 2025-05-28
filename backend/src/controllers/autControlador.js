import Usuario from "../models/Usuario.js";
import { generarToken } from "../utils/jwtUtils.js";

export const registro = async (req, res) => {
  const {
    nombre,
    apellido,
    rut,
    fechaNacimiento,
    email,
    direccion,
    region,
    comuna,
    sexo,
    telefono,
    password,
  } = req.body;

  try {
    // Verificar si el RUT ya está registrado
    const usuarioExistente = await Usuario.findOne({ rut });
    if (usuarioExistente) {
      return res.status(400).json({ message: `El RUT ${rut} ya está registrado.` });
    }

    // Verificar si el correo ya está registrado
    const emailExistente = await Usuario.findOne({ email });
    if (emailExistente) {
      return res.status(400).json({ message: `El correo ${email} ya está registrado.` });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      rut,
      fechaNacimiento,
      email,
      direccion,
      region,
      comuna,
      sexo,
      telefono,
      password,
      rol: "client", // Rol por defecto al registrarse
    });

    // Guardar en la base de datos
    await nuevoUsuario.save();

    // Generar el token JWT
    const token = generarToken(nuevoUsuario);

    // Responder con el token y los datos del usuario
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      // Manejar duplicados en otros índices únicos
      res.status(400).json({
        message: "Ya existe un registro con los datos proporcionados.",
        keyValue: error.keyValue,
      });
    } else {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ message: "Error en el servidor", create: false });
    }
  }
};
