import prisma from "./getPrismaClient";
import getServerSideSession from "./getServerSideSession";

export default async function getAllConversation() {
  const session = await getServerSideSession();

  const currentUserId = session.user.id;

  const conversations = await prisma.conversation.findMany({
    where: {
      userIds: {
        has: currentUserId,
      },
    },
    select: {
      id: true,
      isGroup: true,
      lastMessage: true,
      lastMessageAt: true,
      users: {
        select: {
          id: true,
          name: true,
          image: true,
          email:true
        },
        where: {
          id: {
            not: currentUserId,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return conversations;
}
