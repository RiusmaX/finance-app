// src/lib/import/parsers/xls.ts
import * as XLSX from 'xlsx';

export function parseXLS(content: Buffer): Record<string, unknown>[] {
  const workbook = XLSX.read(content, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet) as Record<string, unknown>[];
}
