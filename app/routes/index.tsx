import type { LoaderFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }: any) => {
  await requireUserId(request);
  return null;
};
export default function home() {
  return (
    <div className='flex items-center justify-center h-screen '>
      <h1 className='text-2xl font-bold text-red-800'>
        Welcome to Remix + Prisma.
      </h1>
    </div>
  );
}
