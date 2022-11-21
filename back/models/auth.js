const mongoose = require("mongoose")        // Declaramos el paquete para manejar la base de datos
const validator = require("validator")      // Declaramos el paquete que manejara las validaciones de los campos
const bcrypt = require("bcryptjs")          // Declaramos el paquete para encriptar contraseñas
const jwt = require("jsonwebtoken")         // Generar token de sesion
const crypto = require("crypto")

const usuarioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "Por favor ingrese el nombre."],
        maxlength: [120, "Nombre no puede exceder los 120 caracteres"]
    },
    email:{
        type: String,
        required: [true, "Por favor ingrese el correo electronico"],
        unique: true,
        validate: [validator.isEmail, "Por favor ingrese un email valido"]
    },
    password:{
        type: String,
        required: [true, "Por favor registre una contraseña"],
        minLength: [8, "Tu contraseña no puede tener menos de 8 caracteres"],
        select: false
    },
    avatar:{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Encripta contraseña antes de guardarla
usuarioSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Decodificar contraseña y compararla
usuarioSchema.methods.compararPass = async function(passDada){
    return await bcrypt.compare(passDada, this.password)
}

// Retornan JWT Token
usuarioSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIEMPO_EXPIRACION
    })
}

// Generar un Token para reset de contraseña
usuarioSchema.methods.genResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hashear y setear resetToken
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')

    // Setear fecha de expiracion del Token
    this.resetPasswordExpire = Date.now() + 30*60*1000 // El Token solo dura 30 min
    return resetToken
}

module.exports = mongoose.model("auth", usuarioSchema)