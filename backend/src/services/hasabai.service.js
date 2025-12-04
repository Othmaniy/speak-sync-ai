import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const getTranscript=async(audioUrl)=>{
    try {
        const response=await axios.post("https://developer.hasab.ai/api/asr",{
             audio_url: audioUrl,
             language_code: "am", 
             enable_word_timestamps: true
        },{
            headers: {
            Authorization: `Bearer ${process.env.HASAB_API_KEY}`
      }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching transcript:", error.message);
        throw error;
    }
}