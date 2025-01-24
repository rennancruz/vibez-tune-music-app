import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import styled from "@emotion/styled";

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e6e6fa; /* Light purple */
  text-align: center;
`;

const WelcomeSection = styled.div`
  background-color: rgb(88, 5, 110); /* Stronger purple */
  padding: 40px; /* Add padding for better spacing */
  border-radius: 30px; /* Optional: Round the corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for depth */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: white; /* Change text color to white for better contrast */
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #f0f0f0; /* Light gray for better contrast */
  margin-bottom: 40px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white; /* Default text color */
  background-color: rgb(105, 29, 175); /* Stronger purple */
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: rgb(130, 29, 140); /* Darker shade for hover effect */
    transform: scale(1.05); /* Slightly enlarge the button on hover */
    color: black;
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
    <Container>
      <WelcomeSection>
        <Title>Welcome to Our Application!</Title>
        <Subtitle>
          We're glad to have you here. Explore our features and enjoy your stay!
        </Subtitle>
        <Button>Get Started</Button>
      </WelcomeSection>

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
    </Container>
  );
}

export default Search;
