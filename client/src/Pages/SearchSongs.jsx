import { useState, useEffect } from "react";
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  Modal,
} from "react-bootstrap";
import { useMutation, useLazyQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSave, faMusic } from "@fortawesome/free-solid-svg-icons";
import Auth from "../utils/auth";
import { SAVE_SONG } from "../graphql/mutations";
import { GET_ME } from "../graphql/queries";

const SearchSongs = () => {
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedSongIds, setSavedSongIds] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [saveSong] = useMutation(SAVE_SONG);
  const [getUserData] = useLazyQuery(GET_ME, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      const savedIds = data.me.savedSongs.map((song) => song.songId);
      setSavedSongIds(savedIds);
    },
    onError: (error) => {
      console.error("Error fetching saved songs:", error);
    },
  });

  useEffect(() => {
    if (Auth.loggedIn()) {
      getUserData();
    }
  }, [getUserData]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput.trim()) {
      setModalContent("Please enter a song or artist name.");
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          searchInput
        )}&entity=song&limit=25`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        setModalContent("No results found.");
        setShowModal(true);
        return;
      }

      const uniqueResults = new Map();
      data.results.forEach((result) => {
        const uniqueKey = `${result.trackName}-${result.artistName}-${result.collectionName}`.toLowerCase();
        if (!uniqueResults.has(uniqueKey)) {
          uniqueResults.set(uniqueKey, {
            songId: uniqueKey,
            trackName: result.trackName,
            artistName: result.artistName,
            albumName: result.collectionName,
            coverImage: result.artworkUrl100,
          });
        }
      });

      setSearchedSongs(Array.from(uniqueResults.values()));
    } catch (error) {
      console.error("Error fetching songs:", error);
      setModalContent("An error occurred while searching for songs.");
      setShowModal(true);
    }
  };

  const handleSaveSong = async (song) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      setModalContent("You need to log in to save a song.");
      setShowModal(true);
      return;
    }

    let lyrics = "Lyrics not available.";
    try {
      const lyricsResponse = await fetch(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(
          song.artistName
        )}/${encodeURIComponent(song.trackName)}`
      );
      if (lyricsResponse.ok) {
        const lyricsData = await lyricsResponse.json();
        lyrics = lyricsData.lyrics || lyrics;
      }
    } catch (error) {
      console.error("Error fetching lyrics:", error);
    }

    try {
      await saveSong({
        variables: {
          songId: song.songId,
          title: song.trackName,
          artist: song.artistName,
          album: song.albumName || "Unknown Album",
          coverImage: song.coverImage || "",
          lyrics,
        },
      });

      setSavedSongIds((prev) => [...prev, song.songId]);
      setModalContent(`"${song.trackName}" has been saved to your playlist!`);
      setShowModal(true);
    } catch (error) {
      console.error("Error saving song:", error);
      setModalContent("An error occurred while saving the song.");
      setShowModal(true);
    }
  };

  return (
    <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", padding: "3rem 0", color: "#fff" }}>
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
            <FontAwesomeIcon icon={faMusic} /> Search for Songs
          </h1>
          <Form onSubmit={handleFormSubmit} className="d-flex justify-content-center">
            <Form.Control
              name="searchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              size="lg"
              placeholder="Search for a song or artist"
              style={{
                borderRadius: "50px",
                padding: "1rem",
                marginRight: "1rem",
                maxWidth: "500px",
              }}
            />
            <Button
              type="submit"
              variant="light"
              size="lg"
              style={{
                borderRadius: "50px",
                padding: "0.75rem 2rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FontAwesomeIcon icon={faSearch} /> Search
            </Button>
          </Form>
        </div>
      </Container>

      <Container className="py-5">
        <h2 className="text-center mb-4">
          {searchedSongs.length
            ? `Viewing ${searchedSongs.length} result(s):`
            : "Search for a song to begin"}
        </h2>
        <Row className="g-4">
          {searchedSongs.map((song) => (
            <Col md="4" key={song.songId} className="d-flex align-items-stretch">
              <Card
                className="mb-4 shadow flex-grow-1"
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
                    alt={`${song.trackName} cover`}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{song.trackName}</Card.Title>
                  <p className="small">Artist: {song.artistName}</p>
                  <p className="small">Album: {song.albumName || "Unknown Album"}</p>
                  {Auth.loggedIn() && (
                    <Button
                    disabled={savedSongIds.includes(song.songId)}
                    style={{
                      background: savedSongIds.includes(song.songId)
                        ? "linear-gradient(135deg, #ff0080, #8000ff)" // Pink to Purple gradient
                        : "linear-gradient(135deg, #6a11cb, #2575fc)", // Original gradient
                      border: "2px solid #4b0082", // Dark purple border
                      borderRadius: "50px",
                      color: "#fff",
                      marginTop: "auto",
                      padding: "0.75rem 1.5rem",
                      fontWeight: "bold",
                      transition: "transform 0.3s ease",
                      textDecoration: "none",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                    onClick={() => handleSaveSong(song)}
                    className="btn-block"
                  >
                    <FontAwesomeIcon icon={faSave} />{" "}
                    {savedSongIds.includes(song.songId) ? "Saved" : "Save Song"}
                  </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header
          closeButton
          style={{
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            color: "#fff",
          }}
        >
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer
          style={{
            background: "#1a1a1a",
            color: "#fff",
          }}
        >
          <Button
            variant="light"
            onClick={() => setShowModal(false)}
            style={{ borderRadius: "50px" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SearchSongs;
