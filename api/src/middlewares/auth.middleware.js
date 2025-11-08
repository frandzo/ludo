// api/src/middlewares/auth.middleware.js

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verificarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Acceso denegado, token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guardar todo el payload del token
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}
