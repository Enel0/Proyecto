// db.js
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/NuevoPrueba", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1); // Salir si no se puede conectar
    }
};
