// api/src/app.js

import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { verificarToken } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", verificarToken, routes);

app.get("/api/perfil", verificarToken, (req, res) => {
  res.json({ message: `Bienvenido ${req.user.nombre}`, user: req.user });
});

export default app;
