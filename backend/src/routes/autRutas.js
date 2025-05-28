import express from "express";
import Usuario from "../models/Usuario.js";

const router = express.Router();

// Registro de usuarios
router.post("/registro", async (req, res) => {
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
    rol = "client",
  } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ rut });
    if (usuarioExistente) {
      return res.status(400).json({ message: `El RUT ${rut} ya está registrado.` });
    }

    const emailExistente = await Usuario.findOne({ email });
    if (emailExistente) {
      return res.status(400).json({ message: `El correo ${email} ya está registrado.` });
    }

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
      rol,
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario registrado exitosamente", create: true });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        message: "Ya existe un registro con los datos proporcionados.",
        keyValue: error.keyValue,
      });
    } else {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ message: "Error en el servidor", create: false });
    }
  }
});

export default router;
