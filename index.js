const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs/typeDefs");
const { ApolloServerPluginInlineTraceDisabled } = require("apollo-server-core");
const resolvers = require("./resolvers/index");
const { buildSubgraphSchema } = require("@apollo/federation");
const UserModel = require("./models/User");
require("dotenv/config");

const PORT = process.env.PORT || 2000;
const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  plugins: [ApolloServerPluginInlineTraceDisabled()],

  context: async ({ req }) => {
    try {
      let uid = req?.headers["x-uid"];
      let email = req?.headers["x-email"];
      let _user = await UserModel.findOne({ uid });
      if (!_user) {
        UserModel.create({ uid, email });
      }
      return {
        uid,
        email,
      };
    } catch (error) {
      console.log("\x1b[31m", error.message);
    }
  },
  // cors: ["https://federationgateway.herokuapp.com"],
});

mongoose
  .connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then(({ url }) => {
    console.log("server is on " + url);
  });
