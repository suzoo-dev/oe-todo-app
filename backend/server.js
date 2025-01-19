const { buildSchema } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");
const express = require("express");
const { ruruHTML } = require("ruru/server");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`type Query { hello: String } `);

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  hello() {
    return "Hello world!";
  },
};

const app = express();

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue,
  })
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
