import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes.js";
import transcriptRoutes from "./routes/transcript.routes.js";
import renderRoutes from "./routes/render.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/transcript", transcriptRoutes);
app.use("/api/render", renderRoutes);

app.listen(5000, () => console.log("Backend running on port 5000"));
