import { createServer } from "http";
import { createHandler } from "graphql-http/lib/use/express";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { ruruHTML } from "ruru/server";
import { createSchema, prisma } from "./schema";
import jwt from "jsonwebtoken";
import { getEnvVar } from "./utils/getEnvVar";

async function main() {
  const schema = await createSchema();
  const app = express();

  // Use CORS middleware
  app.use(cors());

  app.use((req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      try {
        const decoded: any = jwt.verify(token, getEnvVar("JWT_SECRET"));
        req.context = { prisma, user: decoded.userId };
      } catch (err) {
        req.context = { prisma, user: null };
      }
    } else {
      req.context = { prisma, user: null };
    }
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
