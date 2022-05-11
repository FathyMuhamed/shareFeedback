import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserById } from "~/utils/users.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { userId } = params;
  if (typeof userId !== "string") {
    return redirect("/home");
  }
  const user = await getUserById(userId);
  return json({ user });
};

export default function TellmeModel() {
  const { user } = useLoaderData();

  return <h2>User :{user.email}</h2>;
}
