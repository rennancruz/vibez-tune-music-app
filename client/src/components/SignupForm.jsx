import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import { ADD_USER } from "../graphql/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
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
            padding: "2rem",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h1 className="text-center mb-4">
            <FontAwesomeIcon icon={faUser} /> Sign Up
          </h1>
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Alert
              dismissible
              onClose={() => setShowAlert(false)}
              show={showAlert}
              variant="danger"
            >
              Something went wrong with your signup!
            </Alert>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="username">
                <FontAwesomeIcon icon={faUser} /> Username
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Your username"
                name="username"
                onChange={handleInputChange}
                value={userFormData.username}
                required
                style={{
                  borderRadius: "50px",
                  padding: "0.75rem 1rem",
                  backgroundColor: "#292929",
                  color: "#fff",
                  border: "1px solid #6a11cb",
                }}
              />
              <Form.Control.Feedback type="invalid">
                Username is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email address"
                name="email"
                onChange={handleInputChange}
                value={userFormData.email}
                required
                style={{
                  borderRadius: "50px",
                  padding: "0.75rem 1rem",
                  backgroundColor: "#292929",
                  color: "#fff",
                  border: "1px solid #6a11cb",
                }}
              />
              <Form.Control.Feedback type="invalid">
                Email is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="password">
                <FontAwesomeIcon icon={faLock} /> Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Your password"
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
                required
                style={{
                  borderRadius: "50px",
                  padding: "0.75rem 1rem",
                  backgroundColor: "#292929",
                  color: "#fff",
                  border: "1px solid #6a11cb",
                }}
              />
              <Form.Control.Feedback type="invalid">
                Password is required!
              </Form.Control.Feedback>
            </Form.Group>

            <div className="text-center">
              <Button
                disabled={
                  !(
                    userFormData.username &&
                    userFormData.email &&
                    userFormData.password
                  )
                }
                type="submit"
                style={buttonStyle}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                <FontAwesomeIcon icon={faPaperPlane} /> Sign Up
              </Button>
            </div>

            {error && (
              <div className="mt-3 text-danger text-center">
                <strong>Signup failed. Please try again.</strong>
              </div>
            )}
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default SignupForm;
