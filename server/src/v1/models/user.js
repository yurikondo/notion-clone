const mongoose = require("mongoose");

//https://mongoosejs.com/docs/models.html
const userSchema = new.mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports mongoose.model("User", userSchema);