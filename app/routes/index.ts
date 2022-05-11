import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }: any) => {
  await requireUserId(request);
  return redirect("/home");
};
