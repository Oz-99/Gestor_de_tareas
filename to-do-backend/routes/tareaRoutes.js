import express from 'express';
import Tarea from '../models/tarea.js';

const router = express.Router();

// 📌 GET todas las tareas de un usuario
router.get('/', async (req, res) => {
  try {
    const { id_usuario } = req.query; // 👈 lo que mandas desde Angular
    const query = id_usuario ? { id_usuario } : {};
    const tareas = await Tarea.find(query);
    res.json(tareas); // 👈 devolver tareas en JSON
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// 📌 POST crear tarea
router.post('/', async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    const nuevaTarea = await tarea.save();
    res.json(nuevaTarea); // 👈 DEVOLVER la tarea creada, no solo mensaje
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
});

// 📌 PUT actualizar tarea
router.put('/:id', async (req, res) => {
  try {
    const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tarea' });
  }
});

// 📌 DELETE eliminar tarea
router.delete('/:id', async (req, res) => {
  try {
    await Tarea.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
});

export default router;
