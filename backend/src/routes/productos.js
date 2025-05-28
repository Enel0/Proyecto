import { Router } from 'express';
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/productoController.js';
import upload from '../middlewares/multer.js'; // Middleware para manejar imágenes

const router = Router();

// Rutas CRUD
router.get('/', obtenerProductos); // Obtener todos los productos
router.get('/:id', obtenerProductoPorId); // Obtener un producto por ID
router.post('/', upload.single('imagen'), crearProducto); // Crear producto con una imagen
router.put('/:id', upload.single('imagen'), actualizarProducto); // Actualizar producto con una imagen
router.delete('/:id', eliminarProducto); // Eliminar producto y su imagen

export default router;
