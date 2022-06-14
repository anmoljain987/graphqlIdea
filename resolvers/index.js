const todoResolver = require("./todoResolver");
const userResolver = require("./userResolver");

const rootResolver = {
  Query: {
    ...userResolver.Query,
    ...todoResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...todoResolver.Mutation,
  },
};
module.exports = rootResolver;
