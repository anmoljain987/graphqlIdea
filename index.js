const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const path = require("path");
const resolvers = require("./resolvers/resolvers");
require("dotenv/config");

const PORT = process.env.PORT || 2000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then(({ url }) => {
    console.log("server is on " + url);
  });
