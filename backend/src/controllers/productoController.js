import Producto from '../models/Producto.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    res.status(500).json({ message: 'Error al obtener producto por ID', error });
  }
};

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria } = req.body;

    if (!nombre || !descripcion || !precio || !categoria) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio: Number(precio),
      stock: Number(stock) || 0,
      categoria,
      imagen: req.file ? `/imagenes/${req.file.filename}` : '',
    });

    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto', error });
  }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria } = req.body;

    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    producto.nombre = nombre || producto.nombre;
    producto.descripcion = descripcion || producto.descripcion;
    producto.precio = precio || producto.precio;
    producto.stock = stock || producto.stock;
    producto.categoria = categoria || producto.categoria;

    if (req.file) {
      const imagenPath = path.join(__dirname, '../imagenes', producto.imagen.split('/').pop());
      if (fs.existsSync(imagenPath)) {
        fs.unlinkSync(imagenPath);
      }
      producto.imagen = `/imagenes/${req.file.filename}`;
    }

    const productoActualizado = await producto.save();
    res.status(200).json(productoActualizado);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto', error });
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (producto.imagen) {
      const imagenPath = path.join(__dirname, '../imagenes', producto.imagen.split('/').pop());
      if (fs.existsSync(imagenPath)) {
        try {
          fs.unlinkSync(imagenPath);
          console.log('Imagen eliminada correctamente');
        } catch (error) {
          console.error('Error al eliminar la imagen:', error);
        }
      }
    }

    await producto.deleteOne();
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto', error });
  }
};
