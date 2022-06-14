const Todo = require("../models/Todo");
const User = require("../models/User");
module.exports = {
  Query: {
    todos: async () => {
      const todos = await Todo.find().populate("userId");

      return todos;
    },
  },
  Mutation: {
    createTodo: async (_, { description }) => {
      const todo = await Todo.create({
        description,
        status: false,
        userId: "62a8374059dcc46d404b6ce0",
      });
      const res = await todo.save();

      const user = await User.findById("62a8374059dcc46d404b6ce0");

      if (!user) {
        throw new Error("User not Found");
      }
      await user.todos.push(res);
      await user.save();
      return res;
    },
    checkedTodo: async (_, { id, status }) => {
      const todo = await Todo.findByIdAndUpdate(id, { status: status });
      const res = await todo.save();
      return res;
    },
    updateTodo: async (_, { id, description }) => {
      const todo = await Todo.findByIdAndUpdate(id, { description: description }, { new: true });
      const res = await todo.save();

      return res;
    },
    deleteTodo: async (_, { id }) => {
      return await Todo.findByIdAndDelete(id);
    },
  },
};
