import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { verificarToken } from "./middlewares/auth.middleware.js";

dotenv.config();
console.log("process.env.DB_USER:", process.env.DB_USER);  
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use('/auth', authRoutes);
app.get('/perfil', verificarToken, (req, res) => {
  res.json({ message: `Bienvenido ${req.user.email}`, user: req.user });
});
export default app;
