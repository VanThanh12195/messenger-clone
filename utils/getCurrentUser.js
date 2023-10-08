import { PrismaClient } from "@prisma/client";
import getServerSideSession from "./getServerSideSession"

export default async function getCurrentUser() {

    const session = await getServerSideSession()

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          conversationIds: true,
        },
      });
  
  return user
}

