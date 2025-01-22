const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
const secret = "mysecretkey"; // Replace with environment variable

const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    },
    searchMusic: async (_, { term }) => {
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=25`
        );
        const data = await response.json();
        return data.results.map((song) => ({
          trackName: song.trackName,
          artistName: song.artistName,
          collectionName: song.collectionName,
        }));
      } catch (error) {
        console.error("Error fetching music:", error);
        throw new Error("Failed to fetch music");
      }
    },
    playlist: async () => {
      // Simulate playlist fetch from DB
      return [];
    },
    lyrics: async (_, { artist, title }) => {
      try {
        const response = await fetch(
          `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
        );
        const data = await response.json();
        if (data.lyrics) {
          return data.lyrics;
        } else {
          throw new Error("Lyrics not found");
        }
      } catch (error) {
        console.error("Error fetching lyrics:", error);
        throw new Error("Failed to fetch lyrics");
      }
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error("Invalid credentials");
      const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
      return { ...user._doc, token };
    },
    register: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
      return { ...user._doc, token };
    },
    addToPlaylist: async (_, { trackName, artistName }) => {
      // Simulate adding song to DB
      return { success: true, message: "Song added successfully." };
    },
  },
};

module.exports = resolvers;
