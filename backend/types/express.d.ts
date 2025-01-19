import { PrismaClient } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      context: {
        prisma: PrismaClient;
        user: any; // Replace this later with user type
      };
    }
  }
}
