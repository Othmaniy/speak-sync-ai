import { uploadtoCloudinary } from "../services/cloudinary.service";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import ffmpegStatic from "ffmpeg-static";

export const uploadVideo = async (req, res) => {
    try {
        const videoPath = req.file.path;
        const uploadRes= await uploadtoCloudinary(videoPath,'video');

        //extract audio
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
    } catch (error) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" ,error: error.message});
        
    }
}