import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import Modal from "~/components/modal";
import { getUser } from "~/utils/auth.server";
import { getUserById } from "~/utils/users.server";
import { useState } from "react";
import type { TellmeStyle } from "@prisma/client";
import UserCircle from "~/components/user-circle";
import { SelectBox } from "~/components/select-box";
import { colorMap, emojiMap } from "~/utils/constants";
import Tellme from "~/components/tellme";

export const loader: LoaderFunction = async ({ request, params }: any) => {
  const { userId } = params;
  if (typeof userId !== "string") {
    return redirect("/home");
  }
  const user = await getUser(request);
  const recipient = await getUserById(userId);
  return json({ recipient, user });
};

export default function TellmeModel() {
  const actionData = useActionData();
  const [formError] = useState(actionData?.error || "");
  const [formData, setFormData] = useState({
    message: "",
    style: {
      backgroundColor: "RED",
      textColor: "WHITE",
      emoji: "THUMBSUP",
    } as TellmeStyle,
  });
  const handleStyleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData((data) => ({
      ...data,
      style: {
        ...data.style,
        [field]: e.target.value,
      },
    }));
  };
  const getOptions = (data: any) =>
    Object.keys(data).reduce((acc: any[], curr) => {
      acc.push({
        name: curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase(),
        value: curr,
      });
      return acc;
    }, []);
  const colors = getOptions(colorMap);
  const emojis = getOptions(emojiMap);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData((data) => ({ ...data, [field]: e.target.value }));
  };

  const { recipient, user } = useLoaderData();

  return (
    <Modal isOpen={true} className='w-2/3 p-10'>
      <div className='w-full mb-2 text-xs font-semibold tracking-wide text-center text-red-500'>
        {formError}
      </div>
      <form method='post'>
        <input type='hidden' value={recipient.id} name='recipientId' />
        <div className='flex flex-col md:flex-row gap-y-2 md:gap-y-0'>
          <div className='flex flex-col items-center pr-8 text-center gap-y-2'>
            <UserCircle profile={recipient.profile} className='w-24 h-24' />
            <p className='text-blue-300'>
              {recipient.profile.firstName} {recipient.profile.lastName}
            </p>
            {recipient.profile.department && (
              <span className='w-auto px-2 py-1 text-blue-300 bg-gray-300 rounded-xl'>
                {recipient.profile.department[0].toUpperCase() +
                  recipient.profile.department.toLowerCase().slice(1)}
              </span>
            )}
          </div>
          <div className='flex flex-col flex-1 gap-y-4'>
            <textarea
              name='message'
              className='w-full h-40 p-4 rounded-xl'
              value={formData.message}
              onChange={(e) => handleChange(e, "message")}
              placeholder={`Say something nice about ${recipient.profile.firstName}...`}
            />
            <div className='flex flex-col items-center md:flex-row md:justify-start gap-x-4'>
              <SelectBox
                options={colors}
                name='backgroundColor'
                value={formData.style.backgroundColor}
                onChange={(e) => handleStyleChange(e, "backgroundColor")}
                label='Background Color'
                containerClassName='w-36'
                className='w-full px-3 py-2 text-gray-400 rounded-xl'
              />
              <SelectBox
                options={colors}
                name='textColor'
                value={formData.style.textColor}
                onChange={(e) => handleStyleChange(e, "textColor")}
                label='Text Color'
                containerClassName='w-36'
                className='w-full px-3 py-2 text-gray-400 rounded-xl'
              />
              <SelectBox
                options={emojis}
                label='Emoji'
                name='emoji'
                value={formData.style.emoji}
                onChange={(e) => handleStyleChange(e, "emoji")}
                containerClassName='w-36'
                className='w-full px-3 py-2 text-gray-400 rounded-xl'
              />
            </div>
          </div>
        </div>
        <br />
        <p className='mb-2 font-semibold text-blue-600'>Preview</p>
        <div className='flex flex-col items-center md:flex-row gap-x-24 gap-y-2 md:gap-y-0'>
          <Tellme profile={user.profile} tellme={formData} />
          <div className='flex-1' />
          <button
            type='submit'
            className='h-12 font-semibold text-blue-600 transition duration-300 ease-in-out bg-yellow-300 rounded-xl w-80 hover:bg-yellow-400 hover:-translate-y-1'>
            Send
          </button>
        </div>
      </form>
    </Modal>
  );
}
