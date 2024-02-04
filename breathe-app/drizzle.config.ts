import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
//TODO move to env
export default {
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.VITE_DATABASE_URL || "",
    authToken: process.env.VITE_DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
