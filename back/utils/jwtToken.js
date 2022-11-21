// Crear y enviar un Token guardado en una cookie
const tokenEnviado = (user, statusCode, res) => {
    // Creamos el Token
    const token = user.getJwtToken();

    // Opciones del Token
    const Opciones = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME*24*60*60*1000
        ),
        httpOnly: true
    }
    res.status(statusCode).cookie("token", token, Opciones).json({
        success: true,
        token,
        user
    })
}

module.exports = tokenEnviado;