import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { resolvers } from "../prisma/generated/type-graphql";
import { AuthResolver } from "./resolvers/AuthResolver";
import { TaskResolver } from "./resolvers/TaskResolver";

const prisma = new PrismaClient();

export async function createSchema() {
  const schema = await buildSchema({
    resolvers: [...resolvers, AuthResolver, TaskResolver],
    validate: false,
  });

  return schema;
}

export { prisma };
