import express from "express";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import { generarToken } from "../utils/jwtUtils.js";

const router = express.Router();

// Ruta de inicio de sesión
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generarToken(usuario);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Ruta para restablecer contraseña
router.post("/reset-password", async (req, res) => {
  const { email, nuevaPassword } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    usuario.password = nuevaPassword; // El hash se hace automáticamente en el modelo
    await usuario.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar contraseña." });
  }
});

export default router;
