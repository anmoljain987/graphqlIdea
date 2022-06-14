const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
