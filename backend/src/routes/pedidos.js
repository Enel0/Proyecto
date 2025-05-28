import express from "express";
import Pedido from "../models/Pedido.js";

const router = express.Router();
// Obtener ventas por rango de fechas
router.get("/ventas", async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      const ventas = await Pedido.find({
        fecha: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      res.status(200).json(ventas);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
      res.status(500).json({ message: "Error en el servidor." });
    }
  });
// Guardar un nuevo pedido
router.post("/", async (req, res) => {
  const { usuario, carrito, total, direccion } = req.body;

  try {
    const nuevoPedido = new Pedido({
      usuario,
      carrito,
      total,
      direccion,
      estado: "pendiente", // Estado inicial
    });

    await nuevoPedido.save();
    res.status(201).json({ message: "Pedido guardado exitosamente." });
  } catch (error) {
    console.error("Error al guardar el pedido:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

// Obtener pedidos por usuario
router.get("/usuario/:email", async (req, res) => {
  try {
    const pedidos = await Pedido.find({ "usuario.email": req.params.email });
    if (!pedidos || pedidos.length === 0) {
      return res.status(404).json({ message: "No se encontraron pedidos para este usuario." });
    }
    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

// Obtener todas las comandas (para trabajadores)
router.get("/comandas", async (req, res) => {
  try {
    const pedidos = await Pedido.find({ estado: "pendiente" });
    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Error al obtener comandas:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

// Actualizar estado de un pedido
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const pedido = await Pedido.findByIdAndUpdate(
      id,
      { estado },
      { new: true } // Devuelve el documento actualizado
    );

    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado." });
    }

    res.status(200).json({ message: "Estado actualizado correctamente.", pedido });
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

export default router;
