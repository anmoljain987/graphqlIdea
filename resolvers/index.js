const todoResolver = require("./todoResolver");
const userResolver = require("./userResolver");

const rootResolver = {
  Query: {
    ...userResolver.Query,
    ...todoResolver.Query,
  },
  Mutation: {
    ...todoResolver.Mutation,
  },
  User: {
    ...userResolver.User,
  },
  Todo: {
    ...todoResolver.Todo,
  },
};
module.exports = rootResolver;
