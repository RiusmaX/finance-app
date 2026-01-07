// src/lib/import/parsers/csv.ts
import { parse } from 'csv-parse/sync';

export function parseCSV(content: string): Record<string, unknown>[] {
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  }) as Record<string, unknown>[];
}
