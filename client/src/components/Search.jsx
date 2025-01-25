import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import logo from "./image.png";

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
  background: linear-gradient(
    to bottom right,
    rgb(226, 166, 243),
    rgb(68, 5, 85)
  ); /* Gradient background */
  text-align: center;
  padding: 20px;
`;

const WelcomeSection = styled.div`
  background-color: rgba(114, 11, 143, 0.9);

  padding: 40px;
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(60px);
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease; /* Smooth transition */

  &:hover {
    transform: scale(1.05); /* Scale up the section */
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4); /* Increase shadow on hover */
    background-color: rgba(114, 11, 143, 1); /* Darken background on hover */
  }
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bolder;
  color: white;
  margin-bottom: 20px;
  background: linear-gradient(
    180deg,
    rgba(138, 126, 126, 0.8),
    rgba(231, 216, 216, 0.4)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 3px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(138, 126, 126, 0.8);
  margin-bottom: 40px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: darkpurpule;
  background-color: rgb(198, 74, 210);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-weight: bolder;

  &:hover {
    background-color: rgb(130, 29, 140);
    transform: scale(1.2);
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
        <img
          src={logo}
          alt="Description of the image"
          style={{ width: "200px", marginBottom: "20px", borderRadius: "30px" }}
        />
        <Subtitle>We're glad to have you here!</Subtitle>
        <Button
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Get Started
        </Button>

        {/* Search Form */}
        {/* <SearchForm onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for music..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </SearchForm> */}

        {/* Loading Indicator */}
        {loading && <p>Loading...</p>}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            {searchResults.map((result, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3>{result.trackName}</h3>
                <p>{result.artistName}</p>
                <p>{result.collectionName}</p>
                <Button onClick={() => handleAddToPlaylist(result)}>
                  Add to Playlist
                </Button>
              </div>
            ))}
          </div>
        )}
      </WelcomeSection>
    </Container>
  );
}

export default Search;
