const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");

const { getUid } = require("./middlewares/authMiddleware");
const typeDefs = require("./typeDefs/typeDefs");

const resolvers = require("./resolvers/index");
const { User } = require("./resolvers/userResolver");
const UserModel = require("./models/User");
require("dotenv/config");

const PORT = process.env.PORT || 2000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      let user = await getUid(req?.headers?.authorization);

      if (!user) {
        throw new AuthenticationError("Unauthourised Access");
      }
      let _user = await UserModel.findOne({ uid: user.uid });
      if (!_user) {
        let _user = await UserModel.create({ uid: user.uid, email: user.email });
      }
      return {
        uid: user.uid,
        email: user.email,
      };
    } catch (error) {
      console.log({ error });
    }
  },
});

mongoose
  .connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then(({ url }) => {
    console.log("server is on " + url);
  });
