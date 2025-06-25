import jwt from "jsonwebtoken";

export const generarToken = (usuario) =>
  jwt.sign(
    {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION || "1h" }
  );
