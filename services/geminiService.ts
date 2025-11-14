
import { GoogleGenAI } from "@google/genai";
import type { Product } from '../types';

// This is a MOCK service. In a real application, you would use the Gemini API.
// An API key would be required, sourced from process.env.API_KEY.
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

class MockGeminiService {
    async generateProductDescription(productName: string): Promise<string> {
        console.log(`Generating description for ${productName}...`);
        // In a real app:
        // const response = await ai.models.generateContent({
        //     model: 'gemini-2.5-flash',
        //     contents: `Generate a compelling e-commerce product description for: ${productName}.`,
        // });
        // return response.text;
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        return `This is a premium ${productName} that offers unparalleled quality and performance. Its sleek design and advanced features make it a must-have for enthusiasts and professionals alike. Experience the difference today!`;
    }

    async getTrendingProducts(allProducts: Product[]): Promise<Product[]> {
        console.log("Fetching AI-driven trending products...");
        // In a real app, you might analyze sales data or use a more complex algorithm.
        // Here, we just shuffle and take the first few.
        await new Promise(resolve => setTimeout(resolve, 1000));
        return [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 4);
    }
    
    async getChatbotResponse(message: string): Promise<string> {
        console.log(`Getting chatbot response for: "${message}"`);
        await new Promise(resolve => setTimeout(resolve, 800));

        const lowerCaseMessage = message.toLowerCase();
        if (lowerCaseMessage.includes('track order')) {
            return "To track your order, please go to the Profile section and click on 'Order History'.";
        } else if (lowerCaseMessage.includes('return')) {
            return "Our return policy allows returns within 30 days of purchase. You can initiate a return from your 'Order History' page.";
        } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            return "Hello! I'm ShopNest's AI assistant. How can I help you with your shopping today?";
        }
        return "I can help with order tracking, return policies, and product suggestions. What are you looking for?";
    }
}

export const geminiService = new MockGeminiService();
