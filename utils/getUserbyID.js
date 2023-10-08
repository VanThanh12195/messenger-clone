import { PrismaClient } from "@prisma/client";

export default async function getUserbyID(id ) {
  const prisma = new PrismaClient();

console.log('id is ' + id);

  const userFound = await prisma.user.findUnique({
    where: {
      id: id
    }
  });

  if (!userFound) return null;

  return userFound;
}
