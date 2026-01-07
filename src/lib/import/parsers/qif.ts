// src/lib/import/parsers/qif.ts
import qif from 'qif';

export function parseQIF(content: string): Record<string, unknown>[] {
  // qif parser typically returns an object with 'transactions' array
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed = qif.parse(content) as any;
  // Normalize QIF transactions to a flat array of objects
  return parsed.transactions || [];
}
