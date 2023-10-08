import getServerSideSession from "./getServerSideSession"

import prisma from "./getPrismaClient";

export default async function getCurrentUser() {

    const session = await getServerSideSession()

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

