import type { Profile } from "@prisma/client";

interface IProps {
  profile: Profile;
  className?: string;
  onClick?: (...args: any) => any;
}

export default function UserCircle({ profile, className, onClick }: IProps) {
  //   const title = profile.map((n: string) => n[0].toUpperCase()).join("");
  return (
    <div
      className={`${className} cursor-pointer rounded-full bg-slate-400 flex justify-center items-center`}
      onClick={onClick}>
      <h2>
        {profile.firstName.charAt(0).toUpperCase()}
        {profile.lastName.charAt(0).toUpperCase()}
      </h2>
    </div>
  );
}
