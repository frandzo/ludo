// api/src/routes/index.js

import express from "express";
import usuariosRouter from "./usuarios.routes.js";
import juegosRouter from "./juegos.routes.js";
import rankingRouter from "./ranking.routes.js";

const router = express.Router();

router.use("/usuarios", usuariosRouter);
router.use("/juegos", juegosRouter);
router.use("/ranking", rankingRouter);
// router.use("/contacto", contactoRouter); // FUTURO

export default router;
