import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true, // Asegura que no haya correos duplicados
  },
  contraseña: {
    type: String,
    required: true,
  },
  fecha_registro: {
    type: Date,
    default: Date.now,
  },
});

// Encriptar la contraseña antes de guardarla
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

export default mongoose.model("Usuario", usuarioSchema);