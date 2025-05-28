import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  rut: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  direccion: { type: String, required: true },
  region: { type: String, required: true },
  comuna: { type: String, required: true },
  sexo: { type: String, required: true },
  telefono: { type: String, required: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ["admin", "worker", "client"], default: "client" },
});

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

usuarioSchema.methods.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

export default mongoose.model("Usuario", usuarioSchema);
