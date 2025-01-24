import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

import { css } from "@emotion/react";

const SEARCH_MUSIC = gql`
  query searchMusic($term: String!) {
    searchMusic(term: $term) {
      trackName
      artistName
      collectionName
    }
  }
`;

const ADD_TO_PLAYLIST = gql`
  mutation addToPlaylist($trackName: String!, $artistName: String!) {
    addToPlaylist(trackName: $trackName, artistName: $artistName) {
      success
      message
    }
  }
`;

function Search() {
  const [term, setTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { loading, data, refetch } = useQuery(SEARCH_MUSIC, {
    variables: { term },
    skip: !term,
    onCompleted: (data) => setSearchResults(data.searchMusic),
  });

  const [addToPlaylist] = useMutation(ADD_TO_PLAYLIST);

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.trim()) {
      refetch();
    }
  };

  const handleAddToPlaylist = (track) => {
    addToPlaylist({ variables: track });
    alert(`${track.trackName} added to playlist!`);
  };
  const styles = {
    container: {
      display: "flex",
      background: " #f0f4f8",
      // flexdirection: "column",
      // alignitems: "center",
      justifycontent: "center",
      height: "100vh",
      textalign: "center",
    },

    title: css`
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 20px;
    `,
    subtitle: css`
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 40px;
    `,
    button: css`
      padding: 10px 20px;
      font-size: 1rem;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    `,
  };
  return (
    <div>
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome to Our Application!</h1>
        <p style={styles.subtitle}>
          We're glad to have you here. Explore our features and enjoy your stay!
        </p>
        <button css={styles.button}>Get Started</button>
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for music..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {searchResults.map((result, index) => (
        <div key={index}>
          <h3>{result.trackName}</h3>
          <p>{result.artistName}</p>
          <p>{result.collectionName}</p>
          <button onClick={() => handleAddToPlaylist(result)}>
            Add to Playlist
          </button>
        </div>
      ))}
    </div>
  );
}

export default Search;
