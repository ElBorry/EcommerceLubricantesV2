import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Configurar Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Exportar la instancia de Cloudinary como exportación nombrada
export { cloudinary };
