import prisma from "./getPrismaClient";

export default async function getAllMessages( conversationId ) {
  const messages = await prisma.message.findMany({
    where: {
      conversationId: conversationId,
    },
  });

  return messages;
}
