import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_LYRICS = gql`
  query getLyrics($artist: String!, $title: String!) {
    lyrics(artist: $artist, title: $title)
  }
`;

function Lyrics() {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [getLyrics, { loading, data }] = useLazyQuery(GET_LYRICS);

  const handleFetchLyrics = (e) => {
    e.preventDefault();
    getLyrics({ variables: { artist, title } });
  };

  return (
    <div>
      <form onSubmit={handleFetchLyrics}>
        <input
          type="text"
          placeholder="Artist name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="text"
          placeholder="Song title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Get Lyrics</button>
      </form>

      {loading && <p>Loading lyrics...</p>}
      {data && <p>{data.lyrics}</p>}
    </div>
  );
}

export default Lyrics;
