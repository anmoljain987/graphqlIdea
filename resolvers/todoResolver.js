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
    createTodo: async (_, { description, userId }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not Found");
      }
      const todo = await Todo.create({
        description,
        status: false,
        userId,
      });
      const res = await todo.save();

      await user.todos.push(res);
      await user.save();
      return res.populate("userId");
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
