import type { User } from "@prisma/client";
import { useNavigate } from "@remix-run/react";
import UserCircle from "./user-circle";
interface IUser {
  users: User[];
}

export default function UserPanel({ users }: IUser) {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col w-1/6 bg-gray-200'>
      <div className='flex items-center justify-center h-20 text-center bg-gray-300'>
        <h2 className='text-xl font-semibold text-blue-600'>My Team</h2>
      </div>
      <div className='flex flex-col flex-1 py-4 overflow-y-scroll gap-y-10'>
        {users.map((user) => (
          <UserCircle
            key={user.id}
            profile={user.profile}
            className='h-24 w-24 mx-auto flex-shrink-0'
            onClick={() => navigate(`tellme/${user.id}`)}
          />
        ))}
      </div>
      <div className='p-6 text-center bg-gray-300'>
        <form action='/logout' method='post'>
          <button
            type='submit'
            className='px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out bg-yellow-300 rounded-xl hover:bg-yellow-400 hover:-translate-y-1'>
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
