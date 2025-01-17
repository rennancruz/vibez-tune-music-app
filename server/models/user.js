const { Schema, model } = require("mongoose");

const UserShema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
    max_length: 50,
  },
});
const User = model("User", UserShema);
