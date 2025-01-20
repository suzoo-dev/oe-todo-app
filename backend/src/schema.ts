import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { resolvers } from "../prisma/generated/type-graphql";
import { AuthResolver } from "./resolvers/AuthResolver";

const prisma = new PrismaClient();

export async function createSchema() {
  const schema = await buildSchema({
    resolvers: [...resolvers, AuthResolver],
    validate: false,
  });

  return schema;
}

export { prisma };
