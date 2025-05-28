import express from "express";
import Usuario from "../models/Usuario.js";

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, "nombre email rol"); // Selecciona solo los campos necesarios
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Ruta para actualizar el rol de un usuario
router.put("/actualizar-rol/:id", async (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  if (!["client", "worker", "admin"].includes(rol)) {
    return res.status(400).json({ message: "Rol inválido" });
  }

  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { rol },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: `El rol del usuario ${usuarioActualizado.nombre} se actualizó a ${rol}.`,
    });
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
