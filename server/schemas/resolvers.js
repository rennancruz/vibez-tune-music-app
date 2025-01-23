const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Fetch the current user's information
    me: async (parent, args, context) => {
      if (context.user) {
        try {
          const user = await User.findOne({ _id: context.user._id }).select('-__v -password');
          if (!user) {
            throw new AuthenticationError('User not found.');
          }
          return user;
        } catch (err) {
          console.error(err);
          throw new AuthenticationError('Failed to fetch user data.');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    // Add a new user and return a token
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Failed to create a new user.');
      }
    },
    // Log in an existing user and return a token
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Invalid email or password.');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Invalid email or password.');
        }
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Failed to log in.');
      }
    },
    // Save a song to the user's savedSongs array
    saveSong: async (parent, { songId, artist, title, album, coverImage, lyrics }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            {
              $addToSet: {
                savedSongs: {
                  songId,
                  artist,
                  title,
                  album: album || 'Unknown Album', // Default value for optional fields
                  coverImage: coverImage || '', // Default value
                  lyrics: lyrics || 'Lyrics not available.', // Default value
                },
              },
            },
            { new: true, runValidators: true }
          );
          return updatedUser;
        } catch (err) {
          console.error(err);
          throw new Error('Failed to save the song.');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Remove a song from the user's savedSongs array
    removeSong: async (parent, { songId }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            {
              $pull: { savedSongs: { songId } },
            },
            { new: true }
          );
          if (!updatedUser) {
            throw new Error('Failed to remove the song.');
          }
          return updatedUser;
        } catch (err) {
          console.error(err);
          throw new Error('Failed to remove the song.');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;