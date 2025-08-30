import express from "express";
import { iniciarSesion, registrarUsuario } from "../controllers/authController.js";

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/registro", registrarUsuario);

// Ruta para iniciar sesión
router.post("/login", iniciarSesion);

export default router;