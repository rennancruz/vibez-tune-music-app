import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMusic } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const LyricsPage = () => {
  const { songId } = useParams(); // Get songId from URL
  const navigate = useNavigate();
  const [songData, setSongData] = useState(null);

  const { loading, data } = useQuery(GET_ME, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      const foundSong = data.me.savedSongs.find((song) => song.songId === songId);
      setSongData(foundSong || null);
    },
    onError: (err) => console.error("Error fetching song data:", err),
  });

  if (loading) {
    return (
      <h2 className="text-center mt-5" style={{ color: "#fff" }}>
        Loading lyrics...
      </h2>
    );
  }

  if (!songData) {
    return (
      <h2 className="text-center mt-5" style={{ color: "#fff" }}>
        Song not found.
      </h2>
    );
  }

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
          {songData.coverImage && (
            <img
              src={songData.coverImage}
              alt={`Cover for ${songData.title}`}
              style={{
                maxWidth: "200px",
                marginBottom: "1rem",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          )}
          <h1 className="mb-4">
            <FontAwesomeIcon icon={faMusic} /> Lyrics for "{songData.title}"
          </h1>
          <p className="mb-2">
            <strong>Artist:</strong> {songData.artist}
          </p>
          <p className="mb-2">
            <strong>Album:</strong> {songData.album || "Unknown Album"}
          </p>
          <div
            style={{
              background: "#292929",
              color: "#fff",
              borderRadius: "15px",
              padding: "1.5rem",
              textAlign: "left",
              margin: "2rem 0",
              whiteSpace: "pre-wrap",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h4>Lyrics:</h4>
            <p>{songData.lyrics || "Lyrics not available."}</p>
          </div>
          <Button
            onClick={() => navigate(-1)}
            style={{
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Original gradient
              border: "2px solid #4b0082", // Dark purple border
              borderRadius: "50px",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              fontWeight: "bold",
              fontSize: "1rem",
              textDecoration: "none",
              transition: "transform 0.3s ease",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Go Back
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LyricsPage;