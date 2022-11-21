// Declaracion del paquete express
const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errors")      // Declaracion del paquete de manejo de errores
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

// Uso de constantes importadas
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Importar Rutas
const productos = require("./routes/products")
const usuarios = require("./routes/auth")
const ordenes = require("./routes/orders")

app.use('/api', productos)  // Rutas del navegador
app.use('/api', usuarios)
app.use('/api', ordenes)

// Middleware para manejar errores
app.use(errorMiddleware)

// Permite exportar el objeto app
module.exports = app