import { Link, useLocation } from "react-router-dom";
import Login from "../Login/Login";
import "./NavBar.css";

function NavBar(): JSX.Element {
  const location = useLocation();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <h1 className="navbar-brand">SongSwipe</h1>
        <Login></Login>
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
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/add-song"
              className={`nav-link ${
                location.pathname === "/add-song" ? "active" : ""
              }`}
            >
              Add Song
            </Link>
            <Link
              to="/popular"
              className={`nav-link ${
                location.pathname === "/popular" ? "active" : ""
              }`}
            >
              Popular 🔥
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
