import { uploadtoCloudinary } from "../services/cloudinary.service.js";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import ffmpegStatic from "ffmpeg-static";

export const uploadVideo = async (req, res) => {
    try {
        const videoPath = req.file.path;

        // upload video
        const uploadRes= await uploadtoCloudinary(videoPath, 'video');

        // extract audio
        const audioPath = `temp/${Date.now()}.wav`;
        ffmpeg.setFfmpegPath(ffmpegStatic);

        await new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .output(audioPath)
                .audioCodec("pcm_s16le")
                .format("wav")
                .on("end", resolve)
                .on("error", reject)
                .run();
        });

        // upload audio
        const audioUpload = await uploadtoCloudinary(audioPath, 'audio');

        // delete temporary files
        fs.unlinkSync(videoPath);
        fs.unlinkSync(audioPath);

        res.json({
            videoUrl: uploadRes.secure_url,
            audioUrl: audioUpload.secure_url,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};
