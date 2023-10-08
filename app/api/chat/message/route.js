import { NextResponse } from "next/server";

import prisma from "@/utils/getPrismaClient";
import { pusherServer } from "@/utils/getPusherServer";

export async function POST(request) {
  const { message, currentUserID, conversationID, currentUserEmail } =
    await request.json();

  const newMessage = await prisma.message.create({
    data: {
      body: message,
      conversation: {
        connect: {
          id: conversationID,
        },
      },
      sender: {
        connect: {
          id: currentUserID,
        },
      },
    },
  });

  const result = pusherServer.trigger(
    conversationID,
    "messages:new",
    newMessage
  );

  const conversationUpdated = await prisma.conversation.update({
    where: {
      id: conversationID,
    },
    data: {
      lastMessage: message,
      lastMessageAt: new Date(),
      messages: {
        connect: {
          id: newMessage.id,
        },
      },
    },
  });

  return NextResponse.json("Successful!");
}
