import express from 'express';
import {
  crearComentario,
  obtenerComentariosAprobados,
  obtenerTodos,
  aprobarComentario
} from '../controllers/comentariosController.js';

const router = express.Router();

// Usuarios
router.post('/comentarios', crearComentario);
router.get('/comentarios/aprobados', obtenerComentariosAprobados);

// Admin
router.get('/comentarios', obtenerTodos);
router.put('/comentarios/:id/aprobar', aprobarComentario);

export default router;
