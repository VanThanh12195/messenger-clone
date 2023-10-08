import { PrismaClient } from "@prisma/client";

export default async function getUserbyEmail({ email }) {
  const prisma = new PrismaClient();

  const userFound = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!userFound) return null;

  return userFound;
}
