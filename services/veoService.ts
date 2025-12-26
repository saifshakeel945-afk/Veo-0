
import { GoogleGenAI } from "@google/genai";
import { GenerationParams } from "../types";

export const generateVideo = async (params: GenerationParams): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Construct a prompt that incorporates the artistic style
  const fullPrompt = `${params.description}. Style: ${params.style}. Ensure high quality and consistent aesthetic throughout.`;

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: fullPrompt,
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: params.aspectRatio
      }
    });

    // Poll for the operation to complete
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
      throw new Error("No video URI returned from the operation.");
    }

    // Append API key for retrieval
    return `${downloadLink}&key=${process.env.API_KEY}`;
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found")) {
      throw new Error("API_KEY_EXPIRED");
    }
    throw error;
  }
};
