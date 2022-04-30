import { json } from "@remix-run/node";
import type { RegisterForm } from "./types.server";
import { db } from "./prisma.server";
import { createUser } from "./users.server";
export async function register(user: RegisterForm) {
  const exists = await db.user.count({
    where: { email: user.email },
  });
  if (exists) {
    return json(
      { error: `User already exists with that email` },
      { status: 400 }
    );
  }
  const newuser = await createUser(user);
  if (!newuser) {
    return json(
      {
        error: `Something went wrong trying to create a new user.`,
        fields: { email: user.email, password: user.password },
      },
      { status: 400 }
    );
  }
}
