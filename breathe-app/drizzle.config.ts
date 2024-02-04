import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
//TODO move to env
export default {
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "turso",
  dbCredentials: {
    url: "libsql://breath-app-nachpok.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDI0LTAxLTE0VDE1OjE2OjQ0LjY4MTk0OTg1WiIsImlkIjoiOTE3ZGQwZTQtYjJlZi0xMWVlLWI1ZjYtZmVmZTM5ZTRmMzFiIn0.C5nrTDWj63hiUrrO6MKrhjx32CwPZQW4p0aVRnqoojY9FQ0s7bb1EkRI4dPM70fMjMJ3Ft3noi7qWNYf3J8dAA",
    // url: import.meta.env.DATABASE_URL,
    // authToken: import.meta.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
