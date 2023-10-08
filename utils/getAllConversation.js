import { PrismaClient } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";

export default async function getAllConversation() {
  const prisma = new PrismaClient();

  const { id } = await getCurrentUser();

  const conversations = await prisma.conversation.findMany({
    where: {
      userIds: {
        has: id,
      },
    },
    select: {
      id: true,
      userIds: true,
      lastMessage:true,
      lastMessageAt: true,
    },
  });

  return <div>getAllConversation</div>;
}
