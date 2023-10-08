import getCurrentUser from "./getCurrentUser";
import prisma from "./getPrismaClient";

export default async function getAllConversation() {

  const { id } = await getCurrentUser();

  const conversations = await prisma.conversation.findMany({
    where: {
      userIds: {
        has: id,
      },
    },
    select: {
      id: true,
      isGroup: true,
      userIds: true,
      lastMessage: true,
      lastMessageAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return conversations;
}
