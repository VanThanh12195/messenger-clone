import prisma from "./getPrismaClient";
import getServerSideSession from "./getServerSideSession";

export default async function getAllMessages(conversationId) {
  const session = await getServerSideSession();

  const currentUserId = session.user.id;

  const messages = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    select: {
      id: true,
      isGroup: true,
      name: true,
      users: {
        select: {
          id: true,
          name: true,
          image: true,
        },
        where: {
          id: {
            not: currentUserId,
          },
        },
      },
      messages: {
        select: {
          id: true,
          body: true,
          image: true,
          document: true,
          createdAt: true,
          sender: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return messages;
}
