const { gql } = require("apollo-server");
module.exports = gql`
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
