import { db } from "./index";
import { users, bankAccounts, categories, transactions } from "./schema";
import { v4 as uuidv4 } from 'uuid';

async function seed() {
    console.log("🌱 Seeding database...");

    try {
        // 1. Create User
        const userId = "user_" + uuidv4();
        await db.insert(users).values({
            id: userId,
            name: "Demo User",
            email: "demo@example.com",
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }).onConflictDoNothing();
        console.log("✅ User created");

        // 2. Create Bank Accounts
        const checkingId = uuidv4();
        await db.insert(bankAccounts).values({
            id: checkingId,
            userId: userId,
            name: "Compte Courant",
            type: "checking",
            currency: "EUR",
            bankName: "Société Générale",
            balance: "1500.00"
        });

        const savingsId = uuidv4();
        await db.insert(bankAccounts).values({
            id: savingsId,
            userId: userId,
            name: "Livret A",
            type: "savings",
            currency: "EUR",
            bankName: "Société Générale",
            balance: "10000.00"
        });
        console.log("✅ Bank Accounts created");

        // 3. Create Categories
        const catFoodId = uuidv4();
        const catTransportId = uuidv4();
        const catHousingId = uuidv4();
        const catSalaryId = uuidv4();

        await db.insert(categories).values([
            { id: catFoodId, userId, name: "Alimentation", color: "#FF5733" },
            { id: catTransportId, userId, name: "Transport", color: "#33FF57" },
            { id: catHousingId, userId, name: "Logement", color: "#3357FF" },
            { id: catSalaryId, userId, name: "Salaire", color: "#F3FF33" }
        ]);
        console.log("✅ Categories created");

        // 4. Create Transactions
        await db.insert(transactions).values([
            {
                bankAccountId: checkingId,
                date: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
                amount: "-45.50",
                currency: "EUR",
                description: "Supermarché Carrefour",
                categoryId: catFoodId,
                status: "validated"
            },
            {
                bankAccountId: checkingId,
                date: new Date(new Date().setDate(new Date().getDate() - 5)),
                amount: "-20.00",
                currency: "EUR",
                description: "Uber Trip",
                categoryId: catTransportId,
                status: "validated"
            },
            {
                bankAccountId: checkingId,
                date: new Date(new Date().setDate(new Date().getDate() - 10)),
                amount: "-800.00",
                currency: "EUR",
                description: "Loyer Janvier",
                categoryId: catHousingId,
                status: "validated",
                isRecurring: true,
                recurrenceFrequency: "monthly"
            },
            {
                bankAccountId: checkingId,
                date: new Date(new Date().setDate(new Date().getDate() - 15)),
                amount: "2500.00",
                currency: "EUR",
                description: "Virement Salaire",
                categoryId: catSalaryId,
                status: "validated",
                isRecurring: true,
                recurrenceFrequency: "monthly"
            }
        ]);
        console.log("✅ Transactions created");

        console.log("🚀 Seeding complete!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

seed();
