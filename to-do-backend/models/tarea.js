import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  prioridad: { type: String, enum: ['Alta', 'Media', 'Baja'], default: 'Media' },
  fechaLimite: { type: String },
  estado: { type: String, enum: ['pendiente', 'completada'], default: 'pendiente' },
  id_usuario: { type: String, required: true }, // 🔑 Asociación al usuario
});

export default mongoose.model('Tarea', tareaSchema);
