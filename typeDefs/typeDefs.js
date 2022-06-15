const { gql } = require("apollo-server");
module.exports = gql`
  type Todo {
    id: ID!
    description: String!
    status: Boolean!
    userId: User!
  }
  type User {
    id: ID!
    uid: String!
    todos: [Todo!]
  }

  type Query {
    todos: [Todo!]!
    users: [User!]!
    userTodo(uid: String!): User
  }

  type Mutation {
    createUser(uid: String!): User!
    createTodo(description: String!, userId: ID!): Todo!
    updateTodo(id: ID!, description: String!): Todo
    checkedTodo(id: ID!, status: Boolean!): Todo
    deleteTodo(id: ID!): Todo
  }
`;
