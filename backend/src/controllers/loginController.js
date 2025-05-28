import { generarToken } from "../utils/jwtUtils.js";

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

    // Generar el token JWT
    const token = generarToken(usuario);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
});
