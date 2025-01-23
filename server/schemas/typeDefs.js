const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Song {
    songId: String!
    artist: String!
    title: String!
    album: String
    coverImage: String
    lyrics: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    savedSongs: [Song]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveSong(
      songId: String!
      artist: String!
      title: String!
      album: String
      coverImage: String
      lyrics: String
    ): User
    removeSong(songId: String!): User
  }
`;

module.exports = typeDefs;