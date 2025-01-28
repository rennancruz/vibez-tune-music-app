const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Song schema for embedded documents
const songSchema = new Schema(
  {
    songId: {
      type: String,
      required: true,
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
    _id: false, // Disable _id for embedded song documents
  }
);

// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match a valid email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  savedSongs: [songSchema], // Embedded song documents
});

// Pre-save middleware to hash passwords
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Instance method to check password validity
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;