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

export const generarToken = (usuario) => {
  const payload = {
    id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
  };

  const secret = process.env.JWT_SECRET || "clave_secreta_super_segura";
  const expiresIn = process.env.JWT_EXPIRATION || "1h";

  return jwt.sign(payload, secret, { expiresIn });
};

