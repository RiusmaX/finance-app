// src/lib/import/types.ts

export interface ParsedTransaction {
  date: string; // ISO string
  description: string;
  amount: number;
  currency?: string;
  raw?: Record<string, unknown>;
}

export interface ImportOptions {
  fileContent: string | Buffer;
  fileName: string;
}

export type FileFormat = 'csv' | 'xls' | 'xlsx' | 'qif';
