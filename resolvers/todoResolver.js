const Todo = require("../models/Todo");
const User = require("../models/User");

module.exports = {
  Query: {
    todos: async (_, __, { uid }) => {
      console.log({ uid });
      const user = await User.findOne({ uid });
      const todos = await Todo.find({ uid: user.id });
      // console.log(todos);
      return todos;
    },
  },
  Mutation: {
    createTodo: async (_, { description }, { uid }) => {
      const user = await User.findOne({ uid });
      if (!user) {
        throw new Error("User not Found");
      }
      const todo = await Todo.create({
        description,
        status: false,
        user,
      });
      const res = await todo.save();

      await user.todos.push(res);
      await user.save();
      return res.populate("user");
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
      const todo = await Todo.findById({ id });
      const userDelete = await User.findOneAndUpdate(
        { uid: todo.uid },
        { $pull: { todos: todo._id } }
      );
      userDelete.save();

      const res = await Todo.deleteOne(todo);

      return res;
    },
  },
  Todo: {
    user: async (todo, __, ___) => {
      const res = await Todo.findOne({ id: todo.id }).populate("user");
      return res.user;
    },
  },
};
