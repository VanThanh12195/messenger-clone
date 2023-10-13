import { PrismaClient } from "@prisma/client";

const getPrismaClient = () => {

const prisma = new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
  });

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
})

  return prisma
};

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? getPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
