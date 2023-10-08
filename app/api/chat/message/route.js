import { NextResponse } from "next/server";

import prisma from "@/utils/getPrismaClient";
import pusher from "@/utils/getPusherServer";

export async function POST(request) {
  const { message, currentUserID, conversationID } = await request.json();

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

  const conversationUpdated = await prisma.conversation.update({
    where: {
      id: conversationID,
    },
    data: {
      lastMessage: message,
      lastMessageAt: new Date(),
    },
  });
  
  return NextResponse.json("Successful!");
}
