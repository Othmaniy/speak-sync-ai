import { getTranscript } from "../services/hasabai.service.js";

export const generateTranscript = async (req, res) => {
  try {
    const { audioUrl } = req.body;

    const data = await getTranscript(audioUrl);

    res.json({ transcript: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
