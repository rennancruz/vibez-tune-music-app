import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_PLAYLIST = gql`
  query {
    playlist {
      trackName
      artistName
    }
  }
`;

function Playlist() {
  const { loading, error, data } = useQuery(GET_PLAYLIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading playlist.</p>;

  return (
    <div>
      <h1>Your Playlist</h1>
      {data.playlist.map((song, index) => (
        <div key={index}>
          <h3>{song.trackName}</h3>
          <p>{song.artistName}</p>
        </div>
      ))}
    </div>
  );
}

export default Playlist;
