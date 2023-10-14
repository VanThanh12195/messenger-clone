import { NextResponse } from "next/server";

import prisma from "@/utils/getPrismaClient";

import getCurrentUser from "@/utils/getCurrentUser";

export async function POST(request) {
  const { id } = await getCurrentUser();

  const { email } = await request.json();

  const userFound = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  if (!userFound)
    return NextResponse.json("No user found with this email!", { status: 404 });

  const conversation = await prisma.conversation.findFirst({
    where: {
      AND: [{ userIds: { has: id } }, { userIds: { has: userFound.id } }],
    },
    select: {
      id: true,
    },
  });

  if (conversation) return NextResponse.json(conversation.id);

  const newConversation = await prisma.conversation.create({
    data: {
      users: {
        connect: [{ id: id }, { id: userFound.id }],
      },
    },
  });

  return NextResponse.json(newConversation.id);
}
