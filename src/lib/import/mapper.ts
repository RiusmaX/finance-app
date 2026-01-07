// src/lib/import/mapper.ts
import { ParsedTransaction } from './types';
import { parse, isValid } from 'date-fns';

export interface ColumnMapping {
  date: string; // Column name for date
  description: string; // Column name for description
  amount: string; // Column name for amount
  currency?: string; // Optional column name for currency
  // We can add more complex mappings later (e.g., separate debit/credit columns)
}

export function mapTransactions(
  rawData: Record<string, unknown>[],
  mapping: ColumnMapping,
  dateFormat: string = "dd/MM/yyyy"
): ParsedTransaction[] {
  return rawData.map(row => {
    let amount = 0;
    const rawAmount = row[mapping.amount];

    if (typeof rawAmount === 'number') {
        amount = rawAmount;
    } else if (typeof rawAmount === 'string') {
        // Handle "1 200,50" or "1,200.50"
        const cleaned = rawAmount.replace(/[^0-9.,-]/g, '').replace(',', '.');
        amount = parseFloat(cleaned);
    }

    const dateStr = row[mapping.date] as string;
    let dateObj = new Date();

    // Simple date parsing attempt
    if (dateStr) {
       // Try parsing with date-fns if specific format provided, else try native
       // This is a simplified version, in prod we need robust date parsing
       const parsedDate = parse(dateStr, dateFormat, new Date());
       if (isValid(parsedDate)) {
           dateObj = parsedDate;
       } else {
           // Fallback for ISO or other standard formats
           const fallback = new Date(dateStr);
           if (isValid(fallback)) dateObj = fallback;
       }
    }

    return {
      date: dateObj.toISOString(),
      description: (row[mapping.description] as string) || "Unknown Transaction",
      amount: amount,
      currency: mapping.currency ? (row[mapping.currency] as string) : "EUR",
      raw: row
    };
  });
}
