// db.js
import mongoose from 'mongoose';

const DEFAULT_URI = 'mongodb://localhost:27017/NuevoPrueba';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || DEFAULT_URI;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Salir si no se puede conectar
  }
};
