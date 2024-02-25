import { eq, desc } from "drizzle-orm";
// import { drizzle } from "drizzle-orm/..."; // import the correct drizzle based on your database driver
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/libsql";
import { client } from "./migrate";

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
  // console.log("drizzle.index.insetSession");
  try {
    // session.rounds = [70350, 85520, 75430];
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
        orderBy: [desc(schema.sessions.createdAt)],
      });
    };
    const res = await readSessions(userId);
    // console.log("drizzle.index.readSessions.res: ", res);
    return res;
  } catch (e) {
    console.error("drizzle.index.readSessions.e: ", e);
  }
};
