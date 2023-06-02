const User = require("../models/User.model");

const router = require("express").Router();
const bcrypt = require("bcryptjs");

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

  // podriamos hcaer validaciones de contraseña, de correo electronico, de cualquier cosa que queramos
  // validacion de contraseña
  const regexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (regexPattern.test(req.body.password) === false) {
    res.json({
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
      return; // todo probar
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
router.post("/login", (req, res, next) => {

    console.log("hola", req.body);

    res.json("probando login") //!
})

// GET "/api/auth/verify" => Indicarle al frontend si el usuario está logeado (que es lo que se llamaría validar)

module.exports = router;
