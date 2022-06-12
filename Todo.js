const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
  description: String,
  status: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
