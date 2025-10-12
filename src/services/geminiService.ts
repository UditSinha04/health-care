
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export const getHealthAnalysis = async (symptoms: string): Promise<string> => {
    const prompt = `
        Based on the following symptoms, provide a detailed health analysis in markdown format.
        
        Symptoms: "${symptoms}"

        Please structure your response with the following sections using markdown formatting:
        
        ## DISCLAIMER
        This is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

        ## Possible Conditions
        List potential conditions that could match these symptoms, with brief explanations.

        ## Recommended Next Steps
        Provide actionable recommendations including when to seek medical care.

        ## General Health Advice
        Include any relevant general health tips.

        Use proper markdown formatting with:
        - **Bold text** for important points
        - *Italic text* for emphasis
        - Bullet points for lists
        - Clear headings with ##
        
        Keep the tone professional but accessible.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to communicate with the generative model.");
    }
};