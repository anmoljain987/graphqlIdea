const Todo = require("../models/Todo");
module.exports = {
  Query: {
    todos: async () => await Todo.find(),
    todo: async (_, { id }) => await Todo.findById(id),
  },
  Mutation: {
    createTodo: async (_, { description }) => {
      const todo = await Todo.create({ description, status: false });
      const res = await todo.save();
      return res;
    },
    checkedTodo: async (_, { id, status }) => {
      const todo = await Todo.findByIdAndUpdate(id, { status: status });
      const res = await todo.save();
      return res;
    },
    updateTodo: async (_, { id, description }) => {
      const todo = await Todo.findByIdAndUpdate(id, { description: description });
      const res = await todo.save();
      console.log(res);
      return res;
    },
    deleteTodo: async (_, { id }) => {
      return await Todo.findByIdAndDelete(id);
    },
  },
};
