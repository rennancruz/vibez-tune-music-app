const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    token: String
  }

  type Song {
    trackName: String
    artistName: String
    collectionName: String
  }

  type Query {
    user: [User]
    searchMusic(term: String!): [Song]
    playlist: [Song]
    lyrics(artist: String!, title: String!): String
  }

  type Mutation {
    login(email: String!, password: String!): User
    register(username: String!, email: String!, password: String!): User
    addToPlaylist(trackName: String!, artistName: String!): MutationResponse
  }

  type MutationResponse {
    success: Boolean
    message: String
  }
`;

module.exports = typeDefs;
