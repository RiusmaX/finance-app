'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseFileAction } from '@/app/actions/import';

export default function ImportPage() {
    const [file, setFile] = useState<File | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [preview, setPreview] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const result = await parseFileAction(formData);
            setPreview(result);
        } catch (error) {
            console.error(error);
            alert("Error importing file");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Import Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="file">Transaction File (CSV, XLS, QIF)</Label>
                        <Input id="file" type="file" onChange={handleFileChange} />
                        <Button onClick={handleUpload} disabled={!file || isLoading} className="mt-2">
                            {isLoading ? "Analyzing..." : "Upload & Analyze"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {preview && (
                <Card>
                    <CardHeader>
                        <CardTitle>Preview & Mapping</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border p-4 bg-muted/50 font-mono text-xs overflow-x-auto">
                            <pre>{JSON.stringify(preview.preview, null, 2)}</pre>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                                Total Rows Detected: {preview.totalRows}
                            </p>
                            {/* Mapping UI will go here */}
                            <Button className="mt-4">Process Import</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
