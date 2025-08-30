import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";

// Lógica para registrar un nuevo usuario (CU1)
export const registrarUsuario = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  try {
    // 1. Validar que el correo no exista (CU1)
    const existeUsuario = await Usuario.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }

    // 2. Crear y guardar el nuevo usuario
    const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
    await nuevoUsuario.save();

    res.status(201).json({ msg: "Usuario registrado con éxito" });

  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Lógica para iniciar sesión (CU2)
export const iniciarSesion = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // 1. Validar credenciales (CU2)
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ msg: "Credenciales incorrectas" });
    }

    // 2. Comparar la contraseña ingresada con la encriptada
    const esCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esCorrecta) {
      return res.status(400).json({ msg: "Credenciales incorrectas" });
    }

    // El usuario ha iniciado sesión con éxito
    res.status(200).json({ msg: "Inicio de sesión exitoso", usuario: { id: usuario._id, nombre: usuario.nombre } });

  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};