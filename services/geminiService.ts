import { GoogleGenAI } from "@google/genai";
import type { Content } from '@google/genai';

// Initialize the Gemini client. An API key would be required, sourced from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are a friendly and helpful AI assistant for ShopNest, a modern e-commerce store. Your goal is to assist customers with their shopping needs.
You can answer questions about products, help with order tracking (direct them to the Profile page), explain the return policy (30 days, via Profile page), and provide general assistance.

**Special Instructions:**
- If a user asks "who created you?", "who trained you?", "who is your developer?", or any similar question about your origin, you must respond with: "I was created by Afnan Khan."
- If a user asks to meet Afnan Khan, for his address, or how to contact him, you must respond with: "I don't have the record to the address to the home of Afnan Khan, but I can give you the email of him by which you can contact him: afnanitechhelp@gmail.com".

For all other queries, keep your responses concise, helpful, and formatted with markdown where appropriate.`;

export type ChatbotResponse = {
  text: string;
  citations?: { uri: string; title: string }[];
  modelUsed: 'pro' | 'search' | 'fast';
};

class GeminiService {
    async getChatbotResponse(message: string, history: Content[]): Promise<ChatbotResponse> {
        const lowerCaseMessage = message.toLowerCase();
        
        // Use regex to check for keywords that suggest a complex query
        const isComplexQuery = /\b(analyze|plan|strategize|in detail|compare and contrast|write a poem|compose a song)\b/.test(lowerCaseMessage);
        // Use regex to check for keywords that suggest a search query or is a general question
        const isSearchQuery = /\b(who is|what is|when was|latest news|current price of|what's the weather|define)\b/.test(lowerCaseMessage);

        const contents: Content[] = [...history, { role: 'user', parts: [{ text: message }] }];

        try {
            if (isComplexQuery) {
                // Use gemini-2.5-pro with thinking budget for complex queries
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-pro',
                    contents: contents,
                    config: {
                        systemInstruction: SYSTEM_INSTRUCTION,
                        thinkingConfig: { thinkingBudget: 32768 }
                    }
                });
                return { text: response.text, modelUsed: 'pro' };
            }

            if (isSearchQuery) {
                // Use gemini-2.5-flash with Google Search for up-to-date info
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: contents,
                    config: {
                        systemInstruction: SYSTEM_INSTRUCTION,
                        tools: [{ googleSearch: {} }]
                    },
                });

                const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
                const citations = groundingChunks
                    ?.map(chunk => chunk.web)
                    .filter((web): web is { uri: string; title: string } => !!web?.uri) ?? [];
                
                return { text: response.text, citations, modelUsed: 'search' };
            }

            // Default to the fast gemini-2.5-flash-lite model for quick responses
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-lite',
                contents: contents,
                 config: {
                    systemInstruction: SYSTEM_INSTRUCTION,
                }
            });
            return { text: response.text, modelUsed: 'fast' };
        
        } catch (e) {
            console.error(e);
            return {
                text: "I'm sorry, I encountered an error. Please try again.",
                modelUsed: 'fast',
            };
        }
    }
}

export const geminiService = new GeminiService();