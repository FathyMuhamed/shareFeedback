import Layout from "~/components/layout";
import UserPanel from "~/components/user-panel";
import { requireUserId } from "~/utils/auth.server";
import { getOtherUsers } from "~/utils/users.server";

import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: any) => {
  const userId = await requireUserId(request);
  const users = await getOtherUsers(userId);
  return json({ users });
};
export default function Home() {
  const { users } = useLoaderData();
  return (
    <Layout>
      <Outlet />
      <div className='flex h-full'>
        <UserPanel users={users} />
        <div className='flex-1'></div>
      </div>
    </Layout>
  );
}
