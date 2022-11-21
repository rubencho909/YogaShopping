// Configuraciones del SERVER
const app = require("./app")
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary")

// Setear el archivo de configuracion
const dotenv = require("dotenv");
dotenv.config({ path: 'back/config/config.env' })

// Configuracion Base de Datos
connectDatabase();

//Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Escuchar el puerto configurado y llamamos al server
const server = app.listen(process.env.PORT, () => {
    console.log(`Servidor Iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
});