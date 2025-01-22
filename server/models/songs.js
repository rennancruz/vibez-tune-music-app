const { Schema, model } = require("mongoose");

const SongSchema = new Schema({
  songTitle: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
});

const Songs = model("Songs", SongSchema);

module.exports = Songs;
