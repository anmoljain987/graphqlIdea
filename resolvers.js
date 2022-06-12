const Todo = require("./Todo");
module.exports = {
  Query: {
    todos: () => Todo.find(),
    todo: (_, { id }) => Todo.findById(id),
  },
  Mutation: {
    createTodo: (_, { description }) => Todo.create({ description, status: false }),
    checkedTodo: (_, { id, status }) => Todo.findByIdAndUpdate(id, { status: status }),
    updateTodo: (_, { id, description }) =>
      Todo.findByIdAndUpdate(id, { description: description }),
    deleteTodo: (_, { id }) => Todo.findByIdAndDelete(id),
  },
};
