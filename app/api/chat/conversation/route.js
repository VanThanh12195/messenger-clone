import { NextResponse } from "next/server";

import prisma from "@/utils/getPrismaClient";

import getCurrentUser from "@/utils/getCurrentUser";

import { pusherServer } from "@/utils/pusher";
import getServerSideSession from "@/utils/getServerSideSession";

export async function POST(request) {
  const session = await getServerSideSession();

  const { email } = await request.json();

  const userFound = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      name: true,
      image: true,
      id: true,
    },
  });

  if (!userFound)
    return NextResponse.json("No user found with this email!", { status: 404 });

  const conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        { userIds: { has: session.user.id } },
        { userIds: { has: userFound.id } },
      ],
    },
    select: {
      id: true,
    },
  });

  if (conversation) return NextResponse.json(conversation.id);

  const newConversation = await prisma.conversation.create({
    data: {
      users: {
        connect: [{ id: session.user.id }, { id: userFound.id }],
      },
    },
  });

  await pusherServer.trigger(session.user.email, "conversation:new", {
    id: newConversation.id,
    isGroup: false,
    lastMessageAt: new Date(),
    users: [{ id: userFound.id, name: userFound.name, image: userFound.image }],
  });

  await pusherServer.trigger(email, "conversation:new", {
    id: newConversation.id,
    isGroup: false,
    lastMessageAt: new Date(),
    users: [
      {
        id: session.user.id,
        name: session.user.name,
        image: session.user.image,
      },
    ],
  });

  return NextResponse.json(newConversation.id);
}
