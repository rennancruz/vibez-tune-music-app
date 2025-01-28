import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const hoverEffect = (e, scale) => {
    e.target.style.transform = scale;
  };

  const styles = {
    footer: {
      padding: "2rem 0",
      backgroundColor: "#1a1a1a",
      color: "#fff",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      textAlign: "center", // Center the content
    },
    donateButton: {
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      borderRadius: "50px",
      border: "2px solid #4b0082", // Dark purple border
      color: "#fff",
      padding: "0.75rem 1.5rem",
      fontWeight: "bold",
      textDecoration: "none",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      margin: "1rem 0", // Space around the button
      transition: "transform 0.3s ease",
      display: "inline-block",
    },
    linkIcon: {
      fontSize: "1.5rem",
      color: "#6a11cb",
    },
    creators: {
      marginBottom: "1rem",
      fontSize: "1rem",
    },
  };

  return (
    <footer style={styles.footer} className="d-flex flex-column align-items-center">
      <div style={styles.creators}>
        Created with{" "}
        <FontAwesomeIcon icon={faHeart} className="text-danger mx-1" /> by
        Alexander Mena, Brock Altug, Naira Davtyan, Rennan Cruz
      </div>
      <a
        href="https://donate.stripe.com/test_5kA7tS0uHaLs8Ny6oo"
        style={styles.donateButton}
        role="button"
        onMouseEnter={(e) => hoverEffect(e, "scale(1.05)")}
        onMouseLeave={(e) => hoverEffect(e, "scale(1)")}
      >
        Donate
      </a>
      <div>
        <a
          href="https://github.com/rennancruz/vibez-tune-music-app"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.linkIcon}
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;