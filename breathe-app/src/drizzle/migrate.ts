// import "dotenv/config";
// import { migrate } from "drizzle-orm/libsql/migrator";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const client = createClient({
  url: import.meta.env.VITE_DATABASE_URL,
  authToken: import.meta.env.VITE_DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client);

//main() is called once on init
// async function main() {
//   try {
//     await migrate(db, {
//       migrationsFolder: "drizzle/migrations",
//     });
//     console.log("Tables migrated!");
//     process.exit(0);
//   } catch (error) {
//     console.error("Error performing migration: ", error);
//     process.exit(1);
//   }
// }

// main();
