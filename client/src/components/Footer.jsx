const styles = {
  footer: {
    padding: "50px",
  },
};
export default function Footer() {
  return (
    <footer
      style={styles.footer}
      className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
    >
      <div className="col-md-4 d-flex align-items-center">
        <span className="text-muted">
          Alexander Mena, Brock Altug, Naira Davtyan, Rennan Cruz
        </span>
      </div>
      <a
        href="https://donate.stripe.com/test_5kA7tS0uHaLs8Ny6oo"
        class="btn btn-secondary btn-lg active"
        role="button"
        aria-pressed="true"
      >
        Donate
      </a>
      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <a
            className="link-dark"
            href="https://github.com/rennancruz/vibez-tune-music-app"
          >
            <i class="fa-brands fa-github"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
}
