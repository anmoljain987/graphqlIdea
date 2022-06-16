const User = require("../models/User");
const Todo = require("../models/Todo");

module.exports = {
  Query: {
    userTodo: async (_, {}, { uid }) => {
      const res = await User.findOne({ uid }).populate("todos");

      return res;
    },
  },
  Mutation: {
    createUser: async (_, __, { uid }) => {
      const existingUser = await User.findOne({ uid });
      if (existingUser) {
        throw new Error("User Already Exists");
      }
      try {
        const user = await User.create({ uid });
        const res = await user.save();
        return { ...res._doc, id: res._id };
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  User: {
    todos: async (user, __, ___) => {
      const res = await Todo.find({ user: user._id });
      return res;
    },
  },
};
