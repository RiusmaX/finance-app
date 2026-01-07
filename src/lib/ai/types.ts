export interface AICategorizationResult {
    categoryName: string;
    isRecurring: boolean;
    recurrenceFrequency?: 'weekly' | 'monthly' | 'yearly';
    confidence: number;
}

export interface AIService {
    categorizeTransaction(description: string, amount: number, date: string): Promise<AICategorizationResult>;
}
