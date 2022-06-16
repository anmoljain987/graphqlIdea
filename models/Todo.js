const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
