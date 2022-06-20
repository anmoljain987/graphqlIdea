const User = require("../models/User");
const Todo = require("../models/Todo");

module.exports = {
  Query: {
    userTodo: async (_, __, { uid }) => {
      const res = await User.findOne({ uid }).populate("todos");

      return res;
    },
  },

  User: {
    todos: async (user, __, ___) => {
      const res = await Todo.find({ user: user._id });
      return res;
    },
  },
};
