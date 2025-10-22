
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { Message, Role } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchGeminiResponse = async (userInput: string, chatHistory: Message[]): Promise<string> => {
    try {
        // Construct the history for the model
        const history = chatHistory.map(msg => ({
            role: msg.role === Role.USER ? "user" : "model",
            parts: [{ text: msg.content }]
        }));

        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION
            },
            history: history
        });
        
        const response = await chat.sendMessage({ message: userInput });

        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};
