export const generarToken = (usuario) => {
    const payload = {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    };
    return btoa(JSON.stringify(payload)); // Codificar en Base64
  };
  