//create render routes
import express from "express";
import { renderVideo } from "../controllers/render.controller.js";

const router = express.Router();

router.post("/", renderVideo);

export default router;