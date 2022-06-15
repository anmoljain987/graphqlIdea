const User = require("../models/User");
module.exports = {
  Query: {
    userTodo: async (_, { uid }) => {
      const res = await User.findOne({ uid }).populate("todos");

      return res;
    },
  },
  Mutation: {
    createUser: async (_, { uid }) => {
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
};
