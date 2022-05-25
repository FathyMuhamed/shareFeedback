import { db } from "./prisma.server";
import type { TellmeStyle } from "@prisma/client";

export const createTellme = async (
  message: string,
  userId: string,
  recipientId: string,
  style: TellmeStyle
) => {
  await db.tellme.create({
    data: {
      message,
      style,
      author: {
        connect: {
          id: userId,
        },
      },
      recipient: {
        connect: {
          id: recipientId,
        },
      },
    },
  });
};
