import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { resolvers } from "../prisma/generated/type-graphql";

const prisma = new PrismaClient();

export async function createSchema() {
  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  return schema;
}

export { prisma };
