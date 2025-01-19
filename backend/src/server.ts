import { createServer } from "http";
import { createHandler } from "graphql-http/lib/use/express";
import express, { Request, Response, NextFunction } from "express";
import { ruruHTML } from "ruru/server";
import { createSchema, prisma } from "./schema";

async function main() {
  const schema = await createSchema();
  const app = express();

  // Add middleware for context
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.context = { prisma, user: null };
    next();
  });

  // Create GraphQL handler
  app.use(
    "/graphql",
    createHandler({
      schema,
      context: (req: { raw: Request }) => req.raw.context,
    })
  );

  // Serve the GraphiQL IDE
  app.get("/", (_req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/graphql" }));
  });

  const server = createServer(app);
  server.listen(4000, () => {
    console.log("Server is running at http://localhost:4000/graphql");
  });
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
});
