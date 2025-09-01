import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';
import bcrypt from 'bcryptjs';

// Lógica para registrar un nuevo usuario (CU1)
export const registrarUsuario = async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  try {
    // 1. Validar que el correo no exista
    const existeUsuario = await Usuario.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({ msg: 'El correo ya está registrado' });
    }

    // 2. Crear y guardar el nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contrasena,
    });
    await nuevoUsuario.save();

    res.status(201).json({ msg: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('❌ Error en registrarUsuario:', error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

// Lógica para iniciar sesión (CU2)
export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    console.log('📩 Datos recibidos en login:', req.body);

    const usuario = await Usuario.findOne({ correo });
    console.log('🔍 Usuario encontrado:', usuario);

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    const esValido = await bcrypt.compare(contrasena, usuario.contrasena);
    console.log('✅ Contraseña válida?:', esValido);
    if (!esValido) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario._id, correo: usuario.correo, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    console.error('🔥 Error en login:', error); // 👈 imprime el fallo real
    res.status(500).json({ mensaje: 'Error en el login', error });
  }
};
