import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

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

  return (
    <div>
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
          <button onClick={() => handleAddToPlaylist(result)}>Add to Playlist</button>
        </div>
      ))}
    </div>
  );
}

export default Search;
