import express from "express";
import { login, registrarUsuario } from "../controllers/authController.js";

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/registro", registrarUsuario);

// Ruta para iniciar sesión
router.post("/login", login);

export default router;