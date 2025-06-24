import Comentario from '../models/Comentario.js';

// Crear un nuevo comentario con usuarioEmail directamente
export const crearComentario = async (req, res) => {
  try {
    const { usuarioEmail, pedidoId, estrellas, texto, aprobado } = req.body;

    const nuevoComentario = new Comentario({
      usuarioEmail,
      pedidoId,
      estrellas,
      texto,
      aprobado: aprobado ?? false,
    });

    await nuevoComentario.save();
    res.status(201).json({ message: "Comentario enviado para revisión." });
  } catch (error) {
    console.error("Error al crear comentario:", error);
    res.status(500).json({ message: "Error al crear comentario.", error: error.message });
  }
};

// Obtener solo comentarios aprobados
export const obtenerComentariosAprobados = async (req, res) => {
  try {
    const comentarios = await Comentario.find({ aprobado: true });
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener comentarios.' });
  }
};

// Obtener todos los comentarios (para admin)
export const obtenerTodos = async (req, res) => {
  try {
    const comentarios = await Comentario.find();
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener todos los comentarios.' });
  }
};

// Aprobar o desaprobar comentario
export const aprobarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { aprobado } = req.body;

    await Comentario.findByIdAndUpdate(id, { aprobado });
    res.json({ message: `Comentario ${aprobado ? 'aprobado' : 'rechazado'}.` });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el comentario.' });
  }
};
