const { ApolloServer, gql } = require("apollo-server");
require("dotenv/config");
const mongoose = require("mongoose");

const path = require("path");

const resolvers = require("./resolvers");
const typeDefs = gql`
  type Todo {
    id: ID!
    description: String!
    status: Boolean!
  }
  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    createTodo(description: String!): Todo!
    updateTodo(id: ID!, description: String!): Todo
    checkedTodo(id: ID!, status: Boolean!): Todo
    deleteTodo(id: ID!): Todo
  }
`;
mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = process.env.PORT || 7000;
const server = new ApolloServer({
  // typeDefs: path.resolve(__dirname, "schema.graphql"),
  typeDefs,
  resolvers,
});
server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log("server is on " + url);
});
