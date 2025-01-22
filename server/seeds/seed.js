const mongoose = require("mongoose");
const User = require("../models/User");
const Song = require("../models/Song");
const userData = require("./users.json");
const songData = require("./songs.json");

mongoose.connect("mongodb://localhost:27017/vibez_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Song.deleteMany({});

    // Insert new data
    const createdUsers = await User.insertMany(userData);
    console.log("Users seeded:", createdUsers);

    const createdSongs = await Song.insertMany(songData);
    console.log("Songs seeded:", createdSongs);

    console.log("Database seeding completed!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.connection.close();
  }
};

seedDatabase();