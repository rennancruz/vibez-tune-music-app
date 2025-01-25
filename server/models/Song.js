const { Schema, model } = require('mongoose');

// Define the Song schema
const songSchema = new Schema(
  {
    songId: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate song entries by songId
    },
    artist: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    album: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    lyrics: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Song model
const Song = model('Song', songSchema);

module.exports = Song;