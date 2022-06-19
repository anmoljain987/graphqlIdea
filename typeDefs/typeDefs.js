const { gql } = require("apollo-server");
module.exports = gql`
  type Todo {
    id: ID!
    description: String!
    status: Boolean!
    user: User!
  }
  type User {
    id: ID!
    uid: String!
    email: String!
    todos: [Todo!]
  }

  type Query {
    todos: [Todo!]!
    users: [User!]!
    userTodo: User
  }

  type Mutation {
    createTodo(description: String!): Todo!
    updateTodo(id: ID!, description: String!): Todo
    checkedTodo(id: ID!, status: Boolean!): Todo
    deleteTodo(id: ID!): Todo
  }
`;
