import prisma from "./getPrismaClient";

export default async function getAllMessages( conversationId ) {
  const messages = await prisma.message.findMany({
    where: {
      conversationId: conversationId,
    },select: {
      id: true,
      body: true,
      image: true,
      document: true,
      createdAt: true,
      conversationId: true,
      senderId: true,
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    }
  });

  return messages;
}
