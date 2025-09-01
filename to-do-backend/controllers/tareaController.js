import Tarea from 'models/tarea.js';

// Crear una nueva tarea (CU3)
export const crearTarea = async (req, res) => {
  try {
    const nuevaTarea = new Tarea(req.body);
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(400).json({ msg: 'Error al crear la tarea', error });
  }
};

// Obtener todas las tareas de un usuario, con opción de filtro (CU4 y CU9)
export const obtenerTareas = async (req, res) => {
  try {
    const { id_usuario, estado } = req.query;
    let filtro = {};

    if (id_usuario) {
      filtro.id_usuario = id_usuario;
    }
    if (estado) {
      filtro.estado = estado;
    }

    const tareas = await Tarea.find(filtro);
    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las tareas', error });
  }
};

// Actualizar una tarea (CU5 y CU7)
export const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tareaActualizada = await Tarea.findByIdAndUpdate(id, req.body, { new: true });
    if (!tareaActualizada) {
      return res.status(404).json({ msg: 'Tarea no encontrada' });
    }
    res.status(200).json(tareaActualizada);
  } catch (error) {
    res.status(400).json({ msg: 'Error al actualizar la tarea', error });
  }
};

// Eliminar una tarea (CU6)
export const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tareaEliminada = await Tarea.findByIdAndDelete(id);
    if (!tareaEliminada) {
      return res.status(404).json({ msg: 'Tarea no encontrada' });
    }
    res.status(200).json({ msg: 'Tarea eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar la tarea', error });
  }
};
