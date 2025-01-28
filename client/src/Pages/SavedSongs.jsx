import { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faMusic,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

import { GET_ME } from "../graphql/queries";
import { REMOVE_SONG } from "../graphql/mutations";
import Auth from "../utils/auth";
import { removeSongId } from "../utils/localStorage";

const SavedSongs = () => {
  const [userData, setUserData] = useState({});

  const { loading, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: "network-only",
    onCompleted: (data) => setUserData(data.me),
    onError: (err) => console.error("Error fetching user data:", err),
  });

  const [removeSong] = useMutation(REMOVE_SONG, {
    onError: (err) => console.error("Error removing song:", err),
  });

  useEffect(() => {
    if (Auth.loggedIn()) {
      refetch();
    }
  }, [refetch]);

  const handleDeleteSong = async (songId) => {
    try {
      const { data } = await removeSong({
        variables: { songId },
      });

      if (data) {
        setUserData((prevData) => ({
          ...prevData,
          savedSongs: prevData.savedSongs.filter(
            (song) => song.songId !== songId
          ),
        }));

        removeSongId(songId);
      }
    } catch (err) {
      console.error("Error removing song:", err);
    }
  };

  const truncateText = (text, length = 100) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#1a1a1a",
          minHeight: "100vh",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Loading your saved songs...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        color: "#fff",
        padding: "3rem 0",
      }}
    >
      <Container>
        <div
          style={{
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            borderRadius: "15px",
            padding: "3rem",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
          }}
        >
          <h1 className="mb-4">
            <FontAwesomeIcon icon={faMusic} /> Your Saved Songs
          </h1>
          <p className="mb-4">
            {userData.savedSongs?.length
              ? `You have ${userData.savedSongs.length} saved ${
                  userData.savedSongs.length === 1 ? "song" : "songs"
                }!`
              : "You have no saved songs yet. Start adding your favorites!"}
          </p>
        </div>
      </Container>

      <Container className="py-5">
        <Row className="justify-content-center g-4">
          {userData.savedSongs?.map((song) => (
            <Col md="4" key={song.songId}>
              <Card
                className="shadow h-100"
                style={{
                  background: "#292929",
                  color: "#fff",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                {song.coverImage && (
                  <Card.Img
                    variant="top"
                    src={song.coverImage}
                    alt={`Cover for ${song.title}`}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{song.title}</Card.Title>
                  <p className="small">Artist: {song.artist}</p>
                  <p className="small">
                    Album: {song.album || "Unknown Album"}
                  </p>
                  <p className="small">
                    <strong>Lyrics:</strong>
                    <br />
                    {song.lyrics
                      ? truncateText(song.lyrics, 150)
                      : "Lyrics not available."}
                  </p>
                  <div className="mt-auto d-flex flex-column gap-2">
                    <Button
                      href={`/lyrics/${song.songId}`}
                      target="_blank"
                      style={{
                        background:
                          "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Original gradient
                        border: "2px solid #4b0082", // Dark purple border
                        borderRadius: "50px",
                        color: "#fff",
                        padding: "0.75rem 1.5rem",
                        fontWeight: "bold",
                        textDecoration: "none",
                        transition: "transform 0.3s ease",
                      }}
                      className="btn-block"
                      onMouseEnter={(e) =>
                        (e.target.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} /> View Lyrics
                    </Button>

                    <Button
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                        song.artist + " " + song.title
                      )}`}
                      target="_blank"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff0080 0%, #8000ff 100%)", // Pink to Purple gradient
                        border: "2px solid #4b0082", // Dark purple border
                        borderRadius: "50px",
                        color: "#fff",
                        padding: "0.75rem 1.5rem",
                        fontWeight: "bold",
                        textDecoration: "none",
                        transition: "transform 0.3s ease",
                      }}
                      className="btn-block"
                      onMouseEnter={(e) =>
                        (e.target.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} /> Watch on
                      YouTube
                    </Button>

                    <Button
                      style={{
                        background:
                          "linear-gradient(135deg, #ff0080 0%, #8000ff 100%)", // Pink to Purple gradient
                        border: "2px solid #4b0082", // Dark purple border
                        borderRadius: "50px",
                        color: "#fff",
                        padding: "0.75rem 1.5rem",
                        fontWeight: "bold",
                        textDecoration: "none",
                        transition: "transform 0.3s ease",
                      }}
                      onClick={() => handleDeleteSong(song.songId)}
                      className="btn-block"
                      onMouseEnter={(e) =>
                        (e.target.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete this Song
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SavedSongs;
