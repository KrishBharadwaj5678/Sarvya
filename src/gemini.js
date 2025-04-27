  import { GoogleGenAI } from "@google/genai";

  let apiKey = import.meta.env.VITE_GEMINI_API;

  const ai = new GoogleGenAI({ apiKey:apiKey });

  async function run(prompt) {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text;
  }

  export default run;