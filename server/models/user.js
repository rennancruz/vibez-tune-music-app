const { Schema, model } = require("mongoose");

// Email validation function
const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: "Email address is required",
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Songs",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model("user", UserSchema);

module.exports = User;
