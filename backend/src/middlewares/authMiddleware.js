import jwt from "jsonwebtoken";

export const protegerRuta = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET || "clave_secreta_super_segura");
    req.user = decoded; // Adjunta el usuario decodificado a la solicitud
    next();
  } catch (error) {
    console.error("Error al validar el token:", error.message);
    res.status(401).json({ message: "Token inválido o expirado." });
  }
};
