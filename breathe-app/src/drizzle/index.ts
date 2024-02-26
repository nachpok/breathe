import { eq, desc } from "drizzle-orm";
import * as schema from "../../drizzle/migrations/schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: import.meta.env.VITE_DATABASE_URL,
  authToken: import.meta.env.VITE_DATABASE_AUTH_TOKEN,
});
const db = drizzle(client, { schema });
export const test = async () => {
  try {
    await db.insert(schema.sessions).values({
      id: "BS-64be04c8-245e-4aa9-a8fc-ddf14e1b3b0c",
      userId: "BU-uQgkMd8Q6yRWWEk1zgwCDk9uNcm1",
      timestamp: "1707997483701",
      rounds: [70350, 85520, 75430],
    });
  } catch (error) {
    console.error("error: ", error);
  }
};
// const sqlite = new Database("sqlite.db");
// const db = drizzle(sqlite, { schema });
type NewUser = typeof schema.users.$inferInsert;
type NewSession = typeof schema.sessions.$inferInsert;
export const userById = async (userId: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, userId),
    });

    if (user) {
      return user;
    }
    const insertUser = async (user: NewUser) => {
      return db.insert(schema.users).values(user);
    };
    const newUser: NewUser = { id: userId };

    const res = await insertUser(newUser);
    if (res.rowsAffected === 1) {
      return { id: userId } as NewUser;
    } else {
      throw Error(`drizzle.insertUser.res: ${JSON.stringify(res)}`);
    }
  } catch (error) {
    console.error("drizzle.index.userById.e: ", error);
  }
};
export const insertSession = async (session: schema.Session) => {
  // console.log("drizzle.index.insetSession");
  try {
    const insertSession = async (session: NewSession) => {
      return db.insert(schema.sessions).values(session);
    };

    const res = await insertSession(session);
    if (res.rowsAffected !== 1) {
      throw Error(`drizzle.insertUser.res: ${JSON.stringify(res)}`);
    }
  } catch (error) {
    console.error("drizzle.index.insetSession.e: ", error);
  }
};
export const readSessions = async (userId: string) => {
  // console.log("drizzle.idex.readSessions.userId: ", userId);
  try {
    const readSessions = async (userId: string) => {
      return db.query.sessions.findMany({
        where: eq(schema.sessions.userId, userId),
        orderBy: [desc(schema.sessions.timestamp)],
      });
    };
    const res = await readSessions(userId);
    console.log("drizzle.index.readSessions.res: ", res);
    return res;
  } catch (e) {
    console.error("drizzle.index.readSessions.e: ", e);
  }
};

export const deleteSession = async (sessionId: string) => {
  try {
    const deleteSession = async (sessionId: string) => {
      return db
        .delete(schema.sessions)
        .where(eq(schema.sessions.id, sessionId));
    };
    const res = await deleteSession(sessionId);
    if (res.rowsAffected !== 1) {
      throw Error(`drizzle.deleteSession.res: ${JSON.stringify(res)}`);
    }
  } catch (error) {
    console.error("drizzle.deleteSession.e: ", error);
  }
};
