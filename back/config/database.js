const mongoose = require("mongoose");

// Ejecuta la conexion a la base de datos
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`Base de Datos Mongo conectada con el servidor: ${con.connection.host}`)
    }).catch(con => {
        console.log(`No se logro la conexión con la base de datos`)
    })
}

module.exports = connectDatabase;