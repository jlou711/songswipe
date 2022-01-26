import { useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar(): JSX.Element {
  const location = useLocation();
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          SongSwipe
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              aria-current="page"
              href="/"
            >
              Home
            </a>
            <a
              className={`nav-link ${
                location.pathname === "/add-song" ? "active" : ""
              }`}
              href="add-song"
            >
              Add Song
            </a>
            <a
              className={`nav-link ${
                location.pathname === "/about" ? "active" : ""
              }`}
              href="about"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
