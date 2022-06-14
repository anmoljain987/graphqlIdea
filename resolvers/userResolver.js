const bycrypt = require("bcryptjs");
const User = require("../models/User");
module.exports = {
  Query: {
    // login: async (_, { email }) => await User.find({ email }),
  },
  Mutation: {
    createUser: async (_, { email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User Already Exists");
      }
      try {
        const hashedPassword = await bycrypt.hash(password, 12);
        const user = await User.create({ email, password: hashedPassword });
        const res = await user.save();
        return { ...res._doc, password: null, id: res._id };
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
