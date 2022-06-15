const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },

  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
