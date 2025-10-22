// backend/src/app.js

import express from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js";

/*
 * inicialización y configuración principal de la aplicación express
 */
const app = express();

// middlewares principales
app.use(cors()); // permite solicitudes de otros orígenes
app.use(express.json()); // permite al servidor entender json en el body de las requests

// enrutador principal
app.use("/api", apiRoutes);

// middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Ruta no encontrada" });
});

export default app;
