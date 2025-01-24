import { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";

import { GET_ME } from "../graphql/queries";
import { REMOVE_SONG } from "../graphql/mutations";
import Auth from "../utils/auth";
import { removeSongId } from "../utils/localStorage";

const SavedSongs = () => {
  const [userData, setUserData] = useState({});

  // Fetch user data using Apollo's `useQuery`
  const { loading, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setUserData(data.me);
    },
    onError: (err) => {
      console.error("Error fetching user data:", err);
    },
  });

  // Mutation for removing a song
  const [removeSong] = useMutation(REMOVE_SONG, {
    onError: (err) => {
      console.error("Error removing song:", err);
    },
  });

  useEffect(() => {
    if (Auth.loggedIn()) {
      refetch();
    }
  }, [refetch]);

  // Handle removing a song
  const handleDeleteSong = async (songId) => {
    try {
      const { data } = await removeSong({
        variables: { songId },
      });

      if (data) {
        // Update UI by removing the song from local state
        setUserData((prevData) => ({
          ...prevData,
          savedSongs: prevData.savedSongs.filter(
            (song) => song.songId !== songId
          ),
        }));

        // Remove song ID from localStorage
        removeSongId(songId);
      }
    } catch (err) {
      console.error("Error removing song:", err);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-5">Loading your saved songs...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing Saved Songs</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedSongs?.length
            ? `Viewing ${userData.savedSongs.length} saved ${
                userData.savedSongs.length === 1 ? "song" : "songs"
              }:`
            : "You have no saved songs!"}
        </h2>
        <Row>
          {userData.savedSongs?.map((song) => (
            <Col md="4" key={song.songId}>
              <Card border="dark" className="mb-4">
                {song.coverImage && (
                  <Card.Img
                    variant="top"
                    src={song.coverImage}
                    alt={`Cover for ${song.title}`}
                  />
                )}
                <Card.Body>
                  <Card.Title>{song.title}</Card.Title>
                  <p className="small">Artist: {song.artist}</p>
                  <p className="small">
                    Album: {song.album || "Unknown Album"}
                  </p>
                  <p className="small">
                    <strong>Lyrics:</strong>
                    <br />
                    {song.lyrics || "Lyrics not available."}
                  </p>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteSong(song.songId)}
                  >
                    Delete this Song
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedSongs;
