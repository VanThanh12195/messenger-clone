import { NextResponse } from "next/server";

import prisma from "@/utils/getPrismaClient";
import { pusherServer } from "@/utils/pusher";

export async function POST(request) {
  const { message, conversationId, users } = await request.json();

  const currentUser = users[users.length - 1];

  const currentUserId = currentUser.id;
  const currentUserImage = currentUser.image;

  await pusherServer.trigger(conversationId, "messages:new", {
    body: message,
    image: null,
    sender: {
      id: currentUserId,
      image: currentUserImage,
    },
  });

  users.map(async (user) => {
    await pusherServer.trigger(user.email, "conversation:update", {
      body: message,
      image: null,
      conversationId: conversationId,
      document: null,
      createdAt: new Date(),
    });
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
