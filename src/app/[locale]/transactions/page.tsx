import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

export default async function TransactionsPage() {
    // Fetch transactions (mocked for now as we don't have seed data easily accessible without running a script)
    // In real app: const data = await db.select().from(transactions).orderBy(desc(transactions.date));

    // Using empty array to demonstrate UI structure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any[] = [];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                             <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No transactions found. Go to Import to add some.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell>{format(new Date(tx.date), 'dd/MM/yyyy')}</TableCell>
                                    <TableCell>{tx.description}</TableCell>
                                    <TableCell>
                                        {tx.categoryId ? <Badge variant="outline">Category</Badge> : <Badge variant="secondary">Uncategorized</Badge>}
                                    </TableCell>
                                    <TableCell className={tx.amount < 0 ? "text-red-500" : "text-green-500"}>
                                        {tx.amount} {tx.currency}
                                    </TableCell>
                                    <TableCell>
                                        <Badge>{tx.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
