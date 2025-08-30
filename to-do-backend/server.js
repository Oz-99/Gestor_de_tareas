import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Importa rutas
import tareaRoutes from "./routes/tareaRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes); 
app.use("/api/tareas", tareaRoutes);

// Conexión MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Error de conexión MongoDB:", err));

// Ruta raíz
app.get("/", (req, res) => {
  res.send("🚀 API To-Do funcionando ✅");
});

// Inicia servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
