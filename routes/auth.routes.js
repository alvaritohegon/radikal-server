const User = require("../models/User.model");

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isAuthenticated = require("../middlewares/isAuthenticated")

// POST "/api/auth/signup" => Para registrar al usuario
router.post("/signup", async (req, res, next) => {
  console.log(req.body);

  const { username, email, password } = req.body;

  // Validaciones de Server
  if (!username || !email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Todos los campos deben estar llenos" });
    return; // detener el resto de la ejecución de la ruta
  }

  // podriamos hcaer validaciones de contraseña, de correo electronico, de cualquier cosa que queramos => ej. validacion contraseña

  // validacion de contraseña
  const regexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (regexPattern.test(req.body.password) === false) {
    res.status(400).json({
      errorMessage:
        "La contraseña no es suficientemente fuerte. Necesita al menos, una mayúscula, una minúscula, un caracter especial y mínimo 8 caracteres",
    });
    return;
  }

  try {
    // si el usuario ya está registrado
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(400).json({ errorMessage: "Usuario ya registrado" });
      return;
    }

    // encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);

    await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    res.json("Usuario creado");
  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/login" => Validar las credenciales del usuario
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  // validaciones del login como que los campos estén llenos
  if (email === "" || password === "") {
    res.status(400).json({
      errorMessage: "Los campos de email y contraseña son obligatorios",
    });
    return;
  }

  try {
    // que el usuario exista
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res.status(400).json({ errorMessage: "Usuario no registrado con ese correo" });
      return;
    }

    // que la contraseña sea válida
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if(!isPasswordCorrect) {
        res.status(400).json({ errorMessage: "Contraseña no válida" });
        return;
    }

    // crear un token y se lo enviamos al cliente
    const payload = {
        _id: foundUser._id,
        email: foundUser.email,
        // ! info de roles
    }

    const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: "7d" }
    )

    res.json({ authToken: authToken }) //!
  } catch (error) {
    next(error)
  }

});

// GET "/api/auth/verify" => Indicarle al frontend si el usuario está logeado (que es lo que se llamaría validar)
router.get("/verify", isAuthenticated, (req, res, next) => {

    // 1. Recibir y validar el token (middleware)
    // 2. Extraer el payload para indicar al FE quien es el usuario de ese Token

    // cuando usemos el middleware isAuthenticated tendremos acceso a saber QUIEN es el usuario haciendo la llamada (req.session.user)

    console.log( req.payload ); // el usuario activo

    res.json({ payload: req.payload })

})

module.exports = router;
