import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export const createChatSession = (): Chat => {
    return ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
            systemInstruction: "You are an AI assistant for VLAS 2.1, an Air Traffic Control safety and dashboard platform. You help ATCOs and Supervisors with safety protocols, navigation data, and analyzing dashboard metrics. Be concise, professional, and safety-oriented.",
        },
    });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await chat.sendMessage({ message });
        return response.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "System Error: Unable to reach the AI safety advisor.";
    }
};