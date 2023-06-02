const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload", //recibir el payload despues de validar el token
    getToken: (req) => {
        console.log("hola", req.headers);
        if (!req.headers || !req.headers.authorization ) {
            console.log("no hay token");
            return null
        }

        const tokenArr = req.headers.authorization.split(" ")
        const tokenType = tokenArr[0]
        const token = tokenArr[1]

        if (tokenType !== "Bearer") {
            console.log("token de tipo incorrecto");
            return null
        } 

        // espera que recibamos y retornemos el token
        console.log("Token entregado");
        return token
    }
})

module.exports = isAuthenticated;