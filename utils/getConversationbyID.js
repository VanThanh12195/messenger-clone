import prisma from "./getPrismaClient"

export default async function getConversationbyID(conversationId) {

    const conversation = await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
      });

  return conversation
}
