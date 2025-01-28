import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import Auth from "../utils/auth";
import { useLazyQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [fetchUserData] = useLazyQuery(GET_ME, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setUserData(data.me);
    },
    onError: (error) => {
      console.error("Error fetching user data:", error);
    },
  });

  const buttonStyle = {
    background: "linear-gradient(135deg, #6a11cb, #2575fc 100%)", // Original gradient
    border: "2px solid #4b0082", // Dark purple border
    borderRadius: "50px",
    color: "#fff",
    padding: "0.75rem 2rem",
    fontWeight: "bold",
    fontSize: "1rem",
    textDecoration: "none",
    transition: "transform 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  useEffect(() => {
    if (Auth.loggedIn()) {
      fetchUserData();
    }
  }, [fetchUserData]);

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        padding: "3rem 0",
        color: "#fff",
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
          <video
            src="/assets/logo.mp4"
            autoPlay
            loop
            muted
            style={{
              maxWidth: "200px",
              marginBottom: "1rem",
              borderRadius: "15px",
            }}
          ></video>
          {!Auth.loggedIn() ? (
            <>
              <h1 className="mb-4">
                <FontAwesomeIcon icon={faMusic} /> Welcome to Vibez Tune!
              </h1>
              <p className="mb-4">
                Discover and save your favorite songs in your personalized
                playlist.
              </p>
            </>
          ) : (
            <>
              <h1 className="mb-4">
                <FontAwesomeIcon icon={faUserCircle} /> Welcome back,{" "}
                {userData?.username || "User"}!
              </h1>
              <p className="mb-4">
                You have <strong>{userData?.savedSongs?.length || 0}</strong>{" "}
                songs in your playlist.
              </p>
              <Button
                href="/saved"
                style={buttonStyle}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                View Your Playlist
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Home;
