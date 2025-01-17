const { Schema, model } = require("mongoose");

const SongShema = new Schema({
  songtitle: {
    type: String,
    required: true,
  },
  artisname: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
    unique: true,
  },
  toJSON: {
    virtuals: true,
  },
});
const User = model("Songs", SongShema);
