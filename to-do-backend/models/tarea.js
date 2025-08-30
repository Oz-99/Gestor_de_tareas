import mongoose from "mongoose";

const TareaSchema = new mongoose.Schema({
    // El ID del usuario que creó la tarea.
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId, // Tipo de dato para IDs de MongoDB
    ref: 'Usuario', // Referencia al modelo de Usuario
    required: true,
  },
  
  prioridad: {
    type: String,
    enum: ["Alta", "Media", "Baja"],
    default: "Media"
  },

  // El título es un campo obligatorio. [cite: 98, 108]
  titulo: {
    type: String,
    required: true,
  },
  
  // La descripción es opcional. [cite: 98]
  descripcion: {
    type: String,
    required: false,
  },

  // El estado de la tarea. Los estados definidos son "pendiente", "en_progreso" y "completada". [cite: 104, 108]
  estado: {
    type: String,
    enum: ["pendiente", "en_progreso", "completada"],
    default: "pendiente",
  },
  
  // La fecha de creación se asigna automáticamente. 
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  
  // La fecha límite es un campo opcional. [cite: 98]
  fecha_limite: {
    type: Date,
    required: false,
  },
});

export default mongoose.model("Tarea", TareaSchema);