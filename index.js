const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
require("./config/firebase-config");
const { getUid } = require("./middlewares/authMiddleware");
const typeDefs = require("./typeDefs/typeDefs");

const resolvers = require("./resolvers/index");
require("dotenv/config");

const PORT = process.env.PORT || 2000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let user = await getUid(req?.headers?.authorization);
    if (!user) {
      throw new AuthenticationError("Unauthourised Access");
    }
    return {
      uid: user.uid,
      email: user.email,
    };
    // console.log({ user });
  },
});

// server.applyMiddleware();
mongoose
  .connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then(({ url }) => {
    console.log("server is on " + url);
  });
