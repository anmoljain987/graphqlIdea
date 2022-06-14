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
    email: String!
    password: String
    todos: [Todo!]
  }
  # type Auth {
  #   userId: ID!
  #   token: String!
  #   tokenExpiration: Int!
  # }
  type Query {
    todos: [Todo!]!
    users: [User!]!
    userTodo(email: String!): [Todo!]
    # user(email: String!, password: String!): User
    # login(email: String!, password: String!): Auth!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    createTodo(description: String!): Todo!
    updateTodo(id: ID!, description: String!): Todo
    checkedTodo(id: ID!, status: Boolean!): Todo
    deleteTodo(id: ID!): Todo
  }
`;
