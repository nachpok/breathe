import { sql } from "drizzle-orm";
import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export interface Rounds {
  rounds: number[];
}

export interface Session {
  id: string;
  userId: string;
  createdAt: string;
  breathes: number;
  rounds: number[] | null;
}

export const sessions = sqliteTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  breathes: integer("number").notNull(),
  rounds: blob("rounds").$type<number[]>(),
});

export const users = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  created_at: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  sessions: blob("sessions").$type<Session[]>(),
});
