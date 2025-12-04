import express from "express";
import multer from "multer";
import { uploadVideo } from "../controllers/upload.controller.js";
const router = express.Router();
const upload = multer({ dest: "temp/" });
router.post("/video", upload.single("video"), uploadVideo);

export default router;