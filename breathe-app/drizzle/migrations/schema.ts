import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";
export interface Rounds {
  rounds: number[];
}

export interface Session {
  id: string;
  userId: string;
  timestamp: string;
  rounds: number[] | null;
}
export interface Meditations {
  id: string;
  userId: string;
  createdAt: string;
  milliseconds: number;
}

export const meditations = sqliteTable("meditations", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  timestamp: text("timestamp").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
  milliseconds: integer("milliseconds").notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  timestamp: text("timestamp").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
  rounds: blob("rounds"),
});

export const users = sqliteTable("users", {
  id: text("id").primaryKey().notNull(),
  timestamp: text("timestamp").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
  sessions: blob("sessions"),
  meditations: blob("meditations"),
});
