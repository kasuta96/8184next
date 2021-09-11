// import { PrismaClient } from "@prisma/client";

// // Prevent multiple instances of Prisma Client in development
// declare const global: NodeJS.Global & { prisma?: PrismaClient };

// const prisma = global.prisma || new PrismaClient();
// if (process.env.NODE_ENV === "development") global.prisma = prisma;

// export default prisma;

import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;