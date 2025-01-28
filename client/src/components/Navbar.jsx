import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMusic,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  const buttonStyle = {
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    borderRadius: "50px",
    border: "2px solid #4b0082", // Dark purple border
    color: "#fff",
    margin: "0.5rem",
    padding: "0.5rem 1rem",
    textAlign: "center",
    fontWeight: "bold",
    transition: "transform 0.3s ease",
    textDecoration: "none",
  };

  const hoverEffect = (e, scale) => {
    e.target.style.transform = scale;
  };

  return (
    <>
      {/* Centered Logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem 0",
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          border: "2px solid #4b0082",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            src="/assets/logo.png" // Absolute path
            alt="Logo"
            style={{
              height: "50px",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => hoverEffect(e, "scale(1.1)")}
            onMouseLeave={(e) => hoverEffect(e, "scale(1)")}
          />
        </Link>
      </div>

      {/* Navbar Content */}
      <Navbar
        expand="lg"
        style={{
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          padding: "0.5rem 1rem",
        }}
      >
        <Container>
          {/* Hamburger Menu for Mobile Only */}
          <Navbar.Toggle
            aria-controls="navbar"
            className="d-lg-none mx-auto"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          />
          <Navbar.Collapse
            id="navbar"
            className="justify-content-center text-center"
          >
            <Nav>
              {/* Search Link */}
              <Nav.Link
                as={Link}
                to="/search"
                style={buttonStyle}
                onMouseEnter={(e) => hoverEffect(e, "scale(1.05)")}
                onMouseLeave={(e) => hoverEffect(e, "scale(1)")}
              >
                <FontAwesomeIcon icon={faSearch} className="me-2" />
                Search Songs
              </Nav.Link>
              {/* Authenticated User Links */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/saved"
                    style={buttonStyle}
                    onMouseEnter={(e) => hoverEffect(e, "scale(1.05)")}
                    onMouseLeave={(e) => hoverEffect(e, "scale(1)")}
                  >
                    <FontAwesomeIcon icon={faMusic} className="me-2" />
                    Your Playlist
                  </Nav.Link>
                  <Nav.Link
                    onClick={Auth.logout}
                    style={buttonStyle}
                    onMouseEnter={(e) => hoverEffect(e, "scale(1.05)")}
                    onMouseLeave={(e) => hoverEffect(e, "scale(1)")}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  onClick={() => setShowModal(true)}
                  style={buttonStyle}
                  onMouseEnter={(e) => hoverEffect(e, "scale(1.05)")}
                  onMouseLeave={(e) => hoverEffect(e, "scale(1)")}
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for Login/Signup */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
        style={{
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        }}
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header
            closeButton
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "#fff",
            }}
          >
            <Modal.Title id="signup-modal">
              <Nav variant="pills" className="justify-content-center">
                <Nav.Item>
                  <Nav.Link
                    eventKey="login"
                    style={buttonStyle}
                    onMouseEnter={(e) => hoverEffect(e, "scale(1.05)")}
                    onMouseLeave={(e) => hoverEffect(e, "scale(1)")}
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="signup"
                    style={buttonStyle}
                    onMouseEnter={(e) => hoverEffect(e, "scale(1.05)")}
                    onMouseLeave={(e) => hoverEffect(e, "scale(1)")}
                  >
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
