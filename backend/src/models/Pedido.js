import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  usuario: {
    nombre: String,
    email: String,
  },
  carrito: [
    {
      nombre: String,
      cantidad: Number,
      precio: Number,
    },
  ],
  total: Number,
  direccion: String,
  estado: { type: String, enum: ["pendiente", "completado"], default: "pendiente" },
  fecha: { type: Date, default: Date.now },
});

const Pedido = mongoose.model("Pedido", pedidoSchema);
export default Pedido;
