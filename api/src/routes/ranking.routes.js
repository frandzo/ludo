// api/src/routes/ranking.routes.js

import express from "express";
import * as rankingController from "../controllers/rankingController.js";

const router = express.Router();

router.get("/global", rankingController.getGlobalRanking);

export default router;
