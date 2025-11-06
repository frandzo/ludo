// api/src/routes/auth.routes.js

import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authController.registerUsuario);
router.post("/login", authController.loginUsuario);

export default router;
