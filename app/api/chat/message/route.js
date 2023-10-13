import { NextResponse } from "next/server";

import prisma from "@/utils/getPrismaClient";
import { pusherServer } from "@/utils/pusher";

export async function POST(request) {
  const { message, currentUserId, conversationId, currentUserImage } =
    await request.json();

  await pusherServer.trigger(conversationId, "messages:new", {
    body: message,
    image: null,
    sender: {
      id: currentUserId,
      image: currentUserImage,
    },
  });

  const newMessage = await prisma.message.create({
    data: {
      body: message,
      conversation: {
        connect: {
          id: conversationId,
        },
      },
      sender: {
        connect: {
          id: currentUserId,
        },
      },
    },
  });

  const conversationUpdated = await prisma.conversation.update({
    where: {
      id: conversationId,
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
