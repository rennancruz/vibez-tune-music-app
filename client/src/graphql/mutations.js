import { gql } from '@apollo/client';

// Mutation for logging in a user
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation for signing up a new user
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation for saving a song to the user's savedSongs array
export const SAVE_SONG = gql`
  mutation SaveSong(
    $songId: String!
    $artist: String!
    $title: String!
    $album: String
    $coverImage: String
    $lyrics: String
  ) {
    saveSong(
      songId: $songId
      artist: $artist
      title: $title
      album: $album
      coverImage: $coverImage
      lyrics: $lyrics
    ) {
      _id
      username
      email
      savedSongs {
        songId
        artist
        title
        album
        coverImage
        lyrics
      }
    }
  }
`;

// Mutation for removing a song from the user's savedSongs array
export const REMOVE_SONG = gql`
  mutation RemoveSong($songId: String!) {
    removeSong(songId: $songId) {
      _id
      username
      email
      savedSongs {
        songId
        artist
        title
        album
        coverImage
        lyrics
      }
    }
  }
`;