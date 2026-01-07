import { GoogleGenerativeAI } from "@google/generative-ai";
import { AICategorizationResult, AIService } from "./types";

export class GeminiService implements AIService {
    private model;

    constructor(apiKey: string) {
        const genAI = new GoogleGenerativeAI(apiKey);
        this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Efficient model for simple tasks
    }

    async categorizeTransaction(description: string, amount: number, date: string): Promise<AICategorizationResult> {
        const prompt = `
        Analyze this financial transaction and provide a category and recurrence detection.
        Transaction Description: "${description}"
        Amount: ${amount}
        Date: ${date}

        Return ONLY a JSON object with this structure:
        {
            "categoryName": "Category Name (e.g., Groceries, Transport, Salary, Subscription)",
            "isRecurring": boolean,
            "recurrenceFrequency": "weekly" | "monthly" | "yearly" | null,
            "confidence": number (0-1)
        }
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            // Clean up code blocks if Gemini returns them
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

            return JSON.parse(jsonStr) as AICategorizationResult;
        } catch (error) {
            console.error("AI Categorization Error:", error);
            // Fallback
            return {
                categoryName: "Uncategorized",
                isRecurring: false,
                confidence: 0
            };
        }
    }
}

// Singleton or Factory
export const aiService = new GeminiService(process.env.GEMINI_API_KEY || "dummy-key");
