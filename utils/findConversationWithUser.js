import prisma from "./getPrismaClient";

export default async function findConversationWithUser(
  currentUserId,
  conversationId
) {
  const user = await prisma.user.findUnique({
    where: {
      id: currentUserId,
    },
    select: {
      conversationIds: true,
    },
  });

  return user.conversationIds.includes(conversationId);
}
