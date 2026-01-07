import { pgTable, text, timestamp, boolean, uuid, decimal, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("emailVerified").notNull(),
	image: text("image"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull()
});

export const sessions = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expiresAt").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text("userId").notNull().references(() => users.id)
});

export const accounts = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	userId: text("userId").notNull().references(() => users.id),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
	refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull()
});

export const verifications = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt")
});

// Finance Domain Models

export const bankAccounts = pgTable("bank_account", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").references(() => users.id).notNull(),
    name: text("name").notNull(), // "Compte Courant SocGen"
    type: text("type").notNull(), // checking, savings, investment
    currency: text("currency").default("EUR").notNull(),
    balance: decimal("balance", { precision: 10, scale: 2 }).default("0").notNull(),
    bankName: text("bank_name"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable("category", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").references(() => users.id).notNull(),
    name: text("name").notNull(),
    color: text("color"),
    parentId: uuid("parent_id"), // For subcategories
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactions = pgTable("transaction", {
    id: uuid("id").defaultRandom().primaryKey(),
    bankAccountId: uuid("bank_account_id").references(() => bankAccounts.id).notNull(),
    date: timestamp("date").notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: text("currency").default("EUR").notNull(),
    description: text("description").notNull(),
    rawDescription: text("raw_description"), // Original bank text
    categoryId: uuid("category_id").references(() => categories.id),
    status: text("status").default("pending").notNull(), // pending, validated
    isRecurring: boolean("is_recurring").default(false),
    recurrenceFrequency: text("recurrence_frequency"), // monthly, weekly
    externalId: text("external_id"), // ID from the bank/import file if available
    importId: text("import_id"), // Batch ID to group imports
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const importPresets = pgTable("import_preset", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").references(() => users.id).notNull(),
    name: text("name").notNull(), // "SocGen CSV", "Money QIF"
    format: text("format").notNull(), // csv, xls, qif
    config: jsonb("config").notNull(), // Mapping configuration { col1: "date", col2: "amount" }
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
