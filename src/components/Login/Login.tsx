import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import {
  AppContext,
  PlaylistContext,
  SelectedPlaylistContext,
} from "../../App";
import "./Login.css";

export default function Login(): JSX.Element {
  const user = useContext(AppContext);
  const playlists = useContext(PlaylistContext);
  const { selectedPlaylist, setSelectedPlaylist } = useContext(
    SelectedPlaylistContext
  );
  return (
    <>
      {user ? (
        <div className="logged-in">
          <a
            className="btn btn-success btn-sm"
            href={process.env.REACT_APP_AUTH_URL}
          >
            {" "}
            <FontAwesomeIcon
              className="spotify-icon"
              icon={faSpotify}
              size="lg"
            />
            Logged in as: {user.name}
          </a>
          <div className="dropdown">
            {selectedPlaylist ? (
              <button
                className="btn btn-secondary btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedPlaylist.name}
              </button>
            ) : (
              <button
                className="btn btn-secondary btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Playlist
              </button>
            )}
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    setSelectedPlaylist(undefined);
                  }}
                >
                  Select Playlist
                </button>
              </li>
              {playlists
                .filter((playlist) => playlist.owner.display_name === user.name)
                .map((playlist) => {
                  return (
                    <li key={playlist.id}>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => {
                          setSelectedPlaylist(playlist);
                        }}
                      >
                        {playlist.name}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
          <p>
            <small>
              on swipe liked songs will be added to selected playlist
            </small>
          </p>
        </div>
      ) : (
        <a
          className="btn btn-success btn-sm"
          href={process.env.REACT_APP_AUTH_URL}
        >
          {" "}
          <FontAwesomeIcon
            className="spotify-icon"
            icon={faSpotify}
            size="lg"
          />
          Login With Spotify
        </a>
      )}
    </>
  );
}
