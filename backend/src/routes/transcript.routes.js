import express from "express";
import { generateTranscript } from "../controllers/transcript.controller.js";

const router = express.Router();

router.post("/", generateTranscript);

export default router;
