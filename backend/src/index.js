// index.js
import 'dotenv/config';
import { connectDB } from './db.js'; // Importa la conexión
import app from './app.js'; // Importa la configuración del servidor
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Conectar a la base de datos y luego iniciar el servidor
const startServer = async () => {
    await connectDB(); // Conectar a la base de datos
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
};

startServer();
