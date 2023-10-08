import prisma from "./getPrismaClient";

export default async function getUserbyID(id ) {

  const userFound = await prisma.user.findUnique({
    where: {
      id: id
    }
  });

  if (!userFound) return null;

  return userFound;
}
