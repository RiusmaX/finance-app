// src/app/actions/import.ts
'use server';

import { parseCSV } from '@/lib/import/parsers/csv';
import { parseXLS } from '@/lib/import/parsers/xls';
import { parseQIF } from '@/lib/import/parsers/qif';

export async function parseFileAction(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) throw new Error("No file uploaded");

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    let rawData: Record<string, unknown>[] = [];

    if (fileExtension === 'csv') {
        const text = buffer.toString('utf-8');
        rawData = parseCSV(text);
    } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
        rawData = parseXLS(buffer);
    } else if (fileExtension === 'qif') {
         const text = buffer.toString('utf-8');
         rawData = parseQIF(text);
    } else {
        throw new Error("Unsupported file format");
    }

    // Return first 5 rows for preview/mapping
    return {
        headers: rawData.length > 0 ? Object.keys(rawData[0]) : [],
        preview: rawData.slice(0, 5),
        totalRows: rawData.length,
        // We might want to cache the full rawData somewhere (Redis, Temp File, or just re-upload)
        // For stateless V1, we might ask user to re-submit mapping with file, or store in temp table
    };
}

export async function saveImportAction(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileData: any[], // In real app, we re-parse or retrieve from cache
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapping: any,
    accountId: string
) {
    // Stub usage to avoid unused var
    console.log(accountId);
    // This is a stub for the final save action
    // In a real scenario, passing large fileData array back and forth is bad.
    // Usually: Upload -> Store Temp -> Return ID -> User Maps -> Send ID + Mapping -> Server Process Temp File

    // For V1 MVP, we will assume the client sends the mapped data or we re-parse.
    // Let's implement the re-parse flow in the UI to keep it stateless simple.
}
