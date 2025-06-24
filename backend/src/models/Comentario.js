import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema(
  {
    usuarioEmail: { type: String, required: true },
    pedidoId: { type: mongoose.Schema.Types.ObjectId, ref: "Pedido", required: true },
    estrellas: { type: Number, required: true },
    texto: { type: String, required: true },
    aprobado: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Comentario", comentarioSchema);
