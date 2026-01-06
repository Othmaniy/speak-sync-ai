//render video with subtitles
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import { jsonToSrt } from "../utils/generateSrt.js";
import { uploadtoCloudinary } from "../services/cloudinary.service.js";
export const renderVideo = async (req, res) => {
  try {
    const { videoUrl, transcriptBlocks } = req.body;

    const srtContent = jsonToSrt(transcriptBlocks);
    const srtPath = `temp/${Date.now()}.srt`;
    const outputPath = `temp/${Date.now()}-output.mp4`;

    fs.writeFileSync(srtPath, srtContent);

    ffmpeg.setFfmpegPath(ffmpegStatic);

    await new Promise((resolve, reject) => {
      ffmpeg(videoUrl)
        .videoFilter(`subtitles=${srtPath}`)
        .save(outputPath)
        .on("end", resolve)
        .on("error", reject);
    });

    const finalUpload = await uploadtoCloudinary(outputPath, "video");

    fs.unlinkSync(srtPath);
    fs.unlinkSync(outputPath);

    res.json({
      renderedVideo: finalUpload.secure_url
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
