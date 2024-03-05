import { eq, desc } from "drizzle-orm";
import * as schema from "../../drizzle/migrations/schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: import.meta.env.VITE_DATABASE_URL,
  authToken: import.meta.env.VITE_DATABASE_AUTH_TOKEN,
});
const db = drizzle(client, { schema });

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
  try {
    const readSessions = async (userId: string) => {
      return db.query.sessions.findMany({
        where: eq(schema.sessions.userId, userId),
        orderBy: [desc(schema.sessions.timestamp)],
      });
    };
    const res = await readSessions(userId);
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

export const insertMeditation = async (meditation: schema.Meditation) => {
  try {
    const insertMeditation = async (meditation: schema.Meditation) => {
      return db.insert(schema.meditations).values(meditation);
    };
    const res = await insertMeditation(meditation);
    if (res.rowsAffected !== 1) {
      throw Error(`drizzle.insertMeditation.res: ${JSON.stringify(res)}`);
    }
  } catch (error) {
    console.error("drizzle.insertMeditation.e: ", error);
  }
};

export const readMeditations = async (userId: string) => {
  try {
    const readMeditations = async (userId: string) => {
      return db.query.meditations.findMany({
        where: eq(schema.meditations.userId, userId),
        orderBy: [desc(schema.meditations.timestamp)],
      });
    };
    const res = await readMeditations(userId);
    return res;
  } catch (e) {
    console.error("drizzle.index.readMeditations.e: ", e);
  }
};

export const deleteMeditation = async (meditationId: string) => {
  try {
    const deleteMeditation = async (meditationId: string) => {
      return db
        .delete(schema.meditations)
        .where(eq(schema.meditations.id, meditationId));
    };
    const res = await deleteMeditation(meditationId);
    if (res.rowsAffected !== 1) {
      throw Error(`drizzle.deleteMeditation.res: ${JSON.stringify(res)}`);
    }
  } catch (error) {
    console.error("drizzle.deleteMeditation.e: ", error);
  }
};
